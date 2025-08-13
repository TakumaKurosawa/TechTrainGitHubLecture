import { useAppStore, useReviewsStore, useSearchStore } from '../store';
import { 
  mockUsers, 
  mockReviews, 
  mockTasks, 
  mockTeamMembers, 
  mockMeetingRecords,
  getMockUser
} from '../data';

export const initializeStoreWithMockData = () => {
  // Initialize app store with sample user
  const appStore = useAppStore.getState();
  const currentUser = getMockUser('member');
  
  appStore.setCurrentUser(currentUser);
  appStore.setUserRole(currentUser.role);
  
  // Add sample notification
  appStore.addNotification({
    type: 'info',
    title: 'ようこそ！',
    message: 'Zustand ストアが正常に初期化されました。',
    read: false,
    autoHide: false,
  });

  // Initialize reviews store with mock data
  const reviewsStore = useReviewsStore.getState();
  
  // Add reviews
  mockReviews.forEach(review => {
    reviewsStore.addReview({
      title: review.title,
      description: review.description,
      author: review.author,
      authorId: review.authorId,
      rating: review.rating,
      comments: review.comments,
      tags: review.tags,
      status: review.status,
      category: review.category,
    });
  });

  // Add tasks
  mockTasks.forEach(task => {
    reviewsStore.addTask({
      title: task.title,
      description: task.description,
      assigneeId: task.assigneeId,
      assigneeName: task.assigneeName,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      tags: task.tags,
      estimatedHours: task.estimatedHours,
      actualHours: task.actualHours,
    });
  });

  // Add team members
  mockTeamMembers.forEach(member => {
    reviewsStore.addTeamMember(member);
  });

  // Add meeting records
  mockMeetingRecords.forEach(meeting => {
    reviewsStore.addMeetingRecord({
      title: meeting.title,
      date: meeting.date,
      participants: meeting.participants,
      agenda: meeting.agenda,
      summary: meeting.summary,
      actionItems: meeting.actionItems,
    });
  });

  // Initialize search store with some sample searches
  const searchStore = useSearchStore.getState();
  
  searchStore.addToHistory('React Hooks');
  searchStore.addToHistory('TypeScript');
  searchStore.addToHistory('CSS-in-JS');
  
  // Save a sample search
  searchStore.setQuery('React');
  searchStore.setFilters({
    category: ['Frontend'],
    tags: ['React'],
    rating: { min: 4, max: 5 },
    dateRange: { start: null, end: null },
    author: [],
    status: ['published'],
  });
  searchStore.saveCurrentSearch('高評価の React 記事');
  
  // Reset search state
  searchStore.setQuery('');
  searchStore.resetFilters();

  console.log('✅ ストアが正常に初期化されました:');
  console.log(`- レビュー: ${reviewsStore.reviews.length}件`);
  console.log(`- タスク: ${reviewsStore.tasks.length}件`);
  console.log(`- チームメンバー: ${reviewsStore.teamMembers.length}名`);
  console.log(`- 会議記録: ${reviewsStore.meetingRecords.length}件`);
  console.log(`- 現在のユーザー: ${currentUser.name} (${currentUser.role})`);
};

export const logStoreState = () => {
  const appState = useAppStore.getState();
  const reviewsState = useReviewsStore.getState();
  const searchState = useSearchStore.getState();

  console.group('📊 Store State');
  
  console.group('App Store');
  console.log('Current User:', appState.currentUser?.name);
  console.log('User Role:', appState.userRole);
  console.log('Loading:', appState.isLoading);
  console.log('Current Step:', appState.currentStep);
  console.log('Notifications:', appState.notifications.length);
  console.log('UI State:', appState.ui);
  console.groupEnd();

  console.group('Reviews Store');
  console.log('Reviews:', reviewsState.reviews.length);
  console.log('Tasks:', reviewsState.tasks.length);
  console.log('Team Members:', reviewsState.teamMembers.length);
  console.log('Meeting Records:', reviewsState.meetingRecords.length);
  console.log('Loading State:', reviewsState.loading);
  console.log('Error:', reviewsState.error);
  console.groupEnd();

  console.group('Search Store');
  console.log('Query:', searchState.query);
  console.log('Filters Active:', Object.values(searchState.filters).some(f => 
    Array.isArray(f) ? f.length > 0 : 
    typeof f === 'object' ? f && (f.start || f.end || f.min > 0 || f.max < 5) : 
    false
  ));
  console.log('Sort:', searchState.sort);
  console.log('Pagination:', searchState.pagination);
  console.log('Search History:', searchState.searchHistory.length);
  console.log('Saved Searches:', searchState.savedSearches.length);
  console.groupEnd();

  console.groupEnd();
};