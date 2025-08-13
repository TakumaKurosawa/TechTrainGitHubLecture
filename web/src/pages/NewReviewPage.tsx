import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Send } from "lucide-react";
import { FormData } from "../types";
import { pageVariants, pageTransition } from "../utils/animations";

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const FormContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const FormDescription = styled.p`
  color: #6b7280;
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
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ef4444" : "#3b82f6")};
    box-shadow: 0 0 0 3px ${(props) => 
      props.$hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ef4444" : "#3b82f6")};
    box-shadow: 0 0 0 3px ${(props) => 
      props.$hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const RatingGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarButton = styled.button<{ $filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  transition: transform 0.2s ease;
  color: ${(props) => (props.$filled ? "#f59e0b" : "#d1d5db")};

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const RatingText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-left: 0.5rem;
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled(motion.button)<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${(props) => 
    props.$disabled ? "#9ca3af" : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

const schema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .min(5, "タイトルは5文字以上で入力してください")
    .max(100, "タイトルは100文字以内で入力してください"),
  content: z
    .string()
    .min(1, "内容は必須です")
    .min(10, "内容は10文字以上で入力してください")
    .max(1000, "内容は1000文字以内で入力してください"),
  rating: z
    .number()
    .min(1, "評価を選択してください")
    .max(5, "評価は5以下で入力してください"),
});

const NewReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      rating: 0,
    },
  });

  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue("rating", value);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here
      console.log("Submitting review:", data);
      
      // Navigate to reviews list after successful submission
      navigate("/reviews");
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "とても不満";
      case 2:
        return "不満";
      case 3:
        return "普通";
      case 4:
        return "満足";
      case 5:
        return "とても満足";
      default:
        return "評価を選択してください";
    }
  };

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <BackButton to="/reviews">
        <ArrowLeft size={20} />
        レビュー一覧に戻る
      </BackButton>

      <FormContainer>
        <FormHeader>
          <FormTitle>新しいレビューを投稿</FormTitle>
          <FormDescription>
            あなたの体験を他の人と共有しましょう
          </FormDescription>
        </FormHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="title">タイトル*</Label>
            <Input
              id="title"
              type="text"
              placeholder="レビューのタイトルを入力してください"
              $hasError={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </FormGroup>

          <RatingGroup>
            <Label>評価*</Label>
            <RatingContainer>
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1;
                const filled = value <= (hoveredRating || rating);
                
                return (
                  <StarButton
                    key={value}
                    type="button"
                    $filled={filled}
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    aria-label={`${value}つ星`}
                  >
                    <Star size={24} fill={filled ? "currentColor" : "none"} />
                  </StarButton>
                );
              })}
              <RatingText>{getRatingText(hoveredRating || rating)}</RatingText>
            </RatingContainer>
            {errors.rating && (
              <ErrorMessage>{errors.rating.message}</ErrorMessage>
            )}
          </RatingGroup>

          <FormGroup>
            <Label htmlFor="content">レビュー内容*</Label>
            <TextArea
              id="content"
              placeholder="あなたの体験や感想を詳しく教えてください"
              $hasError={!!errors.content}
              {...register("content")}
            />
            {errors.content && (
              <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton
            type="submit"
            $disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            <Send size={20} />
            {isSubmitting ? "投稿中..." : "レビューを投稿"}
          </SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default NewReviewPage;