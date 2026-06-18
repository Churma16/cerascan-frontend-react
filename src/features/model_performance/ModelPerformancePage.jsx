import { useMemo } from 'react';
import { Activity, AlertTriangle, Clock, Database } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import AdminPageHeader from '@/components/AdminPageHeader.jsx';
import { useConfidenceDistribution, useModelInsightKPI, usePredictionDistribution } from '@/hooks/useModelInsight.js';

function ModelArchitectureIllustration() {
    return (
        <>
            <div className="bg-emerald-950 rounded-xl shadow-sm overflow-hidden border border-emerald-900">
                <div className="px-6 py-4 border-b border-emerald-900 flex justify-between items-center bg-emerald-950/50">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-emerald-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                ></path>
                            </svg>
                            Arsitektur Model Aktif: VGG-19 (Custom Top)
                        </h3>
                        <p className="text-xs text-emerald-100/70 mt-1">
                            Base VGG19 + Global Average Pooling + Dense(4)
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-100">
                            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 shadow-[1px_1px_0_rgba(0,0,0,0.5)]"></span>{' '}
                            Conv
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-100">
                            <span className="w-2.5 h-2.5 rounded-sm bg-red-400 shadow-[1px_1px_0_rgba(0,0,0,0.5)]"></span>{' '}
                            Pool
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-100">
                            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 shadow-[1px_1px_0_rgba(0,0,0,0.5)]"></span>{' '}
                            GAP
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-100">
                            <span className="w-2.5 h-2.5 rounded-sm bg-teal-400 shadow-[1px_1px_0_rgba(0,0,0,0.5)]"></span>{' '}
                            Dense
                        </span>
                    </div>
                </div>
                <div className="p-6 overflow-x-auto hide-scrollbar">
                    <div className="flex items-center min-w-max gap-3 justify-center pb-2">
                        {/* Input Layer */}
                        <div className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-emerald-900 border-2 border-emerald-700 rounded-md shadow-[4px_4px_0_rgba(2,44,34,0.8)] transform -skew-y-12 transition-transform group-hover:-translate-y-2 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-emerald-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                </svg>
                            </div>
                            <span className="text-[10px] text-emerald-200/70 font-mono mt-4">224x224x3</span>
                        </div>

                        <svg
                            className="w-6 h-6 text-emerald-800 mx-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>

                        {/* Block 1 (2 Conv, 1 Pool) */}
                        <div className="flex gap-1 items-center transform -skew-y-12 group transition-transform hover:-translate-y-1 cursor-crosshair">
                            <div className="w-3 h-20 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-3 h-20 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-3 h-16 bg-red-400 rounded-sm shadow-[2px_2px_0_rgba(153,27,27,0.5)] border border-red-300/30 ml-1"></div>
                        </div>

                        <svg
                            className="w-6 h-6 text-emerald-800 mx-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>

                        {/* Block 2 (2 Conv, 1 Pool) */}
                        <div className="flex gap-1 items-center transform -skew-y-12 group transition-transform hover:-translate-y-1 cursor-crosshair">
                            <div className="w-4 h-16 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-4 h-16 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-3 h-12 bg-red-400 rounded-sm shadow-[2px_2px_0_rgba(153,27,27,0.5)] border border-red-300/30 ml-1"></div>
                        </div>

                        <svg
                            className="w-6 h-6 text-emerald-800 mx-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>

                        {/* Block 3 (4 Conv, 1 Pool) */}
                        <div className="flex gap-1 items-center transform -skew-y-12 group transition-transform hover:-translate-y-1 cursor-crosshair">
                            <div className="w-5 h-12 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-5 h-12 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-5 h-12 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-5 h-12 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-3 h-8 bg-red-400 rounded-sm shadow-[2px_2px_0_rgba(153,27,27,0.5)] border border-red-300/30 ml-1"></div>
                        </div>

                        <svg
                            className="w-6 h-6 text-emerald-800 mx-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>

                        {/* Block 4 (4 Conv, 1 Pool) */}
                        <div className="flex gap-1 items-center transform -skew-y-12 group transition-transform hover:-translate-y-1 cursor-crosshair">
                            <div className="w-6 h-8 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-6 h-8 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-6 h-8 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-6 h-8 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-3 h-6 bg-red-400 rounded-sm shadow-[2px_2px_0_rgba(153,27,27,0.5)] border border-red-300/30 ml-1"></div>
                        </div>

                        <svg
                            className="w-6 h-6 text-emerald-800 mx-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>

                        {/* Block 5 (4 Conv, 1 Pool) */}
                        <div className="flex gap-1 items-center transform -skew-y-12 group transition-transform hover:-translate-y-1 cursor-crosshair">
                            <div className="w-8 h-6 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-8 h-6 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-8 h-6 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-8 h-6 bg-emerald-400 rounded-sm shadow-[2px_2px_0_rgba(4,120,87,0.5)] border border-emerald-300/30"></div>
                            <div className="w-3 h-4 bg-red-400 rounded-sm shadow-[2px_2px_0_rgba(153,27,27,0.5)] border border-red-300/30 ml-1"></div>
                        </div>

                        <svg
                            className="w-6 h-6 text-emerald-800 mx-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>

                        {/* Top Layers (GAP + Dense) */}
                        <div className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1 mx-1">
                            <div className="h-16 w-3 bg-amber-400 rounded-sm shadow-[2px_2px_0_rgba(180,83,9,0.5)] border border-amber-300/30"></div>
                            <span className="text-[8px] text-emerald-200/70 mt-1 font-mono">GAP2D</span>
                        </div>

                        <svg
                            className="w-4 h-4 text-emerald-800 mx-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>

                        <div className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1 mx-1">
                            <div className="h-6 w-3 bg-teal-400 rounded-sm shadow-[2px_2px_0_rgba(15,118,110,0.5)] border border-teal-300/30"></div>
                            <span className="text-[8px] text-emerald-200/70 mt-1 font-mono">Dense(4)</span>
                        </div>

                        <svg
                            className="w-6 h-6 text-emerald-800 mx-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>

                        {/* Output Softmax */}
                        <div className="flex flex-col items-center">
                            <div className="px-4 py-2 bg-linear-to-r from-emerald-600 to-teal-600 border border-emerald-400/50 text-white text-xs font-bold rounded-lg shadow-lg">
                                Softmax
                            </div>
                            <div className="flex gap-1.5 mt-3">
                                <span
                                    className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                                    title="crack"
                                ></span>
                                <span
                                    className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                                    title="normal"
                                ></span>
                                <span
                                    className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                                    title="scratch"
                                ></span>
                                <span
                                    className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]"
                                    title="stain"
                                ></span>
                            </div>
                            <span className="text-[10px] text-emerald-200/70 font-mono mt-2">4 Classes</span>
                        </div>
                    </div>
                </div>
            </div>{' '}
        </>
    );
}

export default function ModelPerformancePage() {
    const { data: kpi = {}, isLoading: kpiLoading } = useModelInsightKPI();
    const { data: predictions = [], isLoading: predictionsLoading } = usePredictionDistribution();
    const { data: confidence = [], isLoading: confidenceLoading } = useConfidenceDistribution();

    const isLoading = kpiLoading || predictionsLoading || confidenceLoading;

    // Calculation for Prediction Distribution percentages
    const predictionDistributionWithPercent = useMemo(() => {
        if (!predictions || predictions.length === 0) return [];
        const total = predictions.reduce((sum, item) => sum + (item.total || 0), 0);
        return predictions.map((item) => {
            const pct = total > 0 ? Math.round((item.total / total) * 100) : 0;
            let displayName = item.prediction;
            let displaySub = item.prediction.toLowerCase();
            let color = '#3B82F6'; // default blue

            if (item.prediction === 'Normal') {
                displayName = 'Normal';
                displaySub = 'normal';
                color = '#10B981'; // Green
            } else if (item.prediction === 'Crack') {
                displayName = 'Retak';
                displaySub = 'crack';
                color = '#FF645A'; // Red/Coral
            } else if (item.prediction === 'Stain') {
                displayName = 'Noda';
                displaySub = 'stain';
                color = '#F97316'; // Orange
            } else if (item.prediction === 'Scratch') {
                displayName = 'Goresan';
                displaySub = 'scratch';
                color = '#3B82F6'; // Blue
            }

            return {
                ...item,
                displayName,
                displaySub,
                percent: pct,
                color,
            };
        });
    }, [predictions]);

    // Data mapping for Confidence Distribution chart
    const chartData = useMemo(() => {
        if (!confidence || confidence.length === 0) return [];
        const colors = {
            '<60%': '#FF645A', // Red
            '60-80%': '#F97316', // Orange
            '80-90%': '#60A5FA', // Light blue
            '90-95%': '#34D399', // Soft green
            '>95%': '#059669', // Deep green
        };

        return confidence.map((item) => ({
            name: item.confidenceRanges,
            total: item.total || 0,
            fill: colors[item.confidenceRanges] || '#3B82F6',
        }));
    }, [confidence]);

    if (isLoading) {
        return (
            <PageWrapper>
                <AdminPageHeader title="Performa Model" desc="Memuat data performa model..." />
                <div className="flex items-center justify-center min-h-80">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#10B981]"></div>
                </div>
            </PageWrapper>
        );
    }

    const avgInference = kpi.averageInference ? Math.round(Number(kpi.averageInference)) : 0;
    const isInferenceOptimal = avgInference <= 500;

    return (
        <PageWrapper>
            <AdminPageHeader
                title="Performa Model"
                desc="Analisis akurasi model, efisiensi inferensi, dan statistik distribusi prediksi."
            />
            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {/* Average Accuracy Card */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#E3EFEA] flex items-center justify-center">
                                <Activity className="w-5 h-5 text-[#10B981]" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                            Rata-rata Akurasi
                        </p>
                        <h3 className="text-3xl font-black text-[#042B1F]">
                            {kpi.averageAccuracy ? `${Number(kpi.averageAccuracy).toFixed(1)}%` : '0.0%'}
                        </h3>
                    </div>
                    <p className="text-[11px] font-semibold text-[#10B981] mt-3">Target: &gt;95% (Sangat Baik)</p>
                </div>

                {/* Inference Time Card */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${isInferenceOptimal ? 'bg-[#E3EFEA]' : 'bg-[#FF645A]/10'}`}
                            >
                                <Clock
                                    className={`w-5 h-5 ${isInferenceOptimal ? 'text-[#10B981]' : 'text-[#FF645A]'}`}
                                />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                            Waktu Inferensi (Rata-rata)
                        </p>
                        <h3 className="text-3xl font-black text-[#042B1F]">
                            {avgInference} <span className="text-lg font-bold text-gray-500">ms</span>
                        </h3>
                    </div>
                    <p
                        className={`text-[11px] font-semibold mt-3 ${isInferenceOptimal ? 'text-[#10B981]' : 'text-[#FF645A]'}`}
                    >
                        {isInferenceOptimal ? 'Optimal, di bawah 500ms' : 'Kurang optimal, di atas 500ms'}
                    </p>
                </div>

                {/* Total Scan Card */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#EAEAEA] flex items-center justify-center">
                                <Database className="w-5 h-5 text-gray-500" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                            Total Scan Diproses
                        </p>
                        <h3 className="text-3xl font-black text-[#042B1F]">{kpi.totalScan || 0}</h3>
                    </div>
                    <p className="text-[11px] font-semibold text-gray-400 mt-3">Data 30 hari terakhir</p>
                </div>

                {/* Doubtful Predictions Card */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-[#F97316]" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">
                            Prediksi Meragukan
                        </p>
                        <h3 className="text-3xl font-black text-[#F97316]">{kpi.unConfidentScanCount || 0}</h3>
                    </div>
                    <p className="text-[11px] font-semibold text-[#F97316] mt-3">Confidence &lt; 80%</p>
                </div>
            </div>
            <ModelArchitectureIllustration />
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Column 1: Prediction Class Distribution */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col">
                    <h3 className="text-lg font-bold text-[#042B1F] mb-6">Distribusi Kelas Prediksi</h3>
                    <div className="flex-1 space-y-6">
                        {predictionDistributionWithPercent.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-gray-700">
                                        {item.displayName}{' '}
                                        <span className="text-gray-400 font-normal">({item.displaySub})</span>
                                    </span>
                                    <span className="font-bold text-gray-500">{item.percent}%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${item.percent}%`,
                                            backgroundColor: item.color,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Confidence Level Distribution */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col">
                    <h3 className="text-lg font-bold text-[#042B1F] mb-6">Distribusi Confidence Level</h3>
                    <div className="relative w-full flex-1 min-h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    fontWeight={600}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    fontWeight={600}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #f3f4f6',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    }}
                                    itemStyle={{ color: '#042B1F', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="total" radius={[8, 8, 0, 0]} barSize={48}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
