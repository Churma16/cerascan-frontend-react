import { useState } from 'react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { ShieldCheck } from 'lucide-react';
import { useChangePassword } from '@/hooks/useAuth.js';

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const mutation = useChangePassword();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return alert('Password baru tidak cocok!');
        }

        mutation.mutate(
            { oldPassword: currentPassword, newPassword: newPassword },
            {
                onSuccess: () => {
                    alert('Password Berhasil Diubah!');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                },
                onError: (error) => {
                    const errMsg = error.response?.data?.meta?.message || 'Terjadi kesalahan';
                    alert(errMsg);
                },
            }
        );
    };

    return (
        <PageWrapper>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#042B1F] mb-2">
                        Ganti Password
                    </h2>
                    <p className="text-sm font-medium text-gray-500">
                        Ubah password akun Anda untuk menjaga keamanan akses.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                        <h3 className="text-[#042B1F] font-black mb-3 flex items-center gap-2">
                            <ShieldCheck className="text-[#FF645A] w-5 h-5" /> Keamanan Akun
                        </h3>
                        <p className="text-sm font-medium text-gray-500 leading-relaxed">
                            Gunakan kombinasi huruf besar, angka, dan simbol untuk password yang
                            lebih kuat. Jangan gunakan password yang sama dengan akun sosial
                            media Anda.
                        </p>
                    </div>
                    <div className="bg-[#E3EFEA] border border-[#10B981]/10 rounded-xl p-6">
                        <p className="text-xs font-bold text-[#042B1F] italic">
                            "Treat your password like your toothbrush. Don't let anybody else use
                            it, and get a new one every six months" — Clifford Stoll, Cybersecurity
                            pioneer"
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5 block">
                                    Password Lama
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 px-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5 block">
                                    Password Baru
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 px-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5 block">
                                    Konfirmasi
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 px-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="bg-[#042B1F] disabled:bg-[#042B1F]/50 hover:bg-[#031d15] transition-colors px-10 py-3.5 rounded-xl font-bold text-white flex items-center gap-2 shadow-lg shadow-[#042B1F]/20"
                            >
                                {mutation.isPending ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    'Simpan Perubahan'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PageWrapper>
    );
}
