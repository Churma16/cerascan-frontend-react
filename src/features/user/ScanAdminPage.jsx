import React from 'react';
import {AlertCircle, CheckCircle2, History, Image as ImageIcon, Trash2} from 'lucide-react';
import MainLayout from "@/layouts/MainLayout.jsx";
import {useScans} from "@/hooks/useScan.js";
import {truncate, timeAgo, getImageUrl} from "@/utils/helper.js";
import AdminMainLayout from "@/layouts/AdminMainLayout.jsx";
import PageWrapper from "@/layouts/PageWrapper.jsx";

export default function ScanAdminPage() {
    const {data: scanHistories = [], isLoading} = useScans();

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus log pemindaian ini?")) {
            // TODO: Implementasi delete via API
            console.log("Delete scan with id:", id);
        }
    };

    return (
        <AdminMainLayout>
            <PageWrapper>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">Riwayat Pemindaian</h2>
                        <p className="text-sm text-zinc-400 mt-1">Daftar log historis dari seluruh aktivitas model VGG-19.</p>
                    </div>
                </div>

            <div className="bg-[#0E0F15] border border-[#262833] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-[#262833] flex justify-between items-center bg-[#13141C]">
                    <h3 className="font-semibold text-white flex items-center gap-2"><History
                        className="w-5 h-5 text-indigo-400"/> Data Pemrosesan Terakhir</h3>
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">Unduh CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#090A0F]">
                        <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-[#262833]">
                            <th className="px-6 py-5 font-medium">ID Referensi</th>
                            <th className="px-6 py-5 font-medium">Waktu Sistem</th>
                            <th className="px-6 py-5 font-medium">Nama Berkas</th>
                            <th className="px-6 py-5 font-medium">Hasil Inferensi</th>
                            <th className="px-6 py-5 font-medium text-center">Aksi</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[#262833]">
                        {isLoading && (
                            <tr>
                                <td colSpan="5" className="px-6 py-5 text-center text-zinc-400">Loading...</td>
                            </tr>
                        )}
                        {Array.isArray(scanHistories) && scanHistories.length === 0 && !isLoading && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-zinc-500">Tidak ada riwayat.</td>
                            </tr>
                        )}
                        {Array.isArray(scanHistories) && scanHistories.map((log) => (
                            <tr key={log.id} className="hover:bg-[#1A1C26]/50 transition-colors">
                                <td className="px-6 py-5 font-mono text-sm text-zinc-300">{log.scan_id}</td>
                                <td className="px-6 py-5 text-sm text-zinc-400">{timeAgo(log.createdAt)}</td>
                                <td className="px-6 py-5 text-sm text-zinc-400 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-[#1A1C26] flex items-center justify-center border border-[#262833] flex-shrink-0 overflow-hidden">
                                        {log.saved_file_name ? (
                                            <img
                                                src={getImageUrl(log.saved_file_name)}
                                                alt={log.file_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="w-4 h-4 text-zinc-500"/>
                                        )}
                                    </div>
                                    {truncate(log.file_name, 24)}
                                </td>
                                <td className="px-6 py-5">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${log.prediction === 'normal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                      {log.prediction === 'normal' ? <CheckCircle2 className="w-3.5 h-3.5"/> :
                                          <AlertCircle className="w-3.5 h-3.5"/>} {log.prediction}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <button onClick={() => handleDelete(log.id)}
                                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors">
                                        <Trash2 className="w-4 h-4"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </PageWrapper>
        </AdminMainLayout>
    );
}
