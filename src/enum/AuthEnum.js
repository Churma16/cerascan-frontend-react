export function getRoleProperties(value) {
    switch (value) {
        case 'ADMIN':
            return { label: 'admin', color: 'red' };
        case 'USER':
            return { label: 'user', color: 'blue' };
        default:
            return { label: 'Unknown', color: 'gray' };
    }
}

export function getPlanProperties(value) {
    switch (value) {
        case 'FREE':
            return { value: 1, label: 'free' };
        case 'PREMIUM':
            return { value: 2, label: 'premium' };
        case 'ULTRA':
            return { value: 3, label: 'ultra' };
    }
}
