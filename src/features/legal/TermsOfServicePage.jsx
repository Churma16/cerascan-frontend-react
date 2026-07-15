import { useEffect } from 'react';
import { FileText, AlertTriangle, CreditCard, Scale } from 'lucide-react';
import PageHeader from '@/components/PageHeader.jsx';

export default function TermsOfServicePage() {
    const lastUpdated = "16 Juli 2026";

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20 pt-6">
            <PageHeader title="Syarat & Ketentuan" desc={`Terakhir diperbarui: ${lastUpdated}`} />
            
            <div className="space-y-6 text-gray-700 leading-relaxed relative z-10 mt-8">
                
                {/* Intro Section */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <p className="text-lg">
                        Dengan mendaftar, mengakses, dan menggunakan platform <strong className="text-gray-900">CeraScan</strong>, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan berikut ini. CeraScan adalah proyek berbasis penelitian/edukasi yang berfokus pada otomasi inspeksi keramik menggunakan teknologi <em>Machine Learning</em>.
                    </p>
                </section>

                {/* AI Disclaimer */}
                <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-[#042B1F]" />
                        1. Sifat Layanan dan Akurasi AI (Disclaimer)
                    </h2>
                    <ul className="space-y-3 list-disc pl-5">
                        <li>
                            Layanan inspeksi dan deteksi cacat keramik yang diberikan oleh model <em>Convolutional Neural Network (VGG)</em> kami disediakan dalam status <strong>"sebagaimana adanya" (as is)</strong>.
                        </li>
                        <li>
                            Walaupun kami berusaha mengkalibrasi model untuk menyajikan akurasi terbaik (berkisar di angka ~90%), teknologi <em>Machine Learning</em> bersifat probabilistik dan tidak mutlak. Sistem dapat menghasilkan deteksi yang keliru (<em>false positive</em> atau <em>false negative</em>).
                        </li>
                        <li>
                            <strong>Pelepasan Tanggung Jawab Hukum:</strong> Kami tidak bertanggung jawab atas kerugian operasional, finansial, material, atau bisnis apa pun yang terjadi akibat keputusan yang Anda ambil berdasarkan hasil pemindaian dan klasifikasi dari sistem CeraScan.
                        </li>
                    </ul>
                </section>

                {/* Payment & No Refund */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-[#042B1F]" />
                        2. Kebijakan Pembayaran & Pengembalian Dana
                    </h2>
                    <p className="mb-4">
                        Saat ini, CeraScan menggunakan mode demonstrasi (Midtrans Sandbox) untuk mensimulasikan transaksi pembelian paket <em>subscription</em> dan kuota scan.
                    </p>
                    <div className="border-l-4 border-red-500 bg-red-50/50 p-4 rounded-r-lg text-red-900 mb-5">
                        <p className="font-bold mb-1">No Refund Policy (Tidak Ada Pengembalian Dana)</p>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Oleh karena sifat proyek pembelajaran ini, <strong>semua transaksi atau simulasi pembayaran bersifat final</strong>. Kami tidak memproses pengembalian dana dalam bentuk apa pun.
                        </p>
                    </div>
                    <p>
                        Jika Anda memutuskan untuk membatalkan paket berlangganan (<em>subscription</em>) Anda melalui Dashboard, pembatalan tersebut hanya akan mencegah penagihan otomatis di siklus penagihan bulan berikutnya. Anda akan tetap dapat menikmati sisa kuota yang ada hingga masa aktif langganan Anda saat ini berakhir.
                    </p>
                </section>

                {/* Fair Use Policy */}
                <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Scale className="w-6 h-6 text-[#042B1F]" />
                        3. Penggunaan Wajar (Fair Use Policy)
                    </h2>
                    <p className="mb-4">
                        Untuk menjaga keandalan dan stabilitas sistem bagi seluruh pengguna, Anda setuju untuk <strong>tidak melakukan</strong> tindakan penyalahgunaan layanan, termasuk namun tidak terbatas pada:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50/80 rounded-lg border border-gray-100">
                            <strong className="block text-gray-900 mb-1">Eksploitasi & Spamming</strong>
                            <span className="text-sm">Melakukan <em>spamming request</em> ke API secara sengaja yang membebani server (DDoS/Rate Limit Abuse).</span>
                        </div>
                        <div className="p-4 bg-gray-50/80 rounded-lg border border-gray-100">
                            <strong className="block text-gray-900 mb-1">Scraping Data</strong>
                            <span className="text-sm">Mengekstrak data dari sistem, termasuk data pada Leaderboard, menggunakan bot atau *web scraper*.</span>
                        </div>
                        <div className="p-4 bg-gray-50/80 rounded-lg border border-gray-100">
                            <strong className="block text-gray-900 mb-1">Adversarial Attacks</strong>
                            <span className="text-sm">Mengunggah gambar yang secara khusus dirancang untuk mengeksploitasi atau merusak algoritma AI kami.</span>
                        </div>
                        <div className="p-4 bg-gray-50/80 rounded-lg border border-gray-100">
                            <strong className="block text-gray-900 mb-1">Konten Ilegal</strong>
                            <span className="text-sm">Mengunggah gambar yang tidak pantas, melanggar hukum, atau tidak relevan dengan deteksi keramik.</span>
                        </div>
                    </div>
                    <div className="mt-5 border-l-4 border-[#042B1F] bg-[#042B1F]/5 p-4 rounded-r-lg">
                        <p className="italic text-sm text-[#042B1F]">
                            Kami memegang hak prerogatif untuk menangguhkan (suspend) atau menghapus akun pengguna secara sepihak dan permanen jika terdeteksi adanya pelanggaran terhadap aturan penggunaan (Fair Use) ini, tanpa kewajiban memberikan kompensasi apa pun.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
