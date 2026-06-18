import { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import { usePublicScans } from '@/hooks/useScan.js';

import HistoryCard from './components/HistoryCard';
import PageHeader from '@/components/PageHeader.jsx';
import PaginationPill from '@/components/PaginationPill.jsx';

export default function HistoryPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
    const { data: scansResponse, isLoading } = usePublicScans(currentPage, limit);

    const scanHistories = scansResponse?.data || [];
    const meta = scansResponse?.meta || {};
    const totalPages = meta.totalPages || 1;
    const totalItems = meta.totalItems || 0;

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    return (
        <div className="w-full max-w-4xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
            <PageHeader title="Riwayat Scan Keramik" desc="Riwayat deteksi keramik yang beroperasi secara realtime" />

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-extrabold text-[#042B1F] flex items-center gap-2">
                        <History className="w-5 h-5 text-[#FF645A]" /> Riwayat Deteksi
                    </h3>
                    {totalItems > 0 && (
                        <span className="text-xs font-semibold text-gray-400">
                            {totalItems} total hasil
                        </span>
                    )}
                </div>

                <div className="space-y-4">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <div className="w-8 h-8 rounded-full border-2 border-[#042B1F] border-t-transparent animate-spin" />
                            <p className="text-sm font-medium text-gray-400">Memuat data...</p>
                        </div>
                    )}

                    {!isLoading && scanHistories.length === 0 && (
                        <div className="text-center py-10 text-gray-400 font-medium bg-white rounded-lg border border-gray-100">
                            Belum ada riwayat deteksi.
                        </div>
                    )}

                    {scanHistories.map((log) => (
                        <HistoryCard key={log.id} log={log} />
                    ))}
                </div>

                {!isLoading && (
                    <PaginationPill
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
}

