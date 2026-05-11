import React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {BarChart2, History, LayoutGrid, Menu, Network} from 'lucide-react';

export default function MainLayout({children}) {
    const location = useLocation();

    // Konfigurasi Navigasi Publik
    const navLinks = [
        {path: "/scanner", label: "Scan Image", icon: LayoutGrid},
        {path: "/history", label: "Riwayat", icon: History},
        {path: "/insights", label: "Insight", icon: BarChart2},
        {path: "/architecture", label: "Arsitektur", icon: Network},
    ];

    return (
        <div
            className="min-h-screen bg-[#090A0F] font-sans text-zinc-100 selection:bg-indigo-500/30 flex flex-col relative overflow-hidden">

            {/* Latar Belakang Glow Global */}
            <div
                className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            {/* NAVBAR */}
            <header className="fixed top-0 z-50 w-full border-b border-[#1E1F2E] bg-[#090A0F]/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

                    <Link to="/"
                          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                        <LayoutGrid className="w-6 h-6"/>
                        <span className="font-bold text-xl tracking-tight text-white">CeraScan<span
                            className="text-indigo-500">.ai</span></span>
                    </Link>

                    {/* Menu Desktop */}
                    <nav
                        className="hidden md:flex items-center gap-2 bg-[#13141C] p-1.5 rounded-2xl border border-[#262833]">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                        isActive ? 'bg-[#2E2459] text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1A1C26]'
                                    }`}
                                >
                                    <Icon className="w-4 h-4"/> {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Tombol Aksi Kanan */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors">Masuk
                        </button>
                        <button
                            className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-zinc-900 text-sm font-bold rounded-xl transition-all shadow-lg shadow-white/10">
                            Mulai Gratis
                        </button>
                    </div>

                    {/* Tombol Menu Mobile */}
                    <button className="md:hidden text-zinc-400 bg-[#13141C] p-2 rounded-lg border border-[#262833]">
                        <Menu className="w-6 h-6"/>
                    </button>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            {/* Outlet adalah "lubang" tempat React Router melempar konten halaman seperti Scanner, History, dll */}
            <main className="flex-1 pt-40 pb-24 relative z-10 min-h-screen">
                {children || <Outlet/>}
            </main>

            {/* FOOTER */}
            <footer className="border-t border-[#1E1F2E] bg-[#0E0F15] py-12 relative z-10">
                <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500">
                    <LayoutGrid className="w-8 h-8 mx-auto mb-6 text-zinc-700"/>
                    <p className="text-sm mb-2 font-medium">CeraScan AI - Solusi Visi Komputer Industri.</p>
                    <p className="text-xs text-zinc-600">Dibangun berdasarkan arsitektur Deep Learning VGG-19.</p>
                </div>
            </footer>
        </div>
    );
}