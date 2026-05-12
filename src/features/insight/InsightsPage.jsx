import React from 'react';
import MainLayout from '@/layouts/public/MainLayout.jsx';

// Import semua kartu yang sudah dipisah
import GeneralizationMetricsCard from './components/GeneralizationMetricsCard';
import DatasetProportionCard from './components/DatasetProportionCard';
import AnovaCard from '@/features/insight/components/AnovaCard.jsx';
import ModelSampleCard from '@/features/insight/components/ModelSampleCard.jsx';
import ArchitectureComparisonCard from '@/features/insight/components/ArchitectureComparisonCard.jsx';

export default function InsightsPage() {
    return (
        <MainLayout>
            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-[#042B1F] mb-4 tracking-tight">
                        Insight Evaluasi Model
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Rangkuman evaluasi sistem dari 36 skenario pelatihan hyperparameter yang
                        dilakukan menggunakan VGG-19.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    <GeneralizationMetricsCard />
                    <DatasetProportionCard />
                </div>

                <div className="flex flex-col gap-8 mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AnovaCard />
                        <ModelSampleCard />
                    </div>
                    <ArchitectureComparisonCard />
                </div>
            </div>
        </MainLayout>
    );
}
