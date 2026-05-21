import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx';
import { Trash2 } from 'lucide-react';
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription } from '@radix-ui/react-alert-dialog';

export default function AlertButtonAndDialog(props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="p-2.5 bg-[#FEE2E2] hover:bg-[#fca5a5] text-[#FF645A] rounded-xl border border-red-100 transition-all hover:scale-105 active:scale-95 shadow-sm">
                    <Trash2 className="w-4 h-4" />
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl p-8">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-black text-[#042B1F]">
                        Hapus log pemindaian {props.data.scan_id} ?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500 font-medium mt-2">
                        Tindakan ini permanen. Data pemindaian akan dihapus selamanya dari sistem.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-8">
                    <AlertDialogCancel className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors font-bold px-6 py-2.5 rounded-xl">
                        Batal
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={props.onClick}
                        className="bg-[#FF645A] border-none text-white hover:bg-[#e0564e] transition-all px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#FF645A]/20"
                    >
                        Ya, Hapus Data
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
