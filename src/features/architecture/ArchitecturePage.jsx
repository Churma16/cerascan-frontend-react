import React from 'react';
import {
    Activity,
    ArrowRight,
    ArrowDown,
    LayoutGrid,
    Network,
    Cpu,
    Database as DatabaseIcon
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
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-[#042B1F] mb-4 tracking-tight">Arsitektur AI</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Kerangka kerja sistem dari lapisan frontend hingga ke inti ekstraksi fitur jaringan saraf tiruan.
                    </p>
                </div>

                {/* BAGIAN 1: ARSITEKTUR SISTEM MICROSERVICES */}
                <div className="mb-32">
                    {/* Kontainer Diagram Microservice */}
                    <div className="bg-[#042B1F] rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_50px_rgb(4,43,31,0.2)] relative flex flex-col items-center overflow-hidden">

                        <h2 className="text-2xl font-bold text-white mb-12 relative z-10">Alur Microservices</h2>

                        <div className="flex flex-col xl:flex-row items-center justify-center gap-6 w-full z-10 relative">

                            {/* Node 1: React Frontend */}
                            <div className="w-full xl:w-64 bg-white rounded-2xl p-6 text-center shadow-lg transform transition-transform hover:-translate-y-2 duration-300 relative z-10 border border-gray-100">
                                <div className="w-14 h-14 bg-[#E3EFEA] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <LayoutGrid className="w-6 h-6 text-[#042B1F]" />
                                </div>
                                <h3 className="text-lg font-black text-[#042B1F] mb-1">React Frontend</h3>
                                <p className="text-xs font-medium text-gray-500">UI Dashboard & Upload</p>
                            </div>

                            <div className="flex flex-col items-center text-white/60 xl:w-20 shrink-0">
                                <span className="text-[9px] font-bold tracking-widest mb-1 xl:block hidden text-[#a4d4c5]">MULTIPART/FORM</span>
                                <ArrowRight className="w-5 h-5 hidden xl:block text-white/50" />
                                <ArrowDown className="w-5 h-5 xl:hidden my-2 text-white/50" />
                            </div>

                            {/* Node 2: Express Node.js */}
                            <div className="w-full xl:w-64 bg-[#FF645A] rounded-2xl p-6 text-center shadow-lg transform transition-transform hover:-translate-y-2 duration-300 relative z-10">
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Network className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-black text-white mb-1">Express.js Node</h3>
                                <p className="text-xs font-medium text-white/80">API Gateway & Handler</p>

                                {/* Vertical connection line for XL screens */}
                                <div className="hidden xl:flex absolute -bottom-12 left-1/2 -translate-x-1/2 flex-col items-center justify-center h-12 w-px bg-white/20"></div>
                            </div>

                            <div className="flex flex-col items-center text-white/60 xl:w-20 shrink-0">
                                <span className="text-[9px] font-bold tracking-widest mb-1 xl:block hidden text-[#a4d4c5]">REST HTTP</span>
                                <ArrowRight className="w-5 h-5 hidden xl:block text-white/50" />
                                <ArrowDown className="w-5 h-5 xl:hidden my-2 text-white/50" />
                            </div>

                            {/* Node 3: FastAPI Python */}
                            <div className="w-full xl:w-64 bg-white rounded-2xl p-6 text-center shadow-lg transform transition-transform hover:-translate-y-2 duration-300 relative z-10 border border-gray-100">
                                <div className="w-14 h-14 bg-[#E3EFEA] rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Activity className="w-6 h-6 text-[#042B1F]" />
                                </div>
                                <h3 className="text-lg font-black text-[#042B1F] mb-1">FastAPI Python</h3>
                                <p className="text-xs font-medium text-gray-500">VGG-19 Inference</p>
                            </div>

                        </div>

                        {/* Node 4: Database MySQL */}
                        <div className="w-full xl:w-64 mt-8 xl:mt-12 bg-white rounded-2xl p-6 text-center shadow-lg transform transition-transform hover:-translate-y-2 duration-300 relative z-10 border border-gray-100">
                            <div className="xl:hidden absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50">
                                <ArrowDown className="w-5 h-5" />
                            </div>
                            <div className="w-14 h-14 bg-[#E3EFEA] rounded-xl flex items-center justify-center mx-auto mb-4">
                                <DatabaseIcon className="w-6 h-6 text-[#042B1F]" />
                            </div>
                            <h3 className="text-lg font-black text-[#042B1F] mb-1">MySQL Database</h3>
                            <p className="text-xs font-medium text-gray-500">Penyimpanan Log</p>
                        </div>
                    </div>
                </div>

                {/* BAGIAN 2: ARSITEKTUR MODEL VGG-19 */}
                <div>
                    <div className="flex items-center gap-3 mb-12 justify-center md:justify-start">
                        <div className="w-12 h-12 bg-[#FF645A]/10 rounded-2xl flex items-center justify-center border border-[#FF645A]/20">
                            <Cpu className="w-6 h-6 text-[#FF645A]" />
                        </div>
                        <h2 className="text-3xl font-black text-[#042B1F]">Arsitektur Model VGG-19</h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-100 via-gray-300 to-gray-50 hidden md:block"></div>

                        <div className="space-y-6">
                            {vggArchitecture.map((layer, index) => (
                                <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="hidden md:block w-5/12"></div>

                                    <div className="z-20 w-16 h-16 rounded-full bg-white border-4 border-gray-50 shadow-md flex items-center justify-center shrink-0 mb-4 md:mb-0 relative">
                                        <span className="text-xl font-black text-[#FF645A]">{layer.step}</span>
                                    </div>

                                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2 block">
                                                {layer.type}
                                            </span>
                                            <h3 className="text-xl font-black text-[#042B1F] mb-2">{layer.name}</h3>
                                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{layer.desc}</p>
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
