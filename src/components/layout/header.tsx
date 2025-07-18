
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dumbbell, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { useBreakpoint } from "@/hooks/use-breakpoint";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const toolsLinks = [
    { href: "/tools/real-time-form-correction", label: "Real-time Form Correction & Feedback" },
    { href: "/tools/personalized-workout-plan", label: "Personalized Workout Plan Generation" },
    { href: "/tools/intelligent-client-bots", label: "Intelligent Client Engagement Bots" },
    { href: "/tools/dynamic-nutrition-guidance", label: "Dynamic Nutrition Guidance" },
    { href: "/tools/progress-analytics", label: "Advanced Progress Tracking & Analytics" },
    { href: "/tools/recovery-protocols", label: "Optimized Recovery Protocols" },
    { href: "/tools/adaptive-goal-setting", label: "Adaptive Goal Setting & Adjustment" },
    { href: "/tools/behavioral-coaching", label: "Behavioral Coaching & Habit Formation" },
    { href: "/tools/client-journey", label: "Client Journey Personalization" },
];

const adminLinks = [
    { href: "/admin/fitness-coach-ai-functions", label: "Fitness Coach AI Functions" },
    { href: "/admin/progress-analytics", label: "Advanced Progress Tracking & Analytics" },
    { href: "/admin/market-trend-analysis", label: "Market Trend Analysis & Niche Identification" },
    { href: "/admin/automated-content-creation", label: "Automated Content Creation" },
    { href: "/admin/wearable-device-integration", label: "Wearable Device Integration & Data Analysis" },
    { href: "/admin/client-lead-qualification", label: "Client Lead Qualification & Nurturing" },
    { href: "/admin/performance-prediction", label: "Performance Prediction & Benchmarking" },
]


export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isDesktop = useBreakpoint(950);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2">
                <Dumbbell className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline">Achieve Fitness</span>
            </Link>
            <div className="flex items-center gap-4">
                <div className="h-8 w-24 rounded-md bg-muted animate-pulse"></div>
                <div className="h-8 w-24 rounded-md bg-muted animate-pulse"></div>
                <div className="h-8 w-24 rounded-md bg-muted animate-pulse"></div>
                <div className="h-10 w-24 rounded-md bg-muted animate-pulse"></div>
            </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">Achieve Fitness</span>
        </Link>

        
            {isDesktop ? (
              <nav className="flex items-center gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:bg-accent hover:text-[#F3E5F5] focus-visible:ring-0">
                      Tools <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {toolsLinks.map((link) => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:bg-accent hover:text-[#F3E5F5] focus-visible:ring-0">
                      Admin <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {adminLinks.map((link) => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                 <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/contact">Start Here</Link>
                </Button>
                <ThemeToggle />
              </nav>
            ) : (
              <div className="flex items-center">
                 <ThemeToggle />
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-xs p-0">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b">
                         <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                            <Dumbbell className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold font-headline">Achieve Fitness</span>
                          </Link>
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                          </Button>
                        </SheetClose>
                      </div>
                      <nav className="flex-grow overflow-y-auto text-lg font-medium">
                         
                            {navLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "block transition-colors hover:text-primary px-4 py-3 border-b",
                                  pathname === link.href ? "text-primary bg-muted" : "text-foreground"
                                )}
                              >
                                {link.label}
                              </Link>
                            ))}
                             <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="tools" className="border-b">
                                <AccordionTrigger className="hover:no-underline px-4 py-3 text-foreground transition-colors hover:text-primary">Tools</AccordionTrigger>
                                <AccordionContent className="pb-0">
                                    <div className="flex flex-col">
                                    {toolsLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block transition-colors hover:text-primary pl-8 pr-4 py-3 border-t text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    </div>
                                </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="admin" className="border-b">
                                <AccordionTrigger className="hover:no-underline px-4 py-3 text-foreground transition-colors hover:text-primary">Admin</AccordionTrigger>
                                <AccordionContent className="pb-0">
                                    <div className="flex flex-col">
                                    {adminLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block transition-colors hover:text-primary pl-8 pr-4 py-3 border-t text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    </div>
                                </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                      </nav>
                      <div className="mt-auto p-4 border-t">
                        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setIsOpen(false)}>
                          <Link href="/contact">Start Here</Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          
      </div>
    </header>
  );
}
