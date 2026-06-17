import { Edit, Plus } from 'lucide-react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { capitalizeEachWord, toRupiah } from '@/utils/helper.js';
import { useState } from 'react';
import { usePlans } from '@/hooks/usePlan.js';
import AddPlanModal from './AddPlanModal.jsx';
import EditPlanModal from './EditPlanModal.jsx';
import DeletePlanModal from './DeletePlanModal.jsx';

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

                                            <DeletePlanModal plan={plan} />
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
