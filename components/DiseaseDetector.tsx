import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { analyzePlantDisease } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const DiseaseDetector: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null); // Clear previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      const result = await analyzePlantDisease(image);
      setAnalysis(result);
    } catch (error) {
      setAnalysis("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setAnalysis(null);
  };

  return (
    <div className="p-4 flex flex-col h-full min-h-[80vh]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Dr. Crop - Disease Detector</h2>

      {!image ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 p-8 space-y-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <Camera size={40} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Take a photo of the affected plant</h3>
            <p className="text-sm text-gray-500 mt-2">Ensure the affected area is clearly visible and well-lit.</p>
          </div>
          
          <div className="flex flex-col w-full gap-3">
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
             >
               <Camera size={20} />
               Take Photo / Upload
             </button>
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                capture="environment"
                onChange={handleImageUpload}
             />
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="relative rounded-xl overflow-hidden shadow-md max-h-64">
            <img src={image} alt="Crop" className="w-full h-full object-cover" />
            <button 
              onClick={reset}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          {!analysis && !loading && (
             <button 
               onClick={handleAnalyze}
               className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-700 transition-colors"
             >
               Analyze Disease
             </button>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
              <p className="text-emerald-700 font-medium animate-pulse">Consulting AI Agronomist...</p>
            </div>
          )}

          {analysis && (
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 prose prose-sm prose-emerald max-w-none">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                <CheckCircle className="text-emerald-600" size={20} />
                <h3 className="text-lg font-bold text-gray-800 m-0">Diagnosis Report</h3>
              </div>
              <div className="text-gray-700">
                 <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors">
                  Find Medicine in Market
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};