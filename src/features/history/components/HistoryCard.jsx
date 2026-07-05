import React from 'react';
import { AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { getImageUrl, timeAgo, truncate } from '@/utils/helper.js';

export default function HistoryCard({ log }) {
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-4 flex items-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow">
            <div className="w-16 h-16 rounded-xl bg-[#FAFAFA] border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden mr-5">
                {log.saved_file_name || log.file_url ? (
                    <img
                        src={log.file_url || getImageUrl(log.saved_file_name)}
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
                <div className="text-xs text-gray-400">{timeAgo(log.createdAt)}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <div
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold ${
                        log.prediction === 'normal'
                            ? 'bg-[#E3EFEA] text-[#10B981]'
                            : 'bg-[#FEE2E2] text-[#FF645A]'
                    }`}
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
    );
}
