import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Trash2, UploadCloud, Zap } from 'lucide-react';
import { useBatchScanImages } from '@/hooks/useScan.js';
import PageWrapper from '@/layouts/PageWrapper.jsx';
import { useBatchScanSocket } from '@/hooks/useBatchScanSocket.js';

export default function BatchScanPage() {
    const [scanItems, setScanItems] = useState([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = useRef(null);

    const { mutate: batchScanImages, isPending: isUploading } = useBatchScanImages();

    useBatchScanSocket(setScanItems);

    // ---------------------------------------------------------
    // HANDLERS: Drag & Drop dan File Input
    // ---------------------------------------------------------
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true);
        else if (e.type === 'dragleave') setIsDragActive(false);
    };

    const processFiles = (files) => {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'));
        if (fileArray.length === 0) return;

        // Make Preview State
        const newItems = fileArray.map((file) => ({
            id: 'temp-' + Math.random().toString(36).substr(2, 9),
            file: file,
            previewUrl: URL.createObjectURL(file),
            status: 'Siap untuk scan',
            confidence: 0,
            time: '-',
            isProcessing: false,
        }));

        setScanItems((prev) => [...prev, ...newItems]);
    };

    const handleStartScan = () => {
        if (scanItems.length === 0) return;

        setIsScanning(true);

        // Update status menjadi "Mengunggah..." untuk semua item
        setScanItems((prev) =>
            prev.map((item) => ({
                ...item,
                status: 'Mengunggah...',
                isProcessing: true,
            }))
        );

        // Kumpulkan file dari scanItems
        const filesToScan = scanItems.map((item) => item.file);

        // Kirim ke Backend
        batchScanImages(filesToScan, {
            onSuccess: (pendingScans) => {
                setScanItems((prevItems) => {
                    const updatedItems = [...prevItems];

                    pendingScans.forEach((scan, i) => {
                        if (updatedItems[i]) {
                            updatedItems[i].id = scan.scan_id;
                            updatedItems[i].status = 'Dalam Antrean AI...';
                        }
                    });
                    return updatedItems;
                });
                setIsScanning(false);
            },
            onError: (error) => {
                console.error('Batch upload gagal:', error);

                let errorStatusText = 'Gagal mengunggah';
                if (error.response) {
                    const status = error.response.status;
                    const statusText = error.response.statusText;
                    const serverMessage = error.response.data?.message || error.response.data?.error;

                    if (serverMessage) {
                        errorStatusText = `Gagal: ${serverMessage}`;
                    } else if (status === 413) {
                        errorStatusText = 'Gagal: File terlalu besar (413)';
                    } else {
                        errorStatusText = `Gagal (${status}): ${statusText || 'Error Server'}`;
                    }
                } else if (error.message) {
                    errorStatusText = `Gagal: ${error.message}`;
                }

                setScanItems((prev) =>
                    prev.map((item) => {
                        if (item.status === 'Mengunggah...' || item.isProcessing) {
                            return {
                                ...item,
                                status: errorStatusText,
                                isProcessing: false,
                            };
                        }
                        return item;
                    })
                );
                setIsScanning(false);
            },
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        processFiles(e.dataTransfer.files);
    };

    const clearAll = () => {
        setScanItems([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <PageWrapper>
            {/* HEADER */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">Batch Scan AI</h2>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Unggah puluhan gambar sekaligus. Diproses secara asinkron (Background Job).
                    </p>
                </div>
                {scanItems.length > 0 && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleStartScan}
                            disabled={isScanning || isUploading}
                            className={`text-xs font-bold px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                                isScanning || isUploading
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#10B981] text-white hover:bg-[#0EA571]'
                            }`}
                        >
                            <Zap className="w-4 h-4" /> {isScanning ? 'Memproses...' : 'Mulai Scan'}
                        </button>
                        <button
                            onClick={clearAll}
                            disabled={isScanning || isUploading}
                            className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" /> Bersihkan Daftar
                        </button>
                    </div>
                )}
            </div>

            {/* AREA UPLOAD */}
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
                <div className="p-6 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-[#10B981]" />
                    <h3 className="font-extrabold text-[#042B1F]">Area Unggah</h3>
                </div>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => processFiles(e.target.files)}
                />

                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    className={`p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        isDragActive
                            ? 'bg-[#E3EFEA]/50 border-2 border-dashed border-[#10B981]'
                            : 'bg-white hover:bg-gray-50'
                    }`}
                >
                    <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragActive ? 'bg-[#10B981] text-white' : 'bg-[#E3EFEA] text-[#042B1F]'}`}
                    >
                        <UploadCloud className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-extrabold text-[#042B1F] mb-1">Tarik banyak gambar ke sini</h4>
                    <p className="text-sm font-medium text-gray-400">atau klik untuk memilih file dari komputer</p>
                </div>
            </div>

            {/* HASIL BATCH SCAN (Tampilan Grid Card ala Admin) */}
            {scanItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {scanItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col"
                        >
                            {/* Gambar Preview */}
                            <div className="h-40 bg-gray-100 relative overflow-hidden">
                                <img
                                    src={item.previewUrl}
                                    alt="preview"
                                    className={`w-full h-full object-cover transition-all duration-500 ${item.isProcessing ? 'blur-sm scale-105 opacity-60' : 'scale-100 opacity-100'}`}
                                />
                                {item.isProcessing && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#042B1F]/20">
                                        <Zap className="w-8 h-8 text-[#10B981] animate-pulse mb-2" />
                                        <span className="text-xs font-bold text-white bg-[#042B1F]/80 px-3 py-1 rounded-full">
                                            {item.status}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Detail Data */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                                            {item.id}
                                        </p>
                                        <p
                                            className="text-sm font-bold text-[#042B1F] truncate w-40"
                                            title={item.file.name}
                                        >
                                            {item.file.name}
                                        </p>
                                    </div>

                                    {/* Badge Status */}
                                    {!item.isProcessing && (
                                        <span
                                            title={item.status}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                                                item.status === 'normal'
                                                    ? 'bg-[#E3EFEA] text-[#10B981]'
                                                    : item.status === 'Siap untuk scan'
                                                      ? 'bg-[#E0F2FE] text-[#0284C7]'
                                                      : 'bg-[#FEE2E2] text-[#FF645A]'
                                            }`}
                                        >
                                            {item.status === 'normal' ? (
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            ) : item.status === 'Siap untuk scan' ? (
                                                <AlertCircle className="w-3.5 h-3.5" />
                                            ) : (
                                                <AlertCircle className="w-3.5 h-3.5" />
                                            )}
                                            {item.status}
                                        </span>
                                    )}
                                </div>

                                {/* Statistik */}
                                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                                    <div className="text-center">
                                        <p className="text-[10px] font-semibold text-gray-400 mb-0.5">Akurasi</p>
                                        <p className="text-xs font-bold text-[#042B1F]">
                                            {item.isProcessing ? '-' : `${item.confidence}%`}
                                        </p>
                                    </div>
                                    <div className="w-px h-6 bg-gray-100"></div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-semibold text-gray-400 mb-0.5">Waktu (ms)</p>
                                        <p className="text-xs font-bold text-[#042B1F] font-mono">{item.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </PageWrapper>
    );
}
