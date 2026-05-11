import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LayoutGrid, Lock, Mail } from 'lucide-react';
import { useLogin } from '@/hooks/useLogin.js';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: login, isPending: isLoading } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();
        // Panggil hook login dengan credentials
        login(
            { email, password },
            {
                onSuccess: (data) => {
                    // Token sudah disimpan di hook, langsung navigate
                    navigate('/dashboard');
                },
                onError: (error) => {
                    console.error('Login error:', error);
                    // Tampilkan pesan error dari server jika ada
                    const errorMessage =
                        error.response?.data?.message ||
                        'Login gagal. Periksa email dan password Anda.';
                    alert(errorMessage);
                },
            }
        );
    };
    return (
        <div className="min-h-screen bg-[#090A0F] font-sans flex flex-col justify-center items-center relative overflow-hidden text-zinc-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="z-10 w-full max-w-md px-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-[#1A1C26] border border-[#262833] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10">
                        <LayoutGrid className="w-6 h-6 text-indigo-500" />
                        {/*<LayoutGrid className="w-8 h-8 text-indigo-500"/>*/}
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Masuk ke Dashboard</h1>
                    <p className="text-sm text-zinc-400">
                        Masukkan kredensial Anda untuk mengakses CeraScan AI.
                    </p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="bg-[#0E0F15] border border-[#262833] rounded-3xl p-8 shadow-2xl"
                >
                    <div className="space-y-5 mb-8">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@cerascan.ai"
                                    className="w-full bg-[#13141C] border border-[#262833] rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                    Kata Sandi
                                </label>
                                <a
                                    href="#"
                                    className="text-xs text-indigo-400 hover:text-indigo-300"
                                >
                                    Lupa Sandi?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#13141C] border border-[#262833] rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Masuk Sistem'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
