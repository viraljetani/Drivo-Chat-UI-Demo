
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import { NavItem, Message, Role } from './types';
import { INITIAL_MESSAGES, INITIAL_TICKET } from './constants';
import { getAiReplySuggestion } from './services/geminiService';

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItem>(NavItem.Support);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = (text: string, asAi: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: asAi ? 'Drivo AI' : 'Drivo Team',
      role: asAi ? 'ai' : 'agent',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      avatarText: asAi ? '' : 'DT',
      isAiSuggested: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    setAiSuggestion(null);
  };

  const handleAiAssist = async () => {
    // Get the last non-agent message as the trigger for AI
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    setIsAiLoading(true);
    try {
      const suggestion = await getAiReplySuggestion(messages, lastUserMessage.content);
      setAiSuggestion(suggestion);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem={activeNav} onItemClick={setActiveNav} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-white">
        
        {/* Header */}
        <ChatHeader ticket={INITIAL_TICKET} />

        {/* Chat Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50 scroll-smooth"
        >
          {/* Date Separator */}
          <div className="flex justify-center">
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              August 17, 2025
            </span>
          </div>

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isAiLoading && (
            <div className="flex justify-end animate-pulse">
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-400 text-xs px-4 py-2 rounded-full">
                AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          onAiAssist={handleAiAssist}
          isAiLoading={isAiLoading}
          aiSuggestion={aiSuggestion}
          onClearSuggestion={() => setAiSuggestion(null)}
        />
      </main>
    </div>
  );
};

export default App;
