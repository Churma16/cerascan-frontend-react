import AdminMainLayout from '@/layouts/AdminMainLayout.jsx';
import React, { useState } from 'react';
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    Download,
    Image as ImageIcon,
    TrendingUp,
    Users,
} from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import PageWrapper from '@/layouts/PageWrapper.jsx';

// --- MOCK DATA ---
const weeklyActivityData = [
    { day: 'Sen', total: 120, defect: 15 },
    { day: 'Sel', total: 180, defect: 22 },
    { day: 'Rab', total: 250, defect: 45 },
    { day: 'Kam', total: 210, defect: 30 },
    { day: 'Jum', total: 290, defect: 50 },
    { day: 'Sab', total: 150, defect: 10 },
    { day: 'Min', total: 90, defect: 5 },
];

const recentScans = [
    {
        id: 'SCN-8821',
        time: '10:45 AM',
        status: 'Retak',
        conf: 89.4,
        user: 'Budi (QC)',
    },
    {
        id: 'SCN-8820',
        time: '10:30 AM',
        status: 'Normal',
        conf: 98.2,
        user: 'API Key #1',
    },
    {
        id: 'SCN-8819',
        time: '09:15 AM',
        status: 'Bernoda',
        conf: 92.1,
        user: 'Siti (SPV)',
    },
    {
        id: 'SCN-8818',
        time: '08:50 AM',
        status: 'Normal',
        conf: 99.1,
        user: 'Budi (QC)',
    },
];
export default function DashboardPage() {
    const [activeMenu, setActiveMenu] = useState('overview');

    return (
        <AdminMainLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
            <PageWrapper>
                {/* --- KONTEN OVERVIEW (Contoh Halaman) --- */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header Konten */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white">
                                Selamat Datang, Admin
                            </h2>
                            <p className="text-sm text-zinc-400 mt-1">
                                Berikut adalah ringkasan performa lini inspeksi hari ini.
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-[#1A1C26] hover:bg-[#262833] border border-[#262833] text-zinc-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                            <Download className="w-4 h-4" /> Unduh Laporan
                        </button>
                    </div>

                    {/* 4 Kartu Metrik */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {/* Kartu 1 */}
                        <div className="bg-[#0E0F15] border border-[#262833] p-5 rounded-2xl shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-indigo-400" />
                                </div>
                                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                    <TrendingUp className="w-3 h-3" /> 12%
                                </span>
                            </div>
                            <p className="text-sm font-medium text-zinc-500 mb-1">
                                Total Pemindaian
                            </p>
                            <h3 className="text-2xl font-bold text-white">1,290</h3>
                        </div>

                        {/* Kartu 2 */}
                        <div className="bg-[#0E0F15] border border-[#262833] p-5 rounded-2xl shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                </div>
                                <span className="flex items-center gap-1 text-xs font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                                    <TrendingUp className="w-3 h-3" /> 5%
                                </span>
                            </div>
                            <p className="text-sm font-medium text-zinc-500 mb-1">
                                Cacat Terdeteksi
                            </p>
                            <h3 className="text-2xl font-bold text-white">177</h3>
                        </div>

                        {/* Kartu 3 */}
                        <div className="bg-[#0E0F15] border border-[#262833] p-5 rounded-2xl shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                            </div>
                            <p className="text-sm font-medium text-zinc-500 mb-1">
                                Rata-rata Akurasi (AI)
                            </p>
                            <h3 className="text-2xl font-bold text-white">96.8%</h3>
                        </div>

                        {/* Kartu 4 */}
                        <div className="bg-[#0E0F15] border border-[#262833] p-5 rounded-2xl shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-amber-400" />
                                </div>
                            </div>
                            <p className="text-sm font-medium text-zinc-500 mb-1">Pengguna Aktif</p>
                            <h3 className="text-2xl font-bold text-white">24</h3>
                        </div>
                    </div>

                    {/* Grafik & Aktivitas Terakhir */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                        {/* Grafik Aktivitas Mingguan */}
                        <div className="xl:col-span-2 bg-[#0E0F15] border border-[#262833] rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-6">
                                Aktivitas Pemindaian (7 Hari Terakhir)
                            </h3>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={weeklyActivityData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorTotal"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#6366f1"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#6366f1"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                            <linearGradient
                                                id="colorDefect"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#ef4444"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#ef4444"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#262833"
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="day"
                                            stroke="#71717a"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#71717a"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#13141C',
                                                border: '1px solid #262833',
                                                borderRadius: '8px',
                                            }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="total"
                                            name="Total Scan"
                                            stroke="#6366f1"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorTotal)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="defect"
                                            name="Cacat"
                                            stroke="#ef4444"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorDefect)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Tabel Aktivitas Singkat */}
                        <div className="bg-[#0E0F15] border border-[#262833] rounded-2xl p-6 shadow-lg flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white">Deteksi Terkini</h3>
                                <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
                                    Lihat Semua
                                </button>
                            </div>

                            <div className="flex-1 space-y-4">
                                {recentScans.map((scan, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-3 bg-[#13141C] border border-[#262833] rounded-xl hover:border-indigo-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#1A1C26] flex items-center justify-center border border-[#262833]">
                                                <ImageIcon className="w-5 h-5 text-zinc-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-zinc-200 font-mono">
                                                    {scan.id}
                                                </p>
                                                <p className="text-[10px] text-zinc-500">
                                                    {scan.time} • oleh {scan.user}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border mb-1 ${
                                                    scan.status === 'Normal'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                }`}
                                            >
                                                {scan.status}
                                            </span>
                                            <p className="text-[10px] font-mono text-zinc-400">
                                                {scan.conf}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </AdminMainLayout>
    );
}
