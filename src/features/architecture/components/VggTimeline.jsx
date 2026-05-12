import React from 'react';
import { Cpu } from 'lucide-react';

export default function VggTimeline({ architectureData }) {
    return (
        <div>
            <div className="flex items-center gap-3 mb-12 justify-center md:justify-start">
                <div className="w-12 h-12 bg-[#FF645A]/10 rounded-2xl flex items-center justify-center border border-[#FF645A]/20">
                    <Cpu className="w-6 h-6 text-[#FF645A]" />
                </div>
                <h2 className="text-3xl font-black text-[#042B1F]">Arsitektur Model VGG-19</h2>
            </div>

            <div className="relative">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-gray-100 via-gray-300 to-gray-50 hidden md:block"></div>

                <div className="space-y-6">
                    {architectureData.map((layer, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className="hidden md:block w-5/12"></div>

                            <div className="z-20 w-16 h-16 rounded-full bg-white border-4 border-gray-50 shadow-md flex items-center justify-center shrink-0 mb-4 md:mb-0 relative">
                                <span className="text-xl font-black text-[#FF645A]">
                                    {layer.step}
                                </span>
                            </div>

                            <div
                                className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                            >
                                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2 block">
                                        {layer.type}
                                    </span>
                                    <h3 className="text-xl font-black text-[#042B1F] mb-2">
                                        {layer.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                        {layer.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
