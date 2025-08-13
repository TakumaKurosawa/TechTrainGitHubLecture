export interface InternshipReview {
  id: string;
  companyName: string;
  internshipTitle: string;
  duration: {
    startDate: string;
    endDate: string;
    durationWeeks: number;
  };
  rating: {
    overall: number;
    workEnvironment: number;
    learningOpportunity: number;
    mentorSupport: number;
    compensation: number;
  };
  tags: string[];
  reviewText: string;
  pros: string[];
  cons: string[];
  advice: string;
  reviewer: {
    name: string;
    university: string;
    major: string;
    year: number;
  };
  createdAt: string;
  updatedAt: string;
  isRecommended: boolean;
  salary?: {
    amount: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'total';
  };
  location: {
    city: string;
    country: string;
    isRemote: boolean;
  };
  department: string;
  position: string;
}

export interface ReviewFilters {
  companyName?: string;
  minRating?: number;
  maxRating?: number;
  tags?: string[];
  location?: string;
  duration?: {
    min?: number;
    max?: number;
  };
  isRecommended?: boolean;
}

export interface ReviewSortOption {
  field: 'rating' | 'createdAt' | 'duration' | 'companyName';
  direction: 'asc' | 'desc';
}