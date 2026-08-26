import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './config';

export const messagingService = {
  async getToken(): Promise<string> {
    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      return token;
    } catch (error) {
      console.error('Failed to get messaging token:', error);
      throw error;
    }
  },

  onMessageListener(callback: (payload: any) => void) {
    return onMessage(messaging, callback);
  },
};
