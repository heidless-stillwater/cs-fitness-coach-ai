import { Button } from "@/components/ui/button";
import { WorkoutPlanForm } from "@/components/workout-plan-form";
import Link from "next/link";
import Image from "next/image";

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
              <Link href="#workout-plan">Create Your Free Plan</Link>
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

      <section id="workout-plan" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Get Your Personalised Workout Plan</h2>
            <p className="mt-4 text-muted-foreground">
              Fill out the form below to receive a customized workout plan tailored to your goals, experience, and resources.
            </p>
          </div>
          <WorkoutPlanForm />
        </div>
      </section>
    </>
  );
}
