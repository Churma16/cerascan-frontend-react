import { AlertCircle, Calendar, CheckCircle2, CreditCard, History } from 'lucide-react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { capitalizeEachWord, formatDateId, toRupiah } from '@/utils/helper.js';
import LiveUserQuotaColumn from '@/features/billing/LiveUserQuotaColumn.jsx';
import { useActiveSubscription, useCurrentUserSubsHistories } from '@/hooks/useSubcription.js';
import { useCurrentUserPaymentHistories } from '@/hooks/usePayment.js';
import { useState } from 'react';

function LoadingSubsTable() {
    return (
        <tr>
            <td colSpan="4" className="px-8 py-8 text-center font-medium text-gray-400">
                Loading...
            </td>
        </tr>
    );
}

function EmptySubsTable() {
    return (
        <tr>
            <td colSpan="4" className="px-8 py-8 text-center font-medium text-gray-500">
                Tidak ada riwayat langganan.
            </td>
        </tr>
    );
}

function CurrentPlanCard(props) {
    return (
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6">
            <div className="p-6 border-b border-gray-100 bg-[#FAFAFA]">
                <h3 className="font-extrabold text-[#042B1F] flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#FF645A]" /> Paket Saat Ini
                </h3>
            </div>
            <div className="p-6">
                {props.loadingCurrent ? (
                    <div className="text-center py-8 text-gray-400 font-medium">Loading data paket...</div>
                ) : !props.currentSubscription ? (
                    <div className="text-center py-8 text-gray-500 font-medium">Belum ada paket aktif.</div>
                ) : (
                    <>
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <h4 className="text-2xl font-black text-[#042B1F]">
                                        {capitalizeEachWord(props.currentSubscription?.plan?.name ?? 'unavailable')}
                                    </h4>
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${props.statusBadge.bg} ${props.statusBadge.text}`}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        {props.statusBadge.label}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    Siklus tagihan berakhir:{' '}
                                    <span className="font-semibold text-gray-900">
                                        {formatDateId(props.currentSubscription?.end_date ?? '-')}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Kuota pemindaian:{' '}
                                    <span className="font-semibold text-gray-900">
                                        {props.currentSubscription?.plan?.scan_quota ?? '-'} scan/bulan
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
                                    Batalkan Paket
                                </button>
                                <button className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#FF645A] hover:bg-[#E85246] transition-colors">
                                    Upgrade
                                </button>
                            </div>
                        </div>

                        {/* Plan Details */}
                        <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                            <div className="text-center">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Harga</p>
                                <p className="text-xl font-black text-[#042B1F] mt-1">
                                    {toRupiah(props.currentSubscription?.plan?.price ?? '-')}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sisa Durasi</p>
                                <p className="text-xl font-black text-[#042B1F] mt-1">
                                    {props.currentSubscription?.plan_id == 1
                                        ? 'Selamanya'
                                        : (props.currentSubscription?.remaining_duration ?? '-')}
                                </p>
                            </div>
                            <LiveUserQuotaColumn />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function BillingPage() {
    const [activeTab, setActiveTab] = useState('subscriptions');
    const { data: currentSubscription, isLoading: isLoadingCurrent } = useActiveSubscription();
    const { data: subscriptionHistories = [], isLoading: isLoadingHistories } = useCurrentUserSubsHistories();
    const { data: paymentHistories = [], isLoading: isLoadingPaymentHistories } = useCurrentUserPaymentHistories();

    const getStatusBadge = (status) => {
        const statusMap = {
            active: { bg: 'bg-[#E3EFEA]', text: 'text-[#10B981]', label: 'Aktif' },
            expired: { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', label: 'Kadaluarsa' },
            canceled: { bg: 'bg-[#FEE2E2]', text: 'text-[#FF645A]', label: 'Dibatalkan' },
            completed: { bg: 'bg-[#E3EFEA]', text: 'text-[#10B981]', label: 'Selesai' },
            pending: { bg: 'bg-[#E0F2FE]', text: 'text-[#0284C7]', label: 'Tertunda' },
        };
        return statusMap[status] || statusMap.pending;
    };

    const getPaymentStatusBadge = (status) => {
        const statusMap = {
            settlement: { bg: 'bg-[#E3EFEA]', text: 'text-[#10B981]', label: 'Lunas' },
        };
        return statusMap[status] || statusMap.pending;
    };

    return (
        <PageWrapper>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">Penagihan & Langganan</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Kelola paket aktif dan riwayat pembayaran Anda.
                    </p>
                </div>
            </div>

            {/* Current Subscription Card */}
            <CurrentPlanCard
                loadingCurrent={isLoadingCurrent}
                currentSubscription={currentSubscription}
                statusBadge={getStatusBadge(currentSubscription?.status ?? '-')}
            />

            {/* Subscription & Payment History */}
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-6 border-b border-gray-100 bg-[#FAFAFA]">
                    <h3 className="font-extrabold text-[#042B1F] flex items-center gap-2">
                        <History className="w-5 h-5 text-[#FF645A]" /> Riwayat Langganan & Pembayaran
                    </h3>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-white">
                    <button
                        onClick={() => setActiveTab('subscriptions')}
                        className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                            activeTab === 'subscriptions'
                                ? 'text-[#042B1F] border-b-2 border-[#042B1F] bg-white'
                                : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
                        }`}
                    >
                        Siklus Langganan
                    </button>
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                            activeTab === 'payments'
                                ? 'text-[#042B1F] border-b-2 border-[#042B1F] bg-white'
                                : 'text-gray-500 border-b-2 border-transparent hover:text-gray-700'
                        }`}
                    >
                        Riwayat Pembayaran
                    </button>
                </div>

                {/* Tab Content */}
                <div className="overflow-x-auto">
                    {activeTab === 'subscriptions' && (
                        <table className="w-full text-left">
                            <thead className="bg-[#FAFAFA]">
                                <tr className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest border-b border-gray-100">
                                    <th className="px-8 py-5">Nama Paket</th>
                                    <th className="px-8 py-5">Mulai Langganan</th>
                                    <th className="px-8 py-5">Berakhir Pada</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoadingHistories && <LoadingSubsTable />}
                                {!isLoadingHistories && subscriptionHistories.length === 0 && <EmptySubsTable />}
                                {subscriptionHistories.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5 font-semibold text-[#042B1F]">
                                            {capitalizeEachWord(sub.plan.name)}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-gray-600">
                                            {formatDateId(sub.start_date)}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-gray-600">
                                            {formatDateId(sub.end_date)}
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${getStatusBadge(sub.status).bg} ${getStatusBadge(sub.status).text}`}
                                            >
                                                {sub.status === 'active' && <CheckCircle2 className="w-4 h-4" />}
                                                {sub.status !== 'active' && <AlertCircle className="w-4 h-4" />}
                                                {getStatusBadge(sub.status).label}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'payments' && (
                        <table className="w-full text-left">
                            <thead className="bg-[#FAFAFA]">
                                <tr className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest border-b border-gray-100">
                                    <th className="px-8 py-5">No. Invoice</th>
                                    <th className="px-8 py-5">Paket</th>
                                    <th className="px-8 py-5">Jumlah</th>
                                    <th className="px-8 py-5">Metode</th>
                                    <th className="px-8 py-5">Tanggal</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoadingPaymentHistories && (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-8 text-center font-medium text-gray-400">
                                            Loading...
                                        </td>
                                    </tr>
                                )}
                                {!isLoadingPaymentHistories && paymentHistories.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-8 text-center font-medium text-gray-500">
                                            Tidak ada riwayat pembelian.
                                        </td>
                                    </tr>
                                )}
                                {paymentHistories.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5 font-mono font-bold text-[#042B1F]">
                                            {payment.order_id}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-gray-600">
                                            {capitalizeEachWord(payment.plan.name)}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-semibold text-gray-900">
                                            {payment.amount === 0 ? 'Gratis' : toRupiah(payment.amount)}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-gray-600">
                                            {payment.payment_type}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-gray-600">
                                            {formatDateId(payment.createdAt)}
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${getStatusBadge(payment.status).bg} ${getPaymentStatusBadge(payment.status).text}`}
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                {getPaymentStatusBadge(payment.status).label}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
}
