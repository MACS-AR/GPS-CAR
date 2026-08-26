export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'pending' | 'answered' | 'closed';

export interface Reply {
  userId: string;
  message: string;
  timestamp: Date;
  attachment?: string;
}

export interface SupportTicket {
  id: string;
  tenantId: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  attachment?: string;
  replies: Reply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTicketInput {
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  attachment?: File;
}
