// Company type definition for internship review system

export interface Company {
  // Unique identifier for the company
  id: string;
  
  // Company name
  name: string;
  
  // Company description
  description: string;
  
  // Industry category
  industry: string;
  
  // Company size category
  size: "startup" | "small" | "medium" | "large" | "enterprise";
  
  // Location/headquarters
  location: string;
  
  // Company website URL
  website?: string;
  
  // Company logo URL
  logoUrl?: string;
  
  // Founded year
  foundedYear?: number;
  
  // Employee count estimate
  employeeCount?: number;
  
  // Whether the company is currently offering internships
  isActive: boolean;
  
  // Available internship programs
  internshipPrograms: string[];
  
  // When the company record was created
  createdAt: Date;
  
  // When the company record was last updated
  updatedAt: Date;
}