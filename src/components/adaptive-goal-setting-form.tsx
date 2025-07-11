
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  setAdaptiveGoals,
  AdaptiveGoalSettingInput,
  AdaptiveGoalSettingOutput,
} from "@/ai/flows/adaptive-goal-setting-flow";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, PlusCircle, Sparkles, Trash2 } from "lucide-react";

const goalSchema = z.object({
  description: z.string().min(5, "Goal description must be at least 5 characters."),
  status: z.enum(['Not Started', 'In Progress', 'Achieved', 'Struggling']),
});

const formSchema = z.object({
  currentGoals: z.array(goalSchema).min(1, "Please add at least one goal."),
  recentPerformance: z.string().min(20, "Please provide more detail about your performance."),
});

export function AdaptiveGoalSettingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AdaptiveGoalSettingOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentGoals: [{ description: "", status: "In Progress" }],
      recentPerformance: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "currentGoals",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await setAdaptiveGoals(values as AdaptiveGoalSettingInput);
      setResult(response);
    } catch (e) {
      console.error(e);
      setError("Sorry, we couldn't generate goal adjustments. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Your Goal Check-in</CardTitle>
            <CardDescription>Let's review your goals and adjust your plan for success.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <FormLabel>Your Current Goals</FormLabel>
                <div className="space-y-4 mt-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-lg">
                        <FormField
                            control={form.control}
                            name={`currentGoals.${index}.description`}
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <Input placeholder="e.g., 'Run 3 times a week'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`currentGoals.${index}.status`}
                            render={({ field }) => (
                                <FormItem className="w-full md:w-auto">
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="w-full md:w-[150px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="Not Started">Not Started</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Achieved">Achieved</SelectItem>
                                    <SelectItem value="Struggling">Struggling</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length <= 1}
                            >
                            <Trash2 className="h-4 w-4 text-destructive" />
                         </Button>
                    </div>
                  ))}
                </div>
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => append({ description: "", status: "Not Started" })}
                    >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Goal
                </Button>
              </div>

              <FormField
                control={form.control}
                name="recentPerformance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How have the last two weeks been?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your energy levels, consistency, any challenges you faced, or successes you had."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Get Goal Feedback"}
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
              Your Personalized Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="bg-muted p-4 rounded-lg">
                <p className="italic text-muted-foreground">{result.summary}</p>
             </div>

            <div>
                <h3 className="text-xl font-headline font-semibold mb-3">Goal Adjustments</h3>
                <div className="space-y-4">
                {result.goalAdjustments.map((adj, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                        <p className="font-semibold text-foreground">"{adj.originalGoal}"</p>
                        <p><span className="font-semibold text-accent">Suggestion:</span> {adj.suggestion}</p>
                        <p className="text-sm text-muted-foreground mt-1"><span className="font-semibold">Why?</span> {adj.rationale}</p>
                    </div>
                ))}
                </div>
            </div>

            {result.newGoalSuggestions.length > 0 && (
                 <div>
                    <h3 className="text-xl font-headline font-semibold mb-3">New Goal Ideas</h3>
                    <div className="space-y-4">
                    {result.newGoalSuggestions.map((sug, index) => (
                        <div key={index} className="border-l-4 border-secondary pl-4 py-2">
                             <p className="font-semibold text-foreground">{sug.goal}</p>
                             <p className="text-sm text-muted-foreground mt-1"><span className="font-semibold">Why?</span> {sug.rationale}</p>
                        </div>
                    ))}
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
