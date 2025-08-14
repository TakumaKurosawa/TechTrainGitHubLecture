import type { InternshipReview } from '../types/review';

// Company data for realistic mock generation
const COMPANIES = [
  'Google', 'Meta', 'Apple', 'Microsoft', 'Amazon', 'Netflix', 'Tesla', 'Stripe',
  'Airbnb', 'Uber', 'Lyft', 'Slack', 'Dropbox', 'Spotify', 'Adobe', 'Salesforce',
  'Twitter', 'LinkedIn', 'Instagram', 'YouTube', 'GitHub', 'Figma', 'Notion',
  'Discord', 'Zoom', 'Shopify', 'Square', 'PayPal', 'Coinbase', 'Robinhood',
  'DoorDash', 'Instacart', 'Pinterest', 'Snapchat', 'TikTok', 'Reddit'
];

const POSITIONS = [
  'Software Engineering Intern', 'Data Science Intern', 'Product Management Intern',
  'UI/UX Design Intern', 'Machine Learning Intern', 'Frontend Developer Intern',
  'Backend Developer Intern', 'Full Stack Developer Intern', 'DevOps Intern',
  'Cloud Engineering Intern', 'Mobile App Developer Intern', 'QA Engineer Intern',
  'Security Engineer Intern', 'Data Engineer Intern', 'AI Research Intern'
];

const LOCATIONS = [
  'San Francisco, CA', 'Seattle, WA', 'New York, NY', 'Austin, TX', 'Boston, MA',
  'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Atlanta, GA', 'Miami, FL',
  'Remote', 'Mountain View, CA', 'Palo Alto, CA', 'Redmond, WA', 'Menlo Park, CA'
];

const UNIVERSITIES = [
  'Stanford University', 'MIT', 'UC Berkeley', 'Carnegie Mellon', 'Harvard University',
  'University of Washington', 'Georgia Tech', 'UT Austin', 'UCLA', 'USC',
  'NYU', 'Columbia University', 'Princeton University', 'Yale University',
  'Cornell University', 'University of Michigan', 'UIUC', 'Caltech'
];

const MAJORS = [
  'Computer Science', 'Software Engineering', 'Data Science', 'Computer Engineering',
  'Information Systems', 'Mathematics', 'Statistics', 'Electrical Engineering',
  'Business Administration', 'Economics', 'Design', 'Psychology'
];

const TAGS = [
  'Great Culture', 'Work-Life Balance', 'Good Pay', 'Learning Opportunities',
  'Mentorship', 'Remote Work', 'Flexible Hours', 'Challenging Projects',
  'Team Collaboration', 'Innovation', 'Fast-Paced', 'Startup Environment',
  'Large Company', 'Good Benefits', 'Free Food', 'Office Perks',
  'Career Growth', 'Technical Skills', 'Leadership Training', 'Networking'
];

const PROS_EXAMPLES = [
  'Amazing learning opportunities with industry experts',
  'Great work-life balance and flexible schedules',
  'Cutting-edge technology and innovative projects',
  'Excellent mentorship and guidance from senior engineers',
  'Collaborative and inclusive team environment',
  'Competitive salary and comprehensive benefits',
  'Access to top-tier tools and resources',
  'Regular feedback and professional development',
  'Opportunity to work on real production systems',
  'Strong company culture and values'
];

const CONS_EXAMPLES = [
  'Sometimes overwhelming workload during peak periods',
  'Limited intern-specific activities and events',
  'Steep learning curve for new technologies',
  'Occasional communication gaps between teams',
  'Office can get quite busy and noisy',
  'Some processes could be more streamlined',
  'Limited remote work options',
  'Competitive environment can be stressful',
  'Long commute to office location',
  'Few opportunities for cross-team collaboration'
];

const ADVICE_EXAMPLES = [
  'Come prepared with strong fundamentals and be ready to learn quickly',
  'Don\'t be afraid to ask questions and seek help when needed',
  'Take advantage of networking opportunities and company events',
  'Be proactive in seeking feedback and additional responsibilities',
  'Focus on building relationships with your team and mentor',
  'Document your work and contributions for future reference',
  'Participate in intern programs and social activities',
  'Be open to learning new technologies and methodologies',
  'Set clear goals and communicate regularly with your manager',
  'Make the most of the learning resources available to you'
];

export const generateRandomReview = (id: string): InternshipReview => {
  const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
  const position = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const university = UNIVERSITIES[Math.floor(Math.random() * UNIVERSITIES.length)];
  const major = MAJORS[Math.floor(Math.random() * MAJORS.length)];
  
  const rating = Math.floor(Math.random() * 5) + 1;
  const isRecommended = rating >= 3;
  
  // Generate random dates
  const startDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  const endDate = new Date(startDate.getTime() + (8 + Math.floor(Math.random() * 8)) * 7 * 24 * 60 * 60 * 1000);
  const datePosted = new Date(endDate.getTime() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
  
  // Generate random tags (2-5 tags)
  const shuffledTags = [...TAGS].sort(() => 0.5 - Math.random());
  const selectedTags = shuffledTags.slice(0, 2 + Math.floor(Math.random() * 4));
  
  // Generate pros/cons (2-4 each)
  const shuffledPros = [...PROS_EXAMPLES].sort(() => 0.5 - Math.random());
  const shuffledCons = [...CONS_EXAMPLES].sort(() => 0.5 - Math.random());
  const pros = shuffledPros.slice(0, 2 + Math.floor(Math.random() * 3));
  const cons = shuffledCons.slice(0, 2 + Math.floor(Math.random() * 3));
  
  const advice = ADVICE_EXAMPLES[Math.floor(Math.random() * ADVICE_EXAMPLES.length)];
  
  return {
    id,
    companyName: company,
    position,
    location,
    duration: `${Math.floor(Math.random() * 4) + 8} weeks`,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    rating,
    salary: location === 'Remote' ? undefined : 3000 + Math.floor(Math.random() * 5000),
    tags: selectedTags,
    pros,
    cons,
    advice,
    isRecommended,
    reviewerInfo: {
      university,
      major,
      graduationYear: 2024 + Math.floor(Math.random() * 3),
      previousInternships: Math.floor(Math.random() * 4)
    },
    datePosted: datePosted.toISOString().split('T')[0],
    likesCount: Math.floor(Math.random() * 50),
    helpfulCount: Math.floor(Math.random() * 30)
  };
};

export const generateMockReviews = (count: number): InternshipReview[] => {
  return Array.from({ length: count }, (_, index) => 
    generateRandomReview(`review-${index + 1}`)
  );
};

export const getRandomCompany = (): string => {
  return COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
};

export const getRandomPosition = (): string => {
  return POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
};

export const getRandomLocation = (): string => {
  return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
};