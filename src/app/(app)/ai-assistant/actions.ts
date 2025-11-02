"use server";

import {
  getCodeSuggestions,
  type CodeSuggestionOutput,
} from "@/ai/flows/ai-code-assistant";
import { z } from "zod";

const formSchema = z.object({
  currentCode: z.string().min(1, "کد نمی‌تواند خالی باشد."),
  programmingLanguage: z.string(),
  userQuery: z.string().optional(),
});

export type FormState = {
  result: CodeSuggestionOutput | null;
  error: string | null;
};

export async function getCodeSuggestionsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    currentCode: formData.get("currentCode"),
    programmingLanguage: formData.get("programmingLanguage"),
    userQuery: formData.get("userQuery"),
  });

  if (!validatedFields.success) {
    return {
      result: null,
      error: validatedFields.error.flatten().fieldErrors.currentCode?.[0] || 'ورودی نامعتبر.'
    };
  }

  try {
    const result = await getCodeSuggestions(validatedFields.data);
    return { result, error: null };
  } catch (error) {
    console.error(error);
    return {
      result: null,
      error: "یک خطای غیرمنتظره رخ داد. لطفا دوباره تلاش کنید.",
    };
  }
}
