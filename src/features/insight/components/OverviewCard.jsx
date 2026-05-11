import {Target} from "lucide-react";
import "react";

export default function OverviewCard() {
    return (
        <div
            className="bg-[#0E0F15] border border-[#262833] rounded-3xl p-8 flex flex-col justify-between shadow-2xl md:col-span-2">
            <div>
                <div
                    className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-indigo-400"/>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Kemampuan Generalisasi Sangat
                    Baik</h3>
                <p className="text-zinc-400 leading-relaxed max-w-lg">
                    Sistem terbukti sangat tangguh dalam mengklasifikasi 4 kelas cacat (retak, noda,
                    goresan,
                    normal) dengan tingkat akurasi yang mengesankan.
                </p>
            </div>
            <div className="flex gap-8 mt-8 border-t border-[#262833] pt-6">
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Akurasi
                        Uji</p>
                    <p className="text-4xl font-black text-white">90.94%</p>
                </div>
                <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">F1-Score</p>
                    <p className="text-4xl font-black text-indigo-400">0.910</p>
                </div>
                <div className="hidden sm:block">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Test
                        Loss</p>
                    <p className="text-4xl font-black text-zinc-300">0.305</p>
                </div>
            </div>
        </div>
    )
}