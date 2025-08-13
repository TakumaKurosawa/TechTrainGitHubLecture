import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Review, User, Task, MeetingRecord, TeamMember } from '../types';
import { mockReviews, mockTasks, mockMeetingRecord, mockTeamMembers } from '../data/mock-data';

interface ReviewsState {
  // Reviews data
  reviews: Review[];
  selectedReview: Review | null;
  
  // Tasks data  
  generatedTasks: Task[];
  selectedTask: Task | null;
  
  // Meeting records
  meetingRecord: MeetingRecord | null;
  
  // Team data
  teamMembers: TeamMember[];
  
  // UI state
  viewMode: 'list' | 'grid' | 'timeline';
  selectedReviews: string[]; // for bulk actions
  
  // Loading states
  loading: {
    reviews: boolean;
    tasks: boolean;
    meetingRecord: boolean;
    teamMembers: boolean;
  };
  
  // Error states  
  errors: {
    reviews: string | null;
    tasks: string | null;
    meetingRecord: string | null;
    teamMembers: string | null;
  };
}

interface ReviewsActions {
  // Review actions
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  setSelectedReview: (review: Review | null) => void;
  duplicateReview: (id: string) => void;
  
  // Task actions
  setGeneratedTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setSelectedTask: (task: Task | null) => void;
  
  // Meeting record actions
  setMeetingRecord: (record: MeetingRecord | null) => void;
  updateMeetingRecord: (updates: Partial<MeetingRecord>) => void;
  
  // Team actions
  setTeamMembers: (members: TeamMember[]) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  
  // UI actions
  setViewMode: (mode: 'list' | 'grid' | 'timeline') => void;
  toggleReviewSelection: (id: string) => void;
  clearSelectedReviews: () => void;
  selectAllReviews: () => void;
  
  // Loading actions
  setLoading: <K extends keyof ReviewsState['loading']>(key: K, loading: boolean) => void;
  
  // Error actions
  setError: <K extends keyof ReviewsState['errors']>(key: K, error: string | null) => void;
  clearErrors: () => void;
  
  // Data fetching (mock functions)
  fetchReviews: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchMeetingRecord: () => Promise<void>;
  fetchTeamMembers: () => Promise<void>;
  
  // Bulk actions
  bulkUpdateReviews: (ids: string[], updates: Partial<Review>) => void;
  bulkDeleteReviews: (ids: string[]) => void;
  
  // Reset
  reset: () => void;
}

type ReviewsStore = ReviewsState & ReviewsActions;

const initialState: ReviewsState = {
  reviews: [],
  selectedReview: null,
  generatedTasks: [],
  selectedTask: null,
  meetingRecord: null,
  teamMembers: [],
  viewMode: 'list',
  selectedReviews: [],
  loading: {
    reviews: false,
    tasks: false,
    meetingRecord: false,
    teamMembers: false,
  },
  errors: {
    reviews: null,
    tasks: null,
    meetingRecord: null,
    teamMembers: null,
  },
};

export const useReviewsStore = create<ReviewsStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Review actions
        setReviews: (reviews) => set({ reviews }),
        
        addReview: (review) =>
          set((state) => ({
            reviews: [review, ...state.reviews],
          })),
        
        updateReview: (id, updates) =>
          set((state) => ({
            reviews: state.reviews.map((review) =>
              review.id === id 
                ? { ...review, ...updates, updatedAt: new Date() }
                : review
            ),
            selectedReview: state.selectedReview?.id === id
              ? { ...state.selectedReview, ...updates, updatedAt: new Date() }
              : state.selectedReview,
          })),
        
        deleteReview: (id) =>
          set((state) => ({
            reviews: state.reviews.filter((review) => review.id !== id),
            selectedReview: state.selectedReview?.id === id ? null : state.selectedReview,
            selectedReviews: state.selectedReviews.filter((reviewId) => reviewId !== id),
          })),
        
        setSelectedReview: (review) => set({ selectedReview: review }),
        
        duplicateReview: (id) => {
          const state = get();
          const review = state.reviews.find((r) => r.id === id);
          if (review) {
            const duplicated: Review = {
              ...review,
              id: `${review.id}-copy-${Date.now()}`,
              title: `${review.title} (コピー)`,
              status: 'draft',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            get().addReview(duplicated);
          }
        },
        
        // Task actions
        setGeneratedTasks: (tasks) => set({ generatedTasks: tasks }),
        
        addTask: (task) =>
          set((state) => ({
            generatedTasks: [task, ...state.generatedTasks],
          })),
        
        updateTask: (id, updates) =>
          set((state) => ({
            generatedTasks: state.generatedTasks.map((task) =>
              task.id === id ? { ...task, ...updates } : task
            ),
            selectedTask: state.selectedTask?.id === id
              ? { ...state.selectedTask, ...updates }
              : state.selectedTask,
          })),
        
        deleteTask: (id) =>
          set((state) => ({
            generatedTasks: state.generatedTasks.filter((task) => task.id !== id),
            selectedTask: state.selectedTask?.id === id ? null : state.selectedTask,
          })),
        
        setSelectedTask: (task) => set({ selectedTask: task }),
        
        // Meeting record actions
        setMeetingRecord: (record) => set({ meetingRecord: record }),
        
        updateMeetingRecord: (updates) =>
          set((state) => ({
            meetingRecord: state.meetingRecord
              ? { ...state.meetingRecord, ...updates }
              : null,
          })),
        
        // Team actions
        setTeamMembers: (members) => set({ teamMembers: members }),
        
        updateTeamMember: (id, updates) =>
          set((state) => ({
            teamMembers: state.teamMembers.map((member) =>
              member.id === id ? { ...member, ...updates } : member
            ),
          })),
        
        // UI actions
        setViewMode: (mode) => set({ viewMode: mode }),
        
        toggleReviewSelection: (id) =>
          set((state) => ({
            selectedReviews: state.selectedReviews.includes(id)
              ? state.selectedReviews.filter((reviewId) => reviewId !== id)
              : [...state.selectedReviews, id],
          })),
        
        clearSelectedReviews: () => set({ selectedReviews: [] }),
        
        selectAllReviews: () =>
          set((state) => ({
            selectedReviews: state.reviews.map((review) => review.id),
          })),
        
        // Loading actions
        setLoading: (key, loading) =>
          set((state) => ({
            loading: { ...state.loading, [key]: loading },
          })),
        
        // Error actions
        setError: (key, error) =>
          set((state) => ({
            errors: { ...state.errors, [key]: error },
          })),
        
        clearErrors: () =>
          set({
            errors: {
              reviews: null,
              tasks: null,
              meetingRecord: null,
              teamMembers: null,
            },
          }),
        
        // Mock data fetching functions
        fetchReviews: async () => {
          get().setLoading('reviews', true);
          get().setError('reviews', null);
          
          try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            get().setReviews(mockReviews);
          } catch (error) {
            get().setError('reviews', 'レビューの取得に失敗しました');
          } finally {
            get().setLoading('reviews', false);
          }
        },
        
        fetchTasks: async () => {
          get().setLoading('tasks', true);
          get().setError('tasks', null);
          
          try {
            await new Promise((resolve) => setTimeout(resolve, 600));
            get().setGeneratedTasks(mockTasks);
          } catch (error) {
            get().setError('tasks', 'タスクの取得に失敗しました');
          } finally {
            get().setLoading('tasks', false);
          }
        },
        
        fetchMeetingRecord: async () => {
          get().setLoading('meetingRecord', true);
          get().setError('meetingRecord', null);
          
          try {
            await new Promise((resolve) => setTimeout(resolve, 400));
            get().setMeetingRecord(mockMeetingRecord);
          } catch (error) {
            get().setError('meetingRecord', 'ミーティング記録の取得に失敗しました');
          } finally {
            get().setLoading('meetingRecord', false);
          }
        },
        
        fetchTeamMembers: async () => {
          get().setLoading('teamMembers', true);
          get().setError('teamMembers', null);
          
          try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            get().setTeamMembers(mockTeamMembers);
          } catch (error) {
            get().setError('teamMembers', 'チームメンバーの取得に失敗しました');
          } finally {
            get().setLoading('teamMembers', false);
          }
        },
        
        // Bulk actions
        bulkUpdateReviews: (ids, updates) =>
          set((state) => ({
            reviews: state.reviews.map((review) =>
              ids.includes(review.id)
                ? { ...review, ...updates, updatedAt: new Date() }
                : review
            ),
          })),
        
        bulkDeleteReviews: (ids) =>
          set((state) => ({
            reviews: state.reviews.filter((review) => !ids.includes(review.id)),
            selectedReviews: state.selectedReviews.filter((id) => !ids.includes(id)),
          })),
        
        // Reset
        reset: () => set(initialState),
      }),
      {
        name: 'reviews-store',
        partialize: (state) => ({
          reviews: state.reviews,
          viewMode: state.viewMode,
          generatedTasks: state.generatedTasks,
          teamMembers: state.teamMembers,
        }),
      }
    ),
    { name: 'reviews-store' }
  )
);

// Selectors
export const useReviews = () => useReviewsStore((state) => state.reviews);
export const useSelectedReview = () => useReviewsStore((state) => state.selectedReview);
export const useGeneratedTasks = () => useReviewsStore((state) => state.generatedTasks);
export const useSelectedTask = () => useReviewsStore((state) => state.selectedTask);
export const useMeetingRecord = () => useReviewsStore((state) => state.meetingRecord);
export const useTeamMembers = () => useReviewsStore((state) => state.teamMembers);
export const useViewMode = () => useReviewsStore((state) => state.viewMode);
export const useSelectedReviews = () => useReviewsStore((state) => state.selectedReviews);
export const useReviewsLoading = () => useReviewsStore((state) => state.loading);
export const useReviewsErrors = () => useReviewsStore((state) => state.errors);

// Complex selectors
export const useReviewsByStatus = () =>
  useReviewsStore((state) => {
    const reviews = state.reviews;
    return {
      draft: reviews.filter((r) => r.status === 'draft'),
      pending: reviews.filter((r) => r.status === 'pending'),
      completed: reviews.filter((r) => r.status === 'completed'),
      approved: reviews.filter((r) => r.status === 'approved'),
      rejected: reviews.filter((r) => r.status === 'rejected'),
    };
  });

export const useTasksByStatus = () =>
  useReviewsStore((state) => {
    const tasks = state.generatedTasks;
    return {
      todo: tasks.filter((t) => t.status === 'todo'),
      inProgress: tasks.filter((t) => t.status === 'in_progress'),
      completed: tasks.filter((t) => t.status === 'completed'),
    };
  });

// Action selectors
export const useReviewsActions = () =>
  useReviewsStore((state) => ({
    setReviews: state.setReviews,
    addReview: state.addReview,
    updateReview: state.updateReview,
    deleteReview: state.deleteReview,
    setSelectedReview: state.setSelectedReview,
    duplicateReview: state.duplicateReview,
    setGeneratedTasks: state.setGeneratedTasks,
    addTask: state.addTask,
    updateTask: state.updateTask,
    deleteTask: state.deleteTask,
    setSelectedTask: state.setSelectedTask,
    setMeetingRecord: state.setMeetingRecord,
    updateMeetingRecord: state.updateMeetingRecord,
    setTeamMembers: state.setTeamMembers,
    updateTeamMember: state.updateTeamMember,
    setViewMode: state.setViewMode,
    toggleReviewSelection: state.toggleReviewSelection,
    clearSelectedReviews: state.clearSelectedReviews,
    selectAllReviews: state.selectAllReviews,
    setLoading: state.setLoading,
    setError: state.setError,
    clearErrors: state.clearErrors,
    fetchReviews: state.fetchReviews,
    fetchTasks: state.fetchTasks,
    fetchMeetingRecord: state.fetchMeetingRecord,
    fetchTeamMembers: state.fetchTeamMembers,
    bulkUpdateReviews: state.bulkUpdateReviews,
    bulkDeleteReviews: state.bulkDeleteReviews,
    reset: state.reset,
  }));