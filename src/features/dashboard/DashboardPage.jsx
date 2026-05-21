import { Activity, AlertCircle, CheckCircle2, Image as ImageIcon, TrendingUp, Users } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { useDashboardKPI, useScanHistory, useScanTrends } from '@/hooks/useDashboard.js';
import { timeAgo } from '@/utils/helper.js';
import { useNavigate } from 'react-router-dom';


export default function DashboardPage() {
    const { data: dashboardKPIData = {} } = useDashboardKPI();
    const { data: scanTrendData = [] } = useScanTrends();
    const { data: scanHistoryData = [] } = useScanHistory();
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">Selamat Datang, Admin</h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                            Berikut adalah ringkasan peforma deteksi hari ini.
                        </p>
                    </div>
                    {/*<button className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-[#042B1F] text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm">*/}
                    {/*    <Download className="w-4 h-4" /> Unduh Laporan*/}
                    {/*</button>*/}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)]">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-lg bg-[#E3EFEA] flex items-center justify-center">
                                <Activity className="w-6 h-6 text-[#10B981]" />
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-extrabold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3" /> 12%
                            </span>
                        </div>
                        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">Total Pemindaian</p>
                        <h3 className="text-3xl font-black text-[#042B1F]">{dashboardKPIData.total_scans}</h3>
                    </div>

                    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)]">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-lg bg-[#FEE2E2] flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-[#FF645A]" />
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-extrabold text-[#FF645A] bg-[#FF645A]/10 px-2.5 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3" /> 5%
                            </span>
                        </div>
                        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">Cacat Terdeteksi</p>
                        <h3 className="text-3xl font-black text-[#042B1F]">{dashboardKPIData.unnormal_scan_count}</h3>
                    </div>

                    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)]">
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

                    <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-[0_4px_25px_rgb(0,0,0,0.03)]">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                                <Users className="w-6 h-6 text-[#f59e0b]" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">Pengguna Aktif</p>
                        <h3 className="text-3xl font-black text-[#042B1F]">{dashboardKPIData.total_users}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
                    <div className="xl:col-span-2 bg-white border border-gray-100 rounded-lg p-8 drop-shadow-sm">
                        <h3 className="text-xl font-black text-[#042B1F] mb-6">
                            Aktivitas Pemindaian (7 Hari Terakhir)
                        </h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                {/*{JSON.stringify(scanTrendData)}*/}
                                <AreaChart data={scanTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                                            boxShadow:
                                                '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                        }}
                                        itemStyle={{ color: '#042B1F', fontWeight: 'bold' }}
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
                    <div className="bg-white border border-gray-100 rounded-lg p-8 drop-shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-[#042B1F]">Deteksi Terkini</h3>
                            <button
                                className="text-xs font-bold text-[#FF645A] hover:text-[#e0564e] transition-colors"
                                onClick={() => navigate('/dashboard/scans')}
                            >
                                Lihat Semua
                            </button>
                        </div>

                        <div className="flex-1 space-y-3">
                            {scanHistoryData.map((scan, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-3.5 bg-[#FAFAFA] border border-gray-100 rounded-2xl hover:border-[#10B981]/30 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-200">
                                            <ImageIcon className="w-5 h-5 text-gray-400" />
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
                                        <p className="text-[10px] font-mono font-bold text-gray-400">
                                            {scan.confidence}%
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
