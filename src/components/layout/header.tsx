
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dumbbell, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "../theme-toggle";
import { useBreakpoint } from "@/hooks/use-breakpoint";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const toolsLinks = [
  { href: "/ai-functions#personalized-workout-plan-generation", label: "Personalized Workout Plan Generation" },
  { href: "/ai-functions#intelligent-client-engagement-bots", label: "Intelligent Client Engagement Bots" },
  { href: "/ai-functions#dynamic-nutrition-guidance", label: "Dynamic Nutrition Guidance" },
  { href: "/ai-functions#advanced-progress-tracking-analytics", label: "Advanced Progress Tracking & Analytics" },
  { href: "/ai-functions#optimized-recovery-protocols", label: "Optimized Recovery Protocols" },
  { href: "/ai-functions#adaptive-goal-setting-adjustment", label: "Adaptive Goal Setting & Adjustment" },
  { href: "/ai-functions#behavioral-coaching-habit-formation", label: "Behavioral Coaching & Habit Formation" },
  { href: "/ai-functions#client-journey-personalization", label: "Client Journey Personalization" },
];


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
                    <Button variant="ghost">
                      Tools
                      <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {toolsLinks.map((link, index) => (
                      <DropdownMenuItem key={`${link.label}-${index}`} asChild>
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
                         <Accordion type="single" collapsible className="w-full">
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
                          <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:text-primary border-b">
                              Tools
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                              {toolsLinks.map((link, index) => (
                                 <Link
                                  key={`${link.label}-${index}`}
                                  href={link.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "block transition-colors hover:text-primary pl-8 pr-4 py-3 border-t text-sm",
                                    pathname === link.href ? "text-primary bg-muted" : "text-foreground"
                                  )}
                                >
                                  {link.label}
                                </Link>
                              ))}
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
