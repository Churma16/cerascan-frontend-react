import { Activity } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import React from 'react';

const anovaFindings = [
    { faktor: 'Learning Rate', pengaruh: 28, realValue: 'p = 0.28' },
    { faktor: 'Batch Size', pengaruh: 24, realValue: 'p = 0.24' },
    { faktor: 'Interaksi (LR—BS)', pengaruh: 17, realValue: 'p = 0.017' },
    { faktor: 'Dropout', pengaruh: 6, realValue: 'p = 0.06' },
];
export default function AnovaCard() {
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-[0_4px_25px_rgb(0,0,0,0.04)] flex flex-col h-full">
            <div className="w-12 h-12 bg-[#FF645A]/10 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-[#FF645A]" />
            </div>
            <h3 className="text-xl font-black text-[#042B1F] mb-4">
                Analisis Pengaruh Parameter (ANOVA)
            </h3>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed font-medium">
                Analisis ANOVA menunjukkan{' '}
                <strong className="text-[#042B1F] font-bold">Learning Rate</strong> merupakan faktor
                paling dominan yang memengaruhi jumlah epoch (p=0.58) dan Test Loss (p=0.28).
                Selanjutnya, <strong className="text-[#042B1F] font-bold">Batch Size</strong>{' '}
                berdampak signifikan pada Test Loss (p=0.24). Selain itu, terdapat{' '}
                <strong className="text-[#042B1F] font-bold">interaksi signifikan</strong> antara
                keduanya terhadap Loss Gap (p=0.017), dimana overfitting akibat LR tinggi diperburuk
                oleh Batch Size besar.
            </p>

            <div className="h-44 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={anovaFindings}
                        layout="vertical"
                        margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#faf8f5" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="faktor"
                            type="category"
                            stroke="#9ca3af"
                            fontSize={11}
                            fontWeight={600}
                            tickMargin={10}
                            width={120}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip cursor={{ fill: '#f9fafb' }} content={<CustomTooltip />} />

                        <Bar dataKey="pengaruh" radius={[0, 6, 6, 0]} barSize={24}>
                            {anovaFindings.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        index === 0
                                            ? '#10B981'
                                            : index === 1
                                              ? '#34d399'
                                              : index === 2
                                                ? '#6ee7b7'
                                                : '#a7f3d0'
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-100 rounded-xl p-3 text-[#042B1F] text-xs shadow-lg">
                <p className="font-bold mb-1">{data.faktor}</p>
                <p className="text-[#FF645A] font-mono font-bold">{data.realValue}</p>
            </div>
        );
    }
    return null;
};
