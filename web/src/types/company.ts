/**
 * Company type definition
 */
export interface Company {
  /** Unique identifier for the company */
  id: string;
  
  /** Company name */
  name: string;
  
  /** Company description */
  description?: string;
  
  /** Industry category */
  industry: string;
  
  /** Company size range */
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  
  /** Company location */
  location: string;
  
  /** Company website URL */
  website?: string;
  
  /** Company logo URL */
  logoUrl?: string;
  
  /** Date when the company was added to the system */
  createdAt: Date;
  
  /** Date when the company information was last updated */
  updatedAt: Date;
}