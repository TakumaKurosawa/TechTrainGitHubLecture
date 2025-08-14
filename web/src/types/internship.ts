export interface Internship {
  id: string;
  name: string;
  company: string;
  description: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  salary: number; // 月額給与（万円）
  rating: number; // 1-5の評価
  tags: string[];
  applicationDeadline: string;
  requirements: string[];
  benefits: string[];
}

export interface SearchFilters {
  searchText: string;
  company: string;
  location: string;
  minRating: number;
  maxRating: number;
  minSalary: number;
  maxSalary: number;
  tags: string[];
  sortBy: 'rating' | 'deadline' | 'salary' | 'name';
  sortOrder: 'asc' | 'desc';
}