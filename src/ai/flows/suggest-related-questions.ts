
'use server';
/**
 * @fileOverview A flow to suggest related questions from a list.
 *
 * - suggestRelatedQuestions - A function that takes a question and returns related ones.
 * - SuggestRelatedQuestionsInput - The input type for the function.
 * - SuggestRelatedQuestionsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allQuestions, Question } from '@/lib/questions';

const allQuestionsTitles = allQuestions.map(q => q.question);

const SuggestRelatedQuestionsInputSchema = z.object({
  currentQuestion: z.string().describe('The title of the current question.'),
  currentAnswer: z.string().describe('The answer content for the current question.'),
  allQuestionsTitles: z.array(z.string()).describe('The list of all available question titles to choose from.'),
});
export type SuggestRelatedQuestionsInput = z.infer<typeof SuggestRelatedQuestionsInputSchema>;

const SuggestRelatedQuestionsOutputSchema = z.object({
  related: z.array(z.string()).describe('An array of 3 related question titles.'),
});
export type SuggestRelatedQuestionsOutput = z.infer<typeof SuggestRelatedQuestionsOutputSchema>;

export async function suggestRelatedQuestions(input: Omit<SuggestRelatedQuestionsInput, 'allQuestionsTitles'>): Promise<SuggestRelatedQuestionsOutput> {
  return suggestRelatedQuestionsFlow({
    ...input,
    allQuestionsTitles,
  });
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedQuestionsPrompt',
  input: { schema: SuggestRelatedQuestionsInputSchema },
  output: { schema: SuggestRelatedQuestionsOutputSchema },
  prompt: `You are an expert at finding related content.
Given the current question and its answer, find the 3 most relevantly related questions from the provided list of all available questions.

Do not suggest the current question itself.

Current Question:
"{{currentQuestion}}"

Current Answer:
"{{currentAnswer}}"

---

List of all available questions to choose from:
{{#each allQuestionsTitles}}
- "{{this}}"
{{/each}}
`,
  config: {
    model: 'googleai/gemini-1.5-flash-latest'
  },
});

const suggestRelatedQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedQuestionsFlow',
    inputSchema: SuggestRelatedQuestionsInputSchema,
    outputSchema: SuggestRelatedQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
