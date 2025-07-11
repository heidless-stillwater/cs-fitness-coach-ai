import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight">
            Unlock Your Potential with <span className="text-primary">Achieve Fitness</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Your journey to a healthier, stronger you starts here. Get a personalized workout plan designed by experts, for free.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/tools/personalized-workout-plan">Create Your Free Plan</Link>
            </Button>
          </div>
        </div>
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Fitness background"
          data-ai-hint="fitness background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full -z-10 opacity-10 dark:opacity-5"
        />
      </section>

      <section id="features" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Features</h2>
            <p className="mt-4 text-muted-foreground">
              Explore the powerful AI tools designed to help you achieve your fitness goals.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
             <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline">Real-time Form Correction & Feedback</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="AI form correction illustration"
                    data-ai-hint="exercise form"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-muted-foreground">
                  Get instant feedback on your exercise form using your device's camera. Our AI analyzes your movements to help you perform exercises safely and effectively.
                </p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="outline" className="w-full">
                  <Link href="/tools/real-time-form-correction">
                    Check Your Form
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
