// Offline Manager - Handle data caching and sync
interface CachedData {
  itinerary?: any;
  freeTime?: any;
  budget?: any;
  packing?: any;
  transport?: any;
  journal?: any;
  lastUpdated: number;
}

class OfflineManager {
  private storageKey = 'tokyo-trip-offline-data';
  private syncInterval: NodeJS.Timeout | null = null;

  // Save all critical data to localStorage
  async cacheAllData(): Promise<void> {
    try {
      const data: CachedData = {
        lastUpdated: Date.now(),
      };

      // Collect data from localStorage
      const checklist = localStorage.getItem('tokyo-trip-checklist');
      const budget = localStorage.getItem('tokyo-trip-budget');
      const packing = localStorage.getItem('tokyo-trip-packing');
      const theme = localStorage.getItem('tokyo-trip-theme');
      const favorites = localStorage.getItem('freetime-favorites');
      const journal = localStorage.getItem('tokyo-trip-journal');

      if (checklist) data.itinerary = JSON.parse(checklist);
      if (budget) data.budget = JSON.parse(budget);
      if (packing) data.packing = JSON.parse(packing);
      if (favorites) data.freeTime = JSON.parse(favorites);
      if (journal) data.journal = JSON.parse(journal);

      // Store theme separately
      if (theme) localStorage.setItem('tokyo-trip-offline-theme', theme);

      // Save to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      console.log('[Offline] All data cached successfully');
    } catch (error) {
      console.error('[Offline] Failed to cache data:', error);
    }
  }

  // Load cached data
  loadCachedData(): CachedData | null {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error('[Offline] Failed to load cached data:', error);
      return null;
    }
  }

  // Check if we have cached data
  hasCachedData(): boolean {
    return this.loadCachedData() !== null;
  }

  // Get last update time
  getLastUpdated(): Date | null {
    const data = this.loadCachedData();
    if (!data) return null;
    return new Date(data.lastUpdated);
  }

  // Export all data as JSON file
  exportData(): void {
    const data = this.loadCachedData();
    if (!data) {
      alert('No data to export');
      return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tokyo-trip-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Import data from JSON file
  importData(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          localStorage.setItem(this.storageKey, JSON.stringify(data));

          // Restore individual items
          if (data.itinerary) localStorage.setItem('tokyo-trip-checklist', JSON.stringify(data.itinerary));
          if (data.budget) localStorage.setItem('tokyo-trip-budget', JSON.stringify(data.budget));
          if (data.packing) localStorage.setItem('tokyo-trip-packing', JSON.stringify(data.packing));
          if (data.freeTime) localStorage.setItem('freetime-favorites', JSON.stringify(data.freeTime));

          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  // Auto-save on changes (debounced)
  startAutoSave(): void {
    if (this.syncInterval) return;

    // Save every 30 seconds
    this.syncInterval = setInterval(() => {
      this.cacheAllData();
    }, 30000);

    // Also save on page unload
    window.addEventListener('beforeunload', () => {
      this.cacheAllData();
    });

    console.log('[Offline] Auto-save started');
  }

  // Stop auto-save
  stopAutoSave(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('[Offline] Auto-save stopped');
    }
  }

  // Clear all cached data
  clearCache(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('tokyo-trip-checklist');
    localStorage.removeItem('tokyo-trip-budget');
    localStorage.removeItem('tokyo-trip-packing');
    localStorage.removeItem('freetime-favorites');
    localStorage.removeItem('tokyo-trip-journal');
    console.log('[Offline] Cache cleared');
  }

  // Get storage usage
  getStorageUsage(): { used: string; total: string; percentage: number } {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    const usedMB = (total / 1024 / 1024).toFixed(2);
    const limitMB = '5'; // Typical localStorage limit is 5MB
    const percentage = (total / (5 * 1024 * 1024)) * 100;

    return {
      used: `${usedMB} MB`,
      total: `${limitMB} MB`,
      percentage: Math.min(percentage, 100),
    };
  }
}

// Export singleton instance
export const offlineManager = new OfflineManager();
