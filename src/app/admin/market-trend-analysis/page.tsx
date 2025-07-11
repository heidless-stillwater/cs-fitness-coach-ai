import { Badge } from "@/components/ui/badge";

export default function MarketTrendAnalysisPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Market Trend Analysis & Niche Identification</h1>
          <p className="mt-4 text-muted-foreground">
            Identifies popular fitness trends, emerging client demographics, and underserved niches to help coaches tailor services and marketing efforts.
          </p>
        </div>
        <div className="flex justify-center">
            <Badge variant="secondary" className="text-lg py-2 px-4">Coming Soon</Badge>
        </div>
      </div>
    </div>
  );
}
