import { Activity, AlertCircle, CheckCircle2, Image as ImageIcon, Sparkles, Users, Zap } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { useDashboardKPI, useScanHistory, useScanTrends } from '@/hooks/useDashboard.js';
import { capitalizeEachWord, formatDateId, getImageUrl, timeAgo } from '@/utils/helper.js';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from '@/components/AdminPageHeader.jsx';
import { useCurrentUser } from '@/hooks/useAuth.js';
import { useLiveUserQuotaSSE } from '@/hooks/useLiveUserQuotaSSE.js';

function KpiSection({ dashboardKPIData, isAdmin, liveUserQuota }) {
    const userQuota = dashboardKPIData?.user_quota;
    const activeSubscription = dashboardKPIData?.active_subscription;

    // Quota calculations
    const totalQuota = userQuota?.total_quota ?? 0;
    const remainingQuota = liveUserQuota !== null ? Number(liveUserQuota) : (userQuota?.remaining_quota ?? 0);
    const usedQuota = totalQuota > 0 ? totalQuota - remainingQuota : 0;
    const isQuotaLow = totalQuota > 0 ? remainingQuota <= totalQuota * 0.2 : (userQuota?.is_quota_low ?? false);

    // Subscription calculations
    const planName = activeSubscription?.plan_name ?? 'Free Plan';
    const isActive = activeSubscription?.status === 'active';
    const resetDateStr = userQuota?.next_reset_date
        ? formatDateId(userQuota.next_reset_date)
        : activeSubscription?.end_date
          ? formatDateId(activeSubscription.end_date)
          : '';

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#E3EFEA] flex items-center justify-center">
                            <Activity className="w-6 h-6 text-[#10B981]" />
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                        Total Scan (Bulan ini)
                    </p>
                    <h3 className="text-3xl font-black text-[#042B1F]">
                        {dashboardKPIData.total_scans_this_month ?? 0}
                    </h3>
                </div>
                {dashboardKPIData.scan_change_text && (
                    <p
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full mt-3 inline-block self-start ${
                            dashboardKPIData.scan_change_text.includes('Turun')
                                ? 'text-[#FF645A] bg-[#FF645A]/10'
                                : dashboardKPIData.scan_change_text.includes('Naik')
                                  ? 'text-[#10B981] bg-[#10B981]/10'
                                  : 'text-gray-500 bg-gray-100'
                        }`}
                    >
                        {dashboardKPIData.scan_change_text}
                    </p>
                )}
            </div>

            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#FEE2E2] flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-[#FF645A]" />
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                        Tingkat Cacat (Defect)
                    </p>
                    <h3 className="text-3xl font-black text-[#042B1F]">{dashboardKPIData.defect_rate ?? 0}%</h3>
                </div>
                <p className="text-[10px] font-semibold text-gray-500 mt-3">
                    Ditemukan{' '}
                    <span className="text-[#FF645A] font-bold">{dashboardKPIData.defect_count_this_month ?? 0}</span>{' '}
                    cacat dari total scan.
                </p>
            </div>

            {isAdmin ? (
                <>
                    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-lg bg-[#E3EFEA] flex items-center justify-center">
                                    <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                                </div>
                            </div>
                            <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                                Rata-rata Akurasi (AI)
                            </p>
                            <h3 className="text-3xl font-black text-[#042B1F]">
                                {Number(dashboardKPIData.average_scan_accuracy || 0).toFixed(2)}%
                            </h3>
                        </div>
                        <p className="text-[10px] font-semibold text-gray-500 mt-3">
                            Akurasi performa rata-rata deteksi model AI.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                                    <Users className="w-6 h-6 text-[#f59e0b]" />
                                </div>
                            </div>
                            <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                                Pengguna Aktif
                            </p>
                            <h3 className="text-3xl font-black text-[#042B1F]">
                                {dashboardKPIData.active_users_this_month ?? 0}
                            </h3>
                        </div>
                        <p className="text-[10px] font-semibold text-gray-500 mt-3">
                            Aktif{' '}
                            <span className="text-gray-800 font-bold">
                                {dashboardKPIData.active_users_this_month ?? 0}
                            </span>{' '}
                            dari <span className="text-gray-800 font-bold">{dashboardKPIData.total_users ?? 0}</span>{' '}
                            pengguna terdaftar.
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-3">
                                <div className="w-12 h-12 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-[#0284C7]" />
                                </div>
                            </div>
                            <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                                Sisa Kuota Scan
                            </p>
                            <h3 className="text-3xl font-black text-[#042B1F]">{remainingQuota}</h3>

                            {/* Progress Bar */}
                            <div className="max-w-34 bg-gray-100 h-2 rounded-full overflow-hidden mt-3">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${isQuotaLow ? 'bg-[#FF645A]' : 'bg-[#0284C7]'}`}
                                    style={{
                                        width: `${Math.min(100, Math.max(0, totalQuota > 0 ? (usedQuota / totalQuota) * 100 : 0))}%`,
                                    }}
                                />
                            </div>
                            <div className="flex gap-4 text-[11px] font-bold text-gray-400 mt-2">
                                <span>
                                    Terpakai <span className="text-gray-800">{usedQuota}</span>
                                </span>
                                <span>
                                    Total <span className="text-gray-800">{totalQuota}</span>
                                </span>
                            </div>
                        </div>
                        {isQuotaLow && (
                            <p className="text-[10px] font-semibold text-[#FF645A] bg-[#FF645A]/10 px-2.5 py-1 rounded-full mt-3 inline-block self-start">
                                Kuota hampir habis.
                            </p>
                        )}
                    </div>

                    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-3">
                                <div className="w-12 h-12 rounded-lg bg-[#E3EFEA] flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-[#10B981]" />
                                </div>
                                {isActive && (
                                    <span className="text-[10px] font-extrabold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full">
                                        Aktif
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">Paket Aktif</p>
                            <h3 className="text-2xl font-black text-[#042B1F] truncate">
                                {capitalizeEachWord(planName)}
                            </h3>
                        </div>
                        {resetDateStr && (
                            <p className="text-[10px] font-semibold text-gray-500 mt-3">
                                Reset kuota: <span className="text-gray-800 font-bold">{resetDateStr}</span>
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default function DashboardPage() {
    const { data: dashboardKPIData = {} } = useDashboardKPI();
    const { data: scanTrendData = [] } = useScanTrends();
    const { data: scanHistoryData = [] } = useScanHistory();
    const { data: me } = useCurrentUser();
    const isAdmin = me?.role === 'admin';
    const { userQuota: liveUserQuota } = useLiveUserQuotaSSE(me?.id);

    const navigate = useNavigate();

    return (
        <PageWrapper>
            <AdminPageHeader title="Selamat Datang, Admin" desc="Berikut adalah ringkasan peforma deteksi hari ini." />

            <KpiSection dashboardKPIData={dashboardKPIData} isAdmin={isAdmin} liveUserQuota={liveUserQuota} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4 mb-8 items-stretch">
                {/* Kolom Kiri: Chart */}
                <div className="xl:col-span-2 bg-white border border-gray-100 rounded-lg p-8 drop-shadow-sm flex flex-col">
                    <h3 className="text-xl font-black text-[#042B1F] mb-6">Aktivitas Pemindaian (7 Hari Terakhir)</h3>
                    <div className="relative w-full flex-1 min-h-75">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={scanTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorDefect" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF645A" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#FF645A" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    fontWeight={600}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10} //
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    fontWeight={600}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #f3f4f6',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                    }}
                                    itemStyle={{ color: '#042B1F', fontWeight: 'bold' }}
                                />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    iconType="square"
                                    wrapperStyle={{ paddingBottom: 8, fontSize: 12, fontWeight: 600 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total_scan"
                                    name="Total Scan"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="defect_count"
                                    name="Cacat"
                                    stroke="#FF645A"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorDefect)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tabel Aktivitas Singkat */}
                <div className="bg-white border border-gray-100 rounded-lg p-8 drop-shadow-sm flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-[#042B1F]">Deteksi Terkini</h3>
                        <button
                            className="text-xs font-bold text-[#FF645A] hover:text-[#e0564e] transition-colors"
                            onClick={() => navigate('/dashboard/scans')}
                        >
                            Lihat Semua
                        </button>
                    </div>

                    <div className="flex-1 space-y-3 ">
                        {scanHistoryData.map((scan, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-3.5 bg-[#FAFAFA] border border-gray-100 rounded-2xl hover:border-[#10B981]/30 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-200">
                                        {scan.saved_file_name || scan.file_url ? (
                                            <img
                                                src={scan.file_url || getImageUrl(scan.saved_file_name)}
                                                alt={scan.file_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 text-gray-300" />
                                        )}{' '}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#042B1F] font-mono mb-0.5">
                                            {scan.scan_id}
                                        </p>
                                        <p className="text-[10px] font-medium text-gray-500">
                                            {timeAgo(scan.createdAt)} • {scan.inference_time}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold mb-1 ${
                                            scan.status === 'Normal'
                                                ? 'bg-[#E3EFEA] text-[#10B981]'
                                                : 'bg-[#FEE2E2] text-[#FF645A]'
                                        }`}
                                    >
                                        {scan.prediction}
                                    </span>
                                    <p className="text-[10px] font-mono font-bold text-gray-400">{scan.confidence}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
