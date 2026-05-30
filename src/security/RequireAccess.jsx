import { useCurrentUser } from '@/hooks/useAuth.js';
import { getPlanProperties } from '@/enum/AuthEnum.js';

export default function RequireAccess({ allowedRoles, allowedPlans, children }) {
    const { data: user } = useCurrentUser();

    if (!user) return null;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return null;
    }

    if (allowedPlans && !allowedPlans.includes(user.plan_id)) {
        return null;
    }

    // show popup
    if (allowedPlans != null && user.plan_id === getPlanProperties('FREE').value) {
        return null;
    }

    return children;
}
