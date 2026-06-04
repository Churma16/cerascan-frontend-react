import { useState } from 'react';
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
import { Zap } from 'lucide-react';
import { capitalizeEachWord, toRupiah } from '@/utils/helper.js';

export function AssignPlanModal({ isOpen, onOpenChange, user, onAssign, availablePlans }) {
    const [selectedPlan, setSelectedPlan] = useState('');

    const handleSubmit = () => {
        if (selectedPlan) {
            onAssign(user.id, selectedPlan);
            setSelectedPlan('');
            onOpenChange(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-white border-gray-100 shadow-2xl rounded-2xl p-0 max-w-md">
                <div className="px-8 pt-8 border-b border-gray-100">
                    <AlertDialogHeader className="text-left">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-[#E3EFEA] flex items-center justify-center">
                                <Zap className="w-5 h-5 text-[#042B1F]" />
                            </div>
                            <AlertDialogTitle className="text-xl font-black text-[#042B1F]">
                                Ubah Paket Langganan
                            </AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-xs font-medium text-gray-500 mt-0.5">
                            {user?.user?.name}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>

                <div className="p-8 space-y-4">
                    <label className="text-sm font-bold text-gray-700 block mb-3">Pilih Paket Baru</label>
                    <div className="space-y-2">
                        {availablePlans.map((plan) => (
                            <label
                                key={plan.id}
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                    selectedPlan === String(plan.id)
                                        ? 'border-[#FF645A] bg-[#FFF2F0]'
                                        : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="plan"
                                    value={plan.id}
                                    checked={selectedPlan === String(plan.id)}
                                    onChange={(e) => setSelectedPlan(e.target.value)}
                                    className="w-4 h-4 text-[#FF645A]"
                                />
                                <div className="flex-1">
                                    <p className="font-bold text-[#042B1F] text-sm">{capitalizeEachWord(plan.name)}</p>
                                    <p className="text-xs text-gray-500">
                                        {plan.price === 0 ? 'Gratis' : toRupiah(plan.price)}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <AlertDialogFooter className="p-8 border-t border-gray-100 flex gap-3">
                    <AlertDialogCancel className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors font-bold px-6 py-2.5 rounded-xl flex-1">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSubmit}
                        disabled={!selectedPlan}
                        className="bg-[#FF645A] border-none text-white hover:bg-[#e0564e] disabled:opacity-50 disabled:cursor-not-allowed transition-all px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#FF645A]/20 flex-1"
                    >
                        Ubah Paket
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
