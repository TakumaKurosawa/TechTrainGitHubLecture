// TypeScript type definitions

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'member' | 'manager';
  department: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  workload: number;
  status: 'active' | 'busy' | 'away';
}

export interface Review {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  rating: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  category: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  dueDate: string;
  createdAt: string;
  tags: string[];
  estimatedHours?: number;
  actualHours?: number;
}

export interface MeetingRecord {
  id: string;
  title: string;
  date: string;
  participants: string[];
  agenda: string[];
  summary: string;
  actionItems: Task[];
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  autoHide?: boolean;
}

export type WorkflowStep = 
  | 'initial' 
  | 'recording' 
  | 'processing' 
  | 'review' 
  | 'completed';

export type ViewMode = 'grid' | 'list' | 'kanban';

export type SortOption = 
  | 'createdAt' 
  | 'updatedAt' 
  | 'rating' 
  | 'title' 
  | 'author';

export type SortDirection = 'asc' | 'desc';

export interface SearchFilters {
  category: string[];
  tags: string[];
  rating: {
    min: number;
    max: number;
  };
  dateRange: {
    start: string | null;
    end: string | null;
  };
  author: string[];
  status: string[];
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  viewMode: ViewMode;
  loading: boolean;
}