// src/ai/flows/suggest-workout-plan.ts
'use server';

/**
 * @fileOverview Provides personalized workout plan suggestions based on user fitness goals.
 *
 * - suggestWorkoutPlan - A function that takes user fitness goals as input and returns a workout plan suggestion.
 * - SuggestWorkoutPlanInput - The input type for the suggestWorkoutPlan function.
 * - SuggestWorkoutPlanOutput - The return type for the suggestWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWorkoutPlanInputSchema = z.object({
  fitnessGoals: z
    .string()
    .describe('The fitness goals of the user, e.g., lose weight, build muscle, improve endurance.'),
  experienceLevel: z
    .string()
    .describe('The experience level of the user, e.g., beginner, intermediate, advanced.'),
  availableTime: z
    .string()
    .describe('The amount of time the user has available for workouts per week, e.g., 3-5 hours.'),
  equipmentAccess: z
    .string()
    .describe('The equipment the user has access to, e.g., gym, home gym, none.'),
});
export type SuggestWorkoutPlanInput = z.infer<typeof SuggestWorkoutPlanInputSchema>;

const SuggestWorkoutPlanOutputSchema = z.object({
  workoutPlan: z
    .string()
    .describe('A personalized workout plan suggestion based on the user input.'),
});
export type SuggestWorkoutPlanOutput = z.infer<typeof SuggestWorkoutPlanOutputSchema>;

export async function suggestWorkoutPlan(input: SuggestWorkoutPlanInput): Promise<SuggestWorkoutPlanOutput> {
  return suggestWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWorkoutPlanPrompt',
  input: {schema: SuggestWorkoutPlanInputSchema},
  output: {schema: SuggestWorkoutPlanOutputSchema},
  prompt: `You are an expert personal trainer. A user has provided their fitness goals, experience level, available time, and equipment access.

  Based on this information, suggest a personalized workout plan.

  Fitness Goals: {{{fitnessGoals}}}
  Experience Level: {{{experienceLevel}}}
  Available Time: {{{availableTime}}}
  Equipment Access: {{{equipmentAccess}}}

  Workout Plan Suggestion:`, // Keep it simple for now.
});

const suggestWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'suggestWorkoutPlanFlow',
    inputSchema: SuggestWorkoutPlanInputSchema,
    outputSchema: SuggestWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
