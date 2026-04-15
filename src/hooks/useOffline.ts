"use client";

import { useEffect, useState } from 'react';

interface UseOfflineHook {
  isOnline: boolean;
  isServiceWorkerReady: boolean;
  lastSync: Date | null;
}

export function useOffline(): UseOfflineHook {
  const [isOnline, setIsOnline] = useState(true);
  const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Registered successfully');
          setIsServiceWorkerReady(true);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  console.log('[SW] New version activated');
                  setLastSync(new Date());
                }
              });
            }
          });

          // Force update check
          registration.update();
        })
        .catch((error) => {
          console.log('[SW] Registration failed:', error);
        });
    }

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, isServiceWorkerReady, lastSync };
}
