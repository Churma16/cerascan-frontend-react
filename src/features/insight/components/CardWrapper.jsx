export default function CardWrapper({ children }) {
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
            {children}
        </div>
    );
}
