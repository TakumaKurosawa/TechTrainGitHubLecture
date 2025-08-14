import type { InternshipReview } from '../types/review';
import { generateMockReviews } from '../utils/fake-data-generator';

// Generate 25 random reviews plus 3 featured high-quality reviews (28 total)
const generatedReviews = generateMockReviews(25);

// Featured high-quality reviews for diversity
const featuredReviews: InternshipReview[] = [
  {
    id: 'featured-1',
    companyName: 'Google',
    position: 'Software Engineering Intern',
    location: 'Mountain View, CA',
    duration: '12 weeks',
    startDate: '2024-06-10',
    endDate: '2024-08-30',
    rating: 5,
    salary: 8500,
    tags: ['Great Culture', 'Learning Opportunities', 'Mentorship', 'Innovation', 'Good Pay'],
    pros: [
      'Incredible learning environment with world-class engineers',
      'Amazing mentorship program with weekly 1:1s',
      'Access to cutting-edge technology and infrastructure',
      'Excellent work-life balance with flexible hours',
      'Outstanding intern events and networking opportunities'
    ],
    cons: [
      'Can be overwhelming due to the scale of systems',
      'High expectations and competitive environment',
      'Some bureaucracy in larger teams'
    ],
    advice: 'Come prepared with strong CS fundamentals. Don\'t hesitate to ask questions - everyone is extremely helpful. Take advantage of the amazing internal tech talks and learning resources.',
    isRecommended: true,
    reviewerInfo: {
      university: 'Stanford University',
      major: 'Computer Science',
      graduationYear: 2025,
      previousInternships: 2
    },
    datePosted: '2024-09-15',
    likesCount: 89,
    helpfulCount: 67
  },
  {
    id: 'featured-2',
    companyName: 'Stripe',
    position: 'Backend Developer Intern',
    location: 'San Francisco, CA',
    duration: '10 weeks',
    startDate: '2024-06-17',
    endDate: '2024-08-23',
    rating: 4,
    salary: 7200,
    tags: ['Fast-Paced', 'Technical Skills', 'Good Benefits', 'Team Collaboration'],
    pros: [
      'Work on real production systems with millions of users',
      'Great technical mentorship and code review culture',
      'Fast-paced environment that pushes you to grow',
      'Excellent compensation and benefits package'
    ],
    cons: [
      'Very fast-paced can be stressful at times',
      'Limited intern-specific programming',
      'High technical bar can be intimidating initially'
    ],
    advice: 'Be ready to dive deep into complex systems quickly. The learning curve is steep but incredibly rewarding. Focus on understanding the business context behind technical decisions.',
    isRecommended: true,
    reviewerInfo: {
      university: 'MIT',
      major: 'Computer Science',
      graduationYear: 2024,
      previousInternships: 1
    },
    datePosted: '2024-09-08',
    likesCount: 45,
    helpfulCount: 38
  },
  {
    id: 'featured-3',
    companyName: 'Airbnb',
    position: 'UI/UX Design Intern',
    location: 'San Francisco, CA',
    duration: '11 weeks',
    startDate: '2024-06-03',
    endDate: '2024-08-16',
    rating: 4,
    salary: 6800,
    tags: ['Great Culture', 'Work-Life Balance', 'Design', 'Innovation', 'Mentorship'],
    pros: [
      'Amazing design culture with focus on user empathy',
      'Excellent design tools and resources',
      'Very collaborative and supportive design team',
      'Beautiful office spaces that inspire creativity',
      'Great work-life balance with flexible schedules'
    ],
    cons: [
      'Design decisions can take time due to multiple stakeholders',
      'Limited cross-functional project opportunities',
      'Some projects may not ship during internship period'
    ],
    advice: 'Come with a strong portfolio and be prepared to defend your design decisions. The design team is incredibly talented - learn from everyone around you. Don\'t be afraid to challenge assumptions.',
    isRecommended: true,
    reviewerInfo: {
      university: 'Carnegie Mellon',
      major: 'Design',
      graduationYear: 2025,
      previousInternships: 0
    },
    datePosted: '2024-09-02',
    likesCount: 32,
    helpfulCount: 29
  }
];

// Combine all reviews
export const allReviews: InternshipReview[] = [...generatedReviews, ...featuredReviews];

// Export individual arrays for specific use cases
export const randomReviews = generatedReviews;
export { featuredReviews };

// Default export for main usage
export default allReviews;