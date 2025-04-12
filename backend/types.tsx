// backend/types.ts

export interface Ticket {
    id: string;
    title: string;
    description: string;
    type: 'personal' | 'community';
    status: 'open' | 'closed';
    email: string; // Associate ticket with user email
  }
  