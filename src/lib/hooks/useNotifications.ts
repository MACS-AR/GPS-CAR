import { useEffect, useState, useCallback } from 'react';
import { notificationService } from '../services/notification';
import { Notification } from '../types';

export const useNotifications = (tenantId: string | null) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!tenantId) return;

    setIsLoading(true);
    const unsubscribe = notificationService.onTenantNotificationsChange(
      tenantId,
      (data) => {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.read).length);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [tenantId]);

  const markAsRead = useCallback(async (notificationId: string) => {
    await notificationService.markAsRead(notificationId);
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!tenantId) return;
    await notificationService.markAllAsRead(tenantId);
  }, [tenantId]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
  };
};
