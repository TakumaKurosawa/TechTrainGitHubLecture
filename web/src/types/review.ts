/**
 * Review type definition for internship reviews
 */
export interface Review {
  /** Unique identifier for the review */
  id: string;
  
  /** Name of the company */
  companyName: string;
  
  /** Name of the internship program */
  internshipName: string;
  
  /** Duration/period of the internship */
  period: string;
  
  /** Rating from 1 to 5 */
  rating: 1 | 2 | 3 | 4 | 5;
  
  /** Positive aspects of the internship */
  pros: string[];
  
  /** Negative aspects or areas for improvement */
  cons: string[];
  
  /** Tags associated with the internship/company */
  tags: string[];
  
  /** Whether the reviewer recommends this internship */
  recommend: boolean;
  
  /** Date when the review was created */
  createdAt: Date;
}