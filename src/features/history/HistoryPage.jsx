import React from 'react';
import { AlertCircle, CheckCircle2, History, Image as ImageIcon } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout.jsx';
import { useScans } from '@/hooks/useScan.js';
import { truncate, timeAgo, getImageUrl } from '@/utils/helper.js';

export default function HistoryPage() {
    const { data: scanHistories = [], isLoading } = useScans();
    return (
        <MainLayout>
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
                            <History className="w-5 h-5 text-[#FF645A]" /> Data Pemrosesan Terakhir
                        </h3>
                        <button className="text-xs font-bold text-[#042B1F] bg-[#E3EFEA] hover:bg-[#d1e5dd] px-4 py-2 rounded-lg transition-colors">
                            Unduh CSV
                        </button>
                    </div>

                    <div className="space-y-4">
                        {isLoading && (
                            <div className="text-center py-10 text-gray-400 font-medium">
                                Loading data...
                            </div>
                        )}
                        {Array.isArray(scanHistories) &&
                            scanHistories.map((log) => (
                                <div
                                    key={log.id}
                                    className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow"
                                >
                                    <div className="w-16 h-16 rounded-xl bg-[#FAFAFA] border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden mr-5">
                                        {log.saved_file_name ? (
                                            <img
                                                src={getImageUrl(log.saved_file_name)}
                                                alt={log.file_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-gray-300" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-[#042B1F] font-black text-lg sm:text-xl mb-0.5">
                                            {log.scan_id}
                                        </h4>
                                        <div className="text-sm font-medium text-gray-400 mb-0.5">
                                            {truncate(log.file_name, 24)}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {timeAgo(log.createdAt)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <div
                                            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold ${log.prediction === 'normal' ? 'bg-[#E3EFEA] text-[#10B981]' : 'bg-[#FEE2E2] text-[#FF645A]'}`}
                                        >
                                            {log.prediction === 'normal' ? (
                                                <CheckCircle2 className="w-4 h-4" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4" />
                                            )}
                                            <span className="capitalize">{log.prediction}</span>
                                        </div>
                                        <div className="text-[10px] font-extrabold text-gray-400 tracking-wider">
                                            AKURASI: {log.confidence || 0}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
