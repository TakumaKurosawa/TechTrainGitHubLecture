// Review type definition for internship review system

export interface Review {
  // Unique identifier for the review
  id: string;
  
  // Company information
  companyName: string;
  
  // Internship program name
  internshipName: string;
  
  // Internship period (e.g., "2024年夏季", "3ヶ月", etc.)
  period: string;
  
  // Rating from 1 to 5
  rating: 1 | 2 | 3 | 4 | 5;
  
  // Positive aspects of the internship
  pros: string[];
  
  // Negative aspects or areas for improvement
  cons: string[];
  
  // Tags for categorization (e.g., ["frontend", "remote", "startup"])
  tags: string[];
  
  // Whether the reviewer recommends this internship
  recommend: boolean;
  
  // When the review was created
  createdAt: Date;
}