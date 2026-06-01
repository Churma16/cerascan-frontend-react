import { AlertCircle, CheckCircle2, History, Image as ImageIcon } from 'lucide-react';
import { useDeleteScan, useScans } from '@/hooks/useScan.js';
import { getImageUrl, timeAgo, truncate } from '@/utils/helper.js';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import AlertButtonAndDialog from '@/components/AlertButtonDialog.jsx';

export default function ScanHistoryPage() {
    const { data: scanHistories = [], isLoading } = useScans();
    const deleteScan = useDeleteScan();

    return (
        <PageWrapper>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">Riwayat Pemindaian</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Daftar log historis dari seluruh aktivitas model VGG-19.
                    </p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]">
                    <h3 className="font-extrabold text-[#042B1F] flex items-center gap-2">
                        <History className="w-5 h-5 text-[#FF645A]" /> Data Pemrosesan Terakhir
                    </h3>
                    <button className="text-xs font-bold text-[#042B1F] bg-[#E3EFEA] hover:bg-[#d1e5dd] px-4 py-2 rounded-lg transition-colors">
                        Unduh CSV
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FAFAFA]">
                            <tr className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest border-b border-gray-100">
                                <th className="px-8 py-5">ID Referensi</th>
                                <th className="px-8 py-5">Waktu Sistem</th>
                                <th className="px-8 py-5">Nama Berkas</th>
                                <th className="px-8 py-5 text-center">Hasil Inferensi</th>
                                <th className="px-8 py-5 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-8 text-center font-medium text-gray-400">
                                        Loading...
                                    </td>
                                </tr>
                            )}
                            {Array.isArray(scanHistories) && scanHistories.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center font-medium text-gray-500">
                                        Tidak ada riwayat.
                                    </td>
                                </tr>
                            )}
                            {Array.isArray(scanHistories) &&
                                scanHistories.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5 font-mono font-bold text-[#042B1F]">{log.scan_id}</td>
                                        <td className="px-8 py-5 text-sm font-medium text-gray-500">
                                            {timeAgo(log.createdAt)}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-gray-500 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#FAFAFA] flex items-center justify-center border border-gray-100 shrink-0 overflow-hidden">
                                                {log.saved_file_name ? (
                                                    <img
                                                        src={getImageUrl(log.saved_file_name)}
                                                        alt={log.file_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <ImageIcon className="w-5 h-5 text-gray-300" />
                                                )}
                                            </div>
                                            {truncate(log.file_name, 24)}
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${log.prediction === 'normal' ? 'bg-[#E3EFEA] text-[#10B981]' : 'bg-[#FEE2E2] text-[#FF645A]'}`}
                                            >
                                                {log.prediction === 'normal' ? (
                                                    <CheckCircle2 className="w-4 h-4" />
                                                ) : (
                                                    <AlertCircle className="w-4 h-4" />
                                                )}{' '}
                                                {log.prediction}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <AlertButtonAndDialog
                                                data={log}
                                                onClick={() => deleteScan.mutate(log.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageWrapper>
    );
}
