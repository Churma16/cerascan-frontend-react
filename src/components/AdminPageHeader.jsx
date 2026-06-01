export default function AdminPageHeader({ title, desc }) {
    return (
        <div>
            <h2 className="text-2xl font-black tracking-tight text-[#042B1F]">{title}</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">{desc}</p>
        </div>
    );
}
