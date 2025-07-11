
'use server';
/**
 * @fileOverview An AI agent for generating dynamic nutrition guidance.
 *
 * - generateNutritionPlan - A function that generates a meal plan.
 * - GenerateNutritionPlanInput - The input type for the function.
 * - GenerateNutritionPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MealSchema = z.object({
  name: z.string().describe('The name of the meal (e.g., "Scrambled Eggs with Spinach").'),
  description: z.string().describe('A brief description of the meal and its ingredients.'),
  calories: z.number().describe('Estimated calories for the meal.'),
  protein: z.number().describe('Grams of protein.'),
  carbs: z.number().describe('Grams of carbohydrates.'),
  fat: z.number().describe('Grams of fat.'),
});

const DailyPlanSchema = z.object({
  day: z.string().describe('The day of the week (e.g., "Monday").'),
  breakfast: MealSchema,
  lunch: MealSchema,
  dinner: MealSchema,
  snacks: z.array(MealSchema).describe('A list of snack options for the day.'),
  dailyTotals: z.object({
    calories: z.number().describe('Total estimated calories for the day.'),
    protein: z.number().describe('Total grams of protein for the day.'),
    carbs: z.number().describe('Total grams of carbohydrates for the day.'),
    fat: z.number().describe('Total grams of fat for the day.'),
  }),
});

const GenerateNutritionPlanInputSchema = z.object({
  age: z.string().describe('The age of the user.'),
  weight: z.string().describe('The weight of the user (including units, e.g., 180 lbs or 80 kg).'),
  height: z.string().describe('The height of the user (including units, e.g., 6\'0" or 183 cm).'),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']),
  fitnessGoals: z.string().describe('The primary fitness goals, e.g., "weight loss", "muscle gain", "maintenance".'),
  activityLevel: z.enum(['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']),
  dietaryRestrictions: z.string().describe('Any dietary restrictions or preferences, e.g., "vegetarian", "gluten-free", "no red meat".'),
});
export type GenerateNutritionPlanInput = z.infer<typeof GenerateNutritionPlanInputSchema>;

const GenerateNutritionPlanOutputSchema = z.object({
  title: z.string().describe('A catchy title for the nutrition plan.'),
  summary: z.string().describe('A brief summary of the plan, including estimated daily calorie and macro targets.'),
  weeklyPlan: z.array(DailyPlanSchema).describe('A 7-day meal plan.'),
});
export type GenerateNutritionPlanOutput = z.infer<typeof GenerateNutritionPlanOutputSchema>;

export async function generateNutritionPlan(input: GenerateNutritionPlanInput): Promise<GenerateNutritionPlanOutput> {
  return generateNutritionPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNutritionPlanPrompt',
  input: {schema: GenerateNutritionPlanInputSchema},
  output: {schema: GenerateNutritionPlanOutputSchema},
  prompt: `You are an expert nutritionist and dietician. A user has provided their personal details, fitness goals, and dietary preferences. Your task is to create a comprehensive, healthy, and balanced 7-day meal plan.

  User Profile:
  - Age: {{{age}}}
  - Gender: {{{gender}}}
  - Weight: {{{weight}}}
  - Height: {{{height}}}
  - Activity Level: {{{activityLevel}}}
  - Fitness Goals: {{{fitnessGoals}}}
  - Dietary Restrictions/Preferences: {{{dietaryRestrictions}}}

  Instructions:
  1.  First, estimate the user's daily caloric needs and macronutrient split (protein, carbs, fat) based on their profile and goals.
  2.  Create a title and a brief summary for the plan. The summary should state the recommended daily calorie and macro targets.
  3.  Design a full 7-day meal plan (Monday to Sunday).
  4.  For each day, provide specific meal suggestions for breakfast, lunch, and dinner, plus at least one snack option.
  5.  For each meal and snack, provide a name, a simple description, and an estimation of calories, protein, carbs, and fat.
  6.  For each day, calculate and provide the total estimated calories and macros.
  7.  Ensure all meals align with the user's dietary restrictions. The plan should be varied, realistic, and easy to follow.
  8.  Format the entire response according to the provided JSON schema.
  `,
});

const generateNutritionPlanFlow = ai.defineFlow(
  {
    name: 'generateNutritionPlanFlow',
    inputSchema: GenerateNutritionPlanInputSchema,
    outputSchema: GenerateNutritionPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
