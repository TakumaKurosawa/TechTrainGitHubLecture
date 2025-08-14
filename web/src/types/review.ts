export interface InternshipReview {
  id: string;
  companyName: string;
  position: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  rating: number;
  salary?: number;
  tags: string[];
  pros: string[];
  cons: string[];
  advice: string;
  isRecommended: boolean;
  reviewerInfo: {
    university: string;
    major: string;
    graduationYear: number;
    previousInternships: number;
  };
  datePosted: string;
  likesCount: number;
  helpfulCount: number;
}

export interface ReviewFilters {
  searchQuery?: string;
  companyName?: string;
  location?: string;
  rating?: number;
  tags?: string[];
  sortBy?: 'newest' | 'oldest' | 'rating-high' | 'rating-low' | 'helpful';
}

export interface ReviewSummary {
  totalReviews: number;
  averageRating: number;
  topCompanies: string[];
  popularTags: string[];
}