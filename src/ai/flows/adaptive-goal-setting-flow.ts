'use server';
/**
 * @fileOverview An AI agent for adaptive goal setting and adjustment.
 *
 * - setAdaptiveGoals - A function that suggests goal adjustments.
 * - AdaptiveGoalSettingInput - The input type for the function.
 * - AdaptiveGoalSettingOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GoalSchema = z.object({
  description: z.string().describe('A specific, measurable goal.'),
  status: z.enum(['Not Started', 'In Progress', 'Achieved', 'Struggling']).describe('The current status of the goal.'),
});

const AdaptiveGoalSettingInputSchema = z.object({
  currentGoals: z.array(GoalSchema).describe("The user's current fitness goals and their status."),
  recentPerformance: z.string().describe("A summary of the user's performance and feelings over the last 1-2 weeks (e.g., energy levels, workout consistency, challenges)."),
});
export type AdaptiveGoalSettingInput = z.infer<typeof AdaptiveGoalSettingInputSchema>;

const SuggestedAdjustmentSchema = z.object({
  originalGoal: z.string().describe('The original goal description.'),
  suggestion: z.string().describe('A specific suggestion for how to adjust this goal (e.g., "Increase weight by 5%", "Focus on form for 1 week", "Celebrate this win!").'),
  rationale: z.string().describe('The reason behind the suggested adjustment.'),
});

const NewGoalSuggestionSchema = z.object({
  goal: z.string().describe('A new goal suggestion.'),
  rationale: z.string().describe('The reason for suggesting this new goal.'),
});

const AdaptiveGoalSettingOutputSchema = z.object({
  summary: z.string().describe("A brief, encouraging summary of the user's progress and the suggested changes."),
  goalAdjustments: z.array(SuggestedAdjustmentSchema).describe('A list of adjustments for the user\'s current goals.'),
  newGoalSuggestions: z.array(NewGoalSuggestionSchema).describe('A list of new goals to consider for the future.'),
});
export type AdaptiveGoalSettingOutput = z.infer<typeof AdaptiveGoalSettingOutputSchema>;

export async function setAdaptiveGoals(input: AdaptiveGoalSettingInput): Promise<AdaptiveGoalSettingOutput> {
  return adaptiveGoalSettingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveGoalSettingPrompt',
  input: {schema: AdaptiveGoalSettingInputSchema},
  output: {schema: AdaptiveGoalSettingOutputSchema},
  prompt: `You are an expert, empathetic, and motivational fitness coach. A client has provided their current goals and a summary of their recent performance. Your task is to provide adaptive feedback and suggest goal adjustments.

  Client's Current Goals:
  {{#each currentGoals}}
  - Goal: {{{description}}} (Status: {{{status}}})
  {{/each}}

  Client's Recent Performance Summary:
  {{{recentPerformance}}}

  Instructions:
  1.  **Analyze the Situation:** Review the goals, their statuses, and the performance summary. Identify successes, challenges, and areas for improvement.
  2.  **Write an Encouraging Summary:** Start with a brief, positive summary that acknowledges their effort and progress.
  3.  **Generate Goal Adjustments:** For each of the user's current goals, provide a specific, actionable adjustment.
      - If a goal is 'Achieved', suggest a way to build on it or a new related goal.
      - If a goal is 'Struggling', suggest how to make it more manageable (e.g., break it down, reduce intensity, focus on a different aspect).
      - If a goal is 'In Progress', provide encouragement and a small tweak to keep momentum.
      - Provide a clear rationale for each adjustment.
  4.  **Suggest New Goals:** Based on their overall progress and performance, suggest 1-2 new goals they might consider adding. These should be logical next steps. Provide a rationale for each new suggestion.
  5.  **Maintain a Motivational Tone:** Your language should be supportive, positive, and focused on sustainable progress, not perfection.
  6.  **Format the entire response according to the provided JSON schema.**
  `,
});

const adaptiveGoalSettingFlow = ai.defineFlow(
  {
    name: 'adaptiveGoalSettingFlow',
    inputSchema: AdaptiveGoalSettingInputSchema,
    outputSchema: AdaptiveGoalSettingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
