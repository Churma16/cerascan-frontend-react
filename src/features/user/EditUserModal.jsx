import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useEditUser } from '@/hooks/useUser.js';
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

export default function EditUserModal({ isOpen, onOpenChange, user, onSaved }) {
    const editUserMutation = useEditUser(user?.id);
    const [formData, setFormData] = useState({ full_name: '', email: '', role: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.full_name || user.name || '',
                email: user.email || '',
                role: user.role || 'user',
            });
        }
    }, [user]);

    const handleSubmit = () => {
        const noUserIdProvided = !user || !user.id;
        if (noUserIdProvided) return;
        editUserMutation.mutate(formData, {
            onSuccess: (data) => {
                onOpenChange(false);
                if (onSaved) onSaved(data);
            },
            onError: (err) => {
                console.error('Edit user failed', err);
            },
        });
    };

    return (
        <AlertDialog open={!!isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-white border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-0 max-w-lg">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <AlertDialogHeader className="text-left">
                        <AlertDialogTitle className="text-2xl font-black text-[#042B1F]">
                            Edit Pengguna
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500 font-medium mt-2">
                            Ubah informasi pengguna di bawah ini.
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
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder="Masukkan nama lengkap"
                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3 px-4 text-[#042B1F] font-semibold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Masukkan email"
                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3 px-4 text-[#042B1F] font-semibold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all placeholder:text-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 block">
                            Peran
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl py-3 px-4 text-[#042B1F] font-semibold focus:outline-none focus:border-[#FF645A] focus:ring-4 focus:ring-[#FF645A]/10 transition-all"
                        >
                            <option value="admin">Admin</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="quality_control">Quality Control</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </div>

                <AlertDialogFooter className="p-8 border-t border-gray-100 flex gap-3">
                    <AlertDialogCancel className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors font-bold px-6 py-2.5 rounded-xl flex-1">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSubmit}
                        disabled={editUserMutation.isPending}
                        className="bg-[#FF645A] border-none text-white hover:bg-[#e0564e] disabled:bg-[#FF645A]/50 disabled:cursor-not-allowed transition-all px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#FF645A]/20 flex-1 flex items-center justify-center gap-2"
                    >
                        {editUserMutation.isPending ? (
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
