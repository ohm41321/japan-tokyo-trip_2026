"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { useChecklist } from "@/hooks/useChecklist";
import Header from "@/components/Header";
import DayCard from "@/components/DayCard";
import Footer from "@/components/Footer";
import { itineraryData } from "@/data/itinerary";

function HomeContent() {
  const { mounted } = useChecklist();

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Header />

      <section className="container mx-auto px-4 py-8 sm:py-12">
        {mounted && (
          <div className="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {itineraryData.map((day, index) => (
              <DayCard key={day.day} {...day} dayIndex={index} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
