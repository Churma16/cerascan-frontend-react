import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable Pagination component matching the application's brand identity.
 *
 * @param {object} props
 * @param {number} props.currentPage The current active page (1-indexed)
 * @param {number} props.totalPages The total number of pages
 * @param {number} props.totalItems The total number of items across all pages
 * @param {number} props.limit The number of items displayed per page
 * @param {function} props.onPageChange Callback function triggered when a page is clicked/changed
 */
export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    limit,
    onPageChange
}) {
    const getPageNumbers = () => {
        const pages = [];
        const maxPageButtons = 5;

        if (totalPages <= maxPageButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 2) {
                end = 4;
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 3;
            }

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push('...');
            }

            pages.push(totalPages);
        }
        return pages;
    };

    if (totalItems === 0) return null;

    return (
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FAFAFA]">
            <span className="text-sm font-semibold text-gray-500">
                Menampilkan <span className="text-[#042B1F] font-bold">{Math.min((currentPage - 1) * limit + 1, totalItems)}</span> - <span className="text-[#042B1F] font-bold">{Math.min(currentPage * limit, totalItems)}</span> dari <span className="text-[#042B1F] font-bold">{totalItems}</span> data
            </span>
            
            <div className="flex items-center gap-2">
                {/* Button Sebelumnya */}
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-100 bg-white rounded-lg hover:bg-gray-50 text-[#042B1F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer"
                    title="Halaman Sebelumnya"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Angka Halaman */}
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-400 font-bold select-none">
                                ...
                            </span>
                        );
                    }
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 font-bold rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                                currentPage === page
                                    ? 'bg-[#042B1F] text-white shadow-[0_4px_12px_rgba(4,43,31,0.25)]'
                                    : 'border border-gray-100 hover:bg-gray-50 text-[#042B1F] bg-white'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Button Selanjutnya */}
                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-100 bg-white rounded-lg hover:bg-gray-50 text-[#042B1F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer"
                    title="Halaman Selanjutnya"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
