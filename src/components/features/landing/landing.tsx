import Link from "next/link"
import { ArrowRight, CheckCircle, Brain, Clock, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import TestimonialCard from "@/components/features/landing/testimonial-card"
import FeatureCard from "@/components/features/landing/feature-card"
import PricingCard from "@/components/features/landing/pricing-card"
import Image from "next/image"
import LandingNav from "./nav/landing-nav"

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
                <div className="flex items-center gap-2 mb-2">
                  <Link href="https://vapi.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mb-2 hover:underline">
                    <span className="text-xs text-muted-foreground">Powered by</span>
                    <Image
                      src="/vapi.jpeg"
                      alt="Vapi Voice Assistant Logo"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain rounded-full"
                    />
                  </Link>
                </div>
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  AI-Powered Interview Preparation
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Ace Your Next Interview with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Practice with our AI interviewer that adapts to your responses, provides real-time feedback, and helps
                  you build confidence for any job interview.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    Start practicing now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Watch demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    <Image
                      alt="User"
                      className="rounded-full border-2 border-background"
                      height="32"
                      src="/placeholder.svg?height=32&width=32"
                      style={{
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                    <Image
                      alt="User"
                      className="rounded-full border-2 border-background"
                      height="32"
                      src="/placeholder.svg?height=32&width=32"
                      style={{
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                    <Image
                      alt="User"
                      className="rounded-full border-2 border-background"
                      height="32"
                      src="/placeholder.svg?height=32&width=32"
                      style={{
                        objectFit: "cover",
                      }}
                      width="32"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">10,000+</span> professionals hired after using InterviewAI
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    alt="AI Interview in action"
                    className="object-cover"
                    height={500}
                    src="/placeholder.svg?height=500&width=700"
                    style={{
                      aspectRatio: "700/500",
                      objectFit: "cover",
                    }}
                    width={700}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/0 flex items-center justify-center">
                    <div className="rounded-full bg-white/90 p-4 shadow-lg">
                      <Mic className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="border-t border-b py-8 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center text-sm text-muted-foreground">TRUSTED BY PROFESSIONALS FROM</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
                {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map((company) => (
                  <div key={company} className="text-xl font-semibold text-muted-foreground">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need to Succeed</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform provides comprehensive interview preparation tailored to your needs.
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

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Process, Powerful Results</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started in minutes and see immediate improvements in your interview performance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Create Your Profile",
                  description: "Tell us about your experience, target role, and interview goals.",
                },
                {
                  step: "2",
                  title: "Practice Interviews",
                  description: "Engage with our AI interviewer in realistic interview scenarios.",
                },
                {
                  step: "3",
                  title: "Review & Improve",
                  description: "Get detailed feedback and actionable tips to enhance your performance.",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Success Stories from Our Users</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from professionals who landed their dream jobs after using InterviewAI.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="InterviewAI helped me prepare for my tech interview at Google. The feedback was spot-on and I felt so much more confident!"
                author="Sarah J."
                role="Software Engineer"
                company="Google"
              />
              <TestimonialCard
                quote="After 5 practice sessions with InterviewAI, I nailed my product manager interview. The AI caught weaknesses in my responses I hadn't noticed."
                author="Michael T."
                role="Product Manager"
                company="Microsoft"
              />
              <TestimonialCard
                quote="As someone with interview anxiety, this tool was a game-changer. I could practice until I felt comfortable with any question."
                author="Priya K."
                role="Marketing Director"
                company="Spotify"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Choose the Right Plan for You</h2>
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
                features={["3 practice interviews", "Basic feedback", "General questions only", "Email support"]}
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

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Ace Your Next Interview?</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of professionals who&apos;ve transformed their interview skills with InterviewAI.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1">
                  Get started for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a demo
                </Button>
              </div>
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
                AI-powered interview preparation to help you land your dream job.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
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
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
  )
}
