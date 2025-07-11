'use server';
/**
 * @fileOverview An AI agent for generating fitness-related content.
 *
 * - generateContent - A function that generates content based on user specifications.
 * - GenerateContentInput - The input type for the generateContent function.
 * - GenerateContentOutput - The return type for the generateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentInputSchema = z.object({
  topic: z
    .string()
    .describe('The primary topic for the content, e.g., "Benefits of HIIT workouts".'),
  contentType: z
    .enum(['Blog Post', 'Social Media Caption', 'Email Newsletter'])
    .describe('The desired format for the content.'),
  targetAudience: z
    .string()
    .describe('The intended audience, e.g., "Beginners", "Busy Professionals", "Advanced Athletes".'),
});
export type GenerateContentInput = z.infer<typeof GenerateContentInputSchema>;

const GenerateContentOutputSchema = z.object({
  title: z.string().describe('A catchy and relevant title for the generated content.'),
  content: z.string().describe('The full generated content, formatted appropriately for the content type.'),
});
export type GenerateContentOutput = z.infer<typeof GenerateContentOutputSchema>;

export async function generateContent(input: GenerateContentInput): Promise<GenerateContentOutput> {
  return generateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentPrompt',
  input: {schema: GenerateContentInputSchema},
  output: {schema: GenerateContentOutputSchema},
  prompt: `You are a fitness marketing expert and content creator for a personal trainer. Your task is to generate engaging and informative content based on the provided specifications.

  Content Specifications:
  - Topic: {{{topic}}}
  - Content Type: {{{contentType}}}
  - Target Audience: {{{targetAudience}}}

  Instructions:
  1.  Generate a suitable title for the content.
  2.  Write the content body.
      - If 'Blog Post', write a well-structured article with an introduction, main points, and a conclusion. Use headings and paragraphs.
      - If 'Social Media Caption', write a concise, engaging caption. Use emojis and relevant hashtags.
      - If 'Email Newsletter', write a friendly and informative email with a clear call-to-action.
  3.  Tailor the tone, language, and complexity to the specified target audience.
  4.  Ensure the content is accurate, safe, and motivating.
  5.  Format the response according to the JSON schema. The 'content' field should be a single string containing the full text, with markdown for formatting (e.g., \\n for new lines, ## for headings).`,
});

const generateContentFlow = ai.defineFlow(
  {
    name: 'generateContentFlow',
    inputSchema: GenerateContentInputSchema,
    outputSchema: GenerateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
