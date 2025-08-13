import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Review, Task, MeetingRecord, TeamMember } from '../types';

interface ReviewsState {
  // データ
  reviews: Review[];
  tasks: Task[];
  meetingRecords: MeetingRecord[];
  teamMembers: TeamMember[];
  
  // ローディング状態
  loading: {
    reviews: boolean;
    tasks: boolean;
    meetings: boolean;
    members: boolean;
  };

  // エラー状態
  error: string | null;

  // Reviews CRUD
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  getReviewById: (id: string) => Review | undefined;
  
  // Tasks CRUD
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  bulkUpdateTasks: (updates: Array<{ id: string; updates: Partial<Task> }>) => void;

  // Meeting Records CRUD
  addMeetingRecord: (meeting: Omit<MeetingRecord, 'id' | 'createdAt'>) => void;
  updateMeetingRecord: (id: string, updates: Partial<MeetingRecord>) => void;
  deleteMeetingRecord: (id: string) => void;
  
  // Team Members CRUD
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;

  // Bulk operations
  bulkDeleteReviews: (ids: string[]) => void;
  bulkUpdateReviewStatus: (ids: string[], status: Review['status']) => void;

  // Data loading
  loadReviews: () => Promise<void>;
  refreshData: () => Promise<void>;
  
  // Error handling
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Selectors for performance optimization
export const selectReviews = (state: ReviewsState) => state.reviews;
export const selectPublishedReviews = (state: ReviewsState) => 
  state.reviews.filter(review => review.status === 'published');
export const selectReviewsByAuthor = (authorId: string) => (state: ReviewsState) =>
  state.reviews.filter(review => review.authorId === authorId);
export const selectTasks = (state: ReviewsState) => state.tasks;
export const selectTasksByStatus = (status: Task['status']) => (state: ReviewsState) =>
  state.tasks.filter(task => task.status === status);
export const selectTeamMembers = (state: ReviewsState) => state.teamMembers;
export const selectActiveTeamMembers = (state: ReviewsState) => 
  state.teamMembers.filter(member => member.status === 'active');

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      // Initial state
      reviews: [],
      tasks: [],
      meetingRecords: [],
      teamMembers: [],
      loading: {
        reviews: false,
        tasks: false,
        meetings: false,
        members: false,
      },
      error: null,

      // Reviews CRUD
      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },

      updateReview: (id, updates) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === id
              ? { ...review, ...updates, updatedAt: new Date().toISOString() }
              : review
          ),
        }));
      },

      deleteReview: (id) => {
        set((state) => ({
          reviews: state.reviews.filter(review => review.id !== id),
        }));
      },

      getReviewById: (id) => {
        return get().reviews.find(review => review.id === id);
      },

      // Tasks CRUD
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter(task => task.id !== id),
        }));
      },

      getTaskById: (id) => {
        return get().tasks.find(task => task.id === id);
      },

      bulkUpdateTasks: (updates) => {
        const updateMap = new Map(updates.map(u => [u.id, u.updates]));
        
        set((state) => ({
          tasks: state.tasks.map(task => {
            const taskUpdates = updateMap.get(task.id);
            return taskUpdates ? { ...task, ...taskUpdates } : task;
          }),
        }));
      },

      // Meeting Records CRUD
      addMeetingRecord: (meetingData) => {
        const newMeeting: MeetingRecord = {
          ...meetingData,
          id: `meeting-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          meetingRecords: [newMeeting, ...state.meetingRecords],
        }));
      },

      updateMeetingRecord: (id, updates) => {
        set((state) => ({
          meetingRecords: state.meetingRecords.map(meeting =>
            meeting.id === id ? { ...meeting, ...updates } : meeting
          ),
        }));
      },

      deleteMeetingRecord: (id) => {
        set((state) => ({
          meetingRecords: state.meetingRecords.filter(meeting => meeting.id !== id),
        }));
      },

      // Team Members CRUD
      addTeamMember: (memberData) => {
        const newMember: TeamMember = {
          ...memberData,
          id: `member-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };

        set((state) => ({
          teamMembers: [newMember, ...state.teamMembers],
        }));
      },

      updateTeamMember: (id, updates) => {
        set((state) => ({
          teamMembers: state.teamMembers.map(member =>
            member.id === id ? { ...member, ...updates } : member
          ),
        }));
      },

      removeTeamMember: (id) => {
        set((state) => ({
          teamMembers: state.teamMembers.filter(member => member.id !== id),
        }));
      },

      // Bulk operations
      bulkDeleteReviews: (ids) => {
        const idsSet = new Set(ids);
        set((state) => ({
          reviews: state.reviews.filter(review => !idsSet.has(review.id)),
        }));
      },

      bulkUpdateReviewStatus: (ids, status) => {
        const idsSet = new Set(ids);
        set((state) => ({
          reviews: state.reviews.map(review =>
            idsSet.has(review.id)
              ? { ...review, status, updatedAt: new Date().toISOString() }
              : review
          ),
        }));
      },

      // Data loading
      loadReviews: async () => {
        set((state) => ({
          loading: { ...state.loading, reviews: true },
        }));

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set((state) => ({
            loading: { ...state.loading, reviews: false },
          }));
        } catch (error) {
          set((state) => ({
            loading: { ...state.loading, reviews: false },
            error: error instanceof Error ? error.message : 'Failed to load reviews',
          }));
        }
      },

      refreshData: async () => {
        set({
          loading: {
            reviews: true,
            tasks: true,
            meetings: true,
            members: true,
          },
        });

        try {
          // Simulate API calls
          await Promise.all([
            new Promise(resolve => setTimeout(resolve, 500)),
            new Promise(resolve => setTimeout(resolve, 700)),
            new Promise(resolve => setTimeout(resolve, 600)),
          ]);

          set({
            loading: {
              reviews: false,
              tasks: false,
              meetings: false,
              members: false,
            },
            error: null,
          });
        } catch (error) {
          set({
            loading: {
              reviews: false,
              tasks: false,
              meetings: false,
              members: false,
            },
            error: error instanceof Error ? error.message : 'Failed to refresh data',
          });
        }
      },

      // Error handling
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'reviews-storage',
      partialize: (state) => ({
        reviews: state.reviews,
        tasks: state.tasks,
        meetingRecords: state.meetingRecords,
        teamMembers: state.teamMembers,
      }),
    }
  )
);