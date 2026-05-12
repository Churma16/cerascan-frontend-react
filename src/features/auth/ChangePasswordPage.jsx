import React, { useState } from 'react';
import AdminMainLayout from '@/layouts/AdminMainLayout.jsx';
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
        <AdminMainLayout>
            <PageWrapper>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
                            Ganti Password
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Ubah password akun Anda untuk menjaga keamanan akses.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Kolom Kiri: Info Keamanan (Biar gak kosong) */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#13141C] border border-[#262833] rounded-3xl p-6">
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                <ShieldCheck className="text-indigo-400 w-5 h-5" /> Keamanan Akun
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Gunakan kombinasi huruf besar, angka, dan simbol untuk password yang
                                lebih kuat. Jangan gunakan password yang sama dengan akun sosial
                                media Anda.
                            </p>
                        </div>
                        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-6">
                            <p className="text-xs text-indigo-300 italic">
                                "Treat your password like your toothbrush. Don't let anybody else
                                use it, and get a new one every six months" — Clifford Stoll,
                                Cybersecurity pioneer"
                            </p>
                        </div>
                    </div>

                    {/* Kolom Kanan: Form (Bikin lebih lebar dikit dari sebelumnya) */}
                    <div className="lg:col-span-2 bg-[#13141C] border border-[#262833] rounded-3xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Password Lama (Full Width) */}
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">
                                        Password Lama
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#0E0F15] border border-zinc-800 rounded-xl py-3 px-4 text-white"
                                    />
                                </div>
                                {/* Password Baru & Konfirmasi (Jejer dua biar padet) */}
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">
                                        Password Baru
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#0E0F15] border border-zinc-800 rounded-xl py-3 px-4 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">
                                        Konfirmasi
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#0E0F15] border border-zinc-800 rounded-xl py-3 px-4 text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="bg-indigo-600 disabled:bg-indigo-600/50 hover:bg-indigo-500 transition-colors px-10 py-3 rounded-xl font-bold text-white flex items-center gap-2"
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
        </AdminMainLayout>
    );
}
