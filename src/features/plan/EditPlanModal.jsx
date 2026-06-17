import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useEditPlan } from '@/hooks/usePlan.js';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog.jsx';

export default function EditPlanModal({ isOpen, onOpenChange, plan, onSaved }) {
    const editPlanMutation = useEditPlan(plan?.id);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        scan_quota: '',
        duration_days: '',
    });

    useEffect(() => {
        if (plan) {
            setFormData({
                name: plan.name || '',
                price: plan.price !== undefined ? plan.price : '',
                scan_quota: plan.scan_quota !== undefined ? plan.scan_quota : '',
                duration_days: plan.duration_days !== undefined ? plan.duration_days : '',
            });
        }
    }, [plan]);

    const handleSubmit = () => {
        if (!plan || !plan.id) return;
        const payload = {
            name: formData.name,
            price: Number(formData.price),
            scan_quota: Number(formData.scan_quota),
            duration_days: Number(formData.duration_days),
        };
        editPlanMutation.mutate(payload, {
            onSuccess: (data) => {
                onOpenChange(false);
                if (onSaved) onSaved(data);
            },
            onError: (err) => {
                console.error('Edit plan failed', err);
            },
        });
    };

    return (
        <AlertDialog open={!!isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-white border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-0 max-w-lg">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <AlertDialogHeader className="text-left">
                        <AlertDialogTitle className="text-2xl font-black text-[#042B1F]">
                            Edit Paket
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500 font-medium mt-2">
                            Ubah informasi paket berlangganan di bawah ini.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div>
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 block">
                            Nama Paket
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Masukkan nama paket"
                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3 px-4 text-[#042B1F] font-semibold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 block">
                            Harga (Rp)
                        </label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="Masukkan harga"
                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3 px-4 text-[#042B1F] font-semibold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 block">
                            Kuota Scan/Bulan
                        </label>
                        <input
                            type="number"
                            value={formData.scan_quota}
                            onChange={(e) => setFormData({ ...formData, scan_quota: e.target.value })}
                            placeholder="Masukkan kuota scan"
                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3 px-4 text-[#042B1F] font-semibold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 block">
                            Durasi (Hari)
                        </label>
                        <input
                            type="number"
                            value={formData.duration_days}
                            onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                            placeholder="Masukkan durasi hari"
                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3 px-4 text-[#042B1F] font-semibold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                        />
                    </div>
                </div>

                <AlertDialogFooter className="p-8 border-t border-gray-100 flex gap-3">
                    <AlertDialogCancel className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors font-bold px-6 py-2.5 rounded-xl flex-1">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSubmit}
                        disabled={editPlanMutation.isPending}
                        className="bg-[#FF645A] border-none text-white hover:bg-[#e0564e] disabled:bg-[#FF645A]/50 disabled:cursor-not-allowed transition-all px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#FF645A]/20 flex-1 flex items-center justify-center gap-2"
                    >
                        {editPlanMutation.isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Menyimpan...
                            </>
                        ) : (
                            'Simpan Perubahan'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
