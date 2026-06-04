export default function PageWrapper({ children }) {
    return (
        <div className="flex-1 overflow-y-auto px-8 py-8 pb-16 relative z-10">
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {children}
            </div>
        </div>
    );
}
