import { AdaptiveGoalSettingForm } from "@/components/adaptive-goal-setting-form";

export default function AdaptiveGoalSettingPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Adaptive Goal Setting & Adjustment</h1>
          <p className="mt-4 text-muted-foreground">
            Our AI helps you set realistic, achievable goals and automatically adjusts them based on your progress, ensuring you stay motivated and consistently challenged.
          </p>
        </div>
        <AdaptiveGoalSettingForm />
      </div>
    </div>
  );
}
