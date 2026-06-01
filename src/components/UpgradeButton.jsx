import { useState } from 'react';
import { Bot, Crown, Infinity as InfinityIcon } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx';
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { usePaymentTransaction } from '@/hooks/usePayment.js';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/hooks/useAuth.js';
import { toRupiah } from '@/utils/helper.js';
import { useAdjustedPrice, usePlans } from '@/hooks/usePlan.js';

export default function UpgradeButton({ userId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(2);
    const { data: plans = [], isLoading: plansLoading, isError: plansError } = usePlans();
    const { mutate, isPending } = usePaymentTransaction();
    const { data: currentUser } = useCurrentUser();
    const selectedPlan =
        plans.find((plan) => plan.id === selectedPlanId) || plans.find((plan) => plan.id === 2) || null;

    const { data: adjustedPriceData } = useAdjustedPrice(selectedPlanId);
    const handleConfirmUpgrade = (e) => {
        e.preventDefault();

        if (!selectedPlanId) {
            toast.error('Silakan pilih plan terlebih dahulu.');
            return;
        }

        mutate(
            { userId, planId: selectedPlanId },
            {
                onSuccess: (data) => {
                    if (data && data.token) {
                        const snap = window?.snap;

                        if (!snap || typeof snap.pay !== 'function') {
                            toast.error('Modul pembayaran belum siap. Silakan coba lagi beberapa saat.');
                            return;
                        }

                        setIsOpen(false);

                        snap.pay(data.token, {
                            onSuccess: function (result) {
                                toast.success(result.message, 'Pembayaran sukses! Akun Anda kini Premium.');
                                console.log(result);
                            },
                            onError: function (result) {
                                toast.error(result.message, 'Pembayaran gagal! Silakan coba lagi.');
                                console.log(result);
                            },
                        });
                    }
                },
                onError: (error) => {
                    console.error('Error memproses pembayaran:', error);
                    alert('Gagal memuat modul pembayaran. Silakan coba lagi.');
                },
            }
        );
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <button className="group flex items-center gap-3 w-full px-5 py-3.5 rounded-lg text-white text-left font-medium bg-[#133F3C] hover:bg-[#1A504C] transition-colors duration-200 shadow-sm">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Crown className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="flex flex-col grow">
                        <span className="text-base">Upgrade Paket</span>
                        <span className="text-sm opacity-80">Sesuaikan kapasitas scan</span>
                    </div>
                </button>
            </AlertDialogTrigger>

            {/* Perbaikan pada Container Modal: padding lebih kecil (p-6), batasan max-width (max-w-md), dan overflow */}
            <AlertDialogContent className="bg-white border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
                <AlertDialogHeader className="flex flex-col items-center text-center space-y-0 gap-3">
                    <div className="bg-[#133F3C]/10 p-3.5 rounded-full">
                        <Crown className="w-10 h-10 text-teal-800" />
                    </div>
                    {/* Ukuran font judul diperkecil */}
                    <AlertDialogTitle className="text-2xl font-bold text-gray-900">
                        Upgrade Paket CeraScan
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-gray-600">
                        Pilih paket yang sesuai dengan kebutuhan Anda untuk menikmati fitur yang lebih maksimal.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">Pilihan Paket</span>
                        {plansLoading ? <span className="text-xs text-gray-500">Memuat...</span> : null}
                    </div>

                    {plansError ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            Gagal memuat daftar paket. Silakan coba lagi.
                        </div>
                    ) : null}

                    <div className="grid gap-3 md:grid-cols-3">
                        {plans.map((plan) => {
                            const isSelected = plan.id === selectedPlanId;
                            const isCurrentPlan = currentUser?.plan_id === plan.id;

                            return (
                                <button
                                    key={plan.id}
                                    type="button"
                                    onClick={() => setSelectedPlanId(plan.id)}
                                    disabled={isCurrentPlan}
                                    className={`relative rounded-xl border p-4 text-left transition-all h-full ${
                                        isSelected
                                            ? 'border-[#133F3C] bg-[#133F3C]/5 shadow-sm ring-1 ring-[#133F3C]/20'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                    }`}
                                >
                                    {isCurrentPlan && (
                                        <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                                            Aktif
                                        </div>
                                    )}

                                    <div className="flex h-full flex-col gap-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="font-semibold text-gray-900 capitalize">
                                                    {plan.name}
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500">
                                                    Kuota {plan.scan_quota} scan
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-teal-800">{toRupiah(plan.price)}</div>
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            {plan.duration_days > 0
                                                ? `${plan.duration_days} hari akses`
                                                : 'Akses selamanya'}
                                        </div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                {plan.id === 2 ? 'Rekomendasi' : 'Pilihan'}
                                            </span>
                                            <span
                                                className={`text-xs font-semibold ${
                                                    isSelected ? 'text-[#133F3C]' : 'text-gray-400'
                                                }`}
                                            >
                                                {isSelected ? 'Terpilih' : 'Pilih'}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {selectedPlan ? (
                        <div className="rounded-xl border border-teal-100 bg-teal-50 p-3 text-sm text-teal-900">
                            Paket terpilih: <span className="font-semibold capitalize">{selectedPlan.name}</span>
                        </div>
                    ) : null}
                </div>

                {/* Margin dan padding pada kotak detail diperkecil */}
                <div className="space-y-4 my-5 text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <InfinityIcon className="w-6 h-6 text-teal-700 shrink-0" />
                        <div>
                            <span className="font-semibold block text-left text-sm">Fleksibilitas Kuota</span>
                            <span className="text-xs text-gray-500 block text-left">
                                Sesuaikan jumlah pemindaian harian dengan kebutuhan Anda.
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Bot className="w-6 h-6 text-teal-700 shrink-0" />
                        <div>
                            <span className="font-semibold block text-left text-sm">Proses AI Lebih Responsif</span>
                            <span className="text-xs text-gray-500 block text-left">
                                Spesifikasi server memadai memastikan hasil analisis keluar lebih cepat.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Ukuran font harga dan margin diperkecil */}
                <div className="flex flex-col items-center gap-1 mb-6 text-center">
                    <span className="text-xs text-gray-500">
                        {selectedPlan?.duration_days > 0
                            ? `Masa aktif untuk ${selectedPlan.duration_days} hari`
                            : 'Masa aktif untuk selamanya (tanpa batas waktu)'}
                    </span>
                    <span className="text-4xl font-extrabold text-teal-800">
                        {toRupiah(adjustedPriceData?.final_price || 0)}
                    </span>
                </div>

                {/* Tombol aksi lebih ringkas */}
                <AlertDialogFooter className="flex sm:justify-center gap-3 mt-0">
                    <AlertDialogCancel className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors font-semibold px-6 py-2.5 rounded-xl w-full sm:w-auto mt-0 text-sm drop-shadow-sm">
                        Mungkin Nanti
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleConfirmUpgrade}
                        disabled={isPending}
                        className="bg-[#133F3C] border-none text-white hover:bg-[#1A504C] transition-all px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-teal-900/20 w-full sm:w-auto disabled:opacity-70 flex justify-center items-center m-0 text-sm"
                    >
                        {isPending ? 'Memproses...' : 'Lanjutkan Pembayaran'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
