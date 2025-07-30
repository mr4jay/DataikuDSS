'use server';

/**
 * @fileOverview An AI agent for suggesting related questions or topics based on the content of the current page.
 *
 * - suggestRelatedQuestions - A function that suggests related questions or topics.
 * - SuggestRelatedQuestionsInput - The input type for the suggestRelatedQuestions function.
 * - SuggestRelatedQuestionsOutput - The return type for the suggestRelatedQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedQuestionsInputSchema = z.object({
  pageContent: z
    .string()
    .describe('The content of the current page to suggest related questions from.'),
});
export type SuggestRelatedQuestionsInput = z.infer<
  typeof SuggestRelatedQuestionsInputSchema
>;

const SuggestRelatedQuestionsOutputSchema = z.object({
  relatedQuestions: z
    .array(z.string())
    .describe('A list of related questions or topics.'),
});
export type SuggestRelatedQuestionsOutput = z.infer<
  typeof SuggestRelatedQuestionsOutputSchema
>;

export async function suggestRelatedQuestions(
  input: SuggestRelatedQuestionsInput
): Promise<SuggestRelatedQuestionsOutput> {
  return suggestRelatedQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedQuestionsPrompt',
  input: {schema: SuggestRelatedQuestionsInputSchema},
  output: {schema: SuggestRelatedQuestionsOutputSchema},
  prompt: `You are an AI assistant that suggests related questions or topics based on the content of the current page.

  Given the following page content, suggest a list of related questions or topics that the user might be interested in.

  Page Content:
  {{pageContent}}

  Please provide a list of related questions or topics.
  `,
});

const suggestRelatedQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedQuestionsFlow',
    inputSchema: SuggestRelatedQuestionsInputSchema,
    outputSchema: SuggestRelatedQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
