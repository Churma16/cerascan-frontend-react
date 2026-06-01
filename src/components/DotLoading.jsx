export default function DotLoading({ className = 'text-gray-600' }) {
    return (
        <div className={`dot-loading flex gap-1 ${className}`}>
            <span className="w-2 h-2 rounded-full bg-current"></span>
            <span className="w-2 h-2 rounded-full bg-current"></span>
            <span className="w-2 h-2 rounded-full bg-current"></span>
        </div>
    );
}

