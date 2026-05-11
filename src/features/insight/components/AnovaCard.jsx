import {Activity} from "lucide-react";
import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

const anovaFindings = [
    {faktor: 'Learning Rate', pengaruh: 28, realValue: 'ηp² = 0.28'},
    {faktor: 'Batch Size', pengaruh: 24, realValue: 'ηp² = 0.24'},
    {faktor: 'Interaksi (LR×BS)', pengaruh: 17, realValue: 'p = 0.017'},
    {faktor: 'Dropout', pengaruh: 6, realValue: 'ηp² = 0.06'},
];
export default function AnovaCard() {
    return (<div className="bg-[#0E0F15] border border-[#262833] rounded-3xl p-8 shadow-2xl">
            <div
                className="w-10 h-10 bg-[#1A1C26] rounded-xl flex items-center justify-center mb-4 border border-[#262833]">
                <Activity className="w-5 h-5 text-indigo-400"/>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Analisis Pengaruh Parameter (ANOVA)</h3>

            {/* Teks Deskripsi yang Diperbarui */}
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Analisis ANOVA menunjukkan <strong className="text-white font-semibold">Learning
                Rate</strong> merupakan faktor paling dominan yang secara signifikan memengaruhi jumlah
                epoch (ηp²=0.58) dan Test Loss (ηp²=0.28). Selanjutnya, <strong
                className="text-white font-semibold">Batch Size</strong> berdampak signifikan pada Test
                Loss
                (ηp²=0.24). Selain itu, terdapat <strong className="text-white font-semibold">interaksi
                signifikan</strong> antara keduanya terhadap Loss Gap (p=0.017), dimana overfitting
                akibat
                LR tinggi diperburuk oleh Batch Size yang besar.
            </p>

            <div className="h-50 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={anovaFindings} layout="vertical"
                              margin={{top: 0, right: 20, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262833" horizontal={false}/>
                        <XAxis type="number" hide/>
                        <YAxis
                            dataKey="faktor"
                            type="category"
                            stroke="#71717a"
                            fontSize={11}
                            tickMargin={10}
                            width={120}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip cursor={{fill: '#1A1C26'}} content={<CustomTooltip/>}/>

                        <Bar dataKey="pengaruh" radius={[0, 6, 6, 0]} barSize={24}>
                            {anovaFindings.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === 0 ? '#818cf8' : index === 1 ? '#6366f1' : index === 2 ? '#4f46e5' : '#3730a3'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#13141C] border border-[#262833] rounded-xl p-3 text-white text-xs shadow-lg">
                <p className="font-semibold mb-1 text-zinc-300">{data.faktor}</p>
                <p className="text-indigo-400 font-mono font-bold">{data.realValue}</p>
            </div>
        );
    }
    return null;
};