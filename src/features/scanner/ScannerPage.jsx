import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, ImageIcon, RefreshCw, Search, Settings2, UploadCloud, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useScanImage } from '@/hooks/useScan.js';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function ScannerPage() {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [scanResult, setScanResult] = useState(null);
    const [isDragActive, setIsDragActive] = useState(false);

    // --- BARU --- State untuk menahan loading AI dan melacak ID gambar
    const [isProcessingAi, setIsProcessingAi] = useState(false);
    const [currentScanId, setCurrentScanId] = useState(null);

    const fileInputRef = useRef(null);

    const { mutate: scanImage, isPending: isUploading } = useScanImage();
    const navigate = useNavigate();

    useEffect(() => {
        // Hubungkan ke API Gateway Node.js Anda
        const socket = io('http://localhost:3000');

        socket.on('connect', () => {
            console.log('Frontend terhubung ke WebSocket');
        });

        // Dengarkan sinyal hasil dari AI
        socket.on('scan_completed', (data) => {
            console.log('Hasil AI diterima:', data);

            // Pastikan hasil yang masuk adalah untuk gambar yang sedang di-scan
            if (data.scan_id === currentScanId) {
                setScanResult({
                    id: data.scan_id,
                    status: data.prediction,
                    confidence: data.confidence,
                    time: data.inference_time,
                });
                // Matikan animasi loading
                setIsProcessingAi(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [currentScanId]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setScanResult(null);
            triggerScan(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            // Cek apakah file adalah image
            if (file.type.startsWith('image/')) {
                setSelectedImage(file);
                setPreviewUrl(URL.createObjectURL(file));
                setScanResult(null);
                triggerScan(file);
            }
        }
    };

    const triggerScan = (file) => {
        setIsProcessingAi(true);
        scanImage(file, {
            onSuccess: (dataScan) => {
                const returnedScanId = dataScan.scan_id;
                console.log('Menunggu hasil AI untuk ID:', returnedScanId);
                setCurrentScanId(returnedScanId);
            },
            onError: (error) => {
                console.error('Error scanning:', error);
                setScanResult({
                    id: 'ERROR',
                    status: 'Error',
                    confidence: 0,
                    time: '0.00s',
                });
            },
        });
    };

    const resetTool = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setScanResult(null);
        setIsProcessingAi(false);
        setCurrentScanId(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const showLoadingAnimation = isUploading || isProcessingAi;

    return (
        <div className="w-full max-w-5xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-10 justify-center">
            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 mx-auto w-fit">
                <div className="flex items-center gap-3">
                    <span className="text-sm  font-black text-[#042B1F] tracking-[0.2em] uppercase">Input</span>
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-[#042B1F] tracking-[0.2em] uppercase">DETEKSI</span>
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center gap-3">
                    <span className="text-sm  font-black text-[#042B1F] tracking-[0.2em] uppercase ">EVALUASI</span>
                </div>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-[4rem] font-black tracking-tight text-[#042B1F] mb-6 leading-tight">
                    Pengecekan Otomatis Permukaan Keramik
                </h1>
                <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
                    Satu sistem untuk tiga jenis cacat utama. Goresan, noda, atau retak. Dianalisis dalam hitungan
                    detik.
                </p>
            </div>

            {/* ALAT PEMINDAI UTAMA */}
            <div className="w-full max-w-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 rounded-lg overflow-hidden relative min-h-105 flex flex-col transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] mb-16 mx-auto">
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

                {!selectedImage && (
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                        className={`flex-1 flex flex-col items-center justify-center p-12 cursor-pointer transition-colors ${
                            isDragActive ? 'bg-[#E3EFEA]/30' : 'bg-transparent hover:bg-gray-50/50'
                        }`}
                    >
                        <div className="w-16 h-16 bg-[#E3EFEA] text-[#042B1F] rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-105 duration-300">
                            <UploadCloud className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-extrabold text-[#042B1F] mb-2">Tarik Gambar ke Sini</h3>
                        <p className="text-gray-400 text-sm font-medium mb-8">Mendukung resolusi tinggi (JPG, PNG).</p>

                        <Button
                            className="px-6 h-12 bg-[#042B1F] hover:bg-[#031d15] text-white font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-[#042B1F]/20"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current.click();
                            }}
                        >
                            <Search className="w-4 h-4 text-emerald-400" /> Mulai Scan Citra
                        </Button>
                    </div>
                )}

                {selectedImage && (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 bg-white">
                        <div className="relative bg-[#FAFAFA] min-h-75 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 overflow-hidden p-6">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                // --- BARU --- Gunakan showLoadingAnimation
                                className={`w-full max-h-87.5 object-contain rounded-xl transition-all duration-700 ${showLoadingAnimation ? 'scale-105 opacity-50 blur-sm' : 'scale-100 opacity-100 shadow-md'}`}
                            />

                            {/* --- BARU --- Gunakan showLoadingAnimation */}
                            {showLoadingAnimation && (
                                <>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981] shadow-[0_0_20px_5px_rgba(16,185,129,0.3)] animate-[scan_2s_ease-in-out_infinite_alternate]"></div>
                                    <div className="absolute inset-0 bg-[#042B1F]/5 animate-pulse mix-blend-overlay"></div>
                                </>
                            )}
                        </div>

                        <div className="p-8 lg:p-10 flex flex-col justify-center relative">
                            {/* --- BARU --- Gunakan showLoadingAnimation */}
                            {showLoadingAnimation && (
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="w-14 h-14 relative mb-6">
                                        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
                                        <Zap className="absolute inset-0 m-auto w-5 h-5 text-[#042B1F] animate-pulse" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#042B1F] mb-2">Menganalisis...</h3>
                                    <p className="text-gray-400 text-sm font-medium">Model VGG-19 sedang bekerja.</p>
                                </div>
                            )}

                            {scanResult && !showLoadingAnimation && (
                                <div className="flex flex-col animate-in fade-in duration-500">
                                    <div className="mb-6">
                                        <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                                            Hasil Deteksi
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center border ${scanResult.status === 'Normal' ? 'bg-[#E3EFEA] border-[#10B981]/20 text-[#10B981]' : 'bg-[#FEE2E2] border-red-500/20 text-red-500'}`}
                                            >
                                                {scanResult.status === 'Normal' ? (
                                                    <CheckCircle2 className="w-6 h-6" />
                                                ) : (
                                                    <AlertCircle className="w-6 h-6" />
                                                )}
                                            </div>
                                            <h2
                                                className={`text-3xl font-black ${scanResult.status === 'Normal' ? 'text-[#10B981]' : 'text-red-500'}`}
                                            >
                                                {scanResult.status}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                                            <span className="text-sm font-semibold text-gray-500">
                                                Tingkat Akurasi AI
                                            </span>
                                            <span className="text-sm font-bold text-[#042B1F]">
                                                {scanResult.confidence}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                                            <span className="text-sm font-semibold text-gray-500">Waktu Komputasi</span>
                                            <span className="text-sm font-bold text-[#042B1F] font-mono">
                                                {scanResult.time}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 mt-auto">
                                        {/*<Button className="w-full h-12 bg-[#042B1F] hover:bg-[#031d15] text-white font-bold rounded-xl shadow-md shadow-[#042B1F]/10 transition-all flex justify-center items-center gap-2">*/}
                                        {/*    <Download className="w-4 h-4" /> Simpan Laporan*/}
                                        {/*</Button>*/}
                                        <Button
                                            onClick={resetTool}
                                            variant="outline"
                                            className="w-full h-12 bg-white hover:bg-gray-50 border-gray-200 text-[#042B1F] font-bold rounded-xl transition-all flex justify-center items-center gap-2 shadow-sm"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Pindai Lagi
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-5xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-lg p-8 md:p-12 mb-12 flex flex-col md:flex-row gap-12 items-center mx-auto">
                <div className="flex-1 flex flex-col gap-6 w-full ">
                    <div className="self-start px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded mb-2 border border-gray-200">
                        Spesifikasi Teknis Model
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="mt-1 bg-[#042B1F] p-1 rounded">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="text-[#042B1F] font-bold text-sm uppercase tracking-tight">
                                Klasifikasi Multi-Kelas Presisi
                            </h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Arsitektur VGG-19 berhasil mengidentifikasi 4 kategori cacat permukaan dengan nilai
                                F1-Score 0.9103, memastikan performa deteksi yang stabil di berbagai kondisi citra.
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100"></div>

                    {/* Poin 2 */}
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 bg-[#042B1F] p-1 rounded">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="text-[#042B1F] font-bold text-sm uppercase tracking-tight">
                                Latensi Inferensi Rendah
                            </h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Proses validasi dan klasifikasi citra dilakukan dengan waktu respons rata-rata di bawah
                                2 detik, mendukung kebutuhan inspeksi pada lini produksi yang dinamis.
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100"></div>

                    {/* Poin 3 */}
                    <div className="flex gap-4 items-start">
                        <div className="mt-1 bg-[#042B1F] p-1 rounded">
                            <Settings2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="text-[#042B1F] font-bold text-sm uppercase tracking-tight">
                                Akurasi Pengujian 90.94%
                            </h4>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Performa optimal dicapai melalui tuning hyperparameter pada batch size dan learning
                                rate, menghasilkan test accuracy sebesar 90.94%.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full bg-[#042B1F] rounded-lg p-6 md:p-8 flex items-center justify-center relative overflow-hidden h-[360px] shadow-2xl shadow-[#042B1F]/30">
                    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-5 z-10 animate-in fade-in zoom-in duration-700">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="w-8 h-8 rounded-full bg-[#FF645A] text-white flex items-center justify-center font-bold text-xs">
                                C
                            </div>
                            <div>
                                <h5 className="text-[#042B1F] text-xs font-extrabold">Dashboard Utama</h5>
                                <p className="text-[10px] text-gray-400 font-medium">Sistem terhubung realtime</p>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                    <ImageIcon className="w-3.5 h-3.5 opacity-50" /> Batch_A01.jpg
                                </div>
                                <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded">
                                    Normal
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                    <ImageIcon className="w-3.5 h-3.5 opacity-50" /> Batch_A02.jpg
                                </div>
                                <span className="text-[10px] font-bold text-[#FF645A] bg-[#FF645A]/10 px-2 py-1 rounded">
                                    Retak
                                </span>
                            </div>
                        </div>
                        <Button
                            className="w-full h-10 bg-[#042B1F] text-white text-xs font-bold rounded-lg hover:bg-[#031d15]"
                            onClick={() => navigate('/login')}
                        >
                            Login Untuk Melihat Riwayat Pemindaian
                        </Button>
                    </div>
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 border border-white/10 rounded-full"></div>
                    <div className="absolute bottom-[-100px] left-[-20px] w-80 h-80 border border-white/5 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
