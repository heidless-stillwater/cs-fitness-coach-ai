import { Badge } from "@/components/ui/badge";

export default function ProgressAnalyticsPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Advanced Progress Tracking & Analytics</h1>
          <p className="mt-4 text-muted-foreground">
            Visualize your fitness journey with in-depth analytics. Our AI tracks your performance, highlights achievements, and identifies areas for improvement.
          </p>
        </div>
        <div className="flex justify-center">
            <Badge variant="secondary" className="text-lg py-2 px-4">Coming Soon</Badge>
        </div>
      </div>
    </div>
  );
}
