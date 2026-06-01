import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useForgotPassword, useVerifyOtp, useResetPassword } from '@/hooks/useAuth.js';

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');

    // Form State
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId, setUserId] = useState(null);

    // Hooks
    const forgotPasswordMutation = useForgotPassword();
    const verifyOtpMutation = useVerifyOtp();
    const resetPasswordMutation = useResetPassword();

    // 1. Request OTP
    const handleRequestOTP = (e) => {
        e.preventDefault();
        setErrorMsg('');

        forgotPasswordMutation.mutate(
            { email },
            {
                onSuccess: () => {
                    setStep(2);
                },
                onError: (error) => {
                    setErrorMsg(error.response?.data?.message || 'Gagal mengirim email OTP.');
                },
            }
        );
    };

    // 2. Verify OTP
    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (otp.length !== 6) return;
        setErrorMsg('');

        verifyOtpMutation.mutate(
            { email, otp },
            {
                onSuccess: (response) => {
                    setUserId(response.data?.user_id);
                    setStep(3);
                },
                onError: (error) => {
                    setErrorMsg(error.response?.data?.message || 'Kode OTP salah atau sudah kedaluwarsa');
                },
            }
        );
    };

    // 3. Reset Password
    const handleResetPassword = (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (newPassword !== confirmPassword) {
            setErrorMsg('Password tidak cocok!');
            return;
        }

        if (!userId) {
            setErrorMsg('Terjadi kesalahan sistem (ID Pengguna hilang). Ulangi proses.');
            return;
        }

        resetPasswordMutation.mutate(
            { id: userId, new_password: newPassword },
            {
                onSuccess: () => {
                    setStep(4);
                },
                onError: (error) => {
                    setErrorMsg(error.response?.data?.message || 'Gagal mereset password.');
                },
            }
        );
    };

    const isLoading =
        forgotPasswordMutation.isPending || verifyOtpMutation.isPending || resetPasswordMutation.isPending;

    return (
        <div className="min-h-screen bg-[#faf8f5] font-sans flex flex-col justify-center items-center relative overflow-hidden text-gray-800 selection:bg-[#FF645A]/30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-[#10B981]/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="z-10 w-full max-w-md px-6">
                <div className="flex flex-col items-center mb-8 relative">
                    {step > 1 && step < 4 && (
                        <button
                            onClick={() => {
                                setStep(step - 1);
                                setErrorMsg('');
                            }}
                            className="absolute left-0 top-1 text-gray-400 hover:text-[#FF645A] transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    )}

                    <div className="flex items-center gap-1.5 text-[#FF645A] mb-8">
                        <div className="flex flex-col gap-0.5 mt-0.5">
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#FF645A] rounded-full"></div>
                        </div>
                        <span className="font-extrabold text-3xl tracking-tighter">CeraScan</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#042B1F] mb-3 tracking-tight text-center">
                        {step === 1 && 'Lupa Sandi?'}
                        {step === 2 && 'Verifikasi OTP'}
                        {step === 3 && 'Sandi Baru'}
                        {step === 4 && 'Berhasil'}
                    </h1>
                    <p className="text-sm font-medium text-gray-500 text-center max-w-[280px]">
                        {step === 1 && 'Masukkan email Anda untuk menerima 6 digit kode pemulihan.'}
                        {step === 2 && `Masukkan kode yang kami kirimkan ke ${email}`}
                        {step === 3 && 'Buat kata sandi baru yang kuat dan aman.'}
                        {step === 4 && 'Kata sandi Anda telah berhasil diperbarui.'}
                    </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                    {errorMsg && (
                        <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center border border-red-100 animate-in fade-in">
                            {errorMsg}
                        </div>
                    )}

                    {/* STEP 1: Input Email */}
                    {step === 1 && (
                        <form onSubmit={handleRequestOTP} className="animate-in fade-in slide-in-from-right-4">
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
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className="w-full py-4 bg-[#042B1F] hover:bg-[#031d15] disabled:bg-[#042B1F]/50 text-white font-bold rounded-xl shadow-lg shadow-[#042B1F]/20 transition-all flex justify-center items-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    'Kirim Kode OTP'
                                )}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: Verifikasi OTP */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="animate-in fade-in slide-in-from-right-4">
                            <div className="mb-8">
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="000000"
                                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-4 px-4 text-center text-3xl tracking-[0.5em] text-[#042B1F] font-black focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300 placeholder:tracking-normal"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || otp.length < 6}
                                className="w-full py-4 bg-[#042B1F] hover:bg-[#031d15] disabled:bg-[#042B1F]/50 text-white font-bold rounded-xl shadow-lg shadow-[#042B1F]/20 transition-all flex justify-center items-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    'Verifikasi Kode'
                                )}
                            </button>
                        </form>
                    )}

                    {/* STEP 3: Password Baru */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="animate-in fade-in slide-in-from-right-4">
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5">
                                        Sandi Baru
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Minimal 8 karakter"
                                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>
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
                                            placeholder="Ketik ulang sandi baru"
                                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#042B1F] font-bold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || !newPassword || !confirmPassword}
                                className="w-full py-4 bg-[#FF645A] hover:bg-[#e0564e] disabled:bg-[#FF645A]/50 text-white font-bold rounded-xl shadow-lg shadow-[#FF645A]/20 transition-all flex justify-center items-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    'Simpan Sandi Baru'
                                )}
                            </button>
                        </form>
                    )}

                    {/* STEP 4: Sukses */}
                    {step === 4 && (
                        <div className="text-center animate-in zoom-in-95">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 mb-6">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-4 bg-[#042B1F] hover:bg-[#031d15] text-white font-bold rounded-xl shadow-lg shadow-[#042B1F]/20 transition-all flex justify-center items-center gap-2"
                            >
                                Kembali ke Login
                            </button>
                        </div>
                    )}
                </div>

                {/* Tautan Kembali */}
                {step < 4 && (
                    <div className="mt-8 text-center">
                        <Link
                            to="/login"
                            className="text-xs font-bold text-[#10B981] hover:text-[#0d9668] transition-colors"
                        >
                            Kembali ke Halaman Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
