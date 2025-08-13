import { generateFakeReviews } from '../utils/fake-data-generator';
import type { InternshipReview } from '../types/review';

// Generate 25 mock reviews for comprehensive testing
export const mockReviews: InternshipReview[] = generateFakeReviews(25);

// Pre-defined high-quality reviews for consistent demo experience
export const featuredReviews: InternshipReview[] = [
  {
    id: 'featured-1',
    companyName: 'Google',
    internshipTitle: 'Software Engineering Intern',
    duration: {
      startDate: '2024-06-01',
      endDate: '2024-08-30', 
      durationWeeks: 12,
    },
    rating: {
      overall: 5,
      workEnvironment: 5,
      learningOpportunity: 5,
      mentorSupport: 4,
      compensation: 5,
    },
    tags: ['competitive-pay', 'great-mentorship', 'cutting-edge', 'collaborative', 'career-growth'],
    reviewText: "Absolutely incredible experience at Google! I worked on the Chrome team and contributed to features used by billions of users. The mentorship was outstanding - my manager and tech lead provided constant guidance and feedback. The internship program is very well structured with events, tech talks, and networking opportunities.",
    pros: [
      "World-class engineering culture and practices",
      "Incredible mentorship and career development", 
      "Competitive compensation and benefits",
      "Access to cutting-edge technology and infrastructure",
      "Meaningful projects with real user impact"
    ],
    cons: [
      "Can be overwhelming due to scale and complexity",
      "High expectations and fast-paced environment",
      "Limited time to explore all the amazing projects"
    ],
    advice: "Come prepared with strong CS fundamentals and don't be afraid to ask questions. Take advantage of all the learning opportunities and connect with other interns and full-time employees.",
    reviewer: {
      name: 'Sarah Kim',
      university: 'Stanford University',
      major: 'Computer Science', 
      year: 3,
    },
    createdAt: '2024-09-15T10:30:00Z',
    updatedAt: '2024-09-15T10:30:00Z',
    isRecommended: true,
    salary: {
      amount: 55,
      currency: 'USD',
      period: 'hourly',
    },
    location: {
      city: 'Mountain View',
      country: 'United States',
      isRemote: false,
    },
    department: 'Engineering',
    position: 'Software Engineering Intern',
  },
  {
    id: 'featured-2', 
    companyName: 'Stripe',
    internshipTitle: 'Full Stack Development Intern',
    duration: {
      startDate: '2024-05-15',
      endDate: '2024-08-15',
      durationWeeks: 13,
    },
    rating: {
      overall: 4,
      workEnvironment: 5,
      learningOpportunity: 4, 
      mentorSupport: 5,
      compensation: 4,
    },
    tags: ['remote', 'flexible-hours', 'startup-culture', 'learning-focused', 'work-life-balance'],
    reviewText: "Fantastic internship experience at Stripe! I loved the company culture - very collaborative and innovative. Worked on payment processing systems and learned a ton about fintech. The remote work setup was seamless and the team made sure I felt included despite being distributed.",
    pros: [
      "Excellent remote work culture and tools",
      "Strong focus on engineering excellence",
      "Great work-life balance and flexibility",
      "Exposure to complex fintech problems", 
      "Supportive and diverse team environment"
    ],
    cons: [
      "Remote can sometimes feel isolating", 
      "Complex financial regulations to navigate",
      "Steep learning curve for payments domain"
    ],
    advice: "Be prepared to learn quickly and ask lots of questions. The payments industry is complex but fascinating. Take initiative on projects and don't hesitate to suggest improvements.",
    reviewer: {
      name: 'Marcus Johnson',
      university: 'UC Berkeley', 
      major: 'Computer Science',
      year: 4,
    },
    createdAt: '2024-08-20T14:45:00Z',
    updatedAt: '2024-08-20T14:45:00Z',
    isRecommended: true,
    salary: {
      amount: 48,
      currency: 'USD', 
      period: 'hourly',
    },
    location: {
      city: 'Remote',
      country: 'United States',
      isRemote: true,
    },
    department: 'Engineering',
    position: 'Full Stack Development Intern',
  },
  {
    id: 'featured-3',
    companyName: 'Airbnb',
    internshipTitle: 'UX/UI Design Intern',
    duration: {
      startDate: '2024-06-10',
      endDate: '2024-09-10',
      durationWeeks: 14,
    },
    rating: {
      overall: 4,
      workEnvironment: 4,
      learningOpportunity: 5,
      mentorSupport: 4,
      compensation: 3,
    },
    tags: ['design-focused', 'collaborative', 'user-research', 'innovative', 'diverse-team'],
    reviewText: "Amazing design internship at Airbnb! I worked on the host experience team and contributed to several feature launches. The design culture here is incredible - very user-focused and data-driven. Got to participate in user research sessions and A/B tests.",
    pros: [
      "World-class design team and processes",
      "Strong user research and data culture",
      "Collaborative cross-functional environment",
      "Meaningful projects with measurable impact",
      "Great professional development opportunities"
    ],
    cons: [
      "Compensation lower than tech-focused roles",
      "Can be challenging to balance user needs vs business goals", 
      "Heavy focus on metrics can limit creative exploration"
    ],
    advice: "Come with a strong portfolio and be ready to defend your design decisions with data. Collaborate closely with PMs and engineers from the start. Don't be afraid to challenge existing designs.",
    reviewer: {
      name: 'Emma Rodriguez',
      university: 'Art Center College of Design',
      major: 'Interaction Design',
      year: 3,
    },
    createdAt: '2024-09-25T09:15:00Z',
    updatedAt: '2024-09-25T09:15:00Z', 
    isRecommended: true,
    salary: {
      amount: 35,
      currency: 'USD',
      period: 'hourly',
    },
    location: {
      city: 'San Francisco',
      country: 'United States',
      isRemote: false,
    },
    department: 'Design',
    position: 'UX/UI Design Intern',
  }
];

// Combine all reviews for comprehensive dataset
export const allReviews: InternshipReview[] = [...featuredReviews, ...mockReviews];

// Utility functions for filtering and searching
export const getReviewsByCompany = (companyName: string): InternshipReview[] => {
  return allReviews.filter(review => 
    review.companyName.toLowerCase().includes(companyName.toLowerCase())
  );
};

export const getReviewsByRating = (minRating: number): InternshipReview[] => {
  return allReviews.filter(review => review.rating.overall >= minRating);
};

export const getReviewsByTags = (tags: string[]): InternshipReview[] => {
  return allReviews.filter(review =>
    tags.some(tag => review.tags.includes(tag))
  );
};

export const searchReviews = (query: string): InternshipReview[] => {
  const lowercaseQuery = query.toLowerCase();
  return allReviews.filter(review =>
    review.companyName.toLowerCase().includes(lowercaseQuery) ||
    review.internshipTitle.toLowerCase().includes(lowercaseQuery) ||
    review.department.toLowerCase().includes(lowercaseQuery) ||
    review.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    review.reviewText.toLowerCase().includes(lowercaseQuery)
  );
};

export default allReviews;