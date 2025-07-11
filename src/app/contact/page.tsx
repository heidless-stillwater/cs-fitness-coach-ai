import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Address",
    value: "Woodberry Down, London N4 2TG",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "111-122-23333",
    href: "tel:11112223333",
  },
  {
    icon: Mail,
    title: "Email",
    value: "test@test.com",
    href: "mailto:test@test.com",
  },
];

const operatingHours = [
    { day: "Monday - Friday", time: "6:00 AM - 9:00 PM" },
    { day: "Saturday", time: "8:00 AM - 6:00 PM" },
    { day: "Sunday", time: "10:00 AM - 4:00 PM" },
]

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Get in Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ready to start your fitness journey? Contact me today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-6">
                        {contactDetails.map((detail, index) => (
                            <li key={index} className="flex items-start">
                                <detail.icon className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">{detail.title}</h3>
                                    {detail.href ? (
                                        <a href={detail.href} className="text-muted-foreground hover:text-primary transition-colors">{detail.value}</a>
                                    ) : (
                                        <p className="text-muted-foreground">{detail.value}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Hours of Operation</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-4">
                        <li className="flex items-start">
                             <Clock className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                            <div>
                                {operatingHours.map(item => (
                                    <div key={item.day} className="flex justify-between">
                                        <p className="font-semibold">{item.day}:</p>
                                        <p className="text-muted-foreground ml-4">{item.time}</p>
                                    </div>
                                ))}
                            </div>
                        </li>
                     </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
