import { useState, useCallback } from 'react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import AdminPageHeader from '@/components/AdminPageHeader.jsx';
import { AlertTriangle, Check, Eye, Info, Play, RefreshCw, Trash2, X } from 'lucide-react';
import { useDlqMessages, useRetryDlqMessage, useRetryAllDlqMessages, usePurgeDlq } from '@/hooks/useDlq.js';
import { useDlqSocket } from '@/hooks/useDlqSocket.js';
import { useToast } from '@/hooks/useToast.js';

export default function DLQDashboardPage() {
    const [actionLoadingId, setActionLoadingId] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const { toast, showToast, hideToast } = useToast();

    const { data: messages = [], isLoading, refetch } = useDlqMessages();
    const { mutate: retryMessage } = useRetryDlqMessage();
    const { mutate: retryAll, isPending: isRetryingAll } = useRetryAllDlqMessages();
    const { mutate: purge, isPending: isPurging } = usePurgeDlq();

    useDlqSocket(
        useCallback((data) => {
            showToast(`Peringatan: Pesan ${data.routingKey} kembali gagal dan masuk DLQ`, 'error');
        }, [showToast])
    );

    const handleRetry = (id) => {
        setActionLoadingId(id);
        retryMessage(id, {
            onSuccess: (data) => {
                showToast(data.message || 'Pesan berhasil dikirim ulang!');
            },
            onError: (error) => {
                showToast(error.response?.data?.message || 'Gagal melakukan retry pesan', 'error');
            },
            onSettled: () => {
                setActionLoadingId(null);
            }
        });
    };

    const handleRetryAll = () => {
        retryAll(undefined, {
            onSuccess: (data) => {
                showToast(data.message || 'Semua pesan berhasil dikirim ulang!');
            },
            onError: (error) => {
                showToast(error.response?.data?.message || 'Gagal melakukan retry semua pesan', 'error');
            }
        });
    };

    const handlePurge = () => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus semua pesan di DLQ? Tindakan ini tidak dapat dibatalkan.')) return;
        
        purge(undefined, {
            onSuccess: (data) => {
                showToast(data.message || 'Seluruh antrean berhasil dibersihkan!');
            },
            onError: (error) => {
                showToast(error.response?.data?.message || 'Gagal membersihkan antrean', 'error');
            }
        });
    };

    return (
        <PageWrapper>
            <div className="relative flex-1 flex flex-col overflow-y-auto px-6 py-4">
                {/* Toast Notification */}
                {toast && (
                    <div
                        className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 transform translate-y-0
                        ${
                            toast.type === 'error'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                    >
                        <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center 
                            ${toast.type === 'error' ? 'bg-red-100' : 'bg-emerald-100'}`}
                        >
                            {toast.type === 'error' ? (
                                <AlertTriangle className="w-3 h-3" />
                            ) : (
                                <Check className="w-3 h-3" />
                            )}
                        </div>
                        <span className="text-xs font-bold">{toast.message}</span>
                        <button onClick={hideToast} className="ml-2 hover:opacity-75">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <AdminPageHeader
                        title="Scan Gagal"
                        desc="Daftar pemindaian atau transaksi Anda yang tertunda atau gagal diproses oleh sistem."
                    />
                    <div className="flex items-center gap-2 self-start md:self-center">
                        <button
                            onClick={() => refetch()}
                            disabled={isLoading || isRetryingAll || isPurging}
                            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-lg transition-all shadow-[0_2px_8px_rgb(0,0,0,0.02)] disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={handleRetryAll}
                            disabled={isRetryingAll || isPurging || messages.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-[#042B1F] hover:bg-[#042B1F]/90 text-white text-xs font-bold rounded-lg transition-all shadow-[0_2px_8px_rgb(0,0,0,0.02)] disabled:opacity-50"
                        >
                            {isRetryingAll ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Play className="w-3.5 h-3.5" />
                            )}
                            Retry Semua
                        </button>
                        <button
                            onClick={handlePurge}
                            disabled={isPurging || messages.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-[#FF645A] border border-red-100 text-xs font-bold rounded-lg transition-all shadow-[0_2px_8px_rgb(0,0,0,0.02)] disabled:opacity-50"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Bersihkan Semua
                        </button>
                    </div>
                </div>

                {/* KPI Card */}
                <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-[0_4px_25px_rgb(0,0,0,0.02)] mb-6 flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center 
                        ${messages.length > 0 ? 'bg-red-50 text-[#FF645A]' : 'bg-emerald-50 text-[#10B981]'}`}
                    >
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-0.5">
                            Total Antrean Gagal
                        </p>
                        <h3 className="text-2xl font-black text-[#042B1F]">
                            {messages.length} <span className="text-sm font-normal text-gray-500">proses tertunda</span>
                        </h3>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-[0_4px_25px_rgb(0,0,0,0.02)] overflow-hidden flex-1 flex flex-col">
                    {isLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-400">
                            <RefreshCw className="w-8 h-8 animate-spin mb-3 text-gray-300" />
                            <p className="text-xs font-bold">Memuat data antrean...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-400">
                            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                                <Check className="w-8 h-8" />
                            </div>
                            <p className="text-sm font-black text-[#042B1F] mb-1">Semua Sistem Berjalan Normal</p>
                            <p className="text-xs text-gray-400">Tidak ada proses yang tertunda atau gagal saat ini.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            Tipe Proses
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            ID Referensi
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            Waktu Kejadian
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {messages.map((msg, index) => (
                                        <tr
                                            key={msg.id}
                                            className="animate-slide-in hover:bg-gray-50/40 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`px-2 py-0.5 text-[10px] font-bold rounded-full border
                                                        ${
                                                            msg.routingKey === 'payment.success'
                                                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                                : 'bg-amber-50 text-amber-700 border-amber-100'
                                                        }`}
                                                    >
                                                        {msg.routingKey}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono font-bold text-gray-700">
                                                {msg.id}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-500">
                                                {new Date(msg.timestamp).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => setSelectedMessage(msg)}
                                                        className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
                                                        title="Lihat Detail Payload"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRetry(msg.id)}
                                                        disabled={actionLoadingId === msg.id}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#042B1F] hover:bg-[#042B1F]/90 disabled:bg-gray-200 text-white disabled:text-gray-400 text-xs font-bold rounded-lg transition-all"
                                                        title="Retry Event"
                                                    >
                                                        {actionLoadingId === msg.id ? (
                                                            <RefreshCw className="w-3 h-3 animate-spin" />
                                                        ) : (
                                                            <Play className="w-3 h-3" />
                                                        )}
                                                        Retry
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modal View Payload */}
                {selectedMessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
                        <div className="bg-white border border-gray-100 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Info className="w-4.5 h-4.5 text-[#042B1F]" />
                                    <h3 className="text-sm font-black text-[#042B1F]">Detail Data Tersimpan</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto bg-gray-50 font-mono text-xs text-gray-700 flex-1">
                                <div className="mb-4">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tipe Proses:</p>
                                    <p className="font-bold text-gray-800">{selectedMessage.routingKey}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                                        Detail Data (JSON):
                                    </p>
                                    <pre className="p-3 bg-white border border-gray-200 rounded-lg overflow-x-auto text-[11px] leading-relaxed shadow-inner">
                                        {JSON.stringify(selectedMessage.content, null, 2)}
                                    </pre>
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 text-right">
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-lg transition-all"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
}
