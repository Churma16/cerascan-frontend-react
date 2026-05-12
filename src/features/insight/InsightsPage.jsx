import React from 'react';
import MainLayout from '@/layouts/MainLayout.jsx';
import { Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import AnovaCard from '@/features/insight/components/AnovaCard.jsx';
import ModelSampleCard from '@/features/insight/components/ModelSampleCard.jsx';
import ArchitectureComparisonCard from '@/features/insight/components/ArchitectureComparisonCard.jsx';

export default function InsightsPage() {
    const datasetSplit = [
        { name: 'Data Latih', value: 70, color: '#E3EFEA' },
        { name: 'Data Validasi', value: 15, color: '#FF645A' },
        { name: 'Data Uji', value: 15, color: '#10B981' },
    ];

    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-[#042B1F] mb-4 tracking-tight">
                        Insight Evaluasi Model
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Rangkuman evaluasi sistem dari 36 skenario pelatihan hyperparameter yang
                        dilakukan menggunakan VGG-19.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Generalisasi Card - Redistribusi Whitespace */}
                    <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-10 flex flex-col">
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-14 h-14 bg-[#E3EFEA] rounded-2xl flex items-center justify-center">
                                <Target className="w-7 h-7 text-[#042B1F]" />
                            </div>
                            {/* Tambahkan badge kecil di pojok untuk mengisi whitespace atas */}
                        </div>

                        <div className="flex-grow">
                            <h2 className="text-3xl font-black text-[#042B1F] mb-4 tracking-tight">
                                Generalisasi Sangat Baik
                            </h2>
                            <p className="text-sm font-medium text-gray-500 mb-12 leading-relaxed max-w-md">
                                Sistem terbukti sangat tangguh dalam mengklasifikasi 4 kelas cacat
                                (retak, noda, goresan, normal) dengan tingkat akurasi yang
                                mengesankan.
                            </p>
                        </div>

                        {/* Statistik dibuat lebih lebar untuk 'mengunci' bagian bawah */}
                        <div className="flex justify-between items-end pt-8 border-t border-gray-50">
                            <div>
                                <p className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-2 uppercase">
                                    Akurasi Uji
                                </p>
                                <p className="text-4xl font-black text-[#042B1F]">90.9%</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-2 uppercase">
                                    F1-Score
                                </p>
                                <p className="text-4xl font-black text-[#FF645A]">0.910</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-2 uppercase">
                                    Test Loss
                                </p>
                                <p className="text-4xl font-black text-gray-400">0.305</p>
                            </div>
                        </div>
                    </div>

                    {/* Dataset Card - Memadatkan Grafik agar Whitespace bernapas */}
                    <div className="lg:w-[420px] bg-[#042B1F] rounded-3xl p-10 flex flex-col items-center shadow-2xl shadow-[#042B1F]/20">
                        <div className="text-center mb-6">
                            <h3 className="text-white font-bold text-xl mb-1">Proporsi Dataset</h3>
                            <p className="text-[#a4d4c5] text-xs font-medium uppercase tracking-widest">
                                Stabilitas Model
                            </p>
                        </div>

                        {/* Perkecil h-56 jadi h-48 agar tidak terlalu mendominasi kartu */}
                        <div className="relative w-full h-48 mb-10 flex justify-center items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={datasetSplit}
                                        innerRadius={60}
                                        outerRadius={80}
                                        stroke="none"
                                        dataKey="value"
                                        paddingAngle={6}
                                    >
                                        {datasetSplit.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-[10px] text-[#a4d4c5] font-bold uppercase tracking-tighter">
                                    Total
                                </span>
                                <span className="text-lg font-black text-white leading-none">
                                    6.659
                                </span>
                            </div>
                        </div>

                        {/* Legend Stats yang lebih compact */}
                        <div className="grid grid-cols-3 gap-4 w-full bg-white/5 p-4 rounded-2xl border border-white/10">
                            <div className="text-center">
                                <p className="text-lg font-black text-white leading-none">70%</p>
                                <p className="text-[9px] text-[#a4d4c5] mt-1 uppercase font-bold">
                                    Latih
                                </p>
                            </div>
                            <div className="text-center border-x border-white/10">
                                <p className="text-lg font-black text-white leading-none">15%</p>
                                <p className="text-[9px] text-[#a4d4c5] mt-1 uppercase font-bold">
                                    Valid
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-black text-white leading-none">15%</p>
                                <p className="text-[9px] text-[#a4d4c5] mt-1 uppercase font-bold">
                                    Uji
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AnovaCard />
                        <ModelSampleCard />
                    </div>
                    <ArchitectureComparisonCard />
                </div>
            </div>
        </MainLayout>
    );
}
