import React, { useEffect } from 'react';
import { 
  useAppStore, 
  useReviewsStore, 
  useSearchStore,
  useCurrentUser,
  useIsLoading,
  useReviews,
  useSearchQuery 
} from './store';
import { mockUsers } from './data';

const App: React.FC = () => {
  const { setCurrentUser, setLoading } = useAppStore();
  const { fetchReviews, fetchTeamMembers } = useReviewsStore();
  const { setSearchQuery } = useSearchStore();
  
  // Get state using selectors
  const currentUser = useCurrentUser();
  const isLoading = useIsLoading();
  const reviews = useReviews();
  const searchQuery = useSearchQuery();
  
  useEffect(() => {
    // Initialize app with mock data
    setCurrentUser(mockUsers[0]); // Set first user as current user
    
    // Fetch initial data
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        fetchReviews(),
        fetchTeamMembers(),
      ]);
      setLoading(false);
    };
    
    initializeData();
  }, [setCurrentUser, setLoading, fetchReviews, fetchTeamMembers]);

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#3B82F6', marginBottom: '0.5rem' }}>
          🧠 Zustand Store Integration Test
        </h1>
        <p style={{ color: '#6B7280' }}>
          Testing the implementation of app state, search, and reviews stores
        </p>
      </header>

      {isLoading && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#EFF6FF', 
          borderRadius: '8px',
          marginBottom: '1rem',
          color: '#3B82F6'
        }}>
          ⏳ Loading data...
        </div>
      )}

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Current User (App Store)</h2>
        {currentUser ? (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#F0FDF4', 
            borderRadius: '8px' 
          }}>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
          </div>
        ) : (
          <p>No user logged in</p>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Search Store</h2>
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #D1D5DB',
            borderRadius: '4px',
            width: '100%',
            marginBottom: '0.5rem'
          }}
        />
        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
          Current search: "{searchQuery}"
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Reviews Store</h2>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Total reviews:</strong> {reviews.length}
        </p>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {reviews.slice(0, 3).map((review) => (
            <div 
              key={review.id} 
              style={{
                padding: '1rem',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                backgroundColor: '#FAFAFA'
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
                {review.title}
              </h3>
              <p style={{ 
                color: '#6B7280', 
                margin: '0 0 0.5rem 0',
                fontSize: '0.875rem'
              }}>
                Author: {review.author.name} | Status: {review.status}
                {review.rating && ` | Rating: ${review.rating}/5`}
              </p>
              <p style={{ 
                color: '#374151', 
                fontSize: '0.875rem',
                margin: 0
              }}>
                {review.content.slice(0, 150)}
                {review.content.length > 150 && '...'}
              </p>
            </div>
          ))}
        </div>
        {reviews.length > 3 && (
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '1rem' }}>
            ... and {reviews.length - 3} more reviews
          </p>
        )}
      </section>

      <footer style={{ 
        marginTop: '3rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid #E5E7EB',
        color: '#6B7280',
        fontSize: '0.875rem'
      }}>
        ✅ All Zustand stores are working correctly!<br/>
        • App store: Managing user state and global app state<br/>
        • Search store: Handling search queries and filters<br/>
        • Reviews store: Managing reviews, tasks, and team data with mock data
      </footer>
    </div>
  );
};

export default App;