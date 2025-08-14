import { create } from 'zustand';
import type { Internship, SearchFilters } from '../types';
import { mockInternships } from '../data';

interface InternshipState {
  internships: Internship[];
  filteredInternships: Internship[];
  filters: SearchFilters;
  
  // Actions
  setSearchText: (text: string) => void;
  setCompanyFilter: (company: string) => void;
  setLocationFilter: (location: string) => void;
  setRatingRange: (min: number, max: number) => void;
  setSalaryRange: (min: number, max: number) => void;
  setTagsFilter: (tags: string[]) => void;
  setSorting: (sortBy: SearchFilters['sortBy'], sortOrder: SearchFilters['sortOrder']) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const initialFilters: SearchFilters = {
  searchText: '',
  company: '',
  location: '',
  minRating: 0,
  maxRating: 5,
  minSalary: 0,
  maxSalary: 100,
  tags: [],
  sortBy: 'rating',
  sortOrder: 'desc'
};

export const useInternshipStore = create<InternshipState>((set, get) => ({
  internships: mockInternships,
  filteredInternships: mockInternships,
  filters: initialFilters,

  setSearchText: (text: string) => {
    set(state => ({
      filters: { ...state.filters, searchText: text }
    }));
    get().applyFilters();
  },

  setCompanyFilter: (company: string) => {
    set(state => ({
      filters: { ...state.filters, company }
    }));
    get().applyFilters();
  },

  setLocationFilter: (location: string) => {
    set(state => ({
      filters: { ...state.filters, location }
    }));
    get().applyFilters();
  },

  setRatingRange: (min: number, max: number) => {
    set(state => ({
      filters: { ...state.filters, minRating: min, maxRating: max }
    }));
    get().applyFilters();
  },

  setSalaryRange: (min: number, max: number) => {
    set(state => ({
      filters: { ...state.filters, minSalary: min, maxSalary: max }
    }));
    get().applyFilters();
  },

  setTagsFilter: (tags: string[]) => {
    set(state => ({
      filters: { ...state.filters, tags }
    }));
    get().applyFilters();
  },

  setSorting: (sortBy: SearchFilters['sortBy'], sortOrder: SearchFilters['sortOrder']) => {
    set(state => ({
      filters: { ...state.filters, sortBy, sortOrder }
    }));
    get().applyFilters();
  },

  resetFilters: () => {
    set({ filters: initialFilters });
    get().applyFilters();
  },

  applyFilters: () => {
    const { internships, filters } = get();
    
    let filtered = internships.filter(internship => {
      // テキスト検索（インターンシップ名、企業名、説明、タグを対象）
      const searchMatch = filters.searchText === '' || 
        internship.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        internship.company.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        internship.description.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        internship.tags.some(tag => tag.toLowerCase().includes(filters.searchText.toLowerCase()));

      // 企業フィルター
      const companyMatch = filters.company === '' || internship.company === filters.company;

      // 勤務地フィルター
      const locationMatch = filters.location === '' || internship.location === filters.location;

      // 評価範囲フィルター
      const ratingMatch = internship.rating >= filters.minRating && internship.rating <= filters.maxRating;

      // 給与範囲フィルター
      const salaryMatch = internship.salary >= filters.minSalary && internship.salary <= filters.maxSalary;

      // タグフィルター（選択されたタグがすべて含まれている）
      const tagsMatch = filters.tags.length === 0 || 
        filters.tags.every(filterTag => internship.tags.includes(filterTag));

      return searchMatch && companyMatch && locationMatch && ratingMatch && salaryMatch && tagsMatch;
    });

    // ソート
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'deadline':
          comparison = new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
          break;
        case 'salary':
          comparison = a.salary - b.salary;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    set({ filteredInternships: filtered });
  }
}));