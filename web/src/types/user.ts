// User type definition for internship review system

export interface User {
  // Unique identifier for the user
  id: string;
  
  // User's email address
  email: string;
  
  // User's display name
  displayName: string;
  
  // User's first name
  firstName?: string;
  
  // User's last name
  lastName?: string;
  
  // User role in the system
  role: "student" | "admin" | "moderator";
  
  // User's avatar image URL
  avatarUrl?: string;
  
  // University or school name
  university?: string;
  
  // Graduation year
  graduationYear?: number;
  
  // Major/field of study
  major?: string;
  
  // User's bio or self-introduction
  bio?: string;
  
  // User's location
  location?: string;
  
  // Whether the user's profile is public
  isPublic: boolean;
  
  // Whether the user account is verified
  isVerified: boolean;
  
  // Whether the user account is active
  isActive: boolean;
  
  // User's areas of interest for internships
  interests: string[];
  
  // User's skill tags
  skills: string[];
  
  // When the user account was created
  createdAt: Date;
  
  // When the user profile was last updated
  updatedAt: Date;
  
  // Last login timestamp
  lastLoginAt?: Date;
}