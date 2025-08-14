import { motion } from 'framer-motion';
import { Bell, Plus, Search, Users } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, Card } from '../components';
import { 
  useAppStore, 
  useReviewsStore, 
  useSearchStore,
  selectCurrentUser,
  selectUnreadNotifications,
  selectPublishedReviews,
  selectActiveTeamMembers
} from '../store';

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background: #F9FAFB;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StoreCard = styled(Card)`
  padding: 1.5rem;
`;

const StoreTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StoreContent = styled.div`
  color: #6B7280;
  line-height: 1.6;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0;
`;

const StatLabel = styled.span`
  font-weight: 500;
`;

const StatValue = styled.span`
  color: #3B82F6;
  font-weight: 600;
`;

const ActionButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const NotificationItem = styled.div`
  background: #FFFFFF;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid #3B82F6;
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const StoresDemoPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // App Store
  const currentUser = useAppStore(selectCurrentUser);
  const unreadNotifications = useAppStore(selectUnreadNotifications);
  const { addNotification, setLoading, isLoading, toggleSidebar, ui } = useAppStore();

  // Reviews Store  
  const reviews = useReviewsStore(selectPublishedReviews);
  const teamMembers = useReviewsStore(selectActiveTeamMembers);
  const { addReview, addTask } = useReviewsStore();

  // Search Store
  const { setQuery, query, filters, searchHistory, saveCurrentSearch } = useSearchStore();

  const handleAddNotification = () => {
    addNotification({
      type: 'success',
      title: 'テスト通知',
      message: `新しい通知が追加されました - ${new Date().toLocaleTimeString()}`,
      read: false,
    });
  };

  const handleAddReview = () => {
    addReview({
      title: `新しいレビュー ${reviews.length + 1}`,
      description: 'デモ用に作成されたレビューです。Zustand ストアが正常に動作しているかをテストします。',
      author: currentUser?.name || 'Unknown User',
      authorId: currentUser?.id || 'unknown',
      rating: Math.floor(Math.random() * 5) + 1,
      comments: 0,
      tags: ['Demo', 'Test'],
      status: 'published',
      category: 'Development',
    });
  };

  const handleAddTask = () => {
    addTask({
      title: `新しいタスク ${Math.random().toString(36).substring(2, 7)}`,
      description: 'Zustand ストアのテスト用タスクです。',
      assigneeId: currentUser?.id || 'unknown',
      assigneeName: currentUser?.name || 'Unknown User',
      priority: 'medium',
      status: 'todo',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ['Demo'],
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setQuery(value);
  };

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Title>🧠 Zustand ストア デモ</Title>
      
      <Grid>
        {/* App Store Demo */}
        <StoreCard>
          <StoreTitle>
            <Users size={20} />
            App Store
          </StoreTitle>
          <StoreContent>
            <StatItem>
              <StatLabel>現在のユーザー:</StatLabel>
              <StatValue>{currentUser?.name || 'なし'}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>ユーザー役割:</StatLabel>
              <StatValue>{currentUser?.role || 'なし'}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>未読通知:</StatLabel>
              <StatValue>{unreadNotifications.length}件</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>ローディング状態:</StatLabel>
              <StatValue>{isLoading ? '読み込み中' : '待機中'}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>サイドバー:</StatLabel>
              <StatValue>{ui.sidebarOpen ? '開いている' : '閉じている'}</StatValue>
            </StatItem>
            
            <ActionButton onClick={handleAddNotification}>
              <Bell size={16} style={{ marginRight: '0.5rem' }} />
              通知を追加
            </ActionButton>
            
            <ActionButton 
              onClick={() => setLoading(!isLoading)}
              variant="secondary"
            >
              ローディング切替
            </ActionButton>

            <ActionButton 
              onClick={toggleSidebar}
              variant="secondary"
            >
              サイドバー切替
            </ActionButton>

            {unreadNotifications.slice(0, 2).map(notification => (
              <NotificationItem key={notification.id}>
                <strong>{notification.title}</strong>
                <br />
                <small>{notification.message}</small>
              </NotificationItem>
            ))}
          </StoreContent>
        </StoreCard>

        {/* Reviews Store Demo */}
        <StoreCard>
          <StoreTitle>
            <Plus size={20} />
            Reviews Store
          </StoreTitle>
          <StoreContent>
            <StatItem>
              <StatLabel>レビュー総数:</StatLabel>
              <StatValue>{reviews.length}件</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>チームメンバー:</StatLabel>
              <StatValue>{teamMembers.length}人</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>平均評価:</StatLabel>
              <StatValue>
                {reviews.length > 0 
                  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                  : '0.0'
                }
              </StatValue>
            </StatItem>
            
            <ActionButton onClick={handleAddReview}>
              <Plus size={16} style={{ marginRight: '0.5rem' }} />
              レビュー追加
            </ActionButton>
            
            <ActionButton onClick={handleAddTask} variant="secondary">
              <Plus size={16} style={{ marginRight: '0.5rem' }} />
              タスク追加
            </ActionButton>

            <div style={{ marginTop: '1rem' }}>
              <strong>最新レビュー:</strong>
              {reviews.slice(0, 3).map(review => (
                <div key={review.id} style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  • {review.title} ({review.rating}⭐)
                </div>
              ))}
            </div>
          </StoreContent>
        </StoreCard>

        {/* Search Store Demo */}
        <StoreCard>
          <StoreTitle>
            <Search size={20} />
            Search Store
          </StoreTitle>
          <StoreContent>
            <SearchInput
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="検索クエリを入力..."
            />
            
            <StatItem>
              <StatLabel>現在のクエリ:</StatLabel>
              <StatValue>{query || 'なし'}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>検索履歴:</StatLabel>
              <StatValue>{searchHistory.length}件</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>アクティブフィルター:</StatLabel>
              <StatValue>
                {(() => {
                  const hasActiveFilters = 
                    filters.category.length > 0 ||
                    filters.tags.length > 0 ||
                    filters.author.length > 0 ||
                    filters.status.length > 0 ||
                    filters.rating.min > 0 ||
                    filters.rating.max < 5 ||
                    filters.dateRange.start !== null ||
                    filters.dateRange.end !== null;
                  return hasActiveFilters ? 'あり' : 'なし';
                })()}
              </StatValue>
            </StatItem>
            
            <ActionButton 
              onClick={() => saveCurrentSearch(`検索_${Date.now()}`)}
              disabled={!query}
            >
              検索を保存
            </ActionButton>

            <div style={{ marginTop: '1rem' }}>
              <strong>検索履歴:</strong>
              {searchHistory.slice(0, 3).map((item, index) => (
                <div key={index} style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  • {item}
                </div>
              ))}
            </div>
          </StoreContent>
        </StoreCard>
      </Grid>
    </Container>
  );
};

export default StoresDemoPage;