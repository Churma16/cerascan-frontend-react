import React from 'react';
import MainLayout from "@/layouts/MainLayout.jsx";
import OverviewCard from "@/features/insight/components/OverviewCard.jsx";
import DatasetProportionCard from "@/features/insight/components/DatasetProportionCard.jsx";
import AnovaCard from "@/features/insight/components/AnovaCard.jsx";
import ModelSampleCard from "@/features/insight/components/ModelSampleCard.jsx";
import ArchitectureComparisonCard from "@/features/insight/components/ArchitectureComparisonCard.jsx";


export default function InsightsPage() {
    return (
        <MainLayout>
            <div className="w-full max-w-6xl mx-auto px-6 relative z-10 animate-in fade-in duration-500 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Laporan Performa Model</h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Intisari evaluasi sistem dari <strong className="text-zinc-200">36 skenario pelatihan
                        hiperparameter</strong> yang dilakukan menggunakan Convolutional Neural Network VGG-19.
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <OverviewCard/>
                        <DatasetProportionCard/>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                        <AnovaCard/>
                        <ModelSampleCard/>
                    </div>

                    <ArchitectureComparisonCard/>
                </div>
            </div>
        </MainLayout>

    );
}

