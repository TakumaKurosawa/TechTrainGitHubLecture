import { create } from 'zustand';
import type { Internship, SearchFilters, SortOption, SortOrder } from '../types';
import { mockInternships } from '../data/mock-internships';

interface InternshipStore {
  // State
  internships: Internship[];
  filteredInternships: Internship[];
  searchFilters: SearchFilters;
  sortBy: SortOption;
  sortOrder: SortOrder;
  isLoading: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setCompanyFilter: (companyName: string) => void;
  setTagsFilter: (tags: string[]) => void;
  setRatingFilter: (minRating: number, maxRating: number) => void;
  setLocationFilter: (location: string) => void;
  setSalaryFilter: (minSalary: number, maxSalary: number) => void;
  setSorting: (sortBy: SortOption, sortOrder: SortOrder) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

const initialFilters: SearchFilters = {
  query: '',
  companyName: '',
  tags: [],
  minRating: 0,
  maxRating: 5,
  location: '',
  salaryRange: [0, 1000000],
};

export const useInternshipStore = create<InternshipStore>((set, get) => ({
  // Initial state
  internships: mockInternships,
  filteredInternships: mockInternships,
  searchFilters: initialFilters,
  sortBy: 'rating',
  sortOrder: 'desc',
  isLoading: false,

  // Actions
  setSearchQuery: (query: string) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, query },
    }));
    get().applyFilters();
  },

  setCompanyFilter: (companyName: string) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, companyName },
    }));
    get().applyFilters();
  },

  setTagsFilter: (tags: string[]) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, tags },
    }));
    get().applyFilters();
  },

  setRatingFilter: (minRating: number, maxRating: number) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, minRating, maxRating },
    }));
    get().applyFilters();
  },

  setLocationFilter: (location: string) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, location },
    }));
    get().applyFilters();
  },

  setSalaryFilter: (minSalary: number, maxSalary: number) => {
    set((state) => ({
      searchFilters: {
        ...state.searchFilters,
        salaryRange: [minSalary, maxSalary] as [number, number],
      },
    }));
    get().applyFilters();
  },

  setSorting: (sortBy: SortOption, sortOrder: SortOrder) => {
    set({ sortBy, sortOrder });
    get().applyFilters();
  },

  clearFilters: () => {
    set({
      searchFilters: initialFilters,
      sortBy: 'rating',
      sortOrder: 'desc',
    });
    get().applyFilters();
  },

  applyFilters: () => {
    const { internships, searchFilters, sortBy, sortOrder } = get();
    let filtered = [...internships];

    // Text search filter
    if (searchFilters.query.trim()) {
      const query = searchFilters.query.toLowerCase();
      filtered = filtered.filter((internship) =>
        internship.internshipName.toLowerCase().includes(query) ||
        internship.companyName.toLowerCase().includes(query) ||
        internship.description.toLowerCase().includes(query) ||
        internship.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Company filter
    if (searchFilters.companyName.trim()) {
      const company = searchFilters.companyName.toLowerCase();
      filtered = filtered.filter((internship) =>
        internship.companyName.toLowerCase().includes(company)
      );
    }

    // Tags filter
    if (searchFilters.tags.length > 0) {
      filtered = filtered.filter((internship) =>
        searchFilters.tags.every(tag =>
          internship.tags.some(internshipTag =>
            internshipTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    // Rating filter
    filtered = filtered.filter((internship) =>
      internship.rating >= searchFilters.minRating &&
      internship.rating <= searchFilters.maxRating
    );

    // Location filter
    if (searchFilters.location.trim()) {
      const location = searchFilters.location.toLowerCase();
      filtered = filtered.filter((internship) =>
        internship.location.toLowerCase().includes(location)
      );
    }

    // Salary filter
    filtered = filtered.filter((internship) => {
      if (!internship.salary) return searchFilters.salaryRange[0] === 0;
      return internship.salary >= searchFilters.salaryRange[0] &&
             internship.salary <= searchFilters.salaryRange[1];
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'deadline':
          aValue = new Date(a.applicationDeadline).getTime();
          bValue = new Date(b.applicationDeadline).getTime();
          break;
        case 'salary':
          aValue = a.salary || 0;
          bValue = b.salary || 0;
          break;
        case 'name':
          aValue = a.internshipName;
          bValue = b.internshipName;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === 'asc' ? comparison : -comparison;
      } else {
        const comparison = (aValue as number) - (bValue as number);
        return sortOrder === 'asc' ? comparison : -comparison;
      }
    });

    set({ filteredInternships: filtered });
  },
}));