import type { InternshipReview, ReviewFilters, ReviewSummary } from '../types/review';

export const searchReviews = (
  reviews: InternshipReview[],
  filters: ReviewFilters
): InternshipReview[] => {
  let filteredReviews = [...reviews];

  // Search query filter (searches company, position, location)
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredReviews = filteredReviews.filter(review =>
      review.companyName.toLowerCase().includes(query) ||
      review.position.toLowerCase().includes(query) ||
      review.location.toLowerCase().includes(query) ||
      review.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Company name filter
  if (filters.companyName) {
    filteredReviews = filteredReviews.filter(review =>
      review.companyName.toLowerCase().includes(filters.companyName!.toLowerCase())
    );
  }

  // Location filter
  if (filters.location) {
    filteredReviews = filteredReviews.filter(review =>
      review.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  // Rating filter (minimum rating)
  if (filters.rating !== undefined) {
    filteredReviews = filteredReviews.filter(review =>
      review.rating >= filters.rating!
    );
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filteredReviews = filteredReviews.filter(review =>
      filters.tags!.some(tag => 
        review.tags.some(reviewTag => 
          reviewTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  // Sort results
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        filteredReviews.sort((a, b) => 
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        );
        break;
      case 'oldest':
        filteredReviews.sort((a, b) => 
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        );
        break;
      case 'rating-high':
        filteredReviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        filteredReviews.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        filteredReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
    }
  }

  return filteredReviews;
};

export const getReviewsByCompany = (
  reviews: InternshipReview[],
  companyName: string
): InternshipReview[] => {
  return reviews.filter(review =>
    review.companyName.toLowerCase() === companyName.toLowerCase()
  );
};

export const getReviewsByRating = (
  reviews: InternshipReview[],
  minRating: number
): InternshipReview[] => {
  return reviews.filter(review => review.rating >= minRating);
};

export const getTopCompanies = (
  reviews: InternshipReview[],
  limit: number = 10
): string[] => {
  const companyCounts = reviews.reduce((acc, review) => {
    acc[review.companyName] = (acc[review.companyName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(companyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([company]) => company);
};

export const getPopularTags = (
  reviews: InternshipReview[],
  limit: number = 10
): string[] => {
  const tagCounts = reviews.reduce((acc, review) => {
    review.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
};

export const getReviewSummary = (reviews: InternshipReview[]): ReviewSummary => {
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;
  const topCompanies = getTopCompanies(reviews, 5);
  const popularTags = getPopularTags(reviews, 8);

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    topCompanies,
    popularTags
  };
};

export const getReviewById = (
  reviews: InternshipReview[],
  id: string
): InternshipReview | undefined => {
  return reviews.find(review => review.id === id);
};

// Utility function for generating unique IDs
export const generateReviewId = (): string => {
  return `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};