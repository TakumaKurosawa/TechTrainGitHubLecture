// TypeScript type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'member' | 'manager';
}

export interface Review {
  id: string;
  title: string;
  content: string;
  author: User;
  reviewee?: User;
  status: 'draft' | 'pending' | 'completed' | 'approved' | 'rejected';
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface SearchFilters {
  status?: Review['status'][];
  rating?: {
    min?: number;
    max?: number;
  };
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  tags?: string[];
  author?: string;
  reviewee?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  position: string;
  manager?: string;
  directReports?: string[];
}

export interface MeetingRecord {
  id: string;
  title: string;
  date: Date;
  attendees: string[];
  notes: string;
  actionItems?: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
}

export type WorkflowStep = 
  | 'initial'
  | 'recording_meeting' 
  | 'generating_tasks'
  | 'reviewing_tasks'
  | 'assigning_tasks'
  | 'completed';

export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}