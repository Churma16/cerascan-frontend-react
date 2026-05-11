import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/api/axios.js';

export const useLogin = () => {
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const response = await axiosClient.post('/auth/login', {
                email,
                password,
            });

            const data = response.data;
            const token = data.token || (data.data && data.data.token);

            // Simpan token ke localStorage jika login berhasil
            if (token) {
                localStorage.setItem('token', token);
            }

            return data;
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });
};
