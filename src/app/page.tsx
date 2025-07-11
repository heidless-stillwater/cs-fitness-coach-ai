
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="flex justify-center">
              <Image
                src="https://storage.googleapis.com/paula-personal-trainer-0/personal-training-0-live.jpg"
                alt="Fitness"
                data-ai-hint="fitness person"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight">
                Unlock Your Potential with <span className="text-primary">Achieve Fitness</span>
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground mx-auto md:mx-0">
                Your journey to a healthier, stronger you starts here. Get a personalized workout plan designed by experts, for free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/tools/personalized-workout-plan">Create Your Free Plan</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                   <Link href="#features">Explore Tools</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
               <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold">Meet Your Trainer</h2>
                  <p className="mt-2 text-lg text-muted-foreground">Your Partner in Fitness</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I believe that fitness is a holistic journey towards a better self. My approach combines evidence-based training with personalized nutrition and motivational coaching to help you build sustainable habits. I'm not just here to count reps; I'm here to empower you, celebrate your victories, and guide you through challenges.
              </p>
               <Button asChild size="lg">
                  <Link href="/about">
                    Learn More About My Philosophy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
            </div>
             <div className="flex justify-center">
              <Image
                src="https://storage.googleapis.com/paula-personal-trainer-0/trainer-headshot-0-live.jpg"
                alt="Headshot of the personal trainer"
                width={450}
                height={450}
                className="rounded-full object-cover aspect-square shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-16 md:py-24 bg-card">
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
             <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline">Dynamic Nutrition Guidance</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="Healthy food illustration"
                    data-ai-hint="healthy food"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-muted-foreground">
                  Receive AI-generated meal plans and nutritional advice that adapt to your progress, preferences, and dietary restrictions to fuel your fitness journey.
                </p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="outline" className="w-full">
                  <Link href="/tools/dynamic-nutrition-guidance">
                    Get Your Meal Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline">Adaptive Goal Setting & Adjustment</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="Goal setting illustration"
                    data-ai-hint="goals chart"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-muted-foreground">
                    Our AI helps you set realistic goals and automatically adjusts them based on your progress, ensuring you stay motivated and on track.
                </p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="outline" className="w-full">
                  <Link href="/tools/adaptive-goal-setting">
                    Adjust Your Goals
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
