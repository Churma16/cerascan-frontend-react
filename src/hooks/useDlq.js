import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/axios.js';

export const useDlqMessages = () => {
    return useQuery({
        queryKey: ['dlqMessages'],
        queryFn: async () => {
            const response = await axiosClient.get('dlq');
            return response.data.data || [];
        },
    });
};

export const useRetryDlqMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const response = await axiosClient.post('dlq/retry', { id });
            return response.data;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['dlqMessages'] });

            const previousMessages = queryClient.getQueryData(['dlqMessages']);

            queryClient.setQueryData(['dlqMessages'], (old) => {
                return old ? old.filter((m) => m.id !== id) : [];
            });

            return { previousMessages };
        },
        onError: (err, id, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(['dlqMessages'], context.previousMessages);
            }
        },
    });
};

export const useRetryAllDlqMessages = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await axiosClient.post('dlq/retry-all');
            return response.data;
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['dlqMessages'] });
            const previousMessages = queryClient.getQueryData(['dlqMessages']);

            queryClient.setQueryData(['dlqMessages'], []);

            return { previousMessages };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(['dlqMessages'], context.previousMessages);
            }
        },
    });
};

export const usePurgeDlq = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await axiosClient.delete('dlq/purge');
            return response.data;
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['dlqMessages'] });
            const previousMessages = queryClient.getQueryData(['dlqMessages']);
            queryClient.setQueryData(['dlqMessages'], []);
            return { previousMessages };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(['dlqMessages'], context.previousMessages);
            }
        },
    });
};
