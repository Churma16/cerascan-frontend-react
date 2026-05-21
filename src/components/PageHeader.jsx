import React from 'react';

export default function PageHeader({ title, desc }) {
    return (
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-[#042B1F] mb-4 tracking-tight">{title}</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">{desc}</p>
        </div>
    );
}
