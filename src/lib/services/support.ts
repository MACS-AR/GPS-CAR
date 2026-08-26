import { firestoreService } from '../firebase/firestore';
import { SupportTicket, CreateTicketInput, Reply } from '../types';
import { where, orderBy } from 'firebase/firestore';

export const supportService = {
  async getTicket(ticketId: string): Promise<SupportTicket | null> {
    return firestoreService.getDoc<SupportTicket>('supportTickets', ticketId);
  },

  async getTicketsByTenant(tenantId: string): Promise<SupportTicket[]> {
    return firestoreService.getCollection<SupportTicket>('supportTickets', {
      constraints: [where('tenantId', '==', tenantId), orderBy('createdAt', 'desc')],
    });
  },

  async getTicketsByUser(userId: string): Promise<SupportTicket[]> {
    return firestoreService.getCollection<SupportTicket>('supportTickets', {
      constraints: [where('userId', '==', userId), orderBy('createdAt', 'desc')],
    });
  },

  async createTicket(
    tenantId: string,
    userId: string,
    data: CreateTicketInput
  ): Promise<string> {
    const ticketId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('supportTickets', ticketId, {
      tenantId,
      userId,
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      attachment: data.attachment ? data.attachment.name : undefined,
      status: 'open',
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return ticketId;
  },

  async addReply(
    ticketId: string,
    userId: string,
    message: string,
    attachment?: string
  ): Promise<void> {
    const ticket = await this.getTicket(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    const reply: Reply = {
      userId,
      message,
      timestamp: new Date(),
      attachment,
    };

    await firestoreService.updateDoc('supportTickets', ticketId, {
      replies: [...ticket.replies, reply],
      updatedAt: new Date(),
    });
  },

  async updateTicketStatus(
    ticketId: string,
    status: 'open' | 'pending' | 'answered' | 'closed'
  ): Promise<void> {
    await firestoreService.updateDoc('supportTickets', ticketId, {
      status,
      updatedAt: new Date(),
    });
  },

  async closeTicket(ticketId: string): Promise<void> {
    await this.updateTicketStatus(ticketId, 'closed');
  },

  onTenantTicketsChange(
    tenantId: string,
    callback: (tickets: SupportTicket[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<SupportTicket>(
      'supportTickets',
      [where('tenantId', '==', tenantId), orderBy('createdAt', 'desc')],
      callback
    );
  },
};
