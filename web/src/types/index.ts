export interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FormData {
  title: string;
  content: string;
  rating: number;
}