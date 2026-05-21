import { Clock, Layers, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import CardWrapper from '@/features/insight/components/CardWrapper.jsx';

export default function ArchitectureComparisonCard() {
    return (
        <CardWrapper>
            <div className="w-12 h-12 bg-[#E3EFEA] rounded-xl flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-[#042B1F]" />
            </div>
            <h3 className="text-xl font-black text-[#042B1F] mb-4">Keputusan Arsitektur: GAP2D vs Flattening</h3>
            <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
                Berdasarkan eksperimen evaluasi model (Tabel 4.12), modifikasi menggunakan lapisan{' '}
                <strong className="text-[#042B1F]">Global Average Pooling 2D (GAP2D)</strong> menunjukkan performa yang
                secara signifikan lebih unggul dibandingkan dengan pendekatan Flattening konvensional.
            </p>

            <div className="overflow-x-auto mb-8 rounded-2xl border border-gray-100 bg-[#FAFAFA]">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-extrabold uppercase tracking-wider">
                            <th className="px-6 py-4">Lapisan (Layer)</th>
                            <th className="px-6 py-4">Val Loss</th>
                            <th className="px-6 py-4">Val Acc</th>
                            <th className="px-6 py-4">Precision</th>
                            <th className="px-6 py-4">Recall</th>
                            <th className="px-6 py-4">F1-Score</th>
                            <th className="px-6 py-4">Rata-rata Runtime</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="bg-white transition-colors">
                            <td className="px-6 py-5 font-bold text-[#10B981]">GAP2D</td>
                            <td className="px-6 py-5 font-mono text-[#042B1F] font-semibold">0.3056</td>
                            <td className="px-6 py-5 font-mono text-[#042B1F] font-semibold">90.94%</td>
                            <td className="px-6 py-5 font-mono text-[#042B1F] font-semibold">0.922</td>
                            <td className="px-6 py-5 font-mono text-[#042B1F] font-semibold">0.908</td>
                            <td className="px-6 py-5 font-mono text-[#042B1F] font-semibold">0.910</td>
                            <td className="px-6 py-5 font-mono text-gray-500 font-medium">~80-89s</td>
                        </tr>
                        <tr className="bg-transparent hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-5 font-bold text-gray-500">Flattening</td>
                            <td className="px-6 py-5 font-mono text-gray-400">2.0464</td>
                            <td className="px-6 py-5 font-mono text-gray-400">85.79%</td>
                            <td className="px-6 py-5 font-mono text-gray-400">0.898</td>
                            <td className="px-6 py-5 font-mono text-gray-400">0.858</td>
                            <td className="px-6 py-5 font-mono text-gray-400">0.854</td>
                            <td className="px-6 py-5 font-mono text-gray-400">~81-90s</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-100">
                    <h4 className="text-[#10B981] font-bold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" /> Peningkatan Akurasi
                    </h4>
                    <p className="text-xs font-medium text-gray-500 leading-relaxed">
                        Secara kuantitatif, GAP2D unggul dengan peningkatan akurasi sebesar{' '}
                        <strong className="text-[#042B1F]">5.15 poin</strong> dan kenaikan F1-Score sebesar{' '}
                        <strong className="text-[#042B1F]">6.6%</strong>.
                    </p>
                </div>
                <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-100">
                    <h4 className="text-[#FF645A] font-bold mb-3 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" /> Penurunan Loss Drastis
                    </h4>
                    <p className="text-xs font-medium text-gray-500 leading-relaxed">
                        Terjadi penurunan validation loss yang sangat signifikan hingga{' '}
                        <strong className="text-[#042B1F]">85%</strong>, membuktikan GAP2D jauh lebih stabil dan tahan
                        terhadap indikasi overfitting.
                    </p>
                </div>
                <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-100">
                    <h4 className="text-gray-600 font-bold mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5" /> Efisiensi Waktu
                    </h4>
                    <p className="text-xs font-medium text-gray-500 leading-relaxed">
                        Walaupun menghasilkan kinerja klasifikasi yang jauh lebih tinggi, rata-rata runtime per epoch
                        tidak terpengaruh dan tetap identik di kisaran{' '}
                        <strong className="text-[#042B1F]">80 hingga 90 detik</strong>.
                    </p>
                </div>
            </div>
        </CardWrapper>
    );
}
