import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function DatasetProportionCard() {
    const datasetSplit = [
        { name: 'Data Latih', value: 70, color: '#E3EFEA' },
        { name: 'Data Validasi', value: 15, color: '#FF645A' },
        { name: 'Data Uji', value: 15, color: '#10B981' },
    ];

    return (
        <div className="lg:w-105 bg-[#042B1F] rounded-lg p-10 flex flex-col items-center shadow-2xl shadow-[#042B1F]/20">
            <div className="text-center mb-6">
                <h3 className="text-white font-bold text-xl mb-1">Proporsi Dataset</h3>
                <p className="text-[#a4d4c5] text-xs font-medium uppercase tracking-widest">Stabilitas Model</p>
            </div>

            <div className="relative w-full h-48 mb-10 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={datasetSplit}
                            innerRadius={60}
                            outerRadius={80}
                            stroke="none"
                            dataKey="value"
                            paddingAngle={6}
                        >
                            {datasetSplit.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] text-[#a4d4c5] font-bold uppercase tracking-tighter">Total</span>
                    <span className="text-lg font-black text-white leading-none">6.659</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-center">
                    <p className="text-lg font-black text-white leading-none">70%</p>
                    <p className="text-[9px] text-[#a4d4c5] mt-1 uppercase font-bold">Latih</p>
                </div>
                <div className="text-center border-x border-white/10">
                    <p className="text-lg font-black text-white leading-none">15%</p>
                    <p className="text-[9px] text-[#a4d4c5] mt-1 uppercase font-bold">Valid</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-black text-white leading-none">15%</p>
                    <p className="text-[9px] text-[#a4d4c5] mt-1 uppercase font-bold">Uji</p>
                </div>
            </div>
        </div>
    );
}
