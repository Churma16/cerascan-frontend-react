import {Lightbulb} from "lucide-react";
import React from "react";

const hyperParameterData = [
    {id: 5, batch: 16, lr: 0.01, dropout: 0.1, acc: 90.94, loss: 0.306, f1score: 0.910, isBest: true},
    {id: 21, batch: 64, lr: 0.1, dropout: 0.1, acc: 90.16, loss: 0.322, f1score: 0.901},
    {id: 8, batch: 16, lr: 0.01, dropout: 0.5, acc: 87.58, loss: 0.412, f1score: 0.874},
    {id: 10, batch: 16, lr: 0.1, dropout: 0.2, acc: 86.69, loss: 0.457, f1score: 0.869},
    {id: 23, batch: 64, lr: 0.1, dropout: 0.4, acc: 86.69, loss: 0.393, f1score: 0.864}
];

export default function ModelSampleCard() {
    return (
        <div className="bg-[#0E0F15] border border-[#262833] rounded-3xl p-8 shadow-2xl flex flex-col">
            <div
                className="w-10 h-10 bg-[#1A1C26] rounded-xl flex items-center justify-center mb-4 border border-[#262833]">
                <Lightbulb className="w-5 h-5 text-amber-400"/>
            </div>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sampel Model (Top 5 dari 36)</h3>
                    <p className="text-sm text-zinc-400">Pengujian dibatasi otomatis berkat fitur Early
                        Stopping
                        pada epoch 15.</p>
                </div>
            </div>

            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                    <tr className="border-b border-[#262833] text-zinc-500 text-xs uppercase tracking-wider">
                        <th className="pb-4 font-medium">Batch</th>
                        <th className="pb-4 font-medium text-right">LR</th>
                        <th className="pb-4 font-medium text-right">Dropout</th>
                        <th className="pb-4 font-medium text-right">Loss</th>
                        <th className="pb-4 font-medium text-right">F1-Score</th>

                        <th className="pb-4 font-medium text-right">Akurasi</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262833]">
                    {hyperParameterData.map(h => (
                        <tr key={h.id}
                            className={`${h.isBest ? 'bg-indigo-500/10' : 'hover:bg-[#1A1C26]/50'} transition-colors`}>
                            <td className="py-3.5 font-mono text-zinc-300">
                                {h.isBest && <span
                                    className="mr-2 inline-block w-2 h-2 rounded-full bg-emerald-500"></span>}
                                {h.batch}
                            </td>
                            <td className="py-3.5 text-right font-mono text-zinc-300">{h.lr}</td>
                            <td className="py-3.5 text-right font-mono text-zinc-300">{h.dropout}</td>
                            <td className="py-3.5 text-right font-mono text-zinc-400">{h.loss.toFixed(4)}</td>
                            <td className={`py-3.5 text-right font-medium ${h.isBest ? 'text-indigo-400 font-bold' : 'text-white'}`}>
                                {h.f1score}
                            </td>
                            <td className={`py-3.5 text-right font-medium ${h.isBest ? 'text-indigo-400 font-bold' : 'text-white'}`}>
                                {h.acc}%
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}