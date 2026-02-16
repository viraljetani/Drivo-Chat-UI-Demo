
import React from 'react';
import { LayoutDashboard, Home, CalendarDays, Headphones, Camera, CreditCard } from 'lucide-react';
import { NavItem, Message, Ticket } from './types';

export const NAV_ITEMS = [
  { name: NavItem.Dashboard, icon: <LayoutDashboard size={20} /> },
  { name: NavItem.Home, icon: <Home size={20} /> },
  { name: NavItem.Bookings, icon: <CalendarDays size={20} /> },
  { name: NavItem.Support, icon: <Headphones size={20} /> },
  { name: NavItem.CameraStreams, icon: <Camera size={20} /> },
  { name: NavItem.GuestCards, icon: <CreditCard size={20} /> },
];

export const INITIAL_TICKET: Ticket = {
  id: '4920',
  title: 'Gate Not Opening',
  description: 'ROBSEY- licence plate not recognising hence had to manually buzz out',
  status: 'RESOLVED',
  createdBy: 'Front desk',
  createdAt: 'Aug 17, 2025 14:04 PM',
  number: '4920',
};

export const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Drivo Team',
    role: 'agent',
    content: 'Hello, apologies for this. The system recognised the license plate number and they were asked to pay at the gate. This has been raised to our developer team for their checking. Thank you',
    timestamp: '14:16 PM',
    avatarText: 'DT'
  },
  {
    id: '2',
    sender: 'Front desk',
    role: 'user',
    content: 'Hi the guest was charge $20 more on their card as they were sorting out the gate payment which took them a little while to figure out. Please refund $20 back to the card. Guest email is: robsey123@yahoo.com.au. phone no: 0429190988. Thank you.',
    timestamp: '17:59 PM',
    avatarText: 'FD'
  },
  {
    id: '3',
    sender: 'Drivo Team',
    role: 'agent',
    content: 'Hi, thanks for the details. This refund request was successfully processed.',
    timestamp: '20:31 PM',
    avatarText: 'DT'
  }
];
