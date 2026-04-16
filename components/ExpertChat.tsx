import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2, Mic, MicOff, MessageSquare, ThumbsUp, MessageCircle } from 'lucide-react';
import { ChatMessage, ForumPost } from '../types';
import { getExpertAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    author: 'Ram Patil',
    role: 'Senior Farmer',
    content: 'My wheat crop is turning yellow at tips. Is this nitrogen deficiency? I applied urea 10 days ago.',
    likes: 12,
    comments: 4,
    time: '2h ago'
  },
  {
    id: '2',
    author: 'Suresh Kumar',
    role: 'Tractor Owner',
    content: 'Available for rent: Mahindra 575 DI Tractor with Rotavator. Location: Amravati. Rate: ₹800/hr.',
    likes: 8,
    comments: 2,
    time: '5h ago'
  },
  {
    id: '3',
    author: 'Anita Devi',
    role: 'Organic Farmer',
    content: 'Does anyone know the current market rate for organic turmeric in Nagpur mandi?',
    likes: 15,
    comments: 7,
    time: '1d ago'
  }
];

export const ExpertChat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'expert' | 'community'>('expert');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Namaste! I am your AgriSathi Expert. Ask me anything about farming, weather, or government schemes.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice Recognition Setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Default to Indian English, ideally selectable

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
           recognitionRef.current.start();
           setIsListening(true);
        } catch (e) {
           console.error("Mic error", e);
        }
      } else {
        alert("Voice input not supported in this browser.");
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTab]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => `${m.sender === 'user' ? 'Farmer' : 'Expert'}: ${m.text}`);
      const responseText = await getExpertAdvice(input, history);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I'm having trouble connecting to the server. Please check your internet connection.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50">
      {/* Top Toggle */}
      <div className="bg-white p-2 shadow-sm z-10 sticky top-0">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('expert')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${
              activeTab === 'expert' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Bot size={18} />
            AI Expert
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${
              activeTab === 'community' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500'
            }`}
          >
            <MessageSquare size={18} />
            Community
          </button>
        </div>
      </div>

      {activeTab === 'expert' ? (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                  {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  } ${msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                >
                  {msg.sender === 'bot' ? (
                    <div className="prose prose-sm prose-emerald max-w-none dark:prose-invert">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                  <span className={`text-[10px] block mt-1 opacity-70 ${msg.sender === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs ml-10">
                <Loader2 size={12} className="animate-spin" />
                <span>Expert is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white p-3 border-t border-gray-200">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about crops, pests, or prices..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                disabled={isLoading}
              />
              <button 
                onClick={toggleListening}
                className={`p-2 rounded-full transition-colors ${isListening ? 'text-red-500 animate-pulse bg-red-50' : 'text-gray-400 hover:bg-gray-200'}`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-full transition-colors ${
                  input.trim() && !isLoading ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-300'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {MOCK_FORUM_POSTS.map(post => (
             <div key={post.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{post.author}</h3>
                    <p className="text-xs text-emerald-600">{post.role}</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">{post.time}</span>
                </div>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-emerald-600">
                    <ThumbsUp size={14} />
                    {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600">
                    <MessageCircle size={14} />
                    {post.comments} Comments
                  </button>
                </div>
             </div>
           ))}
           <div className="text-center py-6">
             <button className="text-emerald-600 text-sm font-semibold border border-emerald-600 rounded-full px-4 py-2 hover:bg-emerald-50">
               + Create New Post
             </button>
           </div>
        </div>
      )}
    </div>
  );
};