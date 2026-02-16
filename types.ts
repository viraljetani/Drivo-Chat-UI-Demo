
export type Role = 'user' | 'agent' | 'system' | 'ai';

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  role: Role;
  avatarText: string;
  isAiSuggested?: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'RESOLVED' | 'IN_PROGRESS';
  createdBy: string;
  createdAt: string;
  number: string;
}

export enum NavItem {
  Dashboard = 'Dashboard',
  Home = 'Home',
  Bookings = 'Bookings',
  Support = 'Support',
  CameraStreams = 'Camera Streams',
  GuestCards = 'Guest Cards'
}
