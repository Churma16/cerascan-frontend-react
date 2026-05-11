import React, {useRef, useState} from 'react';
import {
    AlertCircle,
    CheckCircle2,
    Cpu,
    Download,
    Image as ImageIcon,
    RefreshCw,
    ShieldCheck,
    UploadCloud,
    Zap
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import MainLayout from "@/layouts/MainLayout.jsx";

export default function ScannerPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setScanResult(null);
            // Panggil fungsi scan otomatis setelah gambar dipilih
            triggerScan(file);
        }
    };

    const triggerScan = (file) => {
        setIsScanning(true);
        setScanResult(null);

        // TODO: Nanti bagian ini diganti menggunakan useMutation (TanStack Query) dan Axios
        // untuk mengirim 'file' ke endpoint backend Express (localhost:3000/api/scan)

        // Simulasi proses AI (2 detik)
        setTimeout(() => {
            setIsScanning(false);
            const mockStatuses = ["Normal", "Retak", "Bernoda", "Goresan"];
            const isDefect = Math.random() > 0.6;
            const randomStatus = isDefect ? mockStatuses[Math.floor(Math.random() * 3) + 1] : "Normal";

            setScanResult({
                id: 'SCN-' + Math.floor(1000 + Math.random() * 9000),
                status: randomStatus,
                confidence: (88 + Math.random() * 11).toFixed(2),
                time: (Math.random() * (1.5 - 0.2) + 0.2).toFixed(2) + "s"
            });
        }, 2000);
    };

    const resetTool = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setScanResult(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <MainLayout>
            <div className="w-full max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-3xl animate-in slide-in-from-bottom-4 duration-700">
                    Deteksi Cacat Keramik <br/>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
            Secara Instan.
                    </span>
                </h1>
                <p className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100">
                    100% Otomatis dan Cerdas. Unggah foto permukaan keramik Anda dan biarkan AI kami mengidentifikasi
                    cacat dalam hitungan detik.
                </p>

                {/* ALAT PEMINDAI RAKSASA */}
                <div
                    className="w-full bg-[#0E0F15] border border-[#262833] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden relative min-h-[400px] flex flex-col transition-all duration-500 animate-in zoom-in-95 duration-700 delay-200">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    {!selectedImage && (
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="flex-1 flex flex-col items-center justify-center p-12 cursor-pointer hover:bg-[#13141C] transition-colors group border-2 border-dashed border-transparent hover:border-indigo-500/30 m-4 rounded-2xl"
                        >
                            <div
                                className="w-24 h-24 bg-[#1A1C26] border border-[#262833] group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/20 rounded-3xl flex items-center justify-center mb-6 text-indigo-400 transition-all shadow-2xl group-hover:scale-105">
                                <UploadCloud className="w-12 h-12"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Tarik Gambar ke Sini</h3>
                            <p className="text-zinc-500 mb-8 max-w-md text-center">Mendukung resolusi tinggi (JPG,
                                PNG).</p>

                            <Button
                                className="px-8 h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-95 flex items-center gap-2 text-base"
                                onClick={(e) => {
                                    e.stopPropagation(); // Mencegah klik ganda pada parent
                                    fileInputRef.current.click();
                                }}
                            >
                                <ImageIcon className="w-5 h-5"/> Pilih Gambar
                            </Button>
                        </div>
                    )}

                    {selectedImage && (
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 relative">
                            <div
                                className="relative bg-black min-h-[300px] md:min-h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-[#262833] overflow-hidden">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className={`max-w-full max-h-[500px] object-contain transition-all duration-700 ${isScanning ? 'scale-105 opacity-60 blur-[2px]' : 'scale-100 opacity-100'}`}
                                />

                                {/* Animasi Garis Scanner */}
                                {isScanning && (
                                    <>
                                        <div
                                            className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_20px_5px_rgba(99,102,241,0.5)] animate-[scan_2s_ease-in-out_infinite_alternate]"></div>
                                        <div
                                            className="absolute inset-0 bg-indigo-500/10 animate-pulse mix-blend-overlay"></div>
                                        {/* Style keyframes ada di MainLayout atau index.css */}
                                    </>
                                )}
                            </div>

                            <div className="p-8 lg:p-12 flex flex-col justify-center bg-[#0E0F15] relative">
                                {isScanning && (
                                    <div
                                        className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                                        <div className="w-16 h-16 relative mb-6">
                                            <div
                                                className="absolute inset-0 border-4 border-[#262833] rounded-full"></div>
                                            <div
                                                className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            <Zap
                                                className="absolute inset-0 m-auto w-6 h-6 text-indigo-400 animate-pulse"/>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Menganalisis Permukaan...</h3>
                                        <p className="text-zinc-500 text-sm">Menjalankan inferensi VGG-19 Deep
                                            Learning.</p>
                                    </div>
                                )}

                                {scanResult && !isScanning && (
                                    <div
                                        className="flex flex-col animate-in slide-in-from-right-8 fade-in duration-500">
                                        <div className="mb-8">
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Hasil
                                                Deteksi</p>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${scanResult.status === 'Normal' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                                                    {scanResult.status === 'Normal' ?
                                                        <CheckCircle2 className="w-7 h-7"/> :
                                                        <AlertCircle className="w-7 h-7"/>}
                                                </div>
                                                <h2 className={`text-4xl font-black ${scanResult.status === 'Normal' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {scanResult.status}
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-10">
                                            <div
                                                className="flex justify-between items-center py-3 border-b border-[#262833]">
                                                <span className="text-sm text-zinc-400">Tingkat Akurasi AI</span>
                                                <span
                                                    className="text-base font-bold text-white">{scanResult.confidence}%</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center py-3 border-b border-[#262833]">
                                                <span className="text-sm text-zinc-400">Waktu Komputasi</span>
                                                <span
                                                    className="text-base font-bold text-white font-mono">{scanResult.time}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <Button
                                                className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex justify-center items-center gap-2 text-base">
                                                <Download className="w-5 h-5"/> Simpan Laporan
                                            </Button>
                                            <Button
                                                onClick={resetTool}
                                                variant="outline"
                                                className="w-full h-14 bg-[#1A1C26] hover:bg-[#262833] border border-[#262833] text-zinc-300 font-bold rounded-xl transition-all flex justify-center items-center gap-2 text-base hover:text-white"
                                            >
                                                <RefreshCw className="w-5 h-5"/> Pindai Gambar Lain
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <p className="mt-6 text-xs text-zinc-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4"/> Citra Anda diproses secara aman.
                </p>
            </div>

            {/* INFO SECTION BAWAH */}
            <section className="mt-24 border-t border-[#1E1F2E] bg-[#090A0F]/50 w-full">
                <div
                    className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <div
                            className="w-12 h-12 bg-[#1A1C26] border border-[#262833] rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <Cpu className="w-6 h-6 text-indigo-400"/>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Didukung VGG-19</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">Arsitektur jaringan saraf dalam yang sangat
                            andal untuk klasifikasi pola cacat mikroskopis.</p>
                    </div>
                    <div>
                        <div
                            className="w-12 h-12 bg-[#1A1C26] border border-[#262833] rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <Zap className="w-6 h-6 text-amber-400"/>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Inferensi Kilat</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">Sistem dioptimalkan untuk memberikan hasil
                            prediksi dalam waktu kurang dari 2 detik.</p>
                    </div>
                    <div>
                        <div
                            className="w-12 h-12 bg-[#1A1C26] border border-[#262833] rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <ShieldCheck className="w-6 h-6 text-emerald-400"/>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Akurasi Uji Tinggi</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">Model dilatih dengan dataset ekstensif
                            menghasilkan skor akurasi rata-rata 90.94%.</p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}