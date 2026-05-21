import React from 'react';
import { History } from 'lucide-react';
import { useScans } from '@/hooks/useScan.js';

// Import komponen HistoryCard
import HistoryCard from './components/HistoryCard';

export default function HistoryPage() {
    const { data: scanHistories = [], isLoading } = useScans();

    return (
        <div className="w-full max-w-4xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-[#042B1F] mb-4 tracking-tight">
                    Riwayat Scan Keramik
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                    Riwayat dekteksi keramik yang beroperasi secara realtime
                </p>
            </div>

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-extrabold text-[#042B1F] flex items-center gap-2">
                        <History className="w-5 h-5 text-[#FF645A]" /> Riwayat Deteksi
                    </h3>
                    {/*<button className="text-xs font-bold text-[#042B1F] bg-[#E3EFEA] hover:bg-[#d1e5dd] px-4 py-2 rounded-lg transition-colors">*/}
                    {/*    Unduh CSV*/}
                    {/*</button>*/}
                </div>

                <div className="space-y-4">
                    {isLoading && <div className="text-center py-10 text-gray-400 font-medium">Loading data...</div>}

                    {!isLoading && Array.isArray(scanHistories) && scanHistories.length === 0 && (
                        <div className="text-center py-10 text-gray-400 font-medium bg-white rounded-lg border border-gray-100">
                            Belum ada riwayat deteksi.
                        </div>
                    )}

                    {Array.isArray(scanHistories) && scanHistories.map((log) => <HistoryCard key={log.id} log={log} />)}
                </div>
            </div>
        </div>
    );
}
