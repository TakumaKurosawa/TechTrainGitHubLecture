import type { InternshipReview } from '../types/review';

const companies = [
  'Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'Netflix', 'Tesla', 'Uber',
  'Airbnb', 'Spotify', 'Adobe', 'Salesforce', 'Twitter', 'LinkedIn', 'Slack',
  'Zoom', 'Shopify', 'Stripe', 'PayPal', 'Square', 'Dropbox', 'GitHub',
  'Atlassian', 'Figma', 'Notion', 'Discord', 'TikTok', 'Snap Inc', 'Pinterest',
  'Reddit', 'Twitch', 'Unity', 'Epic Games', 'Nvidia', 'Intel', 'AMD',
];

const internshipTitles = [
  'Software Engineering Intern',
  'Data Science Intern', 
  'Product Management Intern',
  'UX/UI Design Intern',
  'Machine Learning Intern',
  'DevOps Engineering Intern',
  'Mobile Development Intern',
  'Frontend Development Intern',
  'Backend Development Intern',
  'Full Stack Development Intern',
  'QA Engineering Intern',
  'Security Engineering Intern',
  'Platform Engineering Intern',
  'Site Reliability Engineering Intern',
  'Business Intelligence Intern',
  'Marketing Technology Intern',
];

const departments = [
  'Engineering', 'Product', 'Design', 'Data Science', 'Marketing',
  'Sales', 'HR', 'Finance', 'Operations', 'Security', 'DevOps',
  'Research', 'Business Intelligence', 'Platform', 'Infrastructure',
];

const cities = [
  'San Francisco', 'Seattle', 'New York', 'Austin', 'Boston', 'Chicago',
  'Los Angeles', 'Denver', 'Portland', 'Atlanta', 'Miami', 'Dallas',
  'Phoenix', 'San Diego', 'Las Vegas', 'Nashville', 'Toronto', 'Vancouver',
  'London', 'Berlin', 'Amsterdam', 'Stockholm', 'Copenhagen', 'Tokyo',
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'Netherlands',
  'Sweden', 'Denmark', 'Japan', 'Singapore', 'Australia',
];

const tags = [
  'remote', 'hybrid', 'onsite', 'competitive-pay', 'great-mentorship', 
  'learning-focused', 'fast-paced', 'collaborative', 'innovative',
  'startup-culture', 'enterprise', 'open-source', 'cutting-edge',
  'work-life-balance', 'diverse-team', 'career-growth', 'networking',
  'real-impact', 'flexible-hours', 'free-lunch', 'gym-access',
];

const universities = [
  'Stanford University', 'MIT', 'UC Berkeley', 'Carnegie Mellon', 
  'University of Washington', 'Georgia Tech', 'UT Austin', 'UCLA',
  'Harvard University', 'Princeton University', 'Yale University',
  'Columbia University', 'NYU', 'USC', 'UC San Diego', 'Purdue',
];

const majors = [
  'Computer Science', 'Software Engineering', 'Data Science',
  'Computer Engineering', 'Electrical Engineering', 'Information Systems',
  'Mathematics', 'Statistics', 'Physics', 'Business Administration',
  'Industrial Engineering', 'Mechanical Engineering',
];

const reviewTexts = [
  "This internship exceeded all my expectations. The team was incredibly welcoming and I was given meaningful projects from day one.",
  "Great learning experience with exposure to cutting-edge technologies. The mentorship program was outstanding.",
  "Fast-paced environment that really challenged me to grow. Would definitely recommend to other students.",
  "The work was interesting and I felt like my contributions actually mattered. Team culture was fantastic.",
  "Solid internship with good exposure to real-world engineering problems. Management was very supportive.",
  "Amazing opportunity to work on products used by millions of users. The responsibility given was significant.",
  "The internship provided excellent networking opportunities and career guidance. Very well organized program.",
  "Challenging projects that pushed my technical skills to the next level. Great work-life balance too.",
  "Inclusive environment where interns are treated like full-time employees. Compensation was competitive.",
  "Gained valuable industry experience and made lasting professional connections. Would love to return.",
];

const prosOptions = [
  "Excellent mentorship and guidance",
  "Challenging and meaningful projects", 
  "Competitive compensation package",
  "Great work-life balance",
  "Cutting-edge technology stack",
  "Collaborative team environment",
  "Strong internship program structure",
  "Networking opportunities",
  "Real impact on products/users",
  "Flexible working arrangements",
  "Free meals and perks",
  "Career development resources",
  "Diverse and inclusive workplace",
  "Innovation-focused culture",
  "Excellent office facilities",
];

const consOptions = [
  "Fast-paced can be overwhelming at times",
  "Limited time to explore all areas",
  "High expectations and pressure",
  "Complex codebase takes time to understand",
  "Competitive internal environment", 
  "Sometimes unclear project requirements",
  "Limited flexibility in project choice",
  "Expensive cost of living in area",
  "Long commute to office",
  "Heavy meeting schedule",
  "Documentation could be better",
  "Onboarding process was rushed",
  "Limited mentorship time",
  "Difficult to get code reviews",
  "Office can be quite noisy",
];

const adviceOptions = [
  "Come prepared with a strong foundation in algorithms and data structures.",
  "Don't be afraid to ask questions - everyone is very helpful and approachable.", 
  "Take advantage of all the networking events and social activities.",
  "Be proactive about seeking out interesting projects and learning opportunities.",
  "Document your work and accomplishments for future job applications.",
  "Get involved in the intern community - you'll make great connections.",
  "Prepare well for the technical challenges, but also focus on soft skills.",
  "Take time to understand the company culture and values early on.",
  "Set clear goals with your manager at the beginning of the internship.",
  "Don't hesitate to contribute ideas and suggestions - your perspective is valued.",
];

const names = [
  'Alex Chen', 'Jordan Smith', 'Taylor Johnson', 'Morgan Davis', 'Casey Wilson',
  'Riley Brown', 'Avery Miller', 'Cameron Garcia', 'Drew Martinez', 'Sage Rodriguez',
  'Quinn Lee', 'Emery Taylor', 'Kendall Anderson', 'Rowan Thompson', 'River White',
  'Dakota Harris', 'Phoenix Clark', 'Skylar Lewis', 'Reese Walker', 'Blake Hall',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomDate(startDate: Date, endDate: Date): string {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime).toISOString();
}

function generateDuration() {
  const durationWeeks = Math.floor(Math.random() * 16) + 4; // 4-20 weeks
  const startDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  const endDate = new Date(startDate.getTime() + durationWeeks * 7 * 24 * 60 * 60 * 1000);
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    durationWeeks,
  };
}

export function generateFakeReview(id?: string): InternshipReview {
  const duration = generateDuration();
  const companyName = getRandomElement(companies);
  const isRemote = Math.random() > 0.7;
  const overallRating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
  
  return {
    id: id || Math.random().toString(36).substring(2, 15),
    companyName,
    internshipTitle: getRandomElement(internshipTitles),
    duration,
    rating: {
      overall: overallRating,
      workEnvironment: Math.min(5, Math.max(1, overallRating + Math.floor(Math.random() * 3) - 1)),
      learningOpportunity: Math.min(5, Math.max(1, overallRating + Math.floor(Math.random() * 3) - 1)),
      mentorSupport: Math.min(5, Math.max(1, overallRating + Math.floor(Math.random() * 3) - 1)),
      compensation: Math.min(5, Math.max(1, overallRating + Math.floor(Math.random() * 3) - 1)),
    },
    tags: getRandomElements(tags, Math.floor(Math.random() * 6) + 3),
    reviewText: getRandomElement(reviewTexts),
    pros: getRandomElements(prosOptions, Math.floor(Math.random() * 3) + 2),
    cons: getRandomElements(consOptions, Math.floor(Math.random() * 3) + 1),
    advice: getRandomElement(adviceOptions),
    reviewer: {
      name: getRandomElement(names),
      university: getRandomElement(universities),
      major: getRandomElement(majors),
      year: Math.floor(Math.random() * 4) + 1,
    },
    createdAt: generateRandomDate(new Date(2024, 0, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2024, 0, 1), new Date()),
    isRecommended: overallRating >= 4,
    salary: Math.random() > 0.3 ? {
      amount: Math.floor(Math.random() * 40) + 15, // $15-55/hour
      currency: 'USD',
      period: 'hourly' as const,
    } : undefined,
    location: {
      city: isRemote ? 'Remote' : getRandomElement(cities),
      country: getRandomElement(countries),
      isRemote,
    },
    department: getRandomElement(departments),
    position: getRandomElement(internshipTitles),
  };
}

export function generateFakeReviews(count: number): InternshipReview[] {
  return Array.from({ length: count }, (_, i) => generateFakeReview(`review-${i + 1}`));
}

export { 
  companies, 
  internshipTitles, 
  departments, 
  cities, 
  countries, 
  tags, 
  universities, 
  majors 
};