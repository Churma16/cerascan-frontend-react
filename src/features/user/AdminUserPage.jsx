import { Edit, UserPlus } from 'lucide-react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { useDeleteUser, useUsers } from '@/hooks/useUser.js';
import { useState } from 'react';
import AddUserModal from './AddUserModal.jsx';
import EditUserModal from './EditUserModal.jsx';
import AlertButtonAndDialog from '@/components/AlertButtonDialog.jsx';
import { capitalizeEachWord } from '@/utils/helper.js';

export default function AdminUserPage() {
    const { data: userData = [], isLoading } = useUsers();
    const deleteUser = useDeleteUser();
    const [editingUser, setEditingUser] = useState(null);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [, setFormData] = useState({ full_name: '', email: '', role: '' });
    const handleOpenAddUser = () => {
        setIsAddingUser(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setFormData({
            full_name: user.full_name || user.name || '',
            email: user.email || '',
            role: user.role || '',
        });
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">Manajemen Pengguna</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Atur akses tim Anda untuk menggunakan Tool Scanner.
                    </p>
                </div>
                <button
                    onClick={handleOpenAddUser}
                    className="mt-4 md:mt-0 px-5 py-2.5 bg-[#FF645A] hover:bg-[#e0564e] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF645A]/20 transition-all flex items-center gap-2"
                >
                    <UserPlus className="w-4 h-4" /> Tambah Pengguna
                </button>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FAFAFA]">
                            <tr className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest border-b border-gray-100">
                                <th className="px-8 py-5 text-left">Pengguna</th>
                                <th className="px-8 py-5 text-center">Peran</th>
                                <th className="px-8 py-5 text-center">Paket Aktif</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {/* LOADING STATE */}
                            {isLoading && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center font-medium text-gray-400">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
                                            Memuat data pengguna...
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* EMPTY STATE */}
                            {Array.isArray(userData) && userData.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center font-medium text-gray-500">
                                        Belum ada pengguna yang terdaftar.
                                    </td>
                                </tr>
                            )}

                            {/* DATA ROWS */}
                            {Array.isArray(userData) &&
                                !isLoading &&
                                userData.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        {/* Sel Teks (Kiri) */}
                                        <td className="px-8 py-5 text-left">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-[#E3EFEA] flex items-center justify-center text-[#042B1F] text-lg font-black uppercase">
                                                    {user.full_name
                                                        ? user.full_name.charAt(0)
                                                        : user.name
                                                          ? user.name.charAt(0)
                                                          : '?'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#042B1F] mb-0.5">
                                                        {user.full_name || user.name}
                                                    </p>
                                                    <p className="text-[10px] font-medium text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Sel Teks (Tengah) */}
                                        <td className="px-8 py-5 text-sm font-bold text-[#042B1F] text-center">
                                            {capitalizeEachWord(user.role)}
                                        </td>

                                        {/* Sel Teks (Tengah) */}
                                        <td className="px-8 py-5 text-sm font-bold text-[#042B1F] text-center">
                                            {capitalizeEachWord(user.active_plan.name)}
                                        </td>

                                        {/* Sel Status (Tengah) */}
                                        <td className="px-8 py-5 text-center">
                                            <span
                                                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wider uppercase ${user.status === 'Aktif' || user.status === 'active' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-gray-100 text-gray-500'}`}
                                            >
                                                {user.status || 'Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2.5">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="p-2.5 bg-white hover:bg-gray-50 text-gray-600 rounded-xl border border-gray-200 transition-colors shadow-sm"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <AlertButtonAndDialog
                                                    data={user}
                                                    onClick={() => deleteUser.mutate(user.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit User Modal Component */}
            <EditUserModal
                isOpen={!!editingUser}
                onOpenChange={(open) => !open && setEditingUser(null)}
                user={editingUser}
                onSaved={() => setEditingUser(null)}
            />

            {/* Add User Modal Component */}
            <AddUserModal isOpen={isAddingUser} onOpenChange={setIsAddingUser} />
        </PageWrapper>
    );
}
