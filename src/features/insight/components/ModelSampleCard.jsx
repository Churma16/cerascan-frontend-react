import { Lightbulb } from 'lucide-react';
import React from 'react';

const hyperParameterData = [
    {
        id: 5,
        batch: 16,
        lr: 0.01,
        dropout: 0.1,
        acc: 90.94,
        loss: 0.306,
        f1score: 0.91,
        isBest: true,
    },
    { id: 21, batch: 64, lr: 0.1, dropout: 0.1, acc: 90.16, loss: 0.322, f1score: 0.901 },
    { id: 8, batch: 16, lr: 0.01, dropout: 0.5, acc: 87.58, loss: 0.412, f1score: 0.874 },
    { id: 10, batch: 16, lr: 0.1, dropout: 0.2, acc: 86.69, loss: 0.457, f1score: 0.869 },
    { id: 23, batch: 64, lr: 0.1, dropout: 0.4, acc: 86.69, loss: 0.393, f1score: 0.864 },
];

export default function ModelSampleCard() {
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-[0_4px_25px_rgb(0,0,0,0.04)] flex flex-col h-full">
            <div className="w-12 h-12 bg-[#FF645A]/10 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-[#FF645A]" />
            </div>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-black text-[#042B1F] mb-1">
                        Sampel Model (Top 5 dari 36)
                    </h3>
                    <p className="text-sm font-medium text-gray-400">
                        Pengujian dibatasi otomatis berkat fitur Early Stopping.
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto flex-1 mt-2">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-[10px] font-extrabold uppercase tracking-wider">
                            <th className="pb-3 text-end">Batch</th>
                            <th className="pb-3 text-right">LR</th>
                            <th className="pb-3 text-right">DO</th>
                            <th className="pb-3 text-right">Loss</th>
                            <th className="pb-3 text-right">F1-Score</th>
                            <th className="pb-3 text-right">Akurasi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {hyperParameterData.map((h) => (
                            <tr
                                key={h.id}
                                className={`${h.isBest ? 'bg-[#E3EFEA]/40' : 'hover:bg-gray-50'} transition-colors`}
                            >
                                <td className="py-4 font-mono font-semibold text-gray-600 flex items-center justify-end gap-2">
                                    {h.isBest && (
                                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                                    )}
                                    {h.batch}
                                </td>
                                <td className="py-4 text-right font-mono text-gray-500 font-medium">
                                    {h.lr}
                                </td>
                                <td className="py-4 text-right font-mono text-gray-500 font-medium">
                                    {h.dropout}
                                </td>
                                <td className="py-4 text-right font-mono text-gray-400">
                                    {h.loss.toFixed(3)}
                                </td>
                                <td
                                    className={`py-4 text-right font-bold ${h.isBest ? 'text-[#10B981]' : 'text-gray-600'}`}
                                >
                                    {h.f1score}
                                </td>
                                <td
                                    className={`py-4 text-right font-bold ${h.isBest ? 'text-[#10B981]' : 'text-gray-600'}`}
                                >
                                    {h.acc}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
