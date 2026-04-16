import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, User, Bot, Sparkles, MessageCircle, Info, MoreVertical, Paperclip } from 'lucide-react';
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
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "I'm having trouble connecting right now. Please check your internet or try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden mx-2">
      {/* Premium Chat Header */}
      <div className="bg-slate-900 p-6 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-agri-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
              👨‍🌾
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-agri-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight leading-none">AgriSathi AI</h3>
            <div className="flex items-center gap-2 mt-1.5">
               <span className="text-[10px] font-black uppercase tracking-widest text-agri-400">Expert Consultant</span>
               <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
               <span className="text-[10px] font-bold text-slate-400">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-3 hover:bg-white/10 rounded-2xl transition-colors text-slate-400"><Info size={20} /></button>
          <button className="p-3 hover:bg-white/10 rounded-2xl transition-colors text-slate-400"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar bg-slate-50/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
              message.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-agri-100 text-agri-700'
            }`}>
              {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            
            <div className={`flex flex-col max-w-[85%] sm:max-w-md ${message.sender === 'user' ? 'items-end' : ''}`}>
              <div
                className={`p-5 rounded-[28px] shadow-sm text-sm font-medium leading-relaxed ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                }`}
              >
                {message.sender === 'bot' ? (
                  <div className="prose prose-slate prose-sm max-w-none prose-headings:font-display prose-headings:font-black">
                     <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                ) : (
                  message.text
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-4 animate-in fade-in duration-300">
            <div className="w-10 h-10 bg-agri-100 text-agri-700 rounded-xl flex items-center justify-center shrink-0">
               <Sparkles size={20} className="animate-pulse" />
            </div>
            <div className="bg-white border border-slate-100 p-5 rounded-[28px] rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-agri-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-agri-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-agri-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Premium Input Area */}
      <div className="p-6 bg-white border-t border-slate-100 shrink-0">
        <div className="relative flex items-center gap-3">
          <button className="p-4 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors hidden sm:block">
            <Paperclip size={20} />
          </button>
          
          <div className="relative flex-1 group">
             <div className="absolute inset-0 bg-agri-500 rounded-3xl blur opacity-0 group-focus-within:opacity-10 transition-opacity"></div>
             <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your query..."
                className="w-full pl-6 pr-14 py-5 bg-slate-50 border border-slate-200 rounded-3xl text-sm font-semibold focus:bg-white focus:border-agri-500 focus:ring-0 transition-all outline-none"
             />
             <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                  input.trim() ? 'bg-agri-600 text-white shadow-lg active:scale-90 hover:bg-agri-700' : 'bg-slate-200 text-slate-400'
                }`}
             >
               <Send size={18} strokeWidth={2.5} />
             </button>
          </div>

          <button className="p-5 bg-agri-50 text-agri-600 hover:bg-agri-100 rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-sm">
            <Mic size={22} strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
           <MessageCircle size={10} /> Powered by AgriSathi Expert AI
        </p>
      </div>
    </div>
  );
};