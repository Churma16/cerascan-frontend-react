import React from 'react';
import MainLayout from '@/layouts/public/MainLayout.jsx';

// Import komponen yang sudah dipisah
import MicroservicesFlow from './components/MicroservicesFlow';
import VggTimeline from './components/VggTimeline';

// Mock Data
const vggArchitecture = [
    {
        step: 1,
        name: 'Input Layer',
        desc: 'Citra RGB diresize ke dimensi 224x224 piksel.',
        type: 'Input',
    },
    {
        step: 2,
        name: 'Block 1 & 2',
        desc: 'Ekstraksi fitur dasar (tepi, warna) menggunakan filter 64 & 128.',
        type: 'Feature Extraction',
    },
    {
        step: 3,
        name: 'Block 3, 4, 5',
        desc: 'Ekstraksi fitur kompleks (pola cacat) menggunakan filter 256 & 512.',
        type: 'Deep Features',
    },
    {
        step: 4,
        name: 'GAP2D Layer',
        desc: 'Reduksi dimensi drastis tanpa kehilangan informasi spasial penting.',
        type: 'Pooling',
    },
    {
        step: 5,
        name: 'Dropout (0.1)',
        desc: 'Mencegah model menghafal data (overfitting) secara berlebihan.',
        type: 'Regularization',
    },
    {
        step: 6,
        name: 'Output Dense',
        desc: 'Klasifikasi ke dalam 4 kelas menggunakan fungsi aktivasi Softmax.',
        type: 'Classification',
    },
];

export default function ArchitecturePage() {
    return (
        <div className="w-full max-w-5xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-[#042B1F] mb-4 tracking-tight">
                    Arsitektur AI
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                    Arsitektur sistem dari lapisan frontend hingga ke model ekstraksi fitur jaringan
                    neural network.
                </p>
            </div>

            <MicroservicesFlow />

            <VggTimeline architectureData={vggArchitecture} />
        </div>
    );
}
