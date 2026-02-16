
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';

interface SidebarProps {
  activeItem: NavItem;
  onItemClick: (item: NavItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-gray-100">
        <div className="text-2xl font-bold tracking-tight">
          DRI<span className="text-green-600">&gt;</span>O
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <li
                key={item.name}
                onClick={() => onItemClick(item.name)}
                className={`px-4 py-3 flex items-center gap-3 font-medium cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700 border-r-4 border-green-500'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0"></div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">Alex Support</p>
            <p className="text-[10px] text-slate-500 truncate">Support Agent</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
