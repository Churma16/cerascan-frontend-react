import React from 'react';
import { Target } from 'lucide-react';

export default function GeneralizationMetricsCard() {
    return (
        <div className="flex-1 bg-white border border-gray-100 rounded-lg p-10 flex flex-col shadow-[0_4px_25px_rgb(0,0,0,0.04)]">
            <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 bg-[#E3EFEA] rounded-2xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-[#042B1F]" />
                </div>
            </div>

            <div className="flex-grow">
                <h2 className="text-3xl font-black text-[#042B1F] mb-4 tracking-tight">
                    Generalisasi Sangat Baik
                </h2>
                <p className="text-sm font-medium text-gray-500 mb-12 leading-relaxed max-w-md">
                    Sistem terbukti sangat tangguh dalam mengklasifikasi 4 kelas cacat (retak, noda,
                    goresan, normal) dengan tingkat akurasi yang mengesankan.
                </p>
            </div>

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
    );
}
