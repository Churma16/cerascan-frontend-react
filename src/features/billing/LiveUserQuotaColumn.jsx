import { useCurrentUser } from '@/hooks/useAuth.js';
import DotLoading from '@/components/DotLoading.jsx';
import { useUserQuota } from '@/hooks/useUserQuota.js';

export default function LiveUserQuotaColumn() {
    const { data: me } = useCurrentUser();
    const { remainingQuota, isLoading } = useUserQuota(me?.id);

    return (
        <div className="text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sisa Kuota</p>
            {isLoading ? (
                <div className="mt-3 flex justify-center">
                    <DotLoading className="text-[#042B1F]" />
                </div>
            ) : (
                <p className="text-xl font-black text-[#042B1F] mt-1">
                    {remainingQuota !== null ? `${remainingQuota} Scan` : '0 Scan'}
                </p>
            )}
        </div>
    );
}
