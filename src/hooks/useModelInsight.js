import axiosClient from '@/api/axios.js';
import { useQuery } from '@tanstack/react-query';

const fetchModelInsightKPI = async () => {
    const response = await axiosClient.get('model-insights/kpi');
    return response.data.data;
};

export const useModelInsightKPI = () => {
    return useQuery({
        queryKey: ['modelInsight', 'kpi'],
        queryFn: fetchModelInsightKPI,
        staleTime: 1000 * 60 * 5,
    });
};

const fetchPredictionDistribution = async () => {
    const response = await axiosClient.get('model-insights/prediction-distribution');
    return response.data.data;
};

export const usePredictionDistribution = () => {
    return useQuery({
        queryKey: ['modelInsight', 'predictionDistribution'],
        queryFn: fetchPredictionDistribution,
        staleTime: 1000 * 60 * 5,
    });
};

const fetchConfidenceDistribution = async () => {
    const response = await axiosClient.get('model-insights/confidence-distribution');
    return response.data.data;
};

export const useConfidenceDistribution = () => {
    return useQuery({
        queryKey: ['modelInsight', 'confidenceDistribution'],
        queryFn: fetchConfidenceDistribution,
        staleTime: 1000 * 60 * 5,
    });
};
