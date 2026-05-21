import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import axiosClient from '@/api/axios.js';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [status, setStatus] = useState(token ? 'loading' : 'error');
    const [statusMessage, setStatusMessage] = useState(
        token ? 'Memverifikasi akun Anda...' : 'Token verifikasi tidak ditemukan atau tidak valid.'
    );

    useEffect(() => {
        if (!token) return;

        // Gunakan isMounted untuk menghindari pembaruan state pada komponen yang sudah di-unmount
        let isMounted = true;

        const processVerification = async () => {
            try {
                const response = await axiosClient.get(`/auth/verify-email?token=${token}`);

                if (isMounted) {
                    setStatus('success');
                    setStatusMessage(
                        response.data?.meta?.message || response.data?.message || 'Email berhasil diverifikasi!'
                    );
                    const timer = setTimeout(() => navigate('/login'), 4000);
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                if (!isMounted) return;

                const errorMsg = error.response?.data?.message || error.response?.data?.meta?.message || '';

                // LOGIKA IDEMPOTENSI:
                // Jika error dari backend adalah karena email sudah terverifikasi (akibat double trigger),
                // ubah statusnya menjadi SUKSES.
                if (errorMsg.toLowerCase().includes('sudah diverifikasi')) {
                    setStatus('success');
                    setStatusMessage('Email sudah terverifikasi! Anda akan dialihkan ke halaman masuk.');
                    const timer = setTimeout(() => navigate('/login'), 4000);
                    return () => clearTimeout(timer);
                }

                // Jika error sungguhan (token expired, token acak, dll)
                setStatus('error');
                setStatusMessage(errorMsg || 'Tautan verifikasi telah kedaluwarsa atau tidak valid.');
            }
        };

        processVerification();

        // Cleanup function standar React
        return () => {
            isMounted = false;
        };
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-[#faf8f5] font-sans flex flex-col justify-center items-center relative overflow-hidden text-gray-800 selection:bg-[#FF645A]/30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#10B981]/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="z-10 w-full max-w-md px-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-1.5 text-[#FF645A] mb-4">
                        <div className="flex flex-col gap-0.5 mt-0.5">
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                        </div>
                        <span className="font-extrabold text-3xl tracking-tighter">CeraScan</span>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center">
                    {status === 'loading' && (
                        <div className="flex flex-col items-center py-6">
                            <Loader2 className="w-16 h-16 text-[#10B981] animate-spin mb-6" />
                            <h1 className="text-2xl font-black text-[#042B1F] mb-3 tracking-tight">
                                Proses Verifikasi
                            </h1>
                            <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed">
                                Mohon tunggu sebentar, kami sedang mengaktifkan akun Anda di sistem.
                            </p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center py-6 animate-fadeIn">
                            <CheckCircle2 className="w-16 h-16 text-[#10B981] mb-6" />
                            <h1 className="text-2xl font-black text-[#042B1F] mb-3 tracking-tight">
                                Verifikasi Berhasil!
                            </h1>
                            <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed mb-8">
                                {statusMessage}
                            </p>
                            <Link
                                to="/login"
                                className="w-full py-4 bg-[#042B1F] hover:bg-[#031d15] text-white font-bold rounded-xl shadow-lg shadow-[#042B1F]/20 transition-all flex justify-center items-center gap-2"
                            >
                                Masuk Sekarang <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col items-center py-6 animate-fadeIn">
                            <XCircle className="w-16 h-16 text-[#FF645A] mb-6" />
                            <h1 className="text-2xl font-black text-[#042B1F] mb-3 tracking-tight">Verifikasi Gagal</h1>
                            <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed mb-8">
                                {statusMessage}
                            </p>
                            <div className="w-full space-y-3">
                                <Link
                                    to="/register"
                                    className="block w-full py-4 bg-[#042B1F] hover:bg-[#031d15] text-white font-bold rounded-xl shadow-lg transition-all"
                                >
                                    Daftar Ulang
                                </Link>
                                <Link
                                    to="/login"
                                    className="block w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
