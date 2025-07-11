
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  GenerateNutritionPlanInput,
  GenerateNutritionPlanOutput,
  generateNutritionPlan,
} from "@/ai/flows/dynamic-nutrition-guidance-flow";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  age: z.string().min(1, "Age is required."),
  weight: z.string().min(1, "Weight is required."),
  height: z.string().min(1, "Height is required."),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']),
  fitnessGoals: z.string().min(10, "Please describe your goals in more detail."),
  activityLevel: z.enum(['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']),
  dietaryRestrictions: z.string().optional(),
});

export function NutritionGuidanceForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateNutritionPlanOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      weight: "",
      height: "",
      fitnessGoals: "",
      dietaryRestrictions: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const plan = await generateNutritionPlan(values as GenerateNutritionPlanInput);
      setResult(plan);
    } catch (e) {
      console.error(e);
      setError("Sorry, we couldn't generate a nutrition plan. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl><Input placeholder="e.g., 30" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl><Input placeholder="e.g., 180 lbs" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl><Input placeholder="e.g., 6'0&quot;" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fitnessGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your fitness goals?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Lose fat, build lean muscle, and improve cardiovascular health." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select activity level" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Sedentary">Sedentary (little to no exercise)</SelectItem>
                          <SelectItem value="Lightly Active">Lightly Active (light exercise/sports 1-3 days/week)</SelectItem>
                          <SelectItem value="Moderately Active">Moderately Active (moderate exercise/sports 3-5 days/week)</SelectItem>
                          <SelectItem value="Very Active">Very Active (hard exercise/sports 6-7 days a week)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dietary Restrictions or Preferences</FormLabel>
                      <FormControl><Input placeholder="e.g., Vegetarian, gluten-free, no nuts" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...</> : "Generate My Nutrition Plan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="mt-8 animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl md:text-3xl">
              <Sparkles className="text-primary h-6 w-6 md:h-8 md:w-8" />
              {result.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{result.summary}</p>
            
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {result.weeklyPlan.map((day, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {day.day}
                    <div className="text-sm font-normal text-muted-foreground ml-auto pr-4 text-right">
                       {day.dailyTotals.calories} kcal | P: {day.dailyTotals.protein}g C: {day.dailyTotals.carbs}g F: {day.dailyTotals.fat}g
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                        {[day.breakfast, day.lunch, day.dinner, ...day.snacks].map((meal, mealIndex) => (
                           <div key={mealIndex}>
                                <h4 className="font-semibold">{
                                   mealIndex === 0 ? "Breakfast" :
                                   mealIndex === 1 ? "Lunch" :
                                   mealIndex === 2 ? "Dinner" :
                                   `Snack ${mealIndex - 2}`
                                }: {meal.name}</h4>
                                <p className="text-sm text-muted-foreground">{meal.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                                </p>
                           </div>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
