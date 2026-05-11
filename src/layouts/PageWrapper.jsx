export default function PageWrapper({ children }) {
    return (
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
            <div className="max-w-6xl mx-auto">{children}</div>
        </div>
    );
}
