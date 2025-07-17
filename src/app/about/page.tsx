import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const certifications = [
  "Certified Personal Trainer (NASM)",
  "Corrective Exercise Specialist (NASM)",
  "Certified Nutrition Coach (Precision Nutrition)",
  "CPR/AED Certified (Red Cross)",
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">About Your Trainer</h1>
          <p className="mt-4 text-lg text-muted-foreground">Dedicated to Your Success</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="md:col-span-2">
            <Card className="overflow-hidden shadow-lg">
              <Image
                src="https://storage.googleapis.com/heidless_case_studies/c-life-coach/live-about-trainer-headshot.jpg"
                alt="Headshot of the personal trainer"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
          <div className="md:col-span-3 space-y-8">
            <div>
              <h2 className="text-3xl font-headline font-semibold mb-4">My Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                I believe that fitness is not just about physical strength, but a holistic journey towards a better self. My approach combines evidence-based training methods with personalized nutrition guidance and motivational coaching to help you build sustainable habits. I'm not just here to count your reps; I'm here to empower you, celebrate your victories, and guide you through challenges. Your goals are my mission.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-headline font-semibold mb-4">Experience & Expertise</h2>
              <p className="text-muted-foreground leading-relaxed">
                With over a decade in the fitness industry, I've had the privilege of working with a diverse range of clients, from beginners taking their first step into fitness to seasoned athletes aiming to break their personal records. My expertise lies in strength and conditioning, functional movement, and weight management.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-headline font-semibold mb-4">Certifications</h2>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
