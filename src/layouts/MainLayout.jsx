import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BarChart2, History, LayoutGrid, Menu, Network } from 'lucide-react';
import { useIsAuthenticated } from '@/hooks/useAuth.js';

export default function MainLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    // Mengecek apakah user sudah login melalui hook
    const isAuthenticated = useIsAuthenticated();

    // Konfigurasi Navigasi Publik
    const navLinks = [
        { path: '/scanner', label: 'Scan Image', icon: LayoutGrid },
        { path: '/history', label: 'Riwayat', icon: History },
        { path: '/insights', label: 'Insight', icon: BarChart2 },
        { path: '/architecture', label: 'Arsitektur', icon: Network },
    ];

    return (
        <div className="min-h-screen bg-[#faf8f5] font-sans text-gray-800 selection:bg-[#FF645A]/30 flex flex-col relative overflow-hidden">
            {/* Latar Belakang Glow Global */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-[#10B981]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            {/* NAVBAR */}
            <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 text-[#FF645A] hover:opacity-90 transition-opacity"
                    >
                        <div className="flex flex-col gap-0.5 mt-0.5">
                            <div className="w-1.5 h-1.5 bg-[#FF645A] rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-[#FF645A] rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-[#FF645A] rounded-full"></div>
                        </div>
                        <span className="font-extrabold text-2xl tracking-tighter">CeraScan</span>
                    </Link>

                    {/* Menu Desktop */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-1.5 py-2 transition-colors ${
                                        isActive ? 'text-[#FF645A]' : 'hover:text-[#042B1F]'
                                    }`}
                                >
                                    {link.label}
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-40"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                className="text-sm font-bold text-[#042B1F] hover:text-[#042B1F]/70 px-4 transition-colors"
                            >
                                Masuk
                            </Link>
                        ) : (
                            <button
                                className="text-sm font-bold text-[#042B1F] hover:text-[#042B1F]/70 px-4 transition-colors"
                                onClick={() => navigate(`/dashboard`)}
                            >
                                Dashboard
                            </button>
                        )}
                    </div>

                    {/* Tombol Menu Mobile */}
                    <button className="md:hidden text-gray-400 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            {/* Outlet adalah "lubang" tempat React Router melempar konten halaman seperti Scanner, History, dll */}
            <main className="flex-1 pt-28 pb-24 relative z-10 min-h-screen">
                {children || <Outlet />}
            </main>

            {/* FOOTER */}
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
                                    href="https://tensorflow.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    Endpoint API Inferensi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://keras.io"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    Panel Monitoring Real-time
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    Integrasi Sistem PLC
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://opencv.org"
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
                                    href="https://ieee.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    Analisis Komparatif Inspeksi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://arxiv.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    Metodologi VGG-19
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://opensource.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    Lisensi Penggunaan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://pypi.org"
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
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    Publikasi Eksperimen
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://nvidia.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    Konsultasi Implementasi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://stackoverflow.com"
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
                            © 2026 CERASCAN — BERBASIS PENELITIAN CONVOLUTIONAL NEURAL NETWORK.
                        </span>
                        <div className="flex gap-8 uppercase tracking-widest">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                Repository
                            </a>
                            <a
                                href="https://arxiv.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                ArXiv
                            </a>
                            <a
                                href="https://google.com"
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
        </div>
    );
}
