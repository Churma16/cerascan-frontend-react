import { useEffect } from 'react';
import { Shield, ShieldAlert, Database, Trash2, Eye } from 'lucide-react';
import PageHeader from '@/components/PageHeader.jsx';

export default function PrivacyPolicyPage() {
    const lastUpdated = "16 Juli 2026";

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20 pt-6">
            <PageHeader title="Kebijakan Privasi" desc={`Terakhir diperbarui: ${lastUpdated}`} />
            
            <div className="space-y-6 text-gray-700 leading-relaxed relative z-10 mt-8">
                
                {/* Intro Section */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <p className="text-lg">
                        Selamat datang di <strong className="text-gray-900">CeraScan</strong>. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda saat menggunakan layanan deteksi cacat keramik berbasis <em>Convolutional Neural Network (CNN)</em> kami. Harap diperhatikan bahwa CeraScan saat ini beroperasi murni sebagai <strong>proyek portofolio dan pembelajaran (edukasi)</strong>.
                    </p>
                </section>

                {/* Data Collection */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Database className="w-6 h-6 text-[#042B1F]" />
                        1. Data yang Kami Kumpulkan
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-2 h-2 bg-[#042B1F] rounded-full mt-2.5 flex-shrink-0" />
                            <div>
                                <strong className="text-gray-900 block mb-1">Informasi Akun Dasar</strong>
                                Saat Anda mendaftar melalui formulir registrasi, kami mengumpulkan nama, alamat email, dan kata sandi Anda (yang disimpan dalam format terenkripsi).
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-2 h-2 bg-[#042B1F] rounded-full mt-2.5 flex-shrink-0" />
                            <div>
                                <strong className="text-gray-900 block mb-1">Data Pihak Ketiga (SSO Google)</strong>
                                Jika Anda masuk menggunakan akun Google (Login with Google), kami mengumpulkan data <em>Profil Dasar</em> dan <em>Alamat Email</em> yang diberikan oleh Google sesuai dengan persetujuan Anda saat proses otorisasi OAuth.
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-2 h-2 bg-[#042B1F] rounded-full mt-2.5 flex-shrink-0" />
                            <div>
                                <strong className="text-gray-900 block mb-1">Data Pemrosesan (Gambar)</strong>
                                Kami mengumpulkan dan menyimpan sementara gambar keramik yang Anda unggah ke sistem kami untuk diproses oleh model <em>Machine Learning</em> (VGG-19) kami.
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Image Retention */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Eye className="w-6 h-6 text-[#042B1F]" />
                        2. Retensi dan Penggunaan Gambar Anda
                    </h2>
                    <p className="mb-4">
                        Gambar yang Anda unggah akan disimpan secara aman di infrastruktur penyimpanan cloud (AWS S3) untuk tujuan berikut:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div className="p-5 border border-gray-100 rounded-xl hover:border-[#042B1F]/30 transition-colors">
                            <h3 className="font-bold text-gray-900 mb-2">Riwayat & Analitik</h3>
                            <p className="text-sm text-gray-600">Memungkinkan Anda melihat kembali riwayat pemindaian dan meninjau kembali hasil deteksi cacat di Dashboard Anda secara real-time.</p>
                        </div>
                        <div className="p-5 border border-gray-100 rounded-xl hover:border-[#042B1F]/30 transition-colors">
                            <h3 className="font-bold text-gray-900 mb-2">Peningkatan Model (Retraining)</h3>
                            <p className="text-sm text-gray-600">Gambar yang diunggah dapat kami gunakan di masa mendatang untuk melatih ulang (retrain) dan meningkatkan metrik akurasi dari model AI VGG kami.</p>
                        </div>
                    </div>
                    <div className="mt-5 p-4 border-l-4 border-yellow-400 bg-yellow-50/50 rounded-r-lg text-sm flex gap-3 items-start">
                        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-600" />
                        <p className="text-yellow-800">Administrator sistem memiliki hak dan akses untuk mengelola, meninjau, atau menghapus data gambar ini sewaktu-waktu guna menjaga integritas sistem dari penyalahgunaan ruang penyimpanan.</p>
                    </div>
                </section>

                {/* Leaderboard Privacy */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Eye className="w-6 h-6 text-[#042B1F]" />
                        3. Visibilitas Data & Leaderboard
                    </h2>
                    <p className="mb-4">
                        Sistem kami mengimplementasikan fitur gamifikasi/analitik berupa <strong>Leaderboard (Papan Peringkat)</strong> untuk menampilkan jajaran pengguna paling aktif di platform CeraScan.
                    </p>
                    <div className="border-l-4 border-[#042B1F] bg-[#042B1F]/5 p-4 rounded-r-lg mt-4">
                        <p className="font-medium text-gray-900 mb-2">Dengan menggunakan layanan dan melakukan pemindaian (scan), Anda memahami dan menyetujui bahwa:</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                            <li>Nama Lengkap Anda</li>
                            <li>Sebagian informasi terkait Alamat Email</li>
                            <li>Statistik Pemindaian (Total scan & rasio cacat)</li>
                        </ul>
                        <p className="mt-3 text-[#042B1F] italic text-sm">...dapat ditampilkan secara publik di halaman Leaderboard dan dapat dilihat oleh sesama pengguna terdaftar lainnya dalam sistem.</p>
                    </div>
                </section>

                {/* Account Deletion */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Trash2 className="w-6 h-6 text-[#042B1F]" />
                        4. Hak Pengguna & Penghapusan Akun
                    </h2>
                    <p className="mb-2">
                        Kami menghargai privasi dan kontrol penuh Anda atas jejak digital Anda di platform kami. Anda memiliki hak absolut untuk meminta penghapusan akun Anda kapan saja.
                    </p>
                    <div className="mt-4 border-l-4 border-red-500 bg-red-50/50 p-4 rounded-r-lg text-red-900">
                        <p className="text-sm opacity-90 leading-relaxed">
                            Ketika Anda melakukan penghapusan akun, sistem kami akan secara otomatis menghapus seluruh data profil pribadi Anda beserta <strong>seluruh gambar yang pernah Anda unggah akan dihapus secara permanen (hard delete)</strong> dari basis data dan infrastruktur AWS S3 kami tanpa meninggalkan salinan cadangan yang dapat dipulihkan.
                        </p>
                    </div>
                </section>

                {/* Data Security */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Shield className="w-6 h-6 text-[#042B1F]" />
                        5. Keamanan dan Pembagian Data
                    </h2>
                    <p>
                        CeraScan <strong>tidak pernah dan tidak akan menjual data Anda</strong> kepada pihak ketiga manapun. Data Anda hanya diproses dan dibagikan secara terenkripsi kepada infrastruktur pihak ketiga yang esensial (seperti <em>AWS Cloud</em> untuk komputasi, dan <em>Midtrans Sandbox</em> untuk simulasi pembayaran) semata-mata demi memastikan operasional layanan ini berjalan sebagaimana mestinya.
                    </p>
                </section>
            </div>
        </div>
    );
}
