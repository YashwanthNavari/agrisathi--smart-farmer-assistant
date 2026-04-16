import React from 'react';
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import { Scheme } from '../types';

interface SchemesProps {
  onBack: () => void;
}

const GOVERNMENT_SCHEMES: Scheme[] = [
  {
    id: '1',
    title: 'PM Kisan Samman Nidhi',
    provider: 'Central Govt',
    category: 'financial',
    description: 'Income support of ₹6,000 per year in three equal installments to all land holding farmer families.',
    benefit: '₹6,000 / year',
  },
  {
    id: '2',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    provider: 'Central Govt',
    category: 'insurance',
    description: 'Aims to provide insurance coverage and financial support to the farmers in the event of failure of any of the notified crops.',
    benefit: 'Crop Insurance',
    deadline: '31st Dec 2024'
  },
  {
    id: '3',
    title: 'Soil Health Card Scheme',
    provider: 'Dept of Agriculture',
    category: 'equipment',
    description: 'Government issues soil health cards to farmers which will carry crop-wise recommendations of nutrients and fertilizers.',
    benefit: 'Free Soil Test'
  },
  {
    id: '4',
    title: 'Kisan Credit Card (KCC)',
    provider: 'National Bank',
    category: 'financial',
    description: 'Provides adequate and timely credit support from the banking system under a single window.',
    benefit: 'Low Interest Loan'
  },
  {
    id: '5',
    title: 'Sub-Mission on Agricultural Mechanization',
    provider: 'State Govt',
    category: 'equipment',
    description: 'Subsidy on purchasing tractors, rotavators, and other farm machinery to promote mechanization.',
    benefit: 'Up to 50% Subsidy'
  }
];

export const Schemes: React.FC<SchemesProps> = ({ onBack }) => {
  return (
    <div className="pb-20 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="sticky top-0 bg-white z-30 shadow-sm px-4 py-3 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Government Schemes</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Categories (Static for now) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
           <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-medium whitespace-nowrap">All Schemes</button>
           <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-xs font-medium whitespace-nowrap">Financial</button>
           <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-xs font-medium whitespace-nowrap">Insurance</button>
           <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-xs font-medium whitespace-nowrap">Machinery</button>
        </div>

        {/* Schemes List */}
        {GOVERNMENT_SCHEMES.map(scheme => (
          <div key={scheme.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Tag */}
            <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wide">
              {scheme.category}
            </div>

            <div className="mb-3">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                {scheme.provider}
              </span>
              <h3 className="text-base font-bold text-gray-900 leading-tight">{scheme.title}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {scheme.description}
            </p>

            <div className="bg-gray-50 rounded-lg p-3 mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Benefit</p>
                <p className="text-sm font-bold text-gray-800">{scheme.benefit}</p>
              </div>
              {scheme.deadline && (
                 <div className="text-right">
                   <p className="text-xs text-gray-500">Deadline</p>
                   <p className="text-sm font-bold text-red-600">{scheme.deadline}</p>
                 </div>
              )}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                Check Eligibility
              </button>
              <button className="p-2.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                <ExternalLink size={20} />
              </button>
            </div>
          </div>
        ))}

        <div className="text-center py-4 text-xs text-gray-400">
          Information sourced from official government portals.
        </div>
      </div>
    </div>
  );
};