import React from 'react';
import {AlertCircle, CheckCircle2, History, Image as ImageIcon} from 'lucide-react';
import MainLayout from "@/layouts/MainLayout.jsx";
import {useScans} from "@/hooks/useScan.js";
import {truncate, timeAgo} from "@/utils/helper.js";

export default function HistoryPage() {
    const {data: scanHistories = [], isLoading} = useScans();
    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 animate-in fade-in duration-500">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Log Pemindaian Terbuka</h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Transparansi adalah kunci. Berikut adalah catatan publik dari sistem inferensi kami yang
                        beroperasi secara real-time.
                    </p>
                </div>

                <div className="bg-[#0E0F15] border border-[#262833] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-[#262833] flex justify-between items-center bg-[#13141C]">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <History className="w-5 h-5 text-indigo-400"/> Data Pemrosesan Terakhir
                        </h3>
                        <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">Unduh CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#090A0F]">
                            <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-[#262833]">
                                <th className="px-8 py-5 font-medium">ID Referensi</th>
                                <th className="px-8 py-5 font-medium">Waktu Sistem</th>
                                <th className="px-8 py-5 font-medium">Nama Berkas</th>
                                <th className="px-8 py-5 font-medium">Hasil Inferensi</th>
                                <th className="px-8 py-5 font-medium text-right">Kepercayaan</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262833]">
                            {isLoading && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-5 text-center text-zinc-400">Loading...</td>
                                </tr>
                            )}
                            {Array.isArray(scanHistories) && scanHistories.map((log) => (
                                <tr key={log.id} className="hover:bg-[#1A1C26]/50 transition-colors">
                                    <td className="px-8 py-5 font-mono text-sm text-zinc-300">{log.scan_id}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-400">{timeAgo(log.createdAt)}</td>
                                    <td className="px-8 py-5 text-sm text-zinc-400 flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded bg-[#1A1C26] flex items-center justify-center border border-[#262833]">
                                            <ImageIcon className="w-4 h-4 text-zinc-500"/>
                                        </div>
                                        {truncate(log.file_name, 24)}
                                    </td>
                                    <td className="px-8 py-5">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${log.prediction === 'Normal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                          {log.prediction === 'Normal' ? <CheckCircle2 className="w-3.5 h-3.5"/> :
                                              <AlertCircle className="w-3.5 h-3.5"/>} {log.prediction}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-mono text-right font-medium text-white">{log.confidence}%</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}