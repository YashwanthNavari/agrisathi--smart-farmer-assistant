import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, Loader2, CheckCircle2, AlertCircle, Share2, Printer, ChevronRight } from 'lucide-react';
import { analyzePlantDisease } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const DiseaseDetector: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setDiagnosis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzePlantDisease(image);
      setDiagnosis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setDiagnosis(null);
    setError(null);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">AI Crop Diagnostic</h2>
        <p className="text-slate-500 font-medium text-sm px-4">Instant identification and organic treatment plans for your crops.</p>
      </div>

      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="group relative cursor-pointer mx-2"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-agri-400 to-agri-600 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-white border-2 border-dashed border-slate-200 rounded-[40px] p-12 flex flex-col items-center gap-6 hover:border-agri-400 transition-all hover:bg-agri-50/30">
            <div className="w-24 h-24 bg-agri-100 rounded-3xl flex items-center justify-center text-agri-600 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <Camera size={44} strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Scan Plant or Upload</h3>
              <p className="text-sm text-slate-500 font-medium mt-1 italic">Take a clear photo of the affected area</p>
            </div>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-agri-700 transition-colors shadow-xl active:scale-95">
              Select Image
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-6 mx-2">
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white aspect-square sm:aspect-video group">
            <img src={image} alt="Target crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <button 
              onClick={reset}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-2xl text-white hover:bg-white/40 transition-colors border border-white/20 z-10"
            >
              <RefreshCw size={20} />
            </button>

            {!diagnosis && !isAnalyzing && (
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Image Status</span>
                  <p className="text-white font-bold flex items-center gap-2">Ready for AI Scan <CheckCircle2 size={16} className="text-agri-400" /></p>
                </div>
                <button 
                  onClick={handleAnalyze}
                  className="bg-agri-600 hover:bg-agri-500 text-white font-black px-6 py-3 rounded-2xl shadow-lg transition-all animate-bounce"
                >
                  Start Diagnosis
                </button>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-agri-500/20 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 border-t-4 border-agri-500 rounded-full animate-spin"></div>
                  <Loader2 size={40} className="absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="mt-6 font-black tracking-widest uppercase text-sm animate-pulse text-center">Analyzing Tissue Sample...</p>
                <div className="w-48 h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
                   <div className="h-full bg-agri-500 w-full animate-[progress_2s_ease-in-out_infinite] origin-left"></div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-3xl flex items-center gap-3 text-rose-600 animate-fade-in-up">
              <AlertCircle size={20} />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          {diagnosis && (
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden animate-fade-in-up">
              <div className="bg-agri-600 p-6 flex justify-between items-center text-white">
                <div>
                  <h4 className="text-xl font-black tracking-tight">Diagnosis Report</h4>
                  <p className="text-[10px] uppercase font-bold text-agri-100 tracking-widest">Verified by AgriSathi Expert AI</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"><Share2 size={18} /></button>
                  <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"><Printer size={18} /></button>
                </div>
              </div>

              <div className="p-8 prose prose-slate prose-headings:font-display prose-headings:font-black prose-p:font-medium prose-p:text-slate-600 max-w-none">
                <ReactMarkdown>{diagnosis}</ReactMarkdown>
                
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div>
                      <h5 className="text-sm font-black text-slate-800">Need specific supplies?</h5>
                      <p className="text-xs text-slate-500 font-medium italic text-center sm:text-left">Treatment items are available in the marketplace.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-agri-700 transition-all group">
                      Open Marketplace <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};