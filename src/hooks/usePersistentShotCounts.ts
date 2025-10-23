import { useState, useEffect, useCallback } from 'react';
import { Prediction } from '@/types';

const STORAGE_KEY = 'shotsense-shot-counts';

export const usePersistentShotCounts = (predictions: Prediction[]) => {
  const [persistentCounts, setPersistentCounts] = useState<Record<string, number>>({});

  // Load counts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPersistentCounts(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load shot counts from localStorage:', error);
    }
  }, []);

  // Update counts when new predictions arrive
  useEffect(() => {
    if (predictions.length === 0) return;

    const latestPrediction = predictions[predictions.length - 1];
    if (latestPrediction.class.toLowerCase() === 'idle' || latestPrediction.class.toLowerCase() === 'confidence') return;

    setPersistentCounts(prev => {
      const updated = {
        ...prev,
        [latestPrediction.class]: (prev[latestPrediction.class] || 0) + 1
      };
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save shot counts to localStorage:', error);
      }
      
      return updated;
    });
  }, [predictions]);

  const resetCounts = useCallback(() => {
    setPersistentCounts({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear shot counts from localStorage:', error);
    }
  }, []);

  const totalShots = Object.values(persistentCounts).reduce((sum, count) => sum + count, 0);

  return {
    shotCounts: persistentCounts,
    totalShots,
    resetCounts
  };
};