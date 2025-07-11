import { NutritionGuidanceForm } from "@/components/nutrition-guidance-form";

export default function DynamicNutritionGuidancePage() {
  return (
    <div className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Dynamic Nutrition Guidance</h1>
          <p className="mt-4 text-muted-foreground">
            Receive AI-generated meal plans and nutritional advice that adapt to your progress, preferences, and dietary restrictions to fuel your fitness journey effectively.
          </p>
        </div>
        <NutritionGuidanceForm />
      </div>
    </div>
  );
}
