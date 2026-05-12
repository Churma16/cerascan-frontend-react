import axiosClient from '@/api/axios.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const fetchCurrentUser = async () => {
    const response = await axiosClient.get('/users/profile');
    console.log(response.data);
    return response.data.data;
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 60,
    });
};

export const useIsAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && token !== 'undefined' && token !== 'null';
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            // Opsional: Jika backend Anda memiliki endpoint untuk mematikan token (blacklist)
            // await axiosClient.post('/auth/logout');
        } catch (error) {
            console.error('Gagal melakukan logout di sisi server', error);
        } finally {
            localStorage.removeItem('token');

            queryClient.clear();

            navigate('/login', { replace: true });

            // Alternatif hard-reload jika navigate tidak membersihkan state aplikasi sepenuhnya:
            // window.location.href = '/login';
        }
    };

    return logout;
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (payload) => {
            // Kita mapping ke snake_case di sini sesuai kemauan backend tadi
            const response = await axiosClient.post('/auth/change-password', {
                old_password: payload.oldPassword,
                new_password: payload.newPassword,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Berhasil:', data.message);
        },
        onError: (error) => {
            const errMsg = error.response?.data?.meta?.message || 'Gagal ganti password';
            console.error(errMsg);
        },
    });
};
