import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, User, Bot, Sparkles, MessageCircle, Info, MoreVertical, Paperclip, MicOff } from 'lucide-react';
import { getExpertAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ExpertChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Namaste! I am your AgriSathi Expert. How can I assist you with your farming today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => `${m.sender === 'user' ? 'Farmer' : 'Expert'}: ${m.text}`);
      const response = await getExpertAdvice(input, history);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      // Simulate voice capture
      setTimeout(() => {
        setIsVoiceActive(false);
        setInput('Show me the weather forecast for next week');
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] glass-pro rounded-[48px] overflow-hidden mx-2 relative">
      
      {/* Liquid Voice Hub Overlay */}
      {isVoiceActive && (
        <div className="absolute inset-0 z-50 glass-midnight flex flex-col items-center justify-center animate-in fade-in duration-500">
           <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-agri-600/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="flex items-center gap-1.5 h-16">
                 {[1,2,3,4,5,6,7,8].map(i => (
                   <div 
                     key={i} 
                     className="w-1.5 bg-agri-gold rounded-full animate-wave"
                     style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s` }}
                   ></div>
                 ))}
              </div>
           </div>
           <p className="text-white text-xl font-black mt-8 tracking-tighter animate-pulse">Sathi Listening...</p>
           <button 
             onClick={() => setIsVoiceActive(false)}
             className="mt-12 w-20 h-20 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all border-4 border-white/20"
           >
              <MicOff size={32} />
           </button>
        </div>
      )}

      {/* Premium Chat Header */}
      <div className="bg-agri-950 p-7 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-agri-gold rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20">
              👨‍🌾
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-agri-400 border-2 border-agri-950 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight leading-none">AgriSathi Expert</h3>
            <div className="flex items-center gap-2 mt-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-agri-400">Pro AI Consultant</span>
               <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
               <span className="text-[10px] font-bold text-slate-400 uppercase">Always Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-4 hover:bg-white/10 rounded-2xl transition-colors text-slate-400"><Info size={20} /></button>
          <button className="p-4 hover:bg-white/10 rounded-2xl transition-colors text-slate-400 group"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 no-scrollbar bg-slate-50/20 backdrop-blur-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              message.sender === 'user' ? 'bg-agri-950 text-white' : 'bg-white text-agri-700 border border-slate-100'
            }`}>
              {message.sender === 'user' ? <User size={24} /> : <Bot size={24} />}
            </div>
            
            <div className={`flex flex-col max-w-[85%] sm:max-w-md ${message.sender === 'user' ? 'items-end' : ''}`}>
              <div
                className={`p-6 rounded-[32px] shadow-sm text-sm font-semibold leading-relaxed ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-tr from-agri-950 to-agri-800 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}
              >
                {message.sender === 'bot' ? (
                  <div className="prose prose-slate prose-sm max-w-none">
                     <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                ) : (
                  message.text
                )}
              </div>
              <span className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-widest">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-4 animate-in fade-in duration-300">
            <div className="w-12 h-12 bg-white border border-slate-100 text-agri-700 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
               <Sparkles size={24} className="animate-pulse" />
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-[32px] rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-agri-gold rounded-full animate-bounce [animation-duration:0.8s]"></span>
              <span className="w-2 h-2 bg-agri-gold rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-agri-gold rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Premium Input Area */}
      <div className="p-8 bg-white/40 backdrop-blur-xl border-t border-white/40 shrink-0">
        <div className="relative flex items-center gap-4 bg-white p-2 rounded-[32px] border border-slate-100 shadow-xl shadow-agri-900/5">
          <button className="p-5 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors hidden sm:block">
            <Paperclip size={24} />
          </button>
          
          <div className="relative flex-1 group">
             <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Sathi anything..."
                className="w-full pl-4 pr-14 py-5 bg-transparent text-sm font-black focus:ring-0 transition-all outline-none text-slate-800 placeholder:text-slate-400"
             />
             <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  input.trim() ? 'bg-agri-950 text-white shadow-xl active:scale-90' : 'bg-slate-100 text-slate-400'
                }`}
             >
               <Send size={22} strokeWidth={2.5} />
             </button>
          </div>

          <button 
            onClick={toggleVoice}
            className="p-6 bg-agri-gold text-agri-950 hover:bg-agri-400 rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-agri-gold/20 flex items-center justify-center"
          >
            <Mic size={28} strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
           <MessageCircle size={10} /> AgriSathi Pro Intelligence Engine 2.0
        </p>
      </div>
    </div>
  );
};
>
  );
};