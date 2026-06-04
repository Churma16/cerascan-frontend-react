import { Banknote, Filter, Loader2, TrendingDown, TrendingUp } from 'lucide-react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { capitalizeEachWord, formatDateId, toRupiah } from '@/utils/helper.js';
import { useState } from 'react';
import { usePaymentKpi, usePayments } from '@/hooks/usePayment.js';

const mapPaymentStatus = (apiStatus) => {
    const status = apiStatus?.toLowerCase();
    if (['settlement', 'capture', 'success'].includes(status)) return 'Berhasil';
    if (['pending'].includes(status)) return 'Menunggu';
    if (['deny', 'failure'].includes(status)) return 'Ditolak';
    if (['expire', 'cancel'].includes(status)) return 'Kadaluarsa';
    return 'Menunggu';
};

const mapPaymentMethod = (apiMethod) => {
    const method = apiMethod?.toLowerCase();
    if (method === 'qris') return 'QRIS';
    if (['credit_card', 'creditcard'].includes(method)) return 'Kartu Kredit';
    if (['gopay', 'shopeepay', 'ewallet'].includes(method)) return 'E-Wallet';
    return 'Transfer';
};

const getStatusBadge = (statusLabel) => {
    const statusMap = {
        Berhasil: { bg: 'bg-[#E3EFEA]', text: 'text-[#10B981]', label: 'Berhasil' },
        Menunggu: { bg: 'bg-[#E0F2FE]', text: 'text-[#0284C7]', label: 'Menunggu' },
        Kadaluarsa: { bg: 'bg-[#FEF3C7]', text: 'text-[#F59E0B]', label: 'Kadaluarsa' },
        Ditolak: { bg: 'bg-[#FEE2E2]', text: 'text-[#FF645A]', label: 'Ditolak' },
    };
    return statusMap[statusLabel] || statusMap.Menunggu;
};

const getPaymentMethodBadge = (methodLabel) => {
    const methodMap = {
        Transfer: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Transfer' },
        Tunai: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Tunai' },
        'Kartu Kredit': { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Kartu Kredit' },
        'E-Wallet': { bg: 'bg-green-50', text: 'text-green-600', label: 'E-Wallet' },
        QRIS: { bg: 'bg-pink-50', text: 'text-pink-600', label: 'QRIS' },
    };
    return methodMap[methodLabel] || methodMap.Transfer;
};

const getTrendArrow = (is_positive) => {
    if (is_positive) {
        return { icon: <TrendingUp className="w-3 h-3" />, color: 'text-green-500', bgColor: 'bg-[#10B981]/10' };
    } else {
        return { icon: <TrendingDown className="w-3 h-3" />, color: 'text-red-500', bgColor: 'bg-red-500/10' };
    }
};

export default function PaymentPage() {
    const [statusFilter, setStatusFilter] = useState('Semua Status');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: paymentsData = [], isLoading } = usePayments();
    const { data: paymentKpiData = {} } = usePaymentKpi();

    const filteredData = paymentsData.filter((payment) => {
        const matchesStatus = statusFilter === 'Semua Status' || payment.status === statusFilter;
        const matchesSearch =
            payment.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.user.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <PageWrapper>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">Semua Transaksi</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Pantau dan kelola seluruh riwayat pembayaran dari semua pengguna.
                    </p>
                </div>
                {/*{JSON.stringify(paymentKpiData)}*/}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#E3EFEA] flex items-center justify-center">
                            <Banknote className="w-6 h-6 text-[#10B981]" />
                        </div>
                        <span
                            className={`flex items-center gap-1 text-[10px] font-extrabold ${getTrendArrow(paymentKpiData?.revenue?.is_positive).color}  ${getTrendArrow(paymentKpiData?.revenue?.is_positive).bgColor} px-2.5 py-1 rounded-full`}
                        >
                            {getTrendArrow(paymentKpiData?.revenue?.is_positive).icon}
                            {paymentKpiData?.revenue?.growth_percentage} %
                        </span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">Total Pendapatan</p>
                    <h3 className="text-3xl font-black text-[#042B1F]">{toRupiah(paymentKpiData?.revenue?.total)}</h3>
                    <p className="text-[10px] font-medium text-gray-500 mt-2">Bulan ini</p>
                </div>

                <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#E3EFEA] flex items-center justify-center">
                            <Banknote className="w-6 h-6 text-[#10B981]" />
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">Transaksi Berhasil</p>
                    <h3 className="text-3xl font-black text-[#042B1F]">{paymentKpiData?.payments?.successful} </h3>
                </div>

                <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                            <Banknote className="w-6 h-6 text-[#f59e0b]" />
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">Menunggu Pembayaran</p>
                    <h3 className="text-3xl font-black text-[#042B1F]">{paymentKpiData?.payments?.pending} </h3>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
                    <h3 className="font-extrabold text-[#042B1F] flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-[#FF645A]" /> Data Transaksi Pembayaran
                    </h3>
                    <button className="text-xs font-bold text-[#042B1F] bg-[#E3EFEA] hover:bg-[#d1e5dd] px-4 py-2 rounded-lg transition-colors">
                        Unduh CSV
                    </button>
                </div>

                <div className="p-6 border-b border-gray-100 flex gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Cari Order ID atau Nama..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#042B1F] transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-[#042B1F] transition-colors bg-white"
                        >
                            <option>Semua Status</option>
                            <option>Berhasil</option>
                            <option>Menunggu</option>
                            <option>Kadaluarsa</option>
                            <option>Ditolak</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* Header Tabel */}
                        <thead className="bg-[#FAFAFA]">
                            <tr className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest border-b border-gray-100">
                                <th className="px-8 py-5 text-left">Waktu & Order ID</th>
                                <th className="px-8 py-5 text-left">Pengguna</th>
                                <th className="px-8 py-5 text-left">Paket</th>
                                <th className="px-8 py-5 text-right">Metode & Nominal</th>
                                <th className="px-8 py-5 text-center">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {isLoading && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center">
                                        <div className="flex items-center justify-center gap-2 text-gray-500 font-medium">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Memuat transaksi...
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* EMPTY STATE */}
                            {!isLoading && filteredData.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center font-medium text-gray-500">
                                        Tidak ada transaksi yang ditemukan.
                                    </td>
                                </tr>
                            )}

                            {/* DATA STATE */}
                            {!isLoading &&
                                filteredData.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                        {/* Sel Teks (Kiri) */}
                                        <td className="px-8 py-5">
                                            <p className="font-mono font-bold text-[#042B1F]">{payment.order_id}</p>
                                            <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                                                {formatDateId(payment.createdAt)} •{' '}
                                                {payment.transaction_id.split('-')[0]}
                                            </p>
                                        </td>

                                        {/* Sel Teks (Kiri) */}
                                        <td className="px-8 py-5">
                                            <p className="font-bold text-[#042B1F] text-sm">{payment.user.full_name}</p>
                                            <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                                                {payment.user.email}
                                            </p>
                                        </td>

                                        {/* Sel Teks (Kiri) */}
                                        <td className="px-8 py-5 text-sm font-bold text-[#042B1F]">
                                            {capitalizeEachWord(payment.plan.name)}
                                        </td>

                                        {/* Sel Uang (Kanan) - Harus align items flex-end agar rata kanan teksnya */}
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1 items-end">
                                                <span className="font-bold text-[#042B1F]">
                                                    {toRupiah(payment.amount)}
                                                </span>
                                                <span
                                                    className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold w-fit ${getPaymentMethodBadge(payment.payment_method).bg} ${getPaymentMethodBadge(payment.payment_method).text}`}
                                                >
                                                    {payment.payment_type}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Sel Status (Tengah) */}
                                        <td className="px-8 py-5 text-center">
                                            <span
                                                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-extrabold ${getStatusBadge(payment.status).bg} ${getStatusBadge(payment.status).text}`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageWrapper>
    );
}
