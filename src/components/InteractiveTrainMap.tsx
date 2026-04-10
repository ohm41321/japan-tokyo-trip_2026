'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// แผนที่รถไฟ JR East (local file)
const JR_MAP_IMAGE = '/pic/JR.png';

export default function InteractiveTrainMap() {
  const { language } = useLanguage();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => {
    setIsTransitioning(true);
    setScale(prev => Math.min(prev * 1.25, MAX_SCALE));
    setTimeout(() => setIsTransitioning(false), 150);
  };

  const zoomOut = () => {
    setIsTransitioning(true);
    setScale(prev => {
      const newScale = Math.max(prev / 1.25, MIN_SCALE);
      if (newScale === MIN_SCALE) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
    setTimeout(() => setIsTransitioning(false), 150);
  };

  const resetView = () => {
    setIsTransitioning(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setTimeout(() => setIsTransitioning(false), 150);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = JR_MAP_IMAGE;
    link.download = 'JR-East-Railway-Network.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    // ใช้ requestAnimationFrame เพื่อ performance ที่ดีขึ้น
    requestAnimationFrame(() => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events สำหรับ mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    requestAnimationFrame(() => {
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 p-4 sm:p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🗺️</span>
          <h2 className="text-lg sm:text-2xl font-bold">
            {language === 'th' ? 'แผนที่รถไฟ JR East' : 'JR East Railway Map'}
          </h2>
        </div>
        <p className="text-green-100 text-xs sm:text-sm">
          {language === 'th'
            ? 'ซูมเข้า-ออก, ลากเพื่อดูรายละเอียด, บันทึกเก็บไว้ใช้ offline'
            : 'Zoom in/out, drag to explore, save for offline use'}
        </p>
      </div>

      {/* Map Container */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Controls */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="font-medium">
              {language === 'th' ? 'ซูม' : 'Zoom'}: {Math.round(scale * 100)}%
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={zoomOut}
              disabled={scale <= MIN_SCALE}
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              🔍-
            </button>
            <button
              onClick={zoomIn}
              disabled={scale >= MAX_SCALE}
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              🔍+
            </button>
            <button
              onClick={resetView}
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              ↺
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 touch-none"
          style={{ height: '70vh', minHeight: '500px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="absolute"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              cursor: isDragging ? 'grabbing' : 'grab',
              transition: isTransitioning ? 'transform 0.15s ease-out' : 'none',
              willChange: 'transform',
            }}
          >
            <img
              src={JR_MAP_IMAGE}
              alt={language === 'th' ? 'แผนที่รถไฟ JR East' : 'JR East Railway Map'}
              className="w-auto h-auto select-none pointer-events-none"
              style={{ maxWidth: 'none' }}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDownload}
          className="py-4 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-2xl">💾</span>
          <span>
            {language === 'th' ? 'บันทึกรูปภาพ' : 'Save Image'}
          </span>
        </button>
        <a
          href={JR_MAP_IMAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="py-4 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 text-center"
        >
          <span className="text-2xl">🔍</span>
          <span>
            {language === 'th' ? 'เปิดเต็มจอ' : 'Open Full Size'}
          </span>
        </a>
      </div>

      {/* Quick Reference Guide */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-4">
          {language === 'th' ? '🚉 สายรถไฟหลัก' : '🚉 Major Train Lines'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Yamanote Line */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4" style={{ borderLeftColor: '#80C244' }}>
            <span className="text-2xl flex-shrink-0">🚃</span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {language === 'th' ? 'สายยามาโนเตะ' : 'Yamanote Line'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'th' ? 'วงกลมสีเขียว - สายหลัก' : 'Green circle - Main loop line'}
              </p>
            </div>
          </div>

          {/* Tokyo Metro */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4" style={{ borderLeftColor: '#007AC0' }}>
            <span className="text-2xl flex-shrink-0">🚇</span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {language === 'th' ? 'Tokyo Metro' : 'Tokyo Metro'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'th' ? 'รถไฟใต้ดิน 9 สาย' : '9 subway lines'}
              </p>
            </div>
          </div>

          {/* JR Lines */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4" style={{ borderLeftColor: '#DA251E' }}>
            <span className="text-2xl flex-shrink-0">🚄</span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {language === 'th' ? 'JR สายหลัก' : 'JR Main Lines'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'th' ? 'ไปต่างจังหวัด/ชินคันเซน' : 'Intercity/Shinkansen'}
              </p>
            </div>
          </div>

          {/* Narita Express */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4" style={{ borderLeftColor: '#0068B8' }}>
            <span className="text-2xl flex-shrink-0">✈️</span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {language === 'th' ? 'Narita Express' : 'Narita Express'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'th' ? 'สนามบินนาริตะ → โตเกียว' : 'Narita Airport → Tokyo'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-4 sm:p-6">
        <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-3">
          {language === 'th' ? '💡 วิธีใช้แผนที่' : '💡 How to Use'}
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <span className="flex-shrink-0">🔍</span>
            <span>
              {language === 'th'
                ? 'กด 🔍+ 🔍- เพื่อซูมเข้า-ออก หรือใช้เมาส์ scroll'
                : 'Press 🔍+ 🔍- to zoom or use mouse scroll'}
            </span>
          </li>
          <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <span className="flex-shrink-0">✋</span>
            <span>
              {language === 'th'
                ? 'คลิกค้างแล้วลากเพื่อดูส่วนต่างๆ ของแผนที่'
                : 'Click and drag to pan around the map'}
            </span>
          </li>
          <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <span className="flex-shrink-0">💾</span>
            <span>
              {language === 'th'
                ? 'กด "บันทึกรูปภาพ" เพื่อเก็บไว้ในโทรศัพท์ ใช้ offline ได้'
                : 'Press "Save Image" to store on your phone for offline use'}
            </span>
          </li>
          <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <span className="flex-shrink-0">🗺️</span>
            <span>
              {language === 'th'
                ? 'ใช้แท็บ "ค้นหาเส้นทาง" เพื่อเปิด Google Maps นำทางเรียลไทม์'
                : 'Use "Route Finder" tab for real-time navigation with Google Maps'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
