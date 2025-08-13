import { z } from "zod";

export const reviewFormSchema = z.object({
  companyName: z
    .string()
    .min(1, "企業名は必須です")
    .max(100, "企業名は100文字以内で入力してください"),
    
  internshipName: z
    .string()
    .min(1, "インターン名は必須です")
    .max(100, "インターン名は100文字以内で入力してください"),
    
  duration: z
    .string()
    .min(1, "期間は必須です")
    .max(50, "期間は50文字以内で入力してください"),
    
  rating: z
    .number()
    .min(1, "評価は1以上5以下で選択してください")
    .max(5, "評価は1以上5以下で選択してください"),
    
  goodPoints: z
    .string()
    .min(1, "良かった点は必須です")
    .max(1000, "良かった点は1000文字以内で入力してください"),
    
  concerns: z
    .string()
    .min(1, "気になった点は必須です")
    .max(1000, "気になった点は1000文字以内で入力してください"),
    
  tags: z
    .string()
    .max(200, "タグは200文字以内で入力してください"),
    
  recommended: z.boolean(),
});

export type ReviewFormSchema = z.infer<typeof reviewFormSchema>;