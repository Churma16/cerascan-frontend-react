import React, { useState } from 'react';
import { Grid, Info } from 'lucide-react';
import CardWrapper from '@/features/insight/components/CardWrapper.jsx';

export default function ConfusionMatrixCard() {
    const labels = ['Crack', 'Normal', 'Scratch', 'Stain'];
    const matrixData = [
        [135, 40, 102, 2], // Aktual: Crack
        [0, 124, 111, 2], // Aktual: Normal
        [0, 2, 227, 2], // Aktual: Scratch
        [0, 0, 22, 206], // Aktual: Stain
    ];

    const maxValue = 227;

    // State untuk interaksi hover
    const [hoveredCell, setHoveredCell] = useState(null);

    const getBackgroundColor = (value) => {
        if (value === 0) return 'rgba(248, 250, 252, 1)'; // slate-50 untuk nilai 0
        const intensity = Math.max(0.1, value / maxValue);
        return `rgba(15, 118, 110, ${intensity})`; // teal-700 dengan opacity
    };

    const getTextColor = (value) => {
        return value / maxValue > 0.5 ? 'text-white' : 'text-slate-700';
    };

    return (
        <CardWrapper>
            <div className="w-12 h-12 bg-[#E3EFEA] rounded-xl flex items-center justify-center mb-6">
                <Grid className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-black text-[#042B1F] mb-4">Distribusi Klasifikasi (Confusion Matrix)</h3>
            <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
                Visualisasi ini menunjukkan perbandingan antara prediksi model dengan label sebenarnya. Warna yang lebih
                gelap mengindikasikan frekuensi prediksi yang lebih tinggi.
            </p>

            <div className="">
                <div className="min-w-150 flex flex-col items-center">
                    <div className="text-center font-semibold text-slate-600 mb-4 ml-16">Label Prediksi</div>

                    <div className="flex relative">
                        <div className="flex items-center justify-center w-12 -ml-12 absolute h-full -left-8">
                            <div className="transform -rotate-90 font-semibold text-slate-600 whitespace-nowrap">
                                Label Aktual
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex gap-1 ml-24 mb-2">
                                {labels.map((label, idx) => (
                                    <div
                                        key={`header-${idx}`}
                                        className="w-24 text-center font-medium text-slate-500 text-sm"
                                    >
                                        {label}
                                    </div>
                                ))}
                            </div>

                            {matrixData.map((row, rowIndex) => (
                                <div key={`row-${rowIndex}`} className="flex gap-1 items-center">
                                    <div className="w-24 text-right pr-4 font-medium text-slate-500 text-sm">
                                        {labels[rowIndex]}
                                    </div>

                                    {row.map((val, colIndex) => (
                                        <div
                                            key={`cell-${rowIndex}-${colIndex}`}
                                            onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                                            onMouseLeave={() => setHoveredCell(null)}
                                            className={`
                          w-24 h-24 flex items-center justify-center rounded-lg text-lg font-semibold transition-all duration-200 cursor-default
                          ${hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex ? 'scale-105 shadow-md ring-2 ring-teal-400 ring-offset-1 z-10' : 'z-0'}
                          ${getTextColor(val)}
                        `}
                                            style={{ backgroundColor: getBackgroundColor(val) }}
                                            title={`Aktual: ${labels[rowIndex]}, Prediksi: ${labels[colIndex]} \nJumlah: ${val}`}
                                        >
                                            {val}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end mt-8 gap-2 text-xs text-slate-500">
                <span>0</span>
                <div className="h-3 w-32 rounded-full bg-linear-to-r from-slate-50 to-teal-700"></div>
                <span>{maxValue}</span>
            </div>

            <div className="bg-amber-50 border mt-4 border-amber-100 rounded-xl p-4 mb-8 flex gap-3 text-amber-800">
                <Info className="shrink-0 mt-0.5" size={20} />
                <div className="text-sm leading-relaxed">
                    <strong>Analisis Kesalahan:</strong> Model sangat akurat pada kelas <em>Stain</em>. Kesalahan
                    prediksi utama (misklasifikasi) terjadi antara kelas <em>Normal</em> dan <em>Crack</em> yang
                    diprediksi sebagai <em>Scratch</em>, kemungkinan karena kemiripan fitur tekstur pada dataset.
                </div>
            </div>
        </CardWrapper>
    );
}
