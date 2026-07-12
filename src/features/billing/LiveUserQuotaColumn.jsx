import { useCurrentUser } from '@/hooks/useAuth.js';
import DotLoading from '@/components/DotLoading.jsx';
import { useLiveUserQuotaSSE } from '@/hooks/useLiveUserQuotaSSE.js';

export default function LiveUserQuotaColumn() {
    const { data: me } = useCurrentUser();
    const { userQuota } = useLiveUserQuotaSSE(me?.id);

    return (
        <div className="text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sisa Kuota</p>
            {userQuota !== null ? (
                <p className="text-xl font-black text-[#042B1F] mt-1">{userQuota} Scan</p>
            ) : (
                <div className="mt-3 flex justify-center">
                    <DotLoading className="text-[#042B1F]" />
                </div>
            )}
        </div>
    );
}
