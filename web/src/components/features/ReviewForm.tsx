import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { reviewFormSchema, ReviewFormSchema } from "../../utils/validationSchema";
import { useReviewStore } from "../../store/reviewStore";

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`;

const RequiredMark = styled.span`
  color: #ef4444;
  margin-left: 4px;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ef4444" : "#3b82f6")};
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ef4444" : "#3b82f6")};
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RatingButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const RatingButton = styled.button<{ $selected: boolean; $hasError?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 2px solid ${(props) => 
    props.$hasError ? "#ef4444" : 
    props.$selected ? "#3b82f6" : "#d1d5db"
  };
  border-radius: 8px;
  background: ${(props) => (props.$selected ? "#3b82f6" : "white")};
  color: ${(props) => (props.$selected ? "white" : "#6b7280")};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 18px;
  font-weight: 600;
  
  &:hover {
    border-color: #3b82f6;
    background: ${(props) => (props.$selected ? "#3b82f6" : "#f3f4f6")};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #3b82f6;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #374151;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
`;

const SubmitButton = styled(motion.button)<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  background: ${(props) => (props.$disabled ? "#9ca3af" : "#3b82f6")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${(props) => (props.$disabled ? "#9ca3af" : "#2563eb")};
  }
`;

const ReviewForm: React.FC = () => {
  const addReview = useReviewStore((state) => state.addReview);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      companyName: "",
      internshipName: "",
      duration: "",
      rating: 0,
      goodPoints: "",
      concerns: "",
      tags: "",
      recommended: false,
    },
  });
  
  const rating = watch("rating");
  
  const onSubmit = async (data: ReviewFormSchema) => {
    try {
      addReview(data);
      reset();
      // In a real app, you might show a success message or redirect
      alert("レビューが投稿されました！");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  
  const handleRatingClick = (value: number) => {
    setValue("rating", value, { shouldValidate: true });
  };
  
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Title>インターンレビュー投稿</Title>
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>
            企業名<RequiredMark>*</RequiredMark>
          </Label>
          <Input
            {...register("companyName")}
            placeholder="例: 株式会社テックトレイン"
            $hasError={!!errors.companyName}
          />
          {errors.companyName && (
            <ErrorMessage>{errors.companyName.message}</ErrorMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>
            インターン名<RequiredMark>*</RequiredMark>
          </Label>
          <Input
            {...register("internshipName")}
            placeholder="例: エンジニアインターンシップ"
            $hasError={!!errors.internshipName}
          />
          {errors.internshipName && (
            <ErrorMessage>{errors.internshipName.message}</ErrorMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>
            期間<RequiredMark>*</RequiredMark>
          </Label>
          <Input
            {...register("duration")}
            placeholder="例: 3ヶ月間"
            $hasError={!!errors.duration}
          />
          {errors.duration && (
            <ErrorMessage>{errors.duration.message}</ErrorMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>
            総合評価<RequiredMark>*</RequiredMark>
          </Label>
          <RatingContainer>
            <RatingButtons>
              {[1, 2, 3, 4, 5].map((value) => (
                <RatingButton
                  key={value}
                  type="button"
                  $selected={rating === value}
                  $hasError={!!errors.rating}
                  onClick={() => handleRatingClick(value)}
                >
                  {value}
                </RatingButton>
              ))}
            </RatingButtons>
            <Star size={20} color="#fbbf24" fill={rating > 0 ? "#fbbf24" : "none"} />
          </RatingContainer>
          {errors.rating && (
            <ErrorMessage>{errors.rating.message}</ErrorMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>
            良かった点<RequiredMark>*</RequiredMark>
          </Label>
          <TextArea
            {...register("goodPoints")}
            placeholder="インターンで良かった点や学べたことを詳しく教えてください..."
            $hasError={!!errors.goodPoints}
          />
          {errors.goodPoints && (
            <ErrorMessage>{errors.goodPoints.message}</ErrorMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>
            気になった点<RequiredMark>*</RequiredMark>
          </Label>
          <TextArea
            {...register("concerns")}
            placeholder="改善してほしい点や気になった点があれば教えてください..."
            $hasError={!!errors.concerns}
          />
          {errors.concerns && (
            <ErrorMessage>{errors.concerns.message}</ErrorMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>タグ（カンマ区切り）</Label>
          <Input
            {...register("tags")}
            placeholder="例: エンジニア, 成長, チーム開発"
            $hasError={!!errors.tags}
          />
          {errors.tags && (
            <ErrorMessage>{errors.tags.message}</ErrorMessage>
          )}
        </FormGroup>
        
        <CheckboxContainer>
          <Checkbox
            {...register("recommended")}
            type="checkbox"
            id="recommended"
          />
          <CheckboxLabel htmlFor="recommended">
            このインターンを他の人におすすめしますか？
          </CheckboxLabel>
        </CheckboxContainer>
        
        <SubmitButton
          type="submit"
          $disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          <Send size={20} />
          {isSubmitting ? "投稿中..." : "レビューを投稿"}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default ReviewForm;