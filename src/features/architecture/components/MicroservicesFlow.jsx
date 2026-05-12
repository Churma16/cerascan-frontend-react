import React from 'react';
import {
    Activity,
    ArrowDown,
    ArrowRight,
    Database as DatabaseIcon,
    LayoutGrid,
    Network,
} from 'lucide-react';

export default function MicroservicesFlow() {
    return (
        <div className="mb-32">
            <div className="bg-[#042B1F] rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_50px_rgb(4,43,31,0.2)] relative flex flex-col items-center overflow-hidden">
                <h2 className="text-2xl font-bold text-white mb-12 relative z-10">
                    Alur Microservices
                </h2>

                <div className="flex flex-col xl:flex-row items-center justify-center gap-6 w-full z-10 relative">
                    <div className="w-full xl:w-64 bg-white rounded-2xl p-6 text-center shadow-lg transform transition-transform hover:-translate-y-2 duration-300 relative z-10 border border-gray-100">
                        <div className="w-14 h-14 bg-[#E3EFEA] rounded-xl flex items-center justify-center mx-auto mb-4">
                            <LayoutGrid className="w-6 h-6 text-[#042B1F]" />
                        </div>
                        <h3 className="text-lg font-black text-[#042B1F] mb-1">React Frontend</h3>
                        <p className="text-xs font-medium text-gray-500">UI Dashboard & Upload</p>
                    </div>

                    <div className="flex flex-col items-center text-white/60 xl:w-20 shrink-0">
                        <span className="text-[9px] font-bold tracking-widest mb-1 xl:block hidden text-[#a4d4c5]">
                            MULTIPART/FORM
                        </span>
                        <ArrowRight className="w-5 h-5 hidden xl:block text-white/50" />
                        <ArrowDown className="w-5 h-5 xl:hidden my-2 text-white/50" />
                    </div>

                    <div className="w-full xl:w-64 bg-[#FF645A] rounded-2xl p-6 text-center shadow-lg transform transition-transform hover:-translate-y-2 duration-300 relative z-10">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Network className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-black text-white mb-1">Express.js Node</h3>
                        <p className="text-xs font-medium text-white/80">API Gateway & Handler</p>
                        <div className="hidden xl:flex absolute -bottom-12 left-1/2 -translate-x-1/2 flex-col items-center justify-center h-12 w-px bg-white/20"></div>
                    </div>

                    <div className="flex flex-col items-center text-white/60 xl:w-20 shrink-0">
                        <span className="text-[9px] font-bold tracking-widest mb-1 xl:block hidden text-[#a4d4c5]">
                            REST HTTP
                        </span>
                        <ArrowRight className="w-5 h-5 hidden xl:block text-white/50" />
                        <ArrowDown className="w-5 h-5 xl:hidden my-2 text-white/50" />
                    </div>

                    <div className="w-full xl:w-64 bg-white rounded-2xl p-6 text-center shadow-lg transform transition-transform hover:-translate-y-2 duration-300 relative z-10 border border-gray-100">
                        <div className="w-14 h-14 bg-[#E3EFEA] rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Activity className="w-6 h-6 text-[#042B1F]" />
                        </div>
                        <h3 className="text-lg font-black text-[#042B1F] mb-1">FastAPI Python</h3>
                        <p className="text-xs font-medium text-gray-500">VGG-19 Inference</p>
                    </div>
                </div>

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
    );
}
