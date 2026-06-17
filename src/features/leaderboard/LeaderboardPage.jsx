import { Medal, Target, Trophy } from 'lucide-react';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { useLeaderboard } from '@/hooks/useLeaderboard.js';
import { useLeaderboardSocket } from '@/hooks/useLeaderboardSocket.js';
import { convertTwoNumberBeforeDecimal } from '@/utils/helper.js';
import { motion } from 'framer-motion';

const getRankBadge = (rank) => {
    if (rank === 1) {
        return (
            <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mx-auto">
                <Trophy className="w-4 h-4 shadow-sm" />
            </div>
        );
    }
    if (rank === 2) {
        return (
            <div className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center mx-auto">
                <Medal className="w-4 h-4" />
            </div>
        );
    }
    if (rank === 3) {
        return (
            <div className="w-8 h-8 rounded-full bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center mx-auto">
                <Medal className="w-4 h-4" />
            </div>
        );
    }
    return (
        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 text-gray-500 font-bold text-xs flex items-center justify-center mx-auto">
            {rank}
        </div>
    );
};

export default function LeaderboardPage() {
    const { data: leadersData = [], isLoading, isError } = useLeaderboard(10);
    useLeaderboardSocket();

    return (
        <PageWrapper>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">Peringkat Tim</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Pantau performa pemindaian terbaik dari tim Anda bulan ini.
                    </p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
                <div className="p-6 bg-[#042B1F] flex items-center gap-3">
                    <Target className="w-6 h-6 text-[#FF645A]" />
                    <h3 className="font-extrabold text-white text-lg tracking-wide">Top Scanners Leaderboard</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FAFAFA] border-b border-gray-100">
                            <tr className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest">
                                <th className="px-8 py-5 w-24 text-center">Rank</th>
                                <th className="px-8 py-5">Pengguna</th>
                                <th className="px-8 py-5 text-center">Total Scan</th>
                                <th className="px-8 py-5 text-center">Cacat Terdeteksi</th>
                                <th className="px-8 py-5 min-w-[200px]">Rasio Cacat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center font-medium text-gray-400">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
                                            Memuat peringkat...
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {!isLoading && leadersData.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center font-medium text-gray-500">
                                        Belum ada data peringkat.
                                    </td>
                                </tr>
                            )}
                            {!isLoading &&
                                leadersData?.map((user) => (
                                <motion.tr
                                    layout
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    key={user.user_id || user.id}
                                    className="hover:bg-gray-50/50 transition-colors bg-white"
                                >
                                    <td className="px-8 py-4">{getRankBadge(user.rank)}</td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            {user.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full object-cover shadow-inner"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-[#042B1F] flex items-center justify-center text-white font-bold shadow-inner">
                                                    {user.name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-[#042B1F] leading-tight">{user.name}</p>
                                                {/*<p className="text-xs font-medium text-gray-500 mt-0.5">*/}
                                                {/*    {user.plan.name}*/}
                                                {/*</p>*/}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-center">
                                        <span className="font-black text-[#042B1F] text-base">{user.total_scans}</span>
                                    </td>
                                    <td className="px-8 py-4 text-center">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-[#FEE2E2] text-[#FF645A] font-bold text-xs">
                                            {user.defect_scans}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="w-14 text-sm font-semibold text-gray-600">
                                                {user.ratio ? convertTwoNumberBeforeDecimal(user.ratio * 100) : '0'}%
                                            </span>
                                            <div className="w-24 h-1.5 bg-gray-100 rounded-full relative overflow-hidden flex items-center">
                                                <div
                                                    className="absolute left-3 top-0 h-full bg-[#FF645A] rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${Math.min(parseFloat(user.ratio || 0) * 100, 100)}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageWrapper>
    );
}
