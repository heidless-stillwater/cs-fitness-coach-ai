import { FormCorrection } from "@/components/form-correction";

export default function RealTimeFormCorrectionPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Real-time Form Correction & Feedback</h1>
          <p className="mt-4 text-muted-foreground">
            Get instant feedback on your exercise form using your device's camera. Our AI analyzes your movements to help you perform exercises safely and effectively, preventing injury and maximizing results.
          </p>
        </div>
        <FormCorrection />
      </div>
    </div>
  );
}
