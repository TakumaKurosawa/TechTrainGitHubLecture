import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SearchFilters, Review } from '../types';

interface SearchState {
  // Search query
  searchQuery: string;
  
  // Filters
  filters: SearchFilters;
  
  // Applied filters (for performance optimization)
  appliedFilters: SearchFilters;
  
  // UI state
  filtersOpen: boolean;
  searchHistory: string[];
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  
  // Sorting
  sortBy: 'createdAt' | 'updatedAt' | 'title' | 'rating' | 'status';
  sortOrder: 'asc' | 'desc';
}

interface SearchActions {
  // Search actions
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  
  // Filter actions
  setFilters: (filters: Partial<SearchFilters>) => void;
  updateFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  resetFilters: () => void;
  
  // UI actions
  toggleFilters: () => void;
  setFiltersOpen: (open: boolean) => void;
  
  // Pagination actions
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  resetPagination: () => void;
  
  // Sorting actions
  setSortBy: (sortBy: SearchState['sortBy']) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  toggleSortOrder: () => void;
  
  // Reset
  reset: () => void;
}

type SearchStore = SearchState & SearchActions;

const initialState: SearchState = {
  searchQuery: '',
  filters: {},
  appliedFilters: {},
  filtersOpen: false,
  searchHistory: [],
  currentPage: 1,
  itemsPerPage: 20,
  sortBy: 'updatedAt',
  sortOrder: 'desc',
};

export const useSearchStore = create<SearchStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // Search actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        // Auto-apply search without waiting for filters
        if (query.trim()) {
          get().addToSearchHistory(query.trim());
        }
      },
      
      clearSearchQuery: () => set({ searchQuery: '' }),
      
      addToSearchHistory: (query) =>
        set((state) => {
          const trimmedQuery = query.trim();
          if (!trimmedQuery || state.searchHistory.includes(trimmedQuery)) {
            return state;
          }
          const newHistory = [trimmedQuery, ...state.searchHistory.slice(0, 9)]; // Keep last 10
          return { searchHistory: newHistory };
        }),
      
      clearSearchHistory: () => set({ searchHistory: [] }),
      
      // Filter actions
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          currentPage: 1, // Reset pagination when filters change
        })),
      
      updateFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
          currentPage: 1,
        })),
      
      clearFilters: () => 
        set({ 
          filters: {},
          appliedFilters: {},
          currentPage: 1 
        }),
      
      applyFilters: () =>
        set((state) => ({
          appliedFilters: { ...state.filters },
          currentPage: 1,
        })),
      
      resetFilters: () => {
        set({ 
          filters: {},
          appliedFilters: {},
          currentPage: 1 
        });
      },
      
      // UI actions
      toggleFilters: () => set((state) => ({ filtersOpen: !state.filtersOpen })),
      setFiltersOpen: (open) => set({ filtersOpen: open }),
      
      // Pagination actions
      setCurrentPage: (page) => set({ currentPage: Math.max(1, page) }),
      setItemsPerPage: (items) => set({ itemsPerPage: Math.max(1, items), currentPage: 1 }),
      resetPagination: () => set({ currentPage: 1 }),
      
      // Sorting actions
      setSortBy: (sortBy) => set({ sortBy, currentPage: 1 }),
      setSortOrder: (order) => set({ sortOrder: order, currentPage: 1 }),
      toggleSortOrder: () =>
        set((state) => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
          currentPage: 1,
        })),
      
      // Reset
      reset: () => set(initialState),
    }),
    { name: 'search-store' }
  )
);

// Selectors
export const useSearchQuery = () => useSearchStore((state) => state.searchQuery);
export const useFilters = () => useSearchStore((state) => state.filters);
export const useAppliedFilters = () => useSearchStore((state) => state.appliedFilters);
export const useFiltersOpen = () => useSearchStore((state) => state.filtersOpen);
export const useSearchHistory = () => useSearchStore((state) => state.searchHistory);
export const usePagination = () =>
  useSearchStore((state) => ({
    currentPage: state.currentPage,
    itemsPerPage: state.itemsPerPage,
  }));
export const useSorting = () =>
  useSearchStore((state) => ({
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
  }));

// Action selectors
export const useSearchActions = () =>
  useSearchStore((state) => ({
    setSearchQuery: state.setSearchQuery,
    clearSearchQuery: state.clearSearchQuery,
    addToSearchHistory: state.addToSearchHistory,
    clearSearchHistory: state.clearSearchHistory,
    setFilters: state.setFilters,
    updateFilter: state.updateFilter,
    clearFilters: state.clearFilters,
    applyFilters: state.applyFilters,
    resetFilters: state.resetFilters,
    toggleFilters: state.toggleFilters,
    setFiltersOpen: state.setFiltersOpen,
    setCurrentPage: state.setCurrentPage,
    setItemsPerPage: state.setItemsPerPage,
    resetPagination: state.resetPagination,
    setSortBy: state.setSortBy,
    setSortOrder: state.setSortOrder,
    toggleSortOrder: state.toggleSortOrder,
    reset: state.reset,
  }));

// Helper function to filter reviews based on current search state
export const useFilteredReviews = (reviews: Review[]) => {
  return useSearchStore((state) => {
    let filtered = reviews;

    // Apply search query
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.title.toLowerCase().includes(query) ||
          review.content.toLowerCase().includes(query) ||
          review.author.name.toLowerCase().includes(query) ||
          review.reviewee?.name.toLowerCase().includes(query) ||
          review.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply filters
    const { appliedFilters } = state;

    if (appliedFilters.status?.length) {
      filtered = filtered.filter((review) => appliedFilters.status!.includes(review.status));
    }

    if (appliedFilters.rating) {
      const { min, max } = appliedFilters.rating;
      filtered = filtered.filter((review) => {
        if (!review.rating) return false;
        if (min !== undefined && review.rating < min) return false;
        if (max !== undefined && review.rating > max) return false;
        return true;
      });
    }

    if (appliedFilters.dateRange) {
      const { start, end } = appliedFilters.dateRange;
      filtered = filtered.filter((review) => {
        const date = new Date(review.createdAt);
        if (start && date < start) return false;
        if (end && date > end) return false;
        return true;
      });
    }

    if (appliedFilters.tags?.length) {
      filtered = filtered.filter((review) =>
        appliedFilters.tags!.some((tag) => review.tags?.includes(tag))
      );
    }

    if (appliedFilters.author) {
      filtered = filtered.filter((review) =>
        review.author.name.toLowerCase().includes(appliedFilters.author!.toLowerCase())
      );
    }

    if (appliedFilters.reviewee) {
      filtered = filtered.filter((review) =>
        review.reviewee?.name.toLowerCase().includes(appliedFilters.reviewee!.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (state.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'updatedAt':
        default:
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
      }

      const compareResult = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return state.sortOrder === 'asc' ? compareResult : -compareResult;
    });

    return filtered;
  });
};