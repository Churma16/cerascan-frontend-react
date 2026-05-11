import React from 'react';
import {
    Activity,
    ArrowDown,
    ArrowRight,
    Cpu,
    Database as DatabaseIcon,
    LayoutGrid,
    Network,
    Server
} from 'lucide-react';
import MainLayout from "@/layouts/MainLayout.jsx";

// Mock Data
const vggArchitecture = [
    {step: 1, name: 'Input Layer', desc: 'Citra RGB dire-size ke dimensi 224x224 piksel.', type: 'Input'},
    {
        step: 2,
        name: 'Block 1 & 2',
        desc: 'Ekstraksi fitur dasar (tepi, warna) menggunakan filter 64 & 128.',
        type: 'Feature Extraction'
    },
    {
        step: 3,
        name: 'Block 3, 4, 5',
        desc: 'Ekstraksi fitur kompleks (pola cacat) menggunakan filter 256 & 512.',
        type: 'Deep Features'
    },
    {
        step: 4,
        name: 'GAP2D Layer',
        desc: 'Reduksi dimensi drastis tanpa kehilangan informasi spasial penting.',
        type: 'Pooling'
    },
    {
        step: 5,
        name: 'Dropout (0.1)',
        desc: 'Mencegah model menghafal data (overfitting) secara berlebihan.',
        type: 'Regularization'
    },
    {
        step: 6,
        name: 'Output Dense',
        desc: 'Klasifikasi ke dalam 4 kelas menggunakan fungsi aktivasi Softmax.',
        type: 'Classification'
    },
];

export default function ArchitecturePage() {
    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Arsitektur CeraScan AI</h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Jelajahi alur kerja sistem dari lapisan aplikasi (Microservices) hingga lapisan terdalam model
                        kecerdasan buatan (Deep Learning).
                    </p>
                </div>

                {/* BAGIAN 1: ARSITEKTUR SISTEM MICROSERVICES */}
                <div className="mb-32">
                    <div className="flex items-center gap-3 mb-10">
                        <div
                            className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-500/30">
                            <Server className="w-5 h-5 text-indigo-400"/>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Arsitektur Sistem Terdistribusi</h2>
                    </div>

                    {/* Kontainer Diagram Microservice */}
                    <div
                        className="bg-[#0E0F15] border border-[#262833] rounded-3xl p-8 md:p-16 shadow-2xl relative flex flex-col items-center">

                        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 w-full z-10">

                            {/* Node 1: React Frontend */}
                            <div
                                className="w-full xl:w-72 bg-[#13141C] border-2 border-cyan-500/50 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(6,182,212,0.1)] relative">
                                <div
                                    className="w-14 h-14 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                                    <LayoutGrid className="w-6 h-6 text-cyan-400"/>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">React.js Frontend</h3>
                                <p className="text-sm text-zinc-500">UI Dashboard & Upload Citra</p>
                            </div>

                            <div className="flex flex-col items-center text-zinc-500 xl:w-24 shrink-0">
                                <span
                                    className="text-[10px] font-mono tracking-widest mb-2 xl:block hidden">MULTIPART/FORM</span>
                                <ArrowRight className="w-6 h-6 hidden xl:block"/>
                                <ArrowDown className="w-6 h-6 xl:hidden my-2"/>
                            </div>

                            {/* Node 2: Express Node.js */}
                            <div
                                className="w-full xl:w-72 bg-[#13141C] border-2 border-zinc-500/50 rounded-2xl p-6 text-center shadow-lg relative">
                                <div
                                    className="w-14 h-14 bg-zinc-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-500/20">
                                    <Network className="w-6 h-6 text-zinc-400"/>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Express.js Node</h3>
                                <p className="text-sm text-zinc-500">API Gateway & Handler</p>

                                <div
                                    className="hidden xl:flex absolute -bottom-16 left-1/2 -translate-x-1/2 flex-col items-center justify-center h-16 w-px bg-zinc-700"></div>
                            </div>

                            <div className="flex flex-col items-center text-zinc-500 xl:w-24 shrink-0">
                                <span
                                    className="text-[10px] font-mono tracking-widest mb-2 xl:block hidden">REST HTTP</span>
                                <ArrowRight className="w-6 h-6 hidden xl:block"/>
                                <ArrowDown className="w-6 h-6 xl:hidden my-2"/>
                            </div>

                            {/* Node 3: FastAPI Python */}
                            <div
                                className="w-full xl:w-72 bg-[#13141C] border-2 border-emerald-500/50 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(16,185,129,0.1)] relative">
                                <div
                                    className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                                    <Activity className="w-6 h-6 text-emerald-400"/>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">FastAPI Python</h3>
                                <p className="text-sm text-zinc-500">VGG-19 Inference Engine</p>
                            </div>

                        </div>

                        {/* Node 4: Database MySQL */}
                        <div
                            className="w-full xl:w-72 mt-8 xl:mt-16 bg-[#13141C] border-2 border-indigo-500/50 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(99,102,241,0.1)] relative z-10">
                            <div
                                className="xl:hidden absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-zinc-500">
                                <ArrowDown className="w-6 h-6"/>
                            </div>
                            <div
                                className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                                <DatabaseIcon className="w-6 h-6 text-indigo-400"/>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">MySQL Database</h3>
                            <p className="text-sm text-zinc-500">Simpan Riwayat Scan</p>
                        </div>
                    </div>
                </div>

                {/* BAGIAN 2: ARSITEKTUR MODEL VGG-19 */}
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        <div
                            className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-500/30">
                            <Cpu className="w-5 h-5 text-amber-400"/>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Arsitektur Model VGG-19</h2>
                    </div>

                    <div className="relative">
                        <div
                            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-purple-500/0 hidden md:block"></div>

                        <div className="space-y-6">
                            {vggArchitecture.map((layer, index) => (
                                <div key={index}
                                     className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="hidden md:block w-5/12"></div>

                                    <div
                                        className="z-20 w-16 h-16 rounded-full bg-[#13141C] border-4 border-[#090A0F] shadow-[0_0_15px_rgba(245,158,11,0.1)] flex items-center justify-center shrink-0 mb-4 md:mb-0">
                                        <span className="text-lg font-bold text-amber-400">{layer.step}</span>
                                    </div>

                                    <div
                                        className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div
                                            className="bg-[#0E0F15] p-6 rounded-3xl border border-[#262833] shadow-xl hover:border-amber-500/30 transition-colors">
                                            <span
                                                className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 block">{layer.type}</span>
                                            <h3 className="text-xl font-bold text-white mb-2">{layer.name}</h3>
                                            <p className="text-sm text-zinc-400 leading-relaxed">{layer.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

