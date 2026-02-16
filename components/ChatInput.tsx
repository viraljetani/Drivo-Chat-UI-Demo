
import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Send, Wand2, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string, asAi?: boolean) => void;
  onAiAssist: () => Promise<void>;
  isAiLoading: boolean;
  aiSuggestion: string | null;
  onClearSuggestion: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onAiAssist, 
  isAiLoading, 
  aiSuggestion,
  onClearSuggestion
}) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleUseSuggestion = () => {
    if (aiSuggestion) {
      setInputText(aiSuggestion);
      onClearSuggestion();
      inputRef.current?.focus();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 md:p-6 flex-shrink-0">
      <div className="max-w-4xl mx-auto w-full space-y-3">
        {/* AI Suggestion Banner */}
        {aiSuggestion && !isAiLoading && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex gap-2 text-indigo-700">
              <Wand2 className="w-5 h-5 flex-shrink-0" />
              <div className="text-xs">
                <p className="font-bold">AI Suggestion Ready</p>
                <p className="line-clamp-1">{aiSuggestion}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={onClearSuggestion}
                className="flex-1 sm:flex-none text-xs text-indigo-500 hover:text-indigo-700 font-medium px-3 py-1"
              >
                Dismiss
              </button>
              <button 
                onClick={handleUseSuggestion}
                className="flex-1 sm:flex-none bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition shadow-sm"
              >
                Use Suggestion
              </button>
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative flex items-center w-full group">
          <button 
            type="button" 
            className="absolute left-4 text-gray-400 hover:text-gray-600 transition p-1"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none block pl-12 pr-40 py-4 shadow-sm transition-all"
            placeholder="Type your reply here..."
          />

          <div className="absolute right-2 top-2 bottom-2 flex gap-1">
            <button
              type="button"
              disabled={isAiLoading || !inputText.trim() && !aiSuggestion}
              onClick={onAiAssist}
              className="hidden sm:flex items-center justify-center w-10 h-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition disabled:opacity-50"
              title="Get AI Assistant suggestion"
            >
              {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            </button>
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-6 flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50 disabled:bg-gray-300"
            >
              <span className="hidden xs:inline">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
        <p className="text-[10px] text-gray-400 text-center">
          Press Enter to send. Use the magic wand for AI suggestions.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
