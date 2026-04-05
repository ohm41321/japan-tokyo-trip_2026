"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DayCard from '@/components/DayCard';
import BudgetTracker from '@/components/BudgetTracker';
import WeatherWidget from '@/components/WeatherWidget';
import PackingList from '@/components/PackingList';
import TransportGuide from '@/components/TransportGuide';
import EmergencyInfo from '@/components/EmergencyInfo';
import TimelineView from '@/components/TimelineView';
import TravelJournal from '@/components/TravelJournal';
import QuickActionsBar from '@/components/QuickActionsBar';
import { itineraryData } from '@/data/itinerary';

export default function Home() {
  const [activeTab, setActiveTab] = useState('itinerary');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-20 lg:pb-8">
      <Header />

      {/* Quick Actions Bar (replaces old tab navigation) */}
      <QuickActionsBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'itinerary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {itineraryData.map((day, dayIndex) => (
              <DayCard key={day.day} {...day} dayIndex={dayIndex} />
            ))}
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="max-w-2xl mx-auto">
            <BudgetTracker />
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="max-w-2xl mx-auto">
            <WeatherWidget />
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-3xl mx-auto">
            <TimelineView />
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="max-w-2xl mx-auto">
            <TravelJournal />
          </div>
        )}

        {activeTab === 'packing' && (
          <div className="max-w-2xl mx-auto">
            <PackingList />
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="max-w-3xl mx-auto">
            <TransportGuide />
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="max-w-2xl mx-auto">
            <EmergencyInfo />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
