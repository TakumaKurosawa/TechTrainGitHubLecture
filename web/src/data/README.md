# Mock Data for Internship Reviews

This directory contains mock data and utilities for generating realistic internship review data.

## Overview

- **28 total reviews**: 25 generated + 3 featured high-quality reviews
- **Comprehensive data**: Companies, internship titles, ratings, tags, locations, etc.
- **Realistic variety**: Mix of remote/onsite, different companies, ratings, and experiences

## Files

### `mock-reviews.ts`
Main data file containing:
- `featuredReviews`: 3 hand-crafted high-quality reviews (Google, Stripe, Airbnb)
- `mockReviews`: 25 auto-generated reviews using faker utilities
- `allReviews`: Combined dataset (28 total reviews)
- Utility functions for filtering and searching

### `../utils/fake-data-generator.ts`
Data generation utilities:
- `generateFakeReview()`: Creates a single realistic review
- `generateFakeReviews(count)`: Creates multiple reviews
- Static arrays of realistic data (companies, titles, universities, etc.)

### `../types/review.ts`
TypeScript interfaces:
- `InternshipReview`: Complete review data structure
- `ReviewFilters`: For filtering functionality
- `ReviewSortOption`: For sorting functionality

## Usage Examples

### Basic Data Import
```typescript
import { allReviews, featuredReviews } from '../data';

// Get all reviews (28 total)
console.log(`Total reviews: ${allReviews.length}`);

// Get only featured reviews (3 total)  
console.log(`Featured reviews: ${featuredReviews.length}`);
```

### Search and Filter
```typescript
import { searchReviews, getReviewsByCompany, getReviewsByRating } from '../data';

// Search reviews
const googleReviews = searchReviews('Google');
const remoteReviews = searchReviews('remote');

// Filter by company
const airbnbReviews = getReviewsByCompany('Airbnb');

// Filter by minimum rating
const highRatedReviews = getReviewsByRating(4);
```

### Generate New Data
```typescript
import { generateFakeReviews, generateFakeReview } from '../utils';

// Generate additional reviews
const newReviews = generateFakeReviews(10);

// Generate single review
const singleReview = generateFakeReview();
```

## Data Structure

Each review contains:
- **Basic Info**: Company name, internship title, duration, position
- **Ratings**: Overall rating plus specific categories (1-5 scale)
- **Content**: Review text, pros/cons, advice
- **Metadata**: Tags, location, remote status, salary info
- **Reviewer**: Student info (name, university, major, year)
- **Timestamps**: Created/updated dates

## Acceptance Criteria Verification

✅ **20+ reviews**: 28 total reviews (25 generated + 3 featured)
✅ **Realistic data**: Companies, internship titles, periods, ratings, tags
✅ **Search functionality**: Search by company, title, tags, content
✅ **Filter functionality**: Filter by rating, company, location, etc.
✅ **UI ready**: Data structure matches expected UI component props

## For UI Development

This mock data is designed to work with:
- **List pages**: Display all 28 reviews with pagination
- **Detail pages**: Full review information display
- **Search pages**: Filter and search functionality
- **Statistics**: Rating distributions, popular companies, etc.

The data includes realistic variety to test edge cases:
- Different rating ranges (3-5 stars)
- Various company sizes and types
- Mix of remote/hybrid/onsite positions
- Different internship durations (4-20 weeks)
- Diverse reviewer backgrounds
- Range of compensation levels