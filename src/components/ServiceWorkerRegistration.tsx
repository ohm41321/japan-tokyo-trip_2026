"use client";

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Registered successfully, scope:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                console.log('[SW] New worker state:', newWorker.state);
                
                if (newWorker.state === 'activated') {
                  console.log('[SW] Ready to work offline');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('[SW] Registration failed:', error);
        });
    }
  }, []);

  return null; // This component doesn't render anything
}
