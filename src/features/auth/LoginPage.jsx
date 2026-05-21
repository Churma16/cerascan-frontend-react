import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useLogin } from '@/hooks/useAuth.js';
import { Mail, Lock } from 'lucide-react';

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
                onSuccess: (data) => {
                    navigate('/dashboard');
                },
                onError: (error) => {
                    console.error('Login error:', error);
                    const errorMessage = error.response?.data?.message || 'gagal login';
                    alert(errorMessage);
                },
            }
        );
    };
    return (
        <div className="min-h-screen bg-[#faf8f5] font-sans flex flex-col justify-center items-center relative overflow-hidden text-gray-800 selection:bg-[#FF645A]/30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#10B981]/5 blur-[150px] rounded-full pointer-events-none"></div>

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
                    <h1 className="text-3xl font-black text-[#042B1F] mb-3 tracking-tight">
                        Selamat Datang
                    </h1>
                    <p className="text-sm font-medium text-gray-500 text-center">
                        Masukkan kredensial Anda untuk mengakses dashboard admin.
                    </p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                >
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
                                <a
                                    href="#"
                                    className="text-xs font-bold text-[#10B981] hover:text-[#0d9668] transition-colors"
                                >
                                    Lupa Sandi?
                                </a>
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

                    <div className="mt-8 text-center">
                        <p className="text-xs font-medium text-gray-400">
                            Belum punya akun?{' '}
                            <a
                                href="#"
                                className="font-bold text-[#FF645A] hover:text-[#e0564e] transition-colors"
                            >
                                Daftar sekarang
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
