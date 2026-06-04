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
import { UserPlus } from 'lucide-react';
import { capitalizeEachWord } from '@/utils/helper.js';

export function GivePackageModal({ isOpen, onOpenChange, users, onAssign, availablePlans }) {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedPlanId, setSelectedPlanId] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        if (selectedUserId && selectedPlanId) {
            onAssign(selectedUserId, selectedPlanId, note);
        }
    };

    const handleClose = (open) => {
        if (!open) {
            setSelectedUserId('');
            setSelectedPlanId('');
            setNote('');
        }
        onOpenChange(open);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-white border-gray-100 shadow-2xl rounded-2xl p-0 max-w-md flex flex-col max-h-[90vh]">
                {/* Header - fixed at top */}
                <div className="px-8 pt-8 border-b border-gray-100 shrink-0">
                    <AlertDialogHeader className="text-left">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-[#E3EFEA] flex items-center justify-center">
                                <UserPlus className="w-5 h-5 text-[#042B1F]" />
                            </div>
                            <AlertDialogTitle className="text-xl font-black text-[#042B1F]">
                                Berikan Paket Langganan
                            </AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-xs font-medium text-gray-500">
                            Pilih pengguna dan paket yang akan diberikan
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>

                {/* Scrollable Body */}
                <div className="p-8 space-y-6 overflow-y-auto flex-1">
                    {/* Pilih User */}
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">
                            Pilih Pengguna <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF645A] focus:border-transparent outline-none transition"
                        >
                            <option value="">-- Pilih Pengguna --</option>
                            {users?.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.full_name} - {user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Pilih Paket */}
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">
                            Pilih Paket <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {availablePlans.map((plan) => (
                                <label
                                    key={plan.id}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                        selectedPlanId === String(plan.id)
                                            ? 'border-[#FF645A] bg-[#FFF2F0]'
                                            : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="givePlan"
                                        value={plan.id}
                                        checked={selectedPlanId === String(plan.id)}
                                        onChange={(e) => setSelectedPlanId(e.target.value)}
                                        className="w-4 h-4 text-[#FF645A]"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-[#042B1F] text-sm">
                                            {capitalizeEachWord(plan.name)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {plan.price === 0
                                                ? 'Gratis'
                                                : `Rp ${plan.price.toLocaleString('id-ID')}/bulan`}
                                        </p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Catatan */}
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Catatan (Opsional)</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Tambahkan catatan internal di sini..."
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF645A] focus:border-transparent outline-none transition resize-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">Catatan ini hanya untuk keperluan internal admin.</p>
                    </div>
                </div>

                {/* Footer - fixed at bottom */}
                <AlertDialogFooter className="p-8 pt-2 border-t border-gray-100 flex gap-3 flex-shrink-0">
                    <AlertDialogCancel className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors font-bold px-6 py-2.5 rounded-xl flex-1">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSubmit}
                        disabled={!selectedUserId || !selectedPlanId}
                        className="bg-[#FF645A] border-none text-white hover:bg-[#e0564e] disabled:opacity-50 disabled:cursor-not-allowed transition-all px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#FF645A]/20 flex-1"
                    >
                        Berikan Paket
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
