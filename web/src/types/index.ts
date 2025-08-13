export interface Review {
  id: string;
  companyName: string;
  internshipName: string;
  duration: string;
  rating: number; // 1-5
  goodPoints: string;
  concerns: string;
  tags: string[];
  recommended: boolean;
  createdAt: Date;
}

export interface ReviewFormData {
  companyName: string;
  internshipName: string;
  duration: string;
  rating: number;
  goodPoints: string;
  concerns: string;
  tags: string;
  recommended: boolean;
}