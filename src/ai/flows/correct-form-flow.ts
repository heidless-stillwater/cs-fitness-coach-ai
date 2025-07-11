'use server';
/**
 * @fileOverview An AI agent for real-time exercise form correction.
 *
 * - correctUserForm - A function that analyzes user's exercise form from an image.
 * - CorrectFormInput - The input type for the correctUserForm function.
 * - CorrectFormOutput - The return type for the correctUserForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CorrectFormInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A single frame from a video of a user performing an exercise, as a data URI. It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  exercise: z.string().describe('The name of the exercise the user is performing, e.g., "Squat", "Push-up".'),
});
export type CorrectFormInput = z.infer<typeof CorrectFormInputSchema>;

const CorrectFormOutputSchema = z.object({
  isFormCorrect: z.boolean().describe('A simple boolean indicating if the user\'s form is generally correct.'),
  feedback: z.string().describe("Specific, actionable feedback to help the user improve their form. If the form is correct, this can be a short, encouraging message."),
});
export type CorrectFormOutput = z.infer<typeof CorrectFormOutputSchema>;

export async function correctUserForm(input: CorrectFormInput): Promise<CorrectFormOutput> {
  return correctUserFormFlow(input);
}

const prompt = ai.definePrompt({
  name: 'correctFormPrompt',
  input: {schema: CorrectFormInputSchema},
  output: {schema: CorrectFormOutputSchema},
  prompt: `You are an expert personal trainer and biomechanics specialist. Your task is to analyze a single frame of a user performing an exercise and provide immediate, concise, and actionable feedback.

  Exercise being performed: {{{exercise}}}
  User's form (image): {{media url=imageDataUri}}

  Analyze the user's posture, alignment, and technique based on the image provided for the specified exercise.
  
  1.  Determine if the form is correct. Set the 'isFormCorrect' flag accordingly.
  2.  Provide specific feedback.
      - If the form is incorrect, point out the primary mistake and give a clear, simple instruction on how to fix it. For example, instead of "Your lumbar spine is hyper-extended," say "Keep your back straight and engage your core."
      - If the form is correct, provide a short, encouraging message like "Great form! Keep it up." or "Perfect squat depth."
  
  Your feedback should be motivating and easy to understand for a beginner. Focus on the most critical aspect of the form in the given frame.`,
});

const correctUserFormFlow = ai.defineFlow(
  {
    name: 'correctUserFormFlow',
    inputSchema: CorrectFormInputSchema,
    outputSchema: CorrectFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
