import { useCreateUser } from '@/hooks/useUser.js';
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

export default function AddUserModal({ isOpen, onOpenChange }) {
    const createUserMutation = useCreateUser();
    const [formData, setFormData] = useState({ full_name: '', email: '', role: 'user' });

    const handleOpenModal = () => {
        setFormData({ full_name: '', email: '', role: 'user' });
    };

    const handleAddUserSubmit = () => {
        createUserMutation.mutate({
            full_name: formData.full_name,
            email: formData.email,
            password: 'defaultPassword123', // TODO: Generate atau minta dari user
            role: formData.role,
        });
        onOpenChange(false);
        setFormData({ full_name: '', email: '', role: '' });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-white border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-0 max-w-lg">
                <div className="px-8 pt-8 border-b border-gray-100">
                    <AlertDialogHeader className="text-left">
                        <AlertDialogTitle className="text-2xl font-black text-[#042B1F]">
                            Tambah Pengguna Baru
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500 font-medium mt-2">
                            Isi informasi pengguna untuk menambahkan ke sistem.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
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
                            <option value="user">User</option>
                            <option value="quality_control">Quality Control</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                <AlertDialogFooter className="p-8 border-t border-gray-100 flex gap-3">
                    <AlertDialogCancel className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors font-bold px-6 py-2.5 rounded-xl flex-1">
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleAddUserSubmit}
                        disabled={createUserMutation.isPending}
                        className="bg-[#10B981] border-none text-white hover:bg-[#0c9c6f] disabled:bg-[#10B981]/50 disabled:cursor-not-allowed transition-all px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#10B981]/20 flex-1 flex items-center justify-center gap-2"
                    >
                        {createUserMutation.isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Menambahkan...
                            </>
                        ) : (
                            'Tambah Pengguna'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
