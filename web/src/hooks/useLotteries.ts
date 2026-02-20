import { useState, useCallback, useEffect } from 'react';
import type { Lottery } from '../types';
import { getAllLotteries } from '../services/LotteryService';

export default function useLotteries() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLotteries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllLotteries();
      setLotteries(data);
    } catch (error) {
      console.error('Failed to fetch lotteries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLotteries();
  }, [fetchLotteries]);

  return { lotteries, loading, refreshLotteries: fetchLotteries, setLotteries };
}
