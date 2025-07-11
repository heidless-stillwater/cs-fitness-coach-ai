import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah L.",
    title: "Lost 20lbs and gained confidence!",
    quote: "Working with Achieve Fitness has been life-changing. I not only reached my weight loss goals but also built a healthy relationship with food and exercise. The personalized plan was key to my success!",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman smiling",
  },
  {
    name: "Michael B.",
    title: "Stronger than ever at 45.",
    quote: "I was stuck in a fitness rut for years. The coaching here pushed me beyond my limits in the best way possible. I've increased my strength, energy levels, and overall well-being. Highly recommend!",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man flexing",
  },
  {
    name: "Jessica P.",
    title: "Finally achieved my first pull-up!",
    quote: "I never thought I'd be able to do a pull-up, but with expert guidance and a solid plan, I did it! The support and motivation are unmatched. This is more than a gym, it's a community.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman gym",
  },
   {
    name: "David C.",
    title: "Post-injury recovery was a breeze.",
    quote: "After a knee injury, I was scared to get back into training. The trainer designed a safe and effective recovery plan that got me back on my feet, stronger and more resilient than before.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man running",
  },
];

const Rating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
    ))}
  </div>
);

export default function TestimonialsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Success Stories</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our clients have to say about their journey with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg transform hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold font-headline">{testimonial.name}</h3>
                    <Rating />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                 <h4 className="font-semibold text-lg mb-2">"{testimonial.title}"</h4>
                <p className="text-muted-foreground italic">
                  {testimonial.quote}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
