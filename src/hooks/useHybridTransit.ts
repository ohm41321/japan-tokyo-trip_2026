import { useState, useCallback } from 'react';
import { 
  TransitSearchParams, 
  TransitRoute, 
  HybridTransitResult,
  DataSource 
} from '@/types/transit';
import { searchHybridTransit } from '@/services/hybridTransit';

interface UseHybridTransitReturn {
  routes: TransitRoute[];
  loading: boolean;
  error: string | null;
  dataSource: DataSource;
  hasLocalData: boolean;
  usedNavitime: boolean;
  message: string;
  messageTH: string;
  searchRoutes: (params: TransitSearchParams) => Promise<void>;
  clearResults: () => void;
}

/**
 * React Hook สำหรับค้นหาเส้นทางแบบ Hybrid
 * ใช้ข้อมูล local ก่อน ถ้าไม่มีค่อยเรียก NAVITIME API
 */
export function useHybridTransit(): UseHybridTransitReturn {
  const [routes, setRoutes] = useState<TransitRoute[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSource>('local');
  const [hasLocalData, setHasLocalData] = useState(false);
  const [usedNavitime, setUsedNavitime] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTH, setMessageTH] = useState('');

  const searchRoutes = useCallback(async (params: TransitSearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const result: HybridTransitResult = await searchHybridTransit(params);

      setRoutes(result.routes);
      setDataSource(result.source);
      setHasLocalData(result.hasLocalData);
      setUsedNavitime(result.usedNavitime);
      setMessage(result.message || '');
      setMessageTH(result.messageTH || '');

      console.log(`🚆 Transit Source: ${result.source.toUpperCase()}`);
      console.log(`   Routes found: ${result.routes.length}`);
      console.log(`   Used NAVITIME: ${result.usedNavitime}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error searching transit:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setRoutes([]);
    setError(null);
    setDataSource('local');
    setHasLocalData(false);
    setUsedNavitime(false);
    setMessage('');
    setMessageTH('');
  }, []);

  return {
    routes,
    loading,
    error,
    dataSource,
    hasLocalData,
    usedNavitime,
    message,
    messageTH,
    searchRoutes,
    clearResults,
  };
}
