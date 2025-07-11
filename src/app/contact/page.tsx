import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

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

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
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
            
            <ContactForm />
        </div>

        <Card className="shadow-lg overflow-hidden">
            <CardHeader>
                <CardTitle className="font-headline">Our Location</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        src="https://maps.google.com/maps?q=Woodberry%20Down,%20London%20N4%202TG&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                    ></iframe>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
