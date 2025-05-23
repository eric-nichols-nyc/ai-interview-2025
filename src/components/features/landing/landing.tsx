import Link from "next/link";
import {  CheckCircle, Brain, Clock } from "lucide-react";
import FeatureCard from "@/components/features/landing/feature-card";
import PricingCard from "@/components/features/landing/pricing-card";
import Image from "next/image";
import LandingNav from "./nav/landing-nav";
import { Card } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* Navigation */}
      <LandingNav />

      <main className="flex-1 w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="py-20 md:py-28 w-full flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <Card className="relative rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <span>AI Interview Preparation powered by</span>
                    <Link
                      href="https://vapi.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      <Image
                        src="/vapi.jpeg"
                        alt="Vapi Voice Assistant Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain rounded-full"
                      />
                    </Link>
                  </div>
                  <BorderBeam />
                </Card>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Ace Your Next Interview with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Practice with our AI interviewer that adapts to your
                  responses, provides real-time feedback, and helps you build
                  confidence for any job interview.
                </p>
              </div>
              <Card className="bg-primary/10 flex items-center justify-center">
                <div className="flex flex-col gap-3 items-center justify-center rounded-full p-10 shadow-lg">
                  <Image
                    src="/jennifer.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className="rounded-full"
                  />
                  <p className="text-center text-muted-foreground">Hi I&apos;m Jennifer, your AI interviewer.</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything You Need to Succeed
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform provides comprehensive interview
                  preparation tailored to your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="AI-Powered Interviews"
                description="Practice with our intelligent AI that adapts to your responses and simulates real interview scenarios."
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Personalized Feedback"
                description="Receive detailed feedback on your answers, communication skills, and areas for improvement."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="On-Demand Practice"
                description="Practice anytime, anywhere with unlimited interview sessions tailored to your industry."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Choose the Right Plan for You
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Affordable options for every stage of your career journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <PricingCard
                title="Free"
                price="$0"
                description="Perfect for trying out the platform"
                features={[
                  "3 practice interviews",
                  "Basic feedback",
                  "General questions only",
                  "Email support",
                ]}
                buttonText="Get Started"
                buttonVariant="outline"
              />
              <PricingCard
                title="Pro"
                price="$19"
                period="per month"
                description="Most popular for job seekers"
                features={[
                  "Unlimited interviews",
                  "Detailed feedback & analysis",
                  "Industry-specific questions",
                  "Interview recording",
                  "Priority support",
                ]}
                buttonText="Start 7-day Trial"
                buttonVariant="default"
                highlighted={true}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                description="For teams and organizations"
                features={[
                  "Everything in Pro",
                  "Custom question sets",
                  "Team analytics dashboard",
                  "Bulk user management",
                  "Dedicated account manager",
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">InterviewAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered interview preparation to help you land your dream
                job.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} InterviewAI. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
