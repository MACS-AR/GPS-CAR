import { useState, useCallback } from 'react';

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export const usePagination = (initialPageSize: number = 20) => {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
    hasMore: true,
  });

  const nextPage = useCallback(() => {
    setState((prev) =>
      prev.page * prev.pageSize < prev.total
        ? { ...prev, page: prev.page + 1 }
        : prev
    );
  }, []);

  const prevPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: Math.max(1, prev.page - 1),
    }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, page: Math.max(1, page) }));
  }, []);

  const setTotal = useCallback((total: number) => {
    setState((prev) => ({
      ...prev,
      total,
      hasMore: prev.page * prev.pageSize < total,
    }));
  }, []);

  const getOffset = useCallback(() => {
    return (state.page - 1) * state.pageSize;
  }, [state]);

  return {
    ...state,
    nextPage,
    prevPage,
    goToPage,
    setTotal,
    getOffset,
  };
};
