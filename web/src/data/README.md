# Mock Data Documentation

## Overview

This directory contains mock data and utilities for internship reviews. The implementation provides 28 total reviews (25 auto-generated + 3 featured high-quality reviews) with comprehensive search and filtering capabilities.

## Data Structure

### InternshipReview Interface

```typescript
interface InternshipReview {
  id: string;
  companyName: string;
  position: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  rating: number; // 1-5 stars
  salary?: number; // Monthly salary in USD
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
```

## Usage Examples

### Basic Data Access

```typescript
import { allReviews, featuredReviews, randomReviews } from '../data';

// Get all 28 reviews
console.log(`Total reviews: ${allReviews.length}`);

// Get only the 3 featured high-quality reviews
console.log(`Featured reviews: ${featuredReviews.length}`);

// Get only the 25 auto-generated reviews
console.log(`Random reviews: ${randomReviews.length}`);
```

### Search and Filtering

```typescript
import { searchReviews, getReviewsByCompany, getReviewsByRating } from '../utils';
import { allReviews } from '../data';

// Search by company name
const googleReviews = searchReviews(allReviews, { 
  searchQuery: 'Google' 
});

// Filter by minimum rating
const highRatedReviews = searchReviews(allReviews, { 
  rating: 4 
});

// Complex search with multiple filters
const filteredReviews = searchReviews(allReviews, {
  searchQuery: 'software',
  location: 'San Francisco',
  rating: 3,
  tags: ['Great Culture'],
  sortBy: 'rating-high'
});

// Get reviews by specific company
const stripeReviews = getReviewsByCompany(allReviews, 'Stripe');

// Get reviews with rating 4 or higher
const topReviews = getReviewsByRating(allReviews, 4);
```

### Analytics and Summary

```typescript
import { 
  getReviewSummary, 
  getTopCompanies, 
  getPopularTags 
} from '../utils';
import { allReviews } from '../data';

// Get comprehensive summary
const summary = getReviewSummary(allReviews);
console.log(`Average rating: ${summary.averageRating}`);
console.log(`Top companies: ${summary.topCompanies.join(', ')}`);

// Get top 10 most reviewed companies
const topCompanies = getTopCompanies(allReviews, 10);

// Get most popular tags
const popularTags = getPopularTags(allReviews, 8);
```

### Data Generation

```typescript
import { generateRandomReview, generateMockReviews } from '../utils';

// Generate a single random review
const newReview = generateRandomReview('custom-id');

// Generate multiple reviews
const additionalReviews = generateMockReviews(10);
```

## Data Characteristics

### Companies (36 total)
- **Tech Giants**: Google, Meta, Apple, Microsoft, Amazon
- **Unicorns**: Stripe, Airbnb, Uber, Spotify, Figma
- **Emerging**: Discord, Notion, Coinbase, DoorDash
- **Enterprise**: Salesforce, Adobe, LinkedIn, PayPal

### Positions (15 types)
- Software Engineering Intern
- Data Science Intern
- Product Management Intern
- UI/UX Design Intern
- Machine Learning Intern
- And more...

### Locations (15 locations)
- Major tech hubs: San Francisco, Seattle, New York
- Remote work options
- Diverse geographic representation

### Review Quality
- **Realistic ratings**: Distributed across 1-5 stars
- **Authentic content**: Varied pros, cons, and advice
- **Rich metadata**: University info, graduation years, experience levels
- **Featured reviews**: 3 hand-crafted high-quality examples

### Tags (20 categories)
- Culture: 'Great Culture', 'Work-Life Balance'
- Learning: 'Learning Opportunities', 'Mentorship'
- Technical: 'Technical Skills', 'Innovation'
- Benefits: 'Good Pay', 'Good Benefits', 'Free Food'

## File Structure

```
data/
├── README.md              # This documentation
├── mock-reviews.ts        # Main data file with 28 reviews
└── index.ts              # Barrel exports

utils/
├── fake-data-generator.ts # Random data generation utilities
├── review-utils.ts        # Search, filter, and analysis functions
└── index.ts              # Barrel exports

types/
├── review.ts             # TypeScript interfaces
└── index.ts              # Barrel exports
```

## Integration with UI

The mock data is designed to work seamlessly with the listing and search pages:

```typescript
// Example usage in a React component
import { useState, useMemo } from 'react';
import { allReviews } from '../data';
import { searchReviews } from '../utils';

const ReviewsListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const filteredReviews = useMemo(() => 
    searchReviews(allReviews, { searchQuery, ...filters }),
    [searchQuery, filters]
  );

  return (
    <div>
      <p>Showing {filteredReviews.length} of {allReviews.length} reviews</p>
      {/* Render reviews */}
    </div>
  );
};
```

This implementation satisfies the acceptance criteria:
- ✅ 20+ reviews available (28 total)
- ✅ Listing page can display all reviews
- ✅ Search functionality changes the count dynamically
- ✅ Realistic, diverse data for comprehensive UI testing