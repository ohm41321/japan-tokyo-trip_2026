"use client";

import { useState, useEffect } from 'react';

export interface DayWeather {
  dayIndex: number;
  date: string;
  location: string;
  condition: 'sunny' | 'partly-cloudy' | 'cloudy' | 'rain' | 'heavy-rain' | 'snow';
  highTemp: number;
  lowTemp: number;
  humidity: number;
  rainChance: number;
  windSpeed: number;
  clothing: string[];
  tips: string[];
}

// Tokyo coordinates
const TOKYO_LAT = 35.6762;
const TOKYO_LON = 139.6503;

// Location names for each day
const dayLocations = [
  'Tokyo',
  'Gala Yuzawa (Niigata)',
  'Kamakura',
  'Kawagoe / Shibuya',
  'Mt. Fuji Area',
  'Tokyo Old Town',
  'Tokyo (Departure)',
];

// Convert WMO weather code to our condition
function wmoToCondition(code: number): DayWeather['condition'] {
  if (code === 0) return 'sunny';
  if (code === 1) return 'partly-cloudy';
  if (code === 2 || code === 3) return 'cloudy';
  if (code >= 45 && code <= 48) return 'cloudy';
  if (code >= 51 && code <= 67) return 'rain';
  if (code >= 80 && code <= 82) return 'rain';
  if (code >= 95) return 'heavy-rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 85 && code <= 86) return 'snow';
  return 'partly-cloudy';
}

// Generate clothing recommendations
function getClothing(weather: DayWeather): string[] {
  const items: string[] = [];

  if (weather.highTemp < 10) {
    items.push('Heavy winter coat (very cold!)');
    items.push('Thermal underwear + warm layers');
    items.push('Gloves, scarf, warm hat');
  } else if (weather.highTemp < 15) {
    items.push('Warm jacket or coat');
    items.push('Layered clothing (sweater + shirt)');
    items.push('Comfortable closed shoes');
  } else if (weather.highTemp < 20) {
    items.push('Light jacket or cardigan');
    items.push('Long sleeve shirt or thin sweater');
  } else {
    items.push('Light clothing (t-shirt OK)');
    items.push('Sunglasses');
  }

  if (weather.rainChance >= 60) {
    items.push('☂️ Umbrella or raincoat ESSENTIAL');
    items.push('Waterproof shoes if possible');
  } else if (weather.rainChance >= 40) {
    items.push('☂️ Compact umbrella recommended');
  }

  if (weather.windSpeed > 25) {
    items.push('Windbreaker or secure hat');
  }

  items.push('👟 Comfortable walking shoes');
  items.push('🧦 Extra socks (temples require shoe removal)');

  return [...new Set(items)];
}

// Generate tips
function getTips(weather: DayWeather): string[] {
  const tips: string[] = [];

  if (weather.rainChance >= 70) {
    tips.push('⚠️ High rain chance - consider indoor backup plans');
    tips.push('🏬 Museums, shopping malls, underground areas good alternatives');
    tips.push('🚃 Train travel fine, outdoor walking challenging');
  } else if (weather.rainChance >= 50) {
    tips.push('🌧️ Rain likely - bring umbrella');
    tips.push('🌅 Morning may be drier than afternoon');
  }

  if (weather.condition === 'sunny') {
    tips.push('☀️ Great day for outdoor activities!');
    tips.push('📸 Best photo opportunities with clear skies');
    tips.push('🧴 Use sunscreen even in April');
  }

  if (weather.condition === 'partly-cloudy') {
    tips.push('⛅ Good balance for mixed indoor/outdoor activities');
  }

  if (weather.windSpeed > 25) {
    tips.push('💨 Strong winds - secure hats and light items');
  }

  if (weather.lowTemp < 10) {
    tips.push('🌙 Cold morning/evening - dress in layers');
  }

  if (weather.humidity > 75) {
    tips.push('💧 High humidity - may feel warmer than actual temp');
  }

  return tips;
}

export function useWeather() {
  const [weatherData, setWeatherData] = useState<DayWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        // Get today's date and 6 days ahead
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 6);

        const formatDate = (d: Date) => d.toISOString().split('T')[0];
        const startStr = formatDate(today);
        const endStr = formatDate(endDate);

        // Fetch from Open-Meteo API (FREE, NO API KEY!)
        const url =
          `https://api.open-meteo.com/v1/forecast?` +
          `latitude=${TOKYO_LAT}&longitude=${TOKYO_LON}` +
          `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max,relative_humidity_2m_max` +
          `&start_date=${startStr}&end_date=${endStr}` +
          `&timezone=Asia%2FTokyo`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        const daily = data.daily;

        // Transform to our format
        const weatherArray: DayWeather[] = [];

        for (let i = 0; i < 7; i++) {
          const date = new Date(daily.time[i]);
          const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

          const weather: DayWeather = {
            dayIndex: i,
            date: dateStr,
            location: dayLocations[i],
            condition: wmoToCondition(daily.weathercode[i] ?? 3),
            highTemp: Math.round(daily.temperature_2m_max[i] ?? 18),
            lowTemp: Math.round(daily.temperature_2m_min[i] ?? 10),
            humidity: daily.relative_humidity_2m_max[i] ?? 60,
            rainChance: daily.precipitation_probability_max[i] ?? 0,
            windSpeed: Math.round(daily.windspeed_10m_max[i] ?? 10),
            clothing: [],
            tips: [],
          };

          weather.clothing = getClothing(weather);
          weather.tips = getTips(weather);

          weatherArray.push(weather);
        }

        if (isMounted) {
          setWeatherData(weatherArray);
          setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Weather fetch failed:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch weather');
          setLoading(false);
          // Use fallback data
          setWeatherData(getFallbackWeather());
        }
      }
    }

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  const getDayWeather = (dayIndex: number) => {
    return weatherData.find((d) => d.dayIndex === dayIndex);
  };

  const isRainyDay = (dayIndex: number): boolean => {
    const day = getDayWeather(dayIndex);
    return day ? day.rainChance > 50 : false;
  };

  const getClothingRecommendations = (dayIndex: number): string[] => {
    const day = getDayWeather(dayIndex);
    return day?.clothing || [];
  };

  return {
    weatherData,
    loading,
    error,
    lastUpdated,
    getDayWeather,
    isRainyDay,
    getClothingRecommendations,
  };
}

// Fallback data if API fails
function getFallbackWeather(): DayWeather[] {
  const baseWeather: Omit<DayWeather, 'clothing' | 'tips'>[] = [
    { dayIndex: 0, date: 'Today', location: dayLocations[0], condition: 'partly-cloudy', highTemp: 20, lowTemp: 12, humidity: 55, rainChance: 30, windSpeed: 12 },
    { dayIndex: 1, date: 'Tomorrow', location: dayLocations[1], condition: 'cloudy', highTemp: 16, lowTemp: 10, humidity: 70, rainChance: 60, windSpeed: 15 },
    { dayIndex: 2, date: 'Day 3', location: dayLocations[2], condition: 'partly-cloudy', highTemp: 19, lowTemp: 12, humidity: 60, rainChance: 40, windSpeed: 10 },
    { dayIndex: 3, date: 'Day 4', location: dayLocations[3], condition: 'sunny', highTemp: 21, lowTemp: 13, humidity: 45, rainChance: 10, windSpeed: 8 },
    { dayIndex: 4, date: 'Day 5', location: dayLocations[4], condition: 'cloudy', highTemp: 17, lowTemp: 11, humidity: 75, rainChance: 70, windSpeed: 18 },
    { dayIndex: 5, date: 'Day 6', location: dayLocations[5], condition: 'partly-cloudy', highTemp: 20, lowTemp: 12, humidity: 58, rainChance: 35, windSpeed: 11 },
    { dayIndex: 6, date: 'Day 7', location: dayLocations[6], condition: 'sunny', highTemp: 22, lowTemp: 13, humidity: 50, rainChance: 15, windSpeed: 9 },
  ];

  return baseWeather.map((w) => {
    const fullWeather: DayWeather = {
      ...w,
      clothing: [],
      tips: [],
    };
    fullWeather.clothing = getClothing(fullWeather);
    fullWeather.tips = getTips(fullWeather);
    return fullWeather;
  });
}
