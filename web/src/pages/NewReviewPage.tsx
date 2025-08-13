import type React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { pageVariants, pageTransition } from '@/utils/animations';

const Container = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
  }
`;

const FormCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-neutral-200);
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  color: var(--color-neutral-600);
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--color-neutral-700);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid var(--color-neutral-200);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-neutral-400);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid var(--color-neutral-200);
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-neutral-400);
  }
`;

const RatingGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const RatingButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const RatingButton = styled.button<{ $isSelected: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.$isSelected ? 'var(--color-primary)' : 'var(--color-neutral-200)'};
  background-color: ${props => props.$isSelected ? 'var(--color-primary)' : 'white'};
  color: ${props => props.$isSelected ? 'white' : 'var(--color-neutral-700)'};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-neutral-200);
`;

const CancelButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-neutral-300);
  background-color: white;
  color: var(--color-neutral-700);
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;

  &:hover {
    border-color: var(--color-neutral-400);
    transform: translateY(-1px);
  }
`;

const SubmitButton = styled.button<{ $isLoading?: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$isLoading ? 'var(--color-primary)' : '#2563eb'};
    transform: ${props => props.$isLoading ? 'none' : 'translateY(-1px)'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CharCount = styled.span`
  font-size: 0.8rem;
  color: var(--color-neutral-500);
  text-align: right;
  margin-top: 0.25rem;
`;

const NewReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 0,
    author: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author || formData.rating === 0) {
      alert('すべての項目を入力してください。');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would submit to an API here
    console.log('Submitting review:', formData);
    
    alert('レビューが投稿されました！');
    navigate('/reviews');
  };

  const isFormValid = formData.title && formData.content && formData.author && formData.rating > 0;

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <BackLink to="/reviews">
        ← レビュー一覧に戻る
      </BackLink>

      <FormCard>
        <FormHeader>
          <FormTitle>新しいレビューを投稿</FormTitle>
          <FormSubtitle>あなたの体験をシェアしてください</FormSubtitle>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">タイトル *</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="レビューのタイトルを入力してください"
              maxLength={100}
              required
            />
            <CharCount>{formData.title.length}/100</CharCount>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="author">お名前 *</Label>
            <Input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="お名前を入力してください"
              maxLength={50}
              required
            />
            <CharCount>{formData.author.length}/50</CharCount>
          </FormGroup>

          <RatingGroup>
            <Label>評価 *</Label>
            <RatingButtons>
              {[1, 2, 3, 4, 5].map((rating) => (
                <RatingButton
                  key={rating}
                  type="button"
                  $isSelected={formData.rating === rating}
                  onClick={() => handleRatingChange(rating)}
                >
                  {rating}★
                </RatingButton>
              ))}
            </RatingButtons>
          </RatingGroup>

          <FormGroup>
            <Label htmlFor="content">レビュー内容 *</Label>
            <TextArea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="詳細なレビューを入力してください..."
              maxLength={1000}
              required
            />
            <CharCount>{formData.content.length}/1000</CharCount>
          </FormGroup>

          <FormActions>
            <CancelButton to="/reviews">
              キャンセル
            </CancelButton>
            <SubmitButton 
              type="submit" 
              $isLoading={isSubmitting}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? '投稿中...' : 'レビューを投稿'}
            </SubmitButton>
          </FormActions>
        </Form>
      </FormCard>
    </Container>
  );
};

export default NewReviewPage;