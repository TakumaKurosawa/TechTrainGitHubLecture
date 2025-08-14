import { create } from 'zustand';
import type { SearchFilters, PaginationState, SortOption, SortDirection } from '../types';

interface SearchState {
  // 検索状態
  query: string;
  filters: SearchFilters;
  sort: {
    field: SortOption;
    direction: SortDirection;
  };
  pagination: PaginationState;
  
  // 検索履歴
  searchHistory: string[];
  savedSearches: Array<{
    id: string;
    name: string;
    query: string;
    filters: SearchFilters;
    createdAt: string;
  }>;

  // アクション
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  setSort: (field: SortOption, direction?: SortDirection) => void;
  
  // ページネーション
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  updatePagination: (pagination: Partial<PaginationState>) => void;
  
  // 検索履歴管理
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  
  // 保存された検索
  saveCurrentSearch: (name: string) => void;
  loadSavedSearch: (id: string) => void;
  deleteSavedSearch: (id: string) => void;
}

const initialFilters: SearchFilters = {
  category: [],
  tags: [],
  rating: { min: 0, max: 5 },
  dateRange: { start: null, end: null },
  author: [],
  status: [],
};

const initialPagination: PaginationState = {
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 0,
};

// Selectors for performance optimization
export const selectSearchQuery = (state: SearchState) => state.query;
export const selectActiveFilters = (state: SearchState) => {
  const { filters } = state;
  const activeCount = 
    filters.category.length +
    filters.tags.length +
    filters.author.length +
    filters.status.length +
    (filters.rating.min > 0 || filters.rating.max < 5 ? 1 : 0) +
    (filters.dateRange.start || filters.dateRange.end ? 1 : 0);
  
  return {
    count: activeCount,
    hasActive: activeCount > 0,
    filters,
  };
};
export const selectPagination = (state: SearchState) => state.pagination;
export const selectSort = (state: SearchState) => state.sort;

// Helper function for filtering
export const createFilterFunction = (filters: SearchFilters, query: string) => {
  return (item: any) => {
    // Text search
    if (query && !item.title?.toLowerCase().includes(query.toLowerCase()) &&
        !item.description?.toLowerCase().includes(query.toLowerCase()) &&
        !item.author?.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(item.category)) {
      return false;
    }

    // Tags filter
    if (filters.tags.length > 0 && 
        !filters.tags.some(tag => item.tags?.includes(tag))) {
      return false;
    }

    // Rating filter
    if (item.rating < filters.rating.min || item.rating > filters.rating.max) {
      return false;
    }

    // Author filter
    if (filters.author.length > 0 && !filters.author.includes(item.author)) {
      return false;
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(item.status)) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start && 
        new Date(item.createdAt) < new Date(filters.dateRange.start)) {
      return false;
    }
    if (filters.dateRange.end && 
        new Date(item.createdAt) > new Date(filters.dateRange.end)) {
      return false;
    }

    return true;
  };
};

export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial state
  query: '',
  filters: initialFilters,
  sort: {
    field: 'createdAt',
    direction: 'desc',
  },
  pagination: initialPagination,
  searchHistory: [],
  savedSearches: [],

  // Search actions
  setQuery: (query) => {
    set({ query });
    if (query.trim()) {
      get().addToHistory(query);
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 }, // Reset to first page
    })),

  resetFilters: () =>
    set({
      filters: initialFilters,
      pagination: { ...initialPagination },
    }),

  setSort: (field, direction) => {
    const currentSort = get().sort;
    const newDirection = direction || 
      (currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc');
    
    set({
      sort: { field, direction: newDirection },
      pagination: { ...get().pagination, page: 1 }, // Reset to first page
    });
  },

  // Pagination actions
  setPage: (page) =>
    set((state) => ({
      pagination: { ...state.pagination, page },
    })),

  setLimit: (limit) =>
    set((state) => ({
      pagination: { ...state.pagination, limit, page: 1 },
    })),

  updatePagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),

  // History actions
  addToHistory: (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    set((state) => {
      const newHistory = [
        trimmedQuery,
        ...state.searchHistory.filter(q => q !== trimmedQuery),
      ].slice(0, 10); // Keep only last 10 searches

      return { searchHistory: newHistory };
    });
  },

  clearHistory: () => set({ searchHistory: [] }),

  // Saved searches actions
  saveCurrentSearch: (name) => {
    const { query, filters } = get();
    const savedSearch = {
      id: `search-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name,
      query,
      filters,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      savedSearches: [savedSearch, ...state.savedSearches].slice(0, 20), // Keep max 20
    }));
  },

  loadSavedSearch: (id) => {
    const savedSearch = get().savedSearches.find(s => s.id === id);
    if (savedSearch) {
      set({
        query: savedSearch.query,
        filters: savedSearch.filters,
        pagination: { ...initialPagination },
      });
    }
  },

  deleteSavedSearch: (id) =>
    set((state) => ({
      savedSearches: state.savedSearches.filter(s => s.id !== id),
    })),
}));