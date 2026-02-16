
import React from 'react';
import { CheckCircle2, MoreVertical } from 'lucide-react';
import { Ticket } from '../types';

interface ChatHeaderProps {
  ticket: Ticket;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ ticket }) => {
  return (
    <header className="bg-white px-8 py-6 border-b border-gray-200 shadow-sm z-10 flex-shrink-0">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-3xl font-bold text-slate-900 truncate">{ticket.title}</h1>
            <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
              ticket.status === 'RESOLVED' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              <CheckCircle2 className="w-3 h-3" /> {ticket.status}
            </span>
          </div>
          <p className="text-lg font-medium text-slate-700 leading-snug">
            {ticket.description}
          </p>
          <div className="text-sm text-slate-400 mt-2 flex items-center gap-2 flex-wrap">
            <span>Ticket #{ticket.number}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Created by {ticket.createdBy}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>{ticket.createdAt}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors ml-4">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
