import { AlertCircle, Gift, Loader2 } from 'lucide-react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGiftSubscription, useSubscriptions } from '@/hooks/useSubcription.js';
import { useUsers } from '@/hooks/useUser.js';
import { usePlans } from '@/hooks/usePlan.js';

import { capitalizeEachWord } from '@/utils/helper.js';
import { AssignPlanModal } from '@/features/subscription/AssignPlanModal.jsx';
import { GivePackageModal } from '@/features/subscription/GivePackageModal.jsx';

export default function SubscriptionPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: subscriptions = [], isLoading } = useSubscriptions();
    const { data: usersData = [], isLoading: usersLoading } = useUsers();
    const { data: availablePlans = [] } = usePlans();

    const { mutate: giftPackage, isPending: isGiftPending } = useGiftSubscription();

    const [assigningUser, setAssigningUser] = useState(null);
    const [showGivePackageModal, setShowGivePackageModal] = useState(false);

    const getQuotaPercentage = (used, total) => {
        if (!total) return 0;
        return ((used / total) * 100).toFixed(1);
    };

    const getQuotaStatus = (percentage) => {
        if (percentage >= 90) return { bg: 'bg-[#FF645A]', label: 'Upsell Potential (Hampir Habis)', color: '#FF645A' };
        if (percentage >= 70) return { bg: 'bg-[#F59E0B]', label: 'Perlu Dimonitor', color: '#F59E0B' };
        return { bg: 'bg-[#10B981]', label: 'Normal', color: '#10B981' };
    };

    const handleAssignPlan = (userId, planId) => {
        const plan = availablePlans.find((p) => p.id === Number(planId));
        queryClient.setQueryData(['subscriptions'], (oldData) => {
            if (!oldData) return [];
            return oldData.map((sub) =>
                sub.id === userId ? { ...sub, plan: { ...sub.plan, id: plan.id, name: plan.name } } : sub
            );
        });
        setAssigningUser(null);
    };

    // 5. Eksekusi API mutasi TanStack Query di sini!
    const handleGivePackage = (userId, planId, note) => {
        giftPackage(
            { user_id: userId, plan_id: planId, note },
            {
                onSuccess: () => {
                    // Tutup modal HANYA JIKA API berhasil
                    setShowGivePackageModal(false);

                    // Minta TanStack Query untuk me-refresh data tabel di background
                    queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
                },
            }
        );
    };

    return (
        <PageWrapper>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">
                            Manajemen Pengguna & Kuota
                        </h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                            Pantau status langganan dan sisa kuota scan seluruh pengguna Anda.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowGivePackageModal(true)}
                        className="mt-4 md:mt-0 px-5 py-2.5 bg-[#FF645A] hover:bg-[#e0564e] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF645A]/20 transition-all flex items-center gap-2"
                    >
                        <Gift className="w-4 h-4" /> Berikan Paket
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="p-6 border-b border-gray-100 bg-[#FAFAFA]">
                        <h3 className="font-extrabold text-[#042B1F]">Data Langganan Pengguna</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#FAFAFA]">
                                <tr className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest border-b border-gray-100">
                                    <th className="px-8 py-5">Pengguna</th>
                                    <th className="px-8 py-5">Paket Langganan</th>
                                    <th className="px-8 py-5">Penggunaan Kuota</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading && (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-12 text-center">
                                            <div className="flex items-center justify-center gap-2 text-gray-500 font-medium">
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Memuat data langganan...
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {!isLoading && subscriptions.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-12 text-center text-gray-500 font-medium">
                                            Belum ada data langganan.
                                        </td>
                                    </tr>
                                )}
                                {!isLoading &&
                                    subscriptions.map((sub) => {
                                        const percentage = getQuotaPercentage(
                                            sub?.user?.user_quota?.used_quota || 0,
                                            sub?.user?.user_quota?.total_quota || 0
                                        );
                                        const quotaStatus = getQuotaStatus(percentage);

                                        return (
                                            <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-[#042B1F] flex items-center justify-center text-white font-bold shadow-inner text-sm">
                                                            {sub.user.full_name.substring(0, 1).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[#042B1F] text-sm">
                                                                {sub.user.full_name}
                                                            </p>
                                                            <p className="text-xs font-medium text-gray-500">
                                                                {sub.user.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div>
                                                        <p className="font-bold text-[#042B1F] text-sm">
                                                            {capitalizeEachWord(sub.plan.name)}
                                                        </p>
                                                        <p className="text-xs font-medium text-gray-500">
                                                            s/d{' '}
                                                            {new Date(sub.end_date).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            })}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs font-semibold text-gray-600">
                                                                {sub?.user?.user_quota?.used_quota} /{' '}
                                                                {sub?.user?.user_quota?.total_quota}
                                                            </span>
                                                            <span
                                                                className="text-xs font-bold"
                                                                style={{ color: quotaStatus.color }}
                                                            >
                                                                {percentage}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full ${quotaStatus.bg} transition-all duration-300`}
                                                                style={{ width: `${Math.min(percentage, 100)}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    {percentage >= 90 ? (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#FEE2E2] text-[#FF645A]">
                                                            <AlertCircle className="w-4 h-4" /> {quotaStatus.label}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#E3EFEA] text-[#10B981]">
                                                            {quotaStatus.label}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => setAssigningUser(sub)}
                                                            className="px-4 py-2 text-sm font-bold text-[#042B1F] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                                        >
                                                            Ubah Paket
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/dashboard/users`)}
                                                            className="px-4 py-2 text-sm font-bold text-[#FF645A] hover:text-[#e0564e] transition-colors"
                                                        >
                                                            Detail
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AssignPlanModal
                isOpen={!!assigningUser}
                onOpenChange={(open) => !open && setAssigningUser(null)}
                user={assigningUser}
                onAssign={handleAssignPlan}
                availablePlans={availablePlans}
            />

            {/* 6. Kirim prop isLoading ke modal Anda */}
            <GivePackageModal
                isOpen={showGivePackageModal}
                onOpenChange={setShowGivePackageModal}
                users={usersData?.data || usersData} // Sesuaikan jika data user dari API terbungkus { data: [] }
                onAssign={handleGivePackage}
                availablePlans={availablePlans}
                isLoading={isGiftPending}
            />
        </PageWrapper>
    );
}
