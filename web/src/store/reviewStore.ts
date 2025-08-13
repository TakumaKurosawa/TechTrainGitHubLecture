import { create } from "zustand";
import { Review, ReviewFormData } from "../types";

interface ReviewState {
  reviews: Review[];
  addReview: (reviewData: ReviewFormData) => void;
  getReviews: () => Review[];
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  
  addReview: (reviewData: ReviewFormData) => {
    const newReview: Review = {
      id: Date.now().toString(),
      companyName: reviewData.companyName,
      internshipName: reviewData.internshipName,
      duration: reviewData.duration,
      rating: reviewData.rating,
      goodPoints: reviewData.goodPoints,
      concerns: reviewData.concerns,
      tags: reviewData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      recommended: reviewData.recommended,
      createdAt: new Date(),
    };
    
    set((state) => ({
      reviews: [...state.reviews, newReview],
    }));
  },
  
  getReviews: () => get().reviews,
}));