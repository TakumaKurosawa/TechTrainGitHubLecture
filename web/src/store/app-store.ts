import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, WorkflowStep, AppNotification } from '../types';

interface AppState {
  // User related state
  currentUser: User | null;
  userRole: 'member' | 'manager';
  
  // Application state
  isLoading: boolean;
  currentStep: WorkflowStep;
  
  // Notifications
  notifications: AppNotification[];
  
  // UI state
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
}

interface AppActions {
  // User actions
  setCurrentUser: (user: User | null) => void;
  setUserRole: (role: 'member' | 'manager') => void;
  
  // App state actions
  setLoading: (loading: boolean) => void;
  setCurrentStep: (step: WorkflowStep) => void;
  
  // Notification actions
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // UI actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Reset action
  reset: () => void;
}

type AppStore = AppState & AppActions;

const initialState: AppState = {
  currentUser: null,
  userRole: 'member',
  isLoading: false,
  currentStep: 'initial',
  notifications: [],
  sidebarOpen: true,
  theme: 'light',
};

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // User actions
      setCurrentUser: (user) => set({ currentUser: user }),
      setUserRole: (role) => set({ userRole: role }),
      
      // App state actions  
      setLoading: (loading) => set({ isLoading: loading }),
      setCurrentStep: (step) => set({ currentStep: step }),
      
      // Notification actions
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: `notification-${Date.now()}-${Math.random()}`,
              timestamp: new Date(),
              read: false,
            },
          ],
        })),
      
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      // UI actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      
      // Reset action
      reset: () => set(initialState),
    }),
    { name: 'app-store' }
  )
);

// Selectors for better performance and separation of concerns
export const useCurrentUser = () => useAppStore((state) => state.currentUser);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useCurrentStep = () => useAppStore((state) => state.currentStep);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useUnreadNotifications = () => 
  useAppStore((state) => state.notifications.filter((n) => !n.read));
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen);
export const useTheme = () => useAppStore((state) => state.theme);

// Action selectors
export const useAppActions = () =>
  useAppStore((state) => ({
    setCurrentUser: state.setCurrentUser,
    setUserRole: state.setUserRole,
    setLoading: state.setLoading,
    setCurrentStep: state.setCurrentStep,
    addNotification: state.addNotification,
    markNotificationRead: state.markNotificationRead,
    clearNotifications: state.clearNotifications,
    toggleSidebar: state.toggleSidebar,
    setSidebarOpen: state.setSidebarOpen,
    setTheme: state.setTheme,
    reset: state.reset,
  }));