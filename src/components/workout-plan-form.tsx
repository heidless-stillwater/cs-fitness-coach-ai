"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  SuggestWorkoutPlanInput,
  SuggestWorkoutPlanOutput,
  suggestWorkoutPlan,
} from "@/ai/flows/suggest-workout-plan";
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
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const formSchema = z.object({
  fitnessGoals: z.string().min(10, "Please describe your goals in more detail."),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  availableTime: z.string().min(3, "Please specify your available time."),
  equipmentAccess: z.enum(["Full Gym", "Home Gym", "Bodyweight Only"]),
});

export function WorkoutPlanForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SuggestWorkoutPlanOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fitnessGoals: "",
      availableTime: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const plan = await suggestWorkoutPlan(values as SuggestWorkoutPlanInput);
      setResult(plan);
    } catch (e) {
      console.error(e);
      setError("Sorry, we couldn't generate a workout plan. Please try again later.");
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
              <FormField
                control={form.control}
                name="fitnessGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your fitness goals?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Lose 10 pounds, build muscle in my arms and chest, run a 5k."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="equipmentAccess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equipment Access</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your equipment access" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full Gym">Full Gym</SelectItem>
                          <SelectItem value="Home Gym">Home Gym (e.g., dumbbells, bands)</SelectItem>
                          <SelectItem value="Bodyweight Only">Bodyweight Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="availableTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much time can you commit per week?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3-4 hours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...</>
                ) : (
                  <>Generate My Plan</>
                )}
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
              {result.weeklySchedule.map((day, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {day.day}: <span className="text-primary ml-2">{day.focus}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Exercise</TableHead>
                          <TableHead>Sets</TableHead>
                          <TableHead>Reps</TableHead>
                          <TableHead>Rest</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {day.exercises.map((exercise, exIndex) => (
                           <TableRow key={exIndex}>
                            <TableCell className="font-medium">{exercise.name}</TableCell>
                            <TableCell>{exercise.sets}</TableCell>
                            <TableCell>{exercise.reps}</TableCell>
                            <TableCell>{exercise.rest}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
