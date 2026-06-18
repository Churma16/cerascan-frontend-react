import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable pill-shaped pagination component for public-facing pages.
 * Displays a floating, centered, pill-shaped control strip.
 *
 * @param {object} props
 * @param {number} props.currentPage  The current active page (1-indexed)
 * @param {number} props.totalPages   The total number of pages
 * @param {function} props.onPageChange Callback called with the new page number
 */
export default function PaginationPill({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            if (currentPage <= 2) end = 4;
            else if (currentPage >= totalPages - 1) start = totalPages - 3;
            if (start > 2) pages.push('...');
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-10 flex flex-col items-center gap-4">
            {/* Page label */}
            <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">
                Halaman <span className="text-[#042B1F]">{currentPage}</span> dari{' '}
                <span className="text-[#042B1F]">{totalPages}</span>
            </p>

            {/* Pill strip */}
            <div className="inline-flex items-center gap-1 bg-white border border-gray-100 rounded-full px-2 py-2 shadow-[0_4px_20px_rgb(0,0,0,0.06)]">
                {/* Prev */}
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-[#042B1F] hover:bg-[#E3EFEA] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Halaman Sebelumnya"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="w-9 h-9 flex items-center justify-center text-gray-300 font-bold text-sm select-none"
                            >
                                ···
                            </span>
                        );
                    }
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                                currentPage === page
                                    ? 'bg-[#042B1F] text-white shadow-[0_2px_8px_rgba(4,43,31,0.3)]'
                                    : 'text-gray-500 hover:bg-[#F0F7F3] hover:text-[#042B1F]'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next */}
                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-[#042B1F] hover:bg-[#E3EFEA] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Halaman Selanjutnya"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
