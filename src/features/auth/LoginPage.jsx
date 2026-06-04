import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useLogin } from '@/hooks/useAuth.js';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: login, isPending: isLoading } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();
        login(
            { email, password },
            {
                onSuccess: () => {
                    navigate('/dashboard');
                },
            }
        );
    };

    // Fungsi untuk memicu proses OAuth Google
    const handleGoogleLogin = () => {
        if (import.meta.env.VITE_PROD === 'true') {
            window.location.href = `${import.meta.env.VITE_BACKEND_URL_PROD}/auth/google`;
        } else {
            window.location.href = `${import.meta.env.VITE_BACKEND_URL_DEV}/auth/google`;
        }
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] font-sans flex flex-col justify-center items-center relative overflow-hidden text-gray-800 selection:bg-[#FF645A]/30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-[#10B981]/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="z-10 w-full max-w-md px-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-1.5 text-[#FF645A] mb-8">
                        <div className="flex flex-col gap-0.5 mt-0.5">
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                        </div>
                        <span className="font-extrabold text-3xl tracking-tighter">CeraScan</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#042B1F] mb-3 tracking-tight">Selamat Datang</h1>
                    <p className="text-sm font-medium text-gray-500 text-center">
                        Masukkan kredensial Anda untuk mengakses dashboard admin.
                    </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                    <form onSubmit={handleLogin}>
                        <div className="space-y-6 mb-8">
                            <div>
                                <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5">
                                    Alamat Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@cerascan.ai"
                                        className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2.5">
                                    <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                                        Kata Sandi
                                    </label>
                                    <Link
                                        to={`/forgot-password`}
                                        className="text-xs font-bold text-[#10B981] hover:text-[#0d9668] transition-colors"
                                    >
                                        Lupa Sandi?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#042B1F] hover:bg-[#031d15] disabled:bg-[#042B1F]/50 text-white font-bold rounded-xl shadow-lg shadow-[#042B1F]/20 transition-all flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Masuk Sistem'
                            )}
                        </button>
                    </form>

                    {/* Separator UI */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3  text-[11px] font-extrabold text-gray-300 uppercase tracking-widest">
                                Atau
                            </span>
                        </div>
                    </div>

                    {/* Tombol Login Google */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full py-3.5 bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-600 font-bold rounded-xl transition-all flex justify-center items-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Masuk dengan Google
                    </button>

                    <div className="mt-8 text-center">
                        <p className="text-xs font-medium text-gray-400">
                            Belum punya akun?{' '}
                            <Link
                                to="/register"
                                className="font-bold text-[#FF645A] hover:text-[#e0564e] transition-colors"
                            >
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
