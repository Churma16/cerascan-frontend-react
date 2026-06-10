import { Edit, Package, Plus, Trash2 } from 'lucide-react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { capitalizeEachWord, toRupiah } from '@/utils/helper.js';
import { useState } from 'react';
import { usePlans } from '@/hooks/usePlan.js';

const mockPlans = [
    {
        id: 1,
        name: 'Basic Starter',
        price: 0,
        scan_quota: 50,
        duration_days: 30,
        createdAt: '2026-01-15T10:30:00Z',
        updatedAt: '2026-01-15T10:30:00Z',
    },
    {
        id: 2,
        name: 'Pro Premium',
        price: 150000,
        scan_quota: 300,
        duration_days: 30,
        createdAt: '2026-01-20T14:45:00Z',
        updatedAt: '2026-05-10T09:15:00Z',
    },
    {
        id: 3,
        name: 'Enterprise',
        price: 5000000,
        scan_quota: 5000,
        duration_days: 30,
        createdAt: '2026-02-01T08:00:00Z',
        updatedAt: '2026-03-22T16:30:00Z',
    },
];

function AddPlanModal({ isOpen, onOpenChange }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        scan_quota: '',
        duration_days: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'scan_quota' || name === 'duration_days' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit Plan:', formData);
        setFormData({ name: '', price: '', scan_quota: '', duration_days: '' });
        onOpenChange(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#E3EFEA] flex items-center justify-center">
                        <Package className="w-5 h-5 text-[#042B1F]" />
                    </div>
                    <h2 className="text-xl font-black text-[#042B1F]">Tambah Paket Baru</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Nama Paket</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Contoh: Pro Premium"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042B1F]/20 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Harga (Rp)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042B1F]/20 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Kuota Scan/Bulan</label>
                        <input
                            type="number"
                            name="scan_quota"
                            value={formData.scan_quota}
                            onChange={handleChange}
                            placeholder="50"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042B1F]/20 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Durasi (hari)</label>
                        <input
                            type="number"
                            name="duration_days"
                            value={formData.duration_days}
                            onChange={handleChange}
                            placeholder="30"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042B1F]/20 transition-colors"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#FF645A] hover:bg-[#e0564e] transition-colors"
                        >
                            Simpan Paket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function EditPlanModal({ isOpen, onOpenChange, plan }) {
    const [formData, setFormData] = useState(
        plan
            ? {
                  name: plan.name,
                  price: plan.price,
                  scan_quota: plan.scan_quota,
                  duration_days: plan.duration_days,
              }
            : {
                  name: '',
                  price: '',
                  scan_quota: '',
                  duration_days: '',
              }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'scan_quota' || name === 'duration_days' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Update Plan:', plan?.id, formData);
        onOpenChange(false);
    };

    if (!isOpen || !plan) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#E3EFEA] flex items-center justify-center">
                        <Edit className="w-5 h-5 text-[#042B1F]" />
                    </div>
                    <h2 className="text-xl font-black text-[#042B1F]">Edit Paket</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Nama Paket</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042B1F]/20 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Harga (Rp)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042B1F]/20 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Kuota Scan/Bulan</label>
                        <input
                            type="number"
                            name="scan_quota"
                            value={formData.scan_quota}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042B1F]/20 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Durasi (hari)</label>
                        <input
                            type="number"
                            name="duration_days"
                            value={formData.duration_days}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042B1F]/20 transition-colors"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#FF645A] hover:bg-[#e0564e] transition-colors"
                        >
                            Perbarui Paket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function PlanPage() {
    const [isAddingPlan, setIsAddingPlan] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

    const { data: planData = [], isLoading } = usePlans();

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">Master Data Paket</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Kelola semua paket berlangganan yang tersedia untuk pengguna.
                    </p>
                </div>
                <button
                    onClick={() => setIsAddingPlan(true)}
                    className="mt-4 md:mt-0 px-5 py-2.5 bg-[#FF645A] hover:bg-[#e0564e] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF645A]/20 transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Tambah Paket
                </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FAFAFA]">
                            <tr className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest border-b border-gray-100">
                                <th className="px-8 py-5 text-left">Nama Paket</th>
                                <th className="px-8 py-5 text-right">Harga</th>
                                <th className="px-8 py-5 text-center">Kuota Scan</th>
                                <th className="px-8 py-5 text-center">Durasi (Hari)</th>
                                {/*<th className="px-8 py-5">Dibuat</th>*/}
                                {/*<th className="px-8 py-5">Diperbarui</th>*/}
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
                                            Memuat data paket...
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* EMPTY STATE */}
                            {!isLoading && planData.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center font-medium text-gray-500">
                                        Belum ada paket yang terdaftar.
                                    </td>
                                </tr>
                            )}

                            {/* DATA ROWS */}
                            {!isLoading && planData.map((plan) => (
                                <tr key={plan.id} className="hover:bg-gray-50/50 transition-colors">
                                    {/* Sel Teks (Kiri) */}
                                    <td className="px-8 py-5 text-left">
                                        <div className="flex items-center gap-3">
                                            <p className="font-bold text-[#042B1F]">{capitalizeEachWord(plan.name)}</p>
                                        </div>
                                    </td>

                                    {/* Sel Angka/Uang (Kanan) */}
                                    <td className="px-8 py-5 text-right">
                                        <span className="font-bold text-[#042B1F]">
                                            {plan.price === 0 ? 'Gratis' : toRupiah(plan.price)}
                                        </span>
                                    </td>

                                    {/* Sel Badge/Angka (Tengah) */}
                                    <td className="px-8 py-5 text-center">
                                        <span className="font-bold text-[#10B981] bg-[#E3EFEA] px-3 py-1.5 rounded-lg text-sm tracking-wide">
                                            {plan.scan_quota}/bulan
                                        </span>
                                    </td>

                                    {/* Sel Angka (Tengah) */}
                                    <td className="px-8 py-5 text-center text-sm font-bold text-gray-500">
                                        {plan.duration_days} hari
                                    </td>

                                    {/* Sel Aksi (Kanan) */}
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2.5">
                                            <button
                                                onClick={() => setEditingPlan(plan)}
                                                className="p-2.5 bg-white hover:bg-gray-50 text-gray-600 rounded-xl border border-gray-200 transition-colors shadow-sm"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 bg-white hover:bg-red-50 text-red-600 rounded-xl border border-red-200 transition-colors shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>{' '}
                </div>
            </div>

            {/* Add Plan Modal */}
            <AddPlanModal isOpen={isAddingPlan} onOpenChange={setIsAddingPlan} />

            {/* Edit Plan Modal */}
            <EditPlanModal
                isOpen={!!editingPlan}
                onOpenChange={(open) => !open && setEditingPlan(null)}
                plan={editingPlan}
            />
        </PageWrapper>
    );
}
