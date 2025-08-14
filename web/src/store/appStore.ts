import { create } from 'zustand';
import type { User, WorkflowStep, Notification, UIState } from '../types';

interface AppState {
  // ユーザー関連
  currentUser: User | null;
  userRole: 'member' | 'manager';

  // アプリケーション状態
  isLoading: boolean;
  currentStep: WorkflowStep;

  // 通知システム
  notifications: Notification[];

  // UI 状態
  ui: UIState;

  // アクション
  setCurrentUser: (user: User | null) => void;
  setUserRole: (role: 'member' | 'manager') => void;
  setLoading: (loading: boolean) => void;
  setCurrentStep: (step: WorkflowStep) => void;
  
  // 通知管理
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // UI 状態管理
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setViewMode: (mode: 'grid' | 'list' | 'kanban') => void;
}

// Selectors for performance optimization
export const selectCurrentUser = (state: AppState) => state.currentUser;
export const selectIsLoading = (state: AppState) => state.isLoading;
export const selectUnreadNotifications = (state: AppState) => 
  state.notifications.filter(n => !n.read);
export const selectCurrentStep = (state: AppState) => state.currentStep;

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  currentUser: null,
  userRole: 'member',
  isLoading: false,
  currentStep: 'initial',
  notifications: [],
  ui: {
    sidebarOpen: true,
    theme: 'light',
    viewMode: 'grid',
    loading: false,
  },

  // User actions
  setCurrentUser: (user) => set({ currentUser: user }),
  setUserRole: (role) => set({ userRole: role }),
  
  // App state actions
  setLoading: (loading) => set({ isLoading: loading }),
  setCurrentStep: (step) => set({ currentStep: step }),

  // Notification actions
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));

    // Auto-hide notification if specified
    if (notification.autoHide !== false) {
      setTimeout(() => {
        get().removeNotification(newNotification.id);
      }, 5000);
    }
  },

  removeNotification: (id) => 
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
    })),

  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  clearAllNotifications: () => set({ notifications: [] }),

  // UI actions
  toggleSidebar: () =>
    set((state) => ({
      ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
    })),

  setTheme: (theme) =>
    set((state) => ({
      ui: { ...state.ui, theme },
    })),

  setViewMode: (viewMode) =>
    set((state) => ({
      ui: { ...state.ui, viewMode },
    })),
}));
