import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ScannerPage from "@/features/ScannerPage.jsx";
import HistoryPage from "@/features/history/HistoryPage.jsx";
import InsightsPage from "@/features/insight/InsightsPage.jsx";
import ArchitecturePage from "@/features/architecture/ArchitecturePage.jsx";

// Import halaman-halaman Anda (Pastikan file ini sudah Anda buat)
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';

const HomePage = () => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to CeraScan AI</h1>
        <p className="text-zinc-400 max-w-md">Silakan pilih menu di samping untuk memulai.</p>
    </div>
);

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/login" element={<Login/>}/>*/}

                <Route element={<ProtectedRoute/>}>
                    {/*<Route path="/dashboard" element={<Dashboard/>}/>*/}
                    <Route path="/scanner" element={<ScannerPage/>}/>
                    <Route path="/history" element={<HistoryPage/>}/>
                    <Route path="/insights" element={<InsightsPage/>}/>
                    <Route path="/architecture" element={<ArchitecturePage/>}/>
                </Route>

                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>

                <Route path="*"
                       element={<div className="p-8 text-center text-2xl font-bold">404 Halaman Tidak Ditemukan</div>}/>
            </Routes>
        </BrowserRouter>
    );
}