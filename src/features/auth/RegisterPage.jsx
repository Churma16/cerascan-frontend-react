import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';

import { useRegister } from '@/hooks/useAuth.js';
import { toast } from 'react-toastify';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { mutate: register, isPending: isLoading } = useRegister();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Kata sandi dan konfirmasi tidak cocok', { className: 'w-100' });
            return;
        }

        register(
            { full_name: fullName, email, password },
            {
                onSuccess: () => {
                    // Arahkan ke halaman login setelah registrasi sukses
                    navigate('/login');
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] font-sans flex flex-col justify-center items-center relative overflow-hidden text-gray-800 selection:bg-[#FF645A]/30 py-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#10B981]/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="z-10 w-full max-w-md px-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-1.5 text-[#FF645A] mb-6">
                        <div className="flex flex-col gap-0.5 mt-0.5">
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                        </div>
                        <span className="font-extrabold text-3xl tracking-tighter">CeraScan</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#042B1F] mb-3 tracking-tight">Buat Akun</h1>
                    <p className="text-sm font-medium text-gray-500 text-center">
                        Daftar untuk mulai menggunakan sistem deteksi cacat keramik.
                    </p>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                >
                    <div className="space-y-5 mb-8">
                        {/* Input Nama Lengkap */}
                        <div>
                            <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Sulastri Bin Faisal"
                                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        {/* Input Email */}
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

                        {/* Input Kata Sandi */}
                        <div>
                            <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    minLength="6"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        {/* Input Konfirmasi Kata Sandi */}
                        <div>
                            <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5">
                                Konfirmasi Sandi
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                            'Daftar Sekarang'
                        )}
                    </button>

                    <div className="mt-8 text-center">
                        <p className="text-xs font-medium text-gray-400">
                            Sudah punya akun?{' '}
                            <Link
                                to="/login"
                                className="font-bold text-[#FF645A] hover:text-[#e0564e] transition-colors"
                            >
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
