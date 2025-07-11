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

const ExerciseSchema = z.object({
  name: z.string().describe('The name of the exercise.'),
  sets: z.string().describe('The number of sets to perform.'),
  reps: z.string().describe('The number of repetitions per set.'),
  rest: z.string().describe('The rest period between sets.'),
});

const DailyWorkoutSchema = z.object({
  day: z.string().describe('The day of the week for the workout (e.g., Monday, Tuesday).'),
  focus: z.string().describe('The focus of the workout (e.g., Upper Body, Lower Body, Cardio).'),
  exercises: z.array(ExerciseSchema).describe('A list of exercises for the day.'),
});

const SuggestWorkoutPlanOutputSchema = z.object({
  title: z.string().describe('A catchy title for the workout plan.'),
  summary: z.string().describe('A brief summary of the workout plan.'),
  weeklySchedule: z.array(DailyWorkoutSchema).describe('The weekly workout schedule.'),
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

  Based on this information, create a detailed, personalized, week-long workout plan.

  User Profile:
  - Fitness Goals: {{{fitnessGoals}}}
  - Experience Level: {{{experienceLevel}}}
  - Available Time: {{{availableTime}}}
  - Equipment Access: {{{equipmentAccess}}}

  Your task is to generate a structured workout plan. The plan should include a title, a summary, and a day-by-day breakdown of exercises.
  For each workout day, specify the focus (e.g., Upper Body, Full Body, Cardio & Core) and list the exercises with sets, reps, and rest periods.
  The number of workout days should be realistic based on the user's available time.
  The exercises should be appropriate for the user's experience level and available equipment.
  Ensure the response is formatted according to the provided JSON schema.
  `,
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
