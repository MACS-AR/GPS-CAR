import { useCallback } from 'react';
import { tenantService } from '../services/tenant';
import { Tenant } from '../types';
import useSWR from 'swr';

export const useTenant = (tenantId: string | null) => {
  const fetcher = useCallback(
    async (key: string) => {
      if (!tenantId) return null;
      return await tenantService.getTenant(tenantId);
    },
    [tenantId]
  );

  const { data, error, isLoading, mutate } = useSWR<Tenant | null>(
    tenantId ? `tenant/${tenantId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  );

  return {
    tenant: data,
    isLoading,
    error,
    mutate,
  };
};
