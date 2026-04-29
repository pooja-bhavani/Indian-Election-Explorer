import React, { useState, useRef, useEffect } from 'react';
import { useAIContext } from '../contexts/AIContext';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! I'm your AI Election Guide. I noticed you're exploring the app. Need help?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { currentContext } = useAIContext();
  const messagesEndRef = useRef(null);

  // Auto-suggest based on context
  const getSuggestions = () => {
    switch(currentContext) {
      case 'timeline': return ["Explain Registration", "What happens on Voting Day?"];
      case 'flashcards': return ["What is VVPAT?", "Define Model Code of Conduct"];
      case 'quiz': return ["Give me a hint", "Explain the last answer"];
      case 'simulation': return ["How do I win?", "What is campaign budget?"];
      default: return ["How do I vote?", "What is an EVM?"];
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // Context-aware greeting when context changes significantly
  useEffect(() => {
    if (currentContext !== 'home' && messages.length < 3) {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), text: `I see you are looking at the ${currentContext}. Do you have any questions about this section?`, sender: 'bot', isContextPrompt: true }
      ]);
    }
  }, [currentContext]);

  const handleSend = async (e, forcedInput = null) => {
    if (e) e.preventDefault();
    const textToSend = forcedInput || input;
    if (!textToSend.trim()) return;

    const userMessage = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // In production, this includes currentContext in the payload
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, context: currentContext })
      });
      
      const data = await response.json();
      
      const botMessage = { id: Date.now() + 1, text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Connection error.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30 transition-transform hover:scale-110 z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] glass-panel flex flex-col z-50 overflow-hidden"
          >
            <div className="p-4 bg-slate-900/80 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white leading-tight">AI Assistant</h3>
                  <span className="text-xs text-emerald-400">Context: {currentContext}</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-amber-500 text-slate-900 rounded-br-sm' 
                      : msg.isContextPrompt 
                        ? 'bg-emerald-900/40 border border-emerald-500/30 text-emerald-100 rounded-bl-sm text-sm italic'
                        : 'bg-slate-800 border border-white/10 text-slate-100 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-white/10 p-3 rounded-2xl rounded-bl-sm flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {!isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {getSuggestions().map((chip, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(null, chip)}
                    className="text-xs px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSend} className="p-3 bg-slate-900/80 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-slate-800 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-400 transition-colors"
              >
                <Send size={18} className="ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
