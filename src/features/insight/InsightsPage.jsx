import React from 'react';
import {Clock, Layers, Lightbulb, TrendingDown, TrendingUp} from 'lucide-react';
import MainLayout from "@/layouts/MainLayout.jsx";
import OverviewCard from "@/features/insight/components/OverviewCard.jsx";
import DatasetProportionCard from "@/features/insight/components/DatasetProportionCard.jsx";
import AnovaCard from "@/features/insight/components/AnovaCard.jsx";
import ModelSampleCard from "@/features/insight/components/ModelSampleCard.jsx";

// Mock Data
const anovaFindings = [
    {faktor: 'Learning Rate', pengaruh: 28, realValue: 'ηp² = 0.28'},
    {faktor: 'Batch Size', pengaruh: 24, realValue: 'ηp² = 0.24'},
    {faktor: 'Interaksi (LR×BS)', pengaruh: 17, realValue: 'p = 0.017'},
    {faktor: 'Dropout', pengaruh: 6, realValue: 'ηp² = 0.06'},
];

const datasetSplit = [
    {name: 'Data Latih', value: 70, color: '#4f46e5'},
    {name: 'Data Validasi', value: 15, color: '#8b5cf6'},
    {name: 'Data Uji', value: 15, color: '#0ea5e9'},
];

const hyperParameterData = [
    {id: 5, batch: 16, lr: 0.01, dropout: 0.1, acc: 90.94, loss: 0.306, f1score: 0.910, isBest: true},
    {id: 21, batch: 64, lr: 0.1, dropout: 0.1, acc: 90.16, loss: 0.322, f1score: 0.901},
    {id: 8, batch: 16, lr: 0.01, dropout: 0.5, acc: 87.58, loss: 0.412, f1score: 0.874},
    {id: 10, batch: 16, lr: 0.1, dropout: 0.2, acc: 86.69, loss: 0.457, f1score: 0.869},
    {id: 23, batch: 64, lr: 0.1, dropout: 0.4, acc: 86.69, loss: 0.393, f1score: 0.864}
];

export default function InsightsPage() {
    return (
        <MainLayout>
            <div className="w-full max-w-6xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Laporan Performa Model</h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Intisari evaluasi sistem dari <strong className="text-zinc-200">36 skenario pelatihan
                        hiperparameter</strong> yang dilakukan menggunakan Convolutional Neural Network VGG-19.
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <OverviewCard/>
                        <DatasetProportionCard/>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                        <AnovaCard/>
                        <ModelSampleCard/>
                    </div>

                    <div className="bg-[#0E0F15] border border-[#262833] rounded-3xl p-8 shadow-2xl relative ">
                        <div
                            className="w-10 h-10 bg-[#1A1C26] rounded-xl flex items-center justify-center mb-4 border border-[#262833]">
                            <Layers className="w-5 h-5 text-purple-400"/>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Keputusan Arsitektur: GAP2D vs Flattening</h3>
                        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                            Berdasarkan eksperimen evaluasi model (Tabel 4.12), modifikasi menggunakan lapisan <strong>Global
                            Average Pooling 2D (GAP2D)</strong> menunjukkan performa yang secara signifikan lebih unggul
                            dibandingkan dengan pendekatan Flattening konvensional.
                        </p>

                        <div className="overflow-x-auto mb-8 rounded-2xl border border-[#262833]">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                <tr className="bg-[#13141C] border-b border-[#262833] text-zinc-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium">Lapisan (Layer)</th>
                                    <th className="px-6 py-4 font-medium">Val Loss</th>
                                    <th className="px-6 py-4 font-medium">Val Acc</th>
                                    <th className="px-6 py-4 font-medium">Precision</th>
                                    <th className="px-6 py-4 font-medium">Recall</th>
                                    <th className="px-6 py-4 font-medium">F1-Score</th>
                                    <th className="px-6 py-4 font-medium">Rata-rata Runtime</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-[#262833]">
                                <tr className="bg-emerald-500/10 transition-colors">
                                    <td className="px-6 py-5 font-bold text-emerald-400">GAP2D</td>
                                    <td className="px-6 py-5 font-mono text-emerald-300">0.3056</td>
                                    <td className="px-6 py-5 font-mono text-emerald-300">90.94%</td>
                                    <td className="px-6 py-5 font-mono text-emerald-300">0.922</td>
                                    <td className="px-6 py-5 font-mono text-emerald-300">0.908</td>
                                    <td className="px-6 py-5 font-mono text-emerald-300">0.910</td>
                                    <td className="px-6 py-5 font-mono text-emerald-400/80">~80-89s</td>
                                </tr>
                                <tr className="bg-[#0E0F15] hover:bg-[#1A1C26]/50 transition-colors">
                                    <td className="px-6 py-5 font-medium text-zinc-300">Flattening</td>
                                    <td className="px-6 py-5 font-mono text-red-400">2.0464</td>
                                    <td className="px-6 py-5 font-mono text-zinc-400">85.79%</td>
                                    <td className="px-6 py-5 font-mono text-zinc-400">0.898</td>
                                    <td className="px-6 py-5 font-mono text-zinc-400">0.858</td>
                                    <td className="px-6 py-5 font-mono text-zinc-400">0.854</td>
                                    <td className="px-6 py-5 font-mono text-zinc-500">~81-90s</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#13141C] p-6 rounded-2xl border border-[#262833]">
                                <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><TrendingUp
                                    className="w-4 h-4"/> Peningkatan Akurasi</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">Secara kuantitatif, GAP2D unggul
                                    dengan
                                    peningkatan akurasi sebesar <strong>5.15 poin</strong> dan kenaikan F1-Score
                                    sebesar <strong>6.6%</strong>.</p>
                            </div>
                            <div className="bg-[#13141C] p-6 rounded-2xl border border-[#262833]">
                                <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><TrendingDown
                                    className="w-4 h-4"/> Penurunan Loss Drastis</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">Terjadi penurunan validation loss
                                    yang
                                    sangat signifikan hingga <strong>85%</strong>, membuktikan GAP2D jauh lebih stabil
                                    dan
                                    tahan terhadap indikasi overfitting.</p>
                            </div>
                            <div className="bg-[#13141C] p-6 rounded-2xl border border-[#262833]">
                                <h4 className="text-zinc-300 font-bold mb-2 flex items-center gap-2"><Clock
                                    className="w-4 h-4"/> Efisiensi Waktu</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">Walaupun menghasilkan kinerja
                                    klasifikasi yang jauh lebih tinggi, rata-rata runtime per epoch tidak terpengaruh
                                    dan
                                    tetap identik di kisaran <strong>80 hingga 90 detik</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>

    );
}

