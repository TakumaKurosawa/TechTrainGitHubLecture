export interface Internship {
  id: string;
  companyName: string;
  internshipName: string;
  description: string;
  tags: string[];
  rating: number;
  duration: string;
  location: string;
  salary?: number;
  applicationDeadline: string;
  startDate: string;
  requirements: string[];
  benefits: string[];
}

export interface SearchFilters {
  query: string;
  companyName: string;
  tags: string[];
  minRating: number;
  maxRating: number;
  location: string;
  salaryRange: [number, number];
}

export type SortOption = 'rating' | 'deadline' | 'salary' | 'name';
export type SortOrder = 'asc' | 'desc';