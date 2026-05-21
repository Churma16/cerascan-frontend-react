import React from 'react';

export default function MainFooter() {
    return (
        <footer className="w-full bg-[#042B1F] pt-20 pb-0 mt-auto text-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md w-fit mb-6">
                        <div className="flex flex-col gap-0.5">
                            <div className="w-1.5 h-1.5 bg-[#042B1F] rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-[#042B1F] rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-[#042B1F] rounded-full"></div>
                        </div>
                        <span className="font-extrabold text-xl tracking-tighter text-[#042B1F]">
                            CeraScan
                        </span>
                    </div>
                    <h4 className="text-xl font-bold mb-6 leading-snug pr-4">
                        Sistem Visi Komputer untuk Otomasi Inspeksi Keramik
                    </h4>
                    <div className="flex items-center gap-2 bg-[#ffffff10] px-4 py-2 rounded-lg w-fit border border-white/5">
                        <span className="text-[10px] uppercase tracking-wider opacity-70">
                            Akurasi Validasi:
                        </span>
                        <span className="text-xs font-bold text-[#10B981]">90.94%</span>
                    </div>
                </div>

                {/* Kolom 1: Modul Sistem */}
                <div>
                    <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-7 text-white/50">
                        Modul Sistem
                    </h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li>
                            <a
                                href="https://fastapi.tiangolo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Endpoint API Inferensi
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://react.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Panel Monitoring Real-time
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.tensorflow.org/tfx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Integrasi Sistem PLC
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://opencv.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Konfigurasi Akuisisi Citra
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Kolom 2: Dokumentasi Teknis */}
                <div>
                    <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-7 text-white/50">
                        Dokumentasi Teknis
                    </h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li>
                            <a
                                href="https://scholar.google.com/scholar?q=ceramic+tile+defect+detection+cnn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Analisis Komparatif Inspeksi
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://arxiv.org/abs/1409.1556"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Metodologi VGG-19
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://opensource.org/licenses/MIT"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Lisensi Penggunaan
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.privacy.gov.id/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Protokol Privasi Data
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Kolom 3: Informasi Riset */}
                <div>
                    <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-7 text-white/50">
                        Informasi Riset
                    </h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li>
                            <a
                                href="https://paperswithcode.com/task/defect-detection"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Publikasi Eksperimen
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://keras.io/api/applications/vgg/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Konsultasi Implementasi
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://stackoverflow.com/questions/tagged/tensorflow+keras+fastapi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Pusat Bantuan Teknis
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="px-4 py-2 bg-white text-[#042B1F] rounded-md text-xs font-bold inline-block mt-2 hover:bg-gray-100 transition-colors"
                            >
                                Kembali ke Atas Dashboard
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full bg-black/20 py-8 text-white/50 text-[10px] font-medium border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="tracking-wide uppercase">
                        © 2026 CERASCAN - BERBASIS PENELITIAN CONVOLUTIONAL NEURAL NETWORK.
                    </span>
                    <div className="flex gap-8 uppercase tracking-widest">
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            Repository
                        </a>
                        <a
                            href="https://arxiv.org/list/cs.CV/recent"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            ArXiv
                        </a>
                        <a
                            href="https://scholar.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            Google Scholar
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
