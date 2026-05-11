import { useState } from 'react';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import AdminMainLayout from '@/layouts/AdminMainLayout.jsx';
import PageWrapper from '@/layouts/PageWrapper.jsx';

const initialUsers = [
    {
        id: 1,
        name: 'Admin Utama',
        email: 'admin@cerascan.ai',
        role: 'Super Admin',
        status: 'Aktif',
    },
    {
        id: 2,
        name: 'Budi Santoso',
        email: 'budi.qc@cerascan.ai',
        role: 'Operator QC',
        status: 'Aktif',
    },
    {
        id: 3,
        name: 'Siti Aminah',
        email: 'siti.spv@cerascan.ai',
        role: 'Supervisor',
        status: 'Nonaktif',
    },
];

export default function UserPage() {
    const [users, setUsers] = useState(initialUsers);

    const handleAddUser = () => {
        const newUser = {
            id: Date.now(),
            name: 'User Baru',
            email: 'newuser@cerascan.ai',
            role: 'Operator QC',
            status: 'Aktif',
        };
        setUsers([...users, newUser]);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Hapus pengguna ini dari sistem?')) {
            setUsers(users.filter((u) => u.id !== id));
        }
    };

    return (
        <AdminMainLayout>
            {/* Class wrapper diperbarui agar tidak membatasi lebar (max-w-5xl dihapus) dan rata kiri */}
            <PageWrapper>
                {/* Header disesuaikan agar sama persis dengan halaman Overview */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            Manajemen Pengguna
                        </h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            Atur akses tim Anda untuk menggunakan Tool Scanner.
                        </p>
                    </div>
                    <button
                        onClick={handleAddUser}
                        className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" /> Tambah Pengguna
                    </button>
                </div>

                {/* Tabel dengan rounded-3xl agar senada dengan kartu di Dashboard */}
                <div className="bg-[#0E0F15] border border-[#262833] rounded-3xl overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#13141C]">
                                <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-[#262833]">
                                    <th className="px-6 py-5 font-medium">Pengguna</th>
                                    <th className="px-6 py-5 font-medium">Peran</th>
                                    <th className="px-6 py-5 font-medium">Status</th>
                                    <th className="px-6 py-5 font-medium text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262833]">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-[#1A1C26]/50 transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar diubah menjadi rounded-xl agar lebih modern */}
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-inner">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-zinc-200">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-zinc-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-zinc-400">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${user.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 bg-[#1A1C26] hover:bg-[#262833] text-zinc-300 rounded-lg border border-[#262833] transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </PageWrapper>
        </AdminMainLayout>
    );
}
