import { useMemo } from 'react';
import { Prediction, CombinedResult } from '@/types';

export const usePredictionAnalysis = (predictions: Prediction[]) => {
  const latestPrediction = useMemo(() => {
    return predictions.length > 0 ? predictions[predictions.length - 1] : null;
  }, [predictions]);

  const lastFivePredictions = useMemo(() => {
    return predictions.slice(-5).reverse();
  }, [predictions]);

  const averagePredictions = useMemo(() => {
    if (predictions.length === 0) return [];
    
    const lastFive = predictions.slice(-5);
    const classConfidences: Record<string, number[]> = {};
    
    // Group confidences by class
    lastFive.forEach(prediction => {
      if (!classConfidences[prediction.class]) {
        classConfidences[prediction.class] = [];
      }
      classConfidences[prediction.class].push(prediction.confidence);
    });
    
    // Calculate average confidence for each class
    const averages = Object.entries(classConfidences).map(([className, confidences]) => {
      const avgConfidence = confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;
      return {
        class: className,
        confidence: avgConfidence,
        count: confidences.length,
        timestamp: Date.now()
      };
    });
    
    // Sort by average confidence (highest first)
    return averages.sort((a, b) => b.confidence - a.confidence);
  }, [predictions]);

  const combinedResult = useMemo((): CombinedResult | null => {
    if (predictions.length === 0) return null;

    const lastFive = predictions.slice(-5);
    
    // Count occurrences of each class
    const classCount: Record<string, number> = {};
    let totalConfidence = 0;

    lastFive.forEach(prediction => {
      classCount[prediction.class] = (classCount[prediction.class] || 0) + 1;
      totalConfidence += prediction.confidence;
    });

    // Find majority class
    const majorityClass = Object.entries(classCount).reduce((a, b) => 
      classCount[a[0]] > classCount[b[0]] ? a : b
    )[0];

    const averageConfidence = totalConfidence / lastFive.length;

    return {
      majorityClass,
      averageConfidence,
    };
  }, [predictions]);

  const chartData = useMemo(() => {
    return predictions.slice(-20).map((prediction, index) => ({
      x: index,
      y: prediction.confidence * 100, // Convert to percentage
      class: prediction.class,
      timestamp: prediction.timestamp,
    }));
  }, [predictions]);

  return {
    latestPrediction,
    lastFivePredictions,
    averagePredictions,
    combinedResult,
    chartData,
  };
};