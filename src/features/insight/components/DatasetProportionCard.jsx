import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import React from "react";

const datasetSplit = [
    {name: 'Data Latih', value: 70, color: '#4f46e5'},
    {name: 'Data Validasi', value: 15, color: '#8b5cf6'},
    {name: 'Data Uji', value: 15, color: '#0ea5e9'},
];

export default function DatasetProportionCard() {
    return (
        <div
            className="bg-[#0E0F15] border border-[#262833] rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center justify-center">
            <h3 className="text-lg font-bold text-white mb-1">Proporsi Dataset</h3>
            <p className="text-xs text-zinc-400 mb-6">Distribusi optimal mencegah overfitting</p>
            <div className="w-full h-40">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={datasetSplit} cx="50%" cy="50%" innerRadius={40} outerRadius={70}
                             stroke="none" dataKey="value" paddingAngle={5}>
                            {datasetSplit.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color}/>
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{
                            backgroundColor: '#13141C',
                            border: '1px solid #262833',
                            borderRadius: '8px'
                        }} itemStyle={{color: '#fff'}}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-left w-full">
                {datasetSplit.map(item => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-2 text-zinc-300"><span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{backgroundColor: item.color}}></span>{item.name}</span>
                        <span className="font-bold text-white">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}