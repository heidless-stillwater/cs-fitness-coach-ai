import { Badge } from "@/components/ui/badge";

export default function ClientJourneyPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Client Journey Personalization</h1>
          <p className="mt-4 text-muted-foreground">
            Create a unique and personalized experience for every client, from onboarding to goal achievement, with an AI that understands and adapts to their individual journey.
          </p>
        </div>
        <div className="flex justify-center">
            <Badge variant="secondary" className="text-lg py-2 px-4">Coming Soon</Badge>
        </div>
      </div>
    </div>
  );
}
