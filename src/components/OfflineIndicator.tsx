"use client";

import { useState, useEffect } from 'react';
import { offlineManager } from '@/utils/offlineManager';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [showBackupRestore, setShowBackupRestore] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);
    setLastSync(offlineManager.getLastUpdated());

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(false);
      // Auto-sync when back online
      offlineManager.cacheAllData();
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show indicator briefly on mount if offline
    if (!navigator.onLine) {
      setShowIndicator(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleExport = () => {
    offlineManager.exportData();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      offlineManager.importData(file)
        .then(() => {
          alert('Data restored successfully!');
          window.location.reload();
        })
        .catch((error) => {
          alert('Failed to import data: ' + error.message);
        });
    }
  };

  if (isOnline && !showIndicator) return null;

  return (
    <>
      {/* Floating Offline Indicator */}
      <div className="fixed bottom-24 right-4 z-40 max-w-sm animate-slide-up">
        {!isOnline && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-2xl mb-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📡</span>
              <div className="flex-1">
                <p className="font-bold text-sm">You're Offline</p>
                <p className="text-xs opacity-90 mt-1">
                  Your trip data is still available
                </p>
                {lastSync && (
                  <p className="text-xs opacity-75 mt-1">
                    Last synced: {lastSync.toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowIndicator(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Online but showing indicator (e.g., after coming back online) */}
        {isOnline && showIndicator && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl shadow-2xl mb-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div className="flex-1">
                <p className="font-bold text-sm">Back Online!</p>
                <p className="text-xs opacity-90 mt-1">
                  All features are now available
                </p>
              </div>
              <button
                onClick={() => setShowIndicator(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backup & Restore Panel (for settings/offline page) */}
      {showBackupRestore && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                💾 Backup & Restore
              </h2>
              <button
                onClick={() => setShowBackupRestore(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Export */}
              <button
                onClick={handleExport}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📤</span>
                  <div>
                    <p className="font-bold">Export Data</p>
                    <p className="text-xs opacity-90">
                      Save backup to your device
                    </p>
                  </div>
                </div>
              </button>

              {/* Import */}
              <label className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl transition-colors text-left cursor-pointer block">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <div>
                    <p className="font-bold">Import Data</p>
                    <p className="text-xs opacity-90">
                      Restore from backup file
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>

              {/* Storage Usage */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Storage Usage
                </p>
                {(() => {
                  const usage = offlineManager.getStorageUsage();
                  return (
                    <>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${usage.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {usage.used} / {usage.total} ({usage.percentage.toFixed(1)}%)
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                💡 Tip: Export your data regularly to keep a backup
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Button (always visible in bottom-right) */}
      <button
        onClick={() => setShowBackupRestore(true)}
        className="fixed bottom-4 right-4 z-30 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all hover:scale-110"
        title="Backup & Restore"
      >
        <span className="text-xl">💾</span>
      </button>
    </>
  );
}
