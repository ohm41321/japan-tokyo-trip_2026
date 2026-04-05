"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DayCard from '@/components/DayCard';
import WeatherWidget from '@/components/WeatherWidget';
import PackingList from '@/components/PackingList';
import TransportGuide from '@/components/TransportGuide';
import EmergencyInfo from '@/components/EmergencyInfo';
import TravelJournal from '@/components/TravelJournal';
import PhraseBook from '@/components/PhraseBook';
import BudgetCombined from '@/components/BudgetCombined';
import YenConverter from '@/components/YenConverter';
import NearbyStore from '@/components/NearbyStore';
import SOSButton from '@/components/SOSButton';
import TabContent from '@/components/TabContent';
import QuickActionsBar from '@/components/QuickActionsBar';
import { itineraryData } from '@/data/itinerary';

// Trip start date: April 16, 2026
const TRIP_START = new Date(2026, 3, 16);

function getCurrentDayIndex(): number {
  const now = new Date();
  const diff = Math.floor((now.getTime() - TRIP_START.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return -1; // before trip
  if (diff >= itineraryData.length) return -1; // after trip
  return diff;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const todayIndex = getCurrentDayIndex();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-20 lg:pb-8">
      <Header />

      {/* Quick Actions Bar (replaces old tab navigation) */}
      <QuickActionsBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <TabContent isVisible={activeTab === 'itinerary'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {itineraryData.map((day, dayIndex) => (
              <DayCard key={day.day} {...day} dayIndex={dayIndex} isToday={dayIndex === todayIndex} />
            ))}
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'budget'}>
          <div className="max-w-2xl mx-auto">
            <BudgetCombined />
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'weather'}>
          <div className="max-w-2xl mx-auto">
            <WeatherWidget />
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'yen'}>
          <div className="max-w-2xl mx-auto">
            <YenConverter />
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'phrase'}>
          <div className="max-w-2xl mx-auto">
            <PhraseBook />
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'nearby'}>
          <div className="max-w-2xl mx-auto">
            <NearbyStore />
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'journal'}>
          <div className="max-w-2xl mx-auto">
            <TravelJournal />
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'packing'}>
          <div className="max-w-2xl mx-auto">
            <PackingList />
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'transport'}>
          <div className="max-w-3xl mx-auto">
            <TransportGuide />
          </div>
        </TabContent>

        <TabContent isVisible={activeTab === 'emergency'}>
          <div className="max-w-2xl mx-auto">
            <EmergencyInfo />
          </div>
        </TabContent>
      </div>

      <Footer />

      {/* SOS Floating Button */}
      <SOSButton />
    </main>
  );
}
