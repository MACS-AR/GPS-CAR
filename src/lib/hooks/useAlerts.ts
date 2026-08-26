import { useEffect, useState, useCallback } from 'react';
import { alertService } from '../services/alert';
import { Alert } from '../types';

export const useAlerts = (tenantId: string | null) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!tenantId) return;

    setIsLoading(true);
    const unsubscribe = alertService.onTenantAlertsChange(tenantId, (data) => {
      setAlerts(data);
      setUnreadCount(data.filter((a) => !a.read).length);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [tenantId]);

  const markAsRead = useCallback(async (alertId: string) => {
    await alertService.markAsRead(alertId);
  }, []);

  const markAllAsRead = useCallback(
    async (alertIds: string[]) => {
      await alertService.markMultipleAsRead(alertIds);
    },
    []
  );

  return {
    alerts,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
  };
};
