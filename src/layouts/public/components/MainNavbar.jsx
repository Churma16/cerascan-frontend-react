import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart2, History, LayoutGrid, Menu, Network } from 'lucide-react';
import { useIsAuthenticated } from '@/hooks/useAuth.js';

export default function MainNavbar() {
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

                <button className="md:hidden text-gray-400 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
