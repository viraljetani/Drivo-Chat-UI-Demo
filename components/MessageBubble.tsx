
import React from 'react';
import { Message } from '../types';
import { Bot } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAgent = message.role === 'agent' || message.role === 'ai';
  const isAi = message.role === 'ai';

  return (
    <div className={`flex w-full ${isAgent ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex max-w-[92%] md:max-w-[80%] gap-3 ${isAgent ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm overflow-hidden ${
          isAgent ? (isAi ? 'bg-indigo-600' : 'bg-green-600') : 'bg-gray-400'
        }`}>
          {isAi ? <Bot size={20} /> : message.avatarText}
        </div>
        
        {/* Content */}
        <div className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
          <div className={`py-3 px-5 text-sm shadow-sm relative rounded-2xl ${
            isAgent 
              ? `${isAi ? 'bg-indigo-600' : 'bg-green-600'} text-white rounded-tr-none` 
              : 'bg-white text-slate-700 rounded-tl-none border border-gray-200'
          }`}>
            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
            {message.isAiSuggested && (
              <div className="mt-2 pt-2 border-t border-white/20 text-[10px] opacity-80 italic">
                Suggested by Drivo AI
              </div>
            )}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 px-1">
            {message.sender} • {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
