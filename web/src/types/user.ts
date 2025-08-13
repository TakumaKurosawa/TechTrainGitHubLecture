/**
 * User type definition
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  
  /** User's email address */
  email: string;
  
  /** User's full name */
  name: string;
  
  /** User's avatar/profile picture URL */
  avatarUrl?: string;
  
  /** User role in the system */
  role: 'member' | 'manager' | 'admin';
  
  /** User's current academic year or graduation year */
  academicYear?: number;
  
  /** University or educational institution */
  university?: string;
  
  /** Field of study/major */
  major?: string;
  
  /** User's interests or areas of focus */
  interests?: string[];
  
  /** Date when the user account was created */
  createdAt: Date;
  
  /** Date when the user profile was last updated */
  updatedAt: Date;
  
  /** Whether the user account is active */
  isActive: boolean;
}