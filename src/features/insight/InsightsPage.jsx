import React from 'react';

// Import semua kartu yang sudah dipisah
import GeneralizationMetricsCard from './components/GeneralizationMetricsCard';
import DatasetProportionCard from './components/DatasetProportionCard';
import AnovaCard from '@/features/insight/components/AnovaCard.jsx';
import ModelSampleCard from '@/features/insight/components/ModelSampleCard.jsx';
import ArchitectureComparisonCard from '@/features/insight/components/ArchitectureComparisonCard.jsx';
import ConfusionMatrixCard from '@/features/insight/components/ConfusionMatrixCard.jsx';
import PageHeader from '@/components/PageHeader.jsx';

export default function InsightsPage() {
    return (
        <div className="w-full max-w-5xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
            <PageHeader
                title="Insight Evaluasi Model"
                desc="Rangkuman evaluasi sistem dari 36 skenario pelatihan hyperparameter yang dilakukan menggunakan
                    VGG-19."
            />

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
                <ConfusionMatrixCard />
            </div>
        </div>
    );
}
