import type React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from 'styled-components';
import { ArrowLeft, Save, Star } from 'lucide-react';
import { Button, Card } from '../components';

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background: ${(props) => props.theme.colors.background};
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  margin-bottom: 2rem;
`;

const BackButton = styled(Button)`
  margin-bottom: 1rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled(motion.p)`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.125rem;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text.primary};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:invalid {
    border-color: ${(props) => props.theme.colors.danger};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text.primary};
  transition: border-color 0.2s ease;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:invalid {
    border-color: ${(props) => props.theme.colors.danger};
  }
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const StarButton = styled.button<{ $filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: ${(props) => (props.$filled ? props.theme.colors.warning : props.theme.colors.border)};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.warning};
    transform: scale(1.1);
  }
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.danger};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const PreviewSection = styled(Card)`
  margin-top: 2rem;
  background: ${(props) => props.theme.colors.surface};
`;

const PreviewTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const PreviewContent = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// フォームバリデーションスキーマ
const reviewSchema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です')
    .min(5, 'タイトルは5文字以上で入力してください')
    .max(100, 'タイトルは100文字以内で入力してください'),
  description: z
    .string()
    .min(1, '説明は必須です')
    .min(20, '説明は20文字以上で入力してください')
    .max(2000, '説明は2000文字以内で入力してください'),
  rating: z
    .number()
    .min(1, '評価を選択してください')
    .max(5, '評価は1〜5の範囲で選択してください'),
  tags: z.string().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const NewReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: ReviewFormData) => {
    try {
      // 実際のアプリでは API にデータを送信
      console.log('レビューデータ:', data);
      
      // 送信中のシミュレーション
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // 成功後に一覧ページに遷移
      navigate('/reviews');
    } catch (error) {
      console.error('レビューの投稿に失敗しました:', error);
    }
  };

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    setValue('rating', newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (hoverRating || rating);
      stars.push(
        <StarButton
          key={i}
          type="button"
          $filled={filled}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star size={24} fill={filled ? 'currentColor' : 'none'} />
        </StarButton>
      );
    }
    return stars;
  };

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Header>
        <BackButton
          $variant="ghost"
          onClick={() => navigate('/reviews')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
          戻る
        </BackButton>

        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          新規レビュー投稿
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          あなたの知識や経験をチームに共有しましょう
        </Subtitle>
      </Header>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <FormGroup>
          <Label htmlFor="title">タイトル *</Label>
          <Input
            id="title"
            type="text"
            placeholder="レビューのタイトルを入力してください"
            {...register('title')}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">説明 *</Label>
          <TextArea
            id="description"
            placeholder="レビューの詳細な説明を入力してください。学んだこと、改善点、おすすめのポイントなどを含めてください。"
            {...register('description')}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </FormGroup>

        <RatingSection>
          <Label>評価 *</Label>
          <RatingStars>{renderStars()}</RatingStars>
          {errors.rating && <ErrorMessage>{errors.rating.message}</ErrorMessage>}
        </RatingSection>

        <FormGroup>
          <Label htmlFor="tags">タグ（オプション）</Label>
          <Input
            id="tags"
            type="text"
            placeholder="React, TypeScript, CSS など（カンマ区切り）"
            {...register('tags')}
          />
        </FormGroup>

        <FormActions>
          <Button
            type="button"
            $variant="ghost"
            onClick={() => navigate('/reviews')}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            $variant="primary"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save size={20} style={{ marginRight: '0.5rem' }} />
            {isSubmitting ? '投稿中...' : 'レビューを投稿'}
          </Button>
        </FormActions>
      </Form>

      {watchedValues.title && watchedValues.description && (
        <PreviewSection
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <PreviewTitle>プレビュー</PreviewTitle>
          <PreviewContent>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
              {watchedValues.title}
            </h4>
            <p style={{ whiteSpace: 'pre-wrap' }}>{watchedValues.description}</p>
            {rating > 0 && (
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>評価:</span>
                {Array.from({ length: rating }, (_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
                <span>{rating}/5</span>
              </div>
            )}
          </PreviewContent>
        </PreviewSection>
      )}
    </Container>
  );
};

export default NewReviewPage;