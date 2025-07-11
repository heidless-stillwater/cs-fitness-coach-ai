import { ContentGenerationForm } from "@/components/content-generation-form";

export default function AutomatedContentCreationPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Automated Content Creation</h1>
          <p className="mt-4 text-muted-foreground">
            Generates engaging content related to fitness, nutrition, and wellness for marketing and client education to save time and expand online presence.
          </p>
        </div>
        <ContentGenerationForm />
      </div>
    </div>
  );
}
