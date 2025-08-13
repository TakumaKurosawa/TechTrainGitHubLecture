import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Star, Save } from 'lucide-react';

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9fafb;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4b5563;
  }
`;

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6;
  color: #374151;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const NewReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 0,
    content: ''
  });

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで実際の投稿処理を行う
    console.log('Review submitted:', formData);
    
    // デモ用: レビュー一覧に戻る
    alert('レビューが投稿されました！');
    navigate('/reviews');
  };

  const isFormValid = formData.title && formData.author && formData.rating > 0 && formData.content;

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <BackButton to="/reviews">← レビュー一覧に戻る</BackButton>
      
      <FormCard>
        <Title>新規レビュー投稿</Title>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">タイトル</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="レビューのタイトルを入力してください"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="author">投稿者名</Label>
            <Input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="お名前を入力してください"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>評価</Label>
            <RatingContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarButton
                  key={star}
                  type="button"
                  $active={star <= formData.rating}
                  onClick={() => handleRatingClick(star)}
                >
                  <Star
                    size={24}
                    fill={star <= formData.rating ? "#fbbf24" : "none"}
                    color={star <= formData.rating ? "#fbbf24" : "#d1d5db"}
                  />
                </StarButton>
              ))}
              <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
                {formData.rating > 0 ? `${formData.rating} / 5` : '評価を選択してください'}
              </span>
            </RatingContainer>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="content">レビュー内容</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="詳細なレビューを記入してください..."
              required
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton to="/reviews">
              キャンセル
            </CancelButton>
            <SubmitButton type="submit" disabled={!isFormValid}>
              <Save size={18} />
              投稿する
            </SubmitButton>
          </ButtonGroup>
        </form>
      </FormCard>
    </Container>
  );
};

export default NewReviewPage;