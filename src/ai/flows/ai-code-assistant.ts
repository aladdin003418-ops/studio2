// A Genkit flow for providing AI-powered code suggestions to improve code quality and efficiency.

'use server';

/**
 * @fileOverview Provides intelligent code suggestions using an LLM.
 *
 * - getCodeSuggestions - A function that retrieves code suggestions based on the current code context.
 * - CodeSuggestionInput - The input type for the getCodeSuggestions function.
 * - CodeSuggestionOutput - The return type for the getCodeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeSuggestionInputSchema = z.object({
  currentCode: z.string().describe('The current code the user is working on.'),
  programmingLanguage: z
    .string()
    .describe('The programming language of the current code.'),
  userQuery: z
    .string()
    .optional()
    .describe('An optional specific query or request from the user.'),
});
export type CodeSuggestionInput = z.infer<typeof CodeSuggestionInputSchema>;

const CodeSuggestionOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of code suggestions.'),
  explanation: z
    .string()
    .describe('An explanation of the suggestions and how they can improve the code.'),
});
export type CodeSuggestionOutput = z.infer<typeof CodeSuggestionOutputSchema>;

export async function getCodeSuggestions(
  input: CodeSuggestionInput
): Promise<CodeSuggestionOutput> {
  return aiCodeAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCodeAssistantPrompt',
  input: {schema: CodeSuggestionInputSchema},
  output: {schema: CodeSuggestionOutputSchema},
  prompt: `You are an AI code assistant that provides intelligent suggestions based on the current code and programming language to improve code quality and efficiency.

Current Code:
\`\`\`{{programmingLanguage}}
{{{currentCode}}}
\`\`\`

{{#if userQuery}}
User Query: {{userQuery}}
{{/if}}

Provide code suggestions and explain how they can improve the code.

Output suggestions as an array of strings, and provide an explanation of the suggestions.
`,
});

const aiCodeAssistantFlow = ai.defineFlow(
  {
    name: 'aiCodeAssistantFlow',
    inputSchema: CodeSuggestionInputSchema,
    outputSchema: CodeSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
