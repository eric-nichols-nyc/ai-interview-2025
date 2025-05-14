import { BlackInterviewCard } from "@/components/cards/black-interview-card";
import {
  Carousel,
  CarouselSlides,
  CarouselSlide,
  CarouselPreviousButton,
  CarouselNextButton,
  CarouselIndicators,
} from "@/components/features/carousel";
import { ShimmerButton } from "@/components/buttons/shimmer-button";
import { RippleButton } from "@/components/buttons/ripple-button";
import { NeonGradientCard } from "@/components/cards/neon-gradient";
import { AuroraText } from "@/components/text/aurora-text";
import Link from "next/link";
import React from "react";

interface SectionWithTitleProps {
  title: string;
  children: React.ReactNode;
}

const SectionWithTitle: React.FC<SectionWithTitleProps> = ({
  title,
  children,
}) => (
  <section className="w-full mb-8">
    <div className="flex items-center justify-center w-full border border-white/20 mb-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
    </div>
    <div className="flex items-center justify-center w-full mb-8">
      {children}
    </div>
  </section>
);

const ComponentsShowcase = () => (
  <>
    <div className="w-full flex flex-col items-center mb-10 pt-8 sticky top-0 z-20 bg-background/80 backdrop-blur shadow">
      <Link
        href="/"
        className="mb-2 text-blue-600 hover:underline hover:text-blue-800 transition-colors text-sm font-medium"
      >
        ← Back to Home
      </Link>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center drop-shadow-lg">
        Component Showcase
      </h1>
    </div>
    <SectionWithTitle title="Shimmer Button">
      <ShimmerButton>
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Shimmer Button
        </span>
      </ShimmerButton>
    </SectionWithTitle>
    <SectionWithTitle title="Ripple Button">
      <RippleButton>
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Ripple Button
        </span>
      </RippleButton>
    </SectionWithTitle>
    <SectionWithTitle title="Black Card">
      <BlackInterviewCard />
    </SectionWithTitle>

    <SectionWithTitle title="Neon Gradient Card">
      <NeonGradientCard className="max-w-sm items-center justify-center text-center">
        <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Neon Gradient Card
        </span>
      </NeonGradientCard>
    </SectionWithTitle>
    <SectionWithTitle title="Aurora Text">
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
        <AuroraText>Ship beautiful</AuroraText>
      </h1>
    </SectionWithTitle>
    <SectionWithTitle title="Carousel">
      <div className="w-[400px] h-[600px] mx-auto my-8">
        <Carousel slideCount={3} width="400px" height="600px">
          <CarouselSlides>
            <CarouselSlide>
              <div className="size-full flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-lg shadow-lg">
                Slide 1
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="size-full flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-slate-900 via-gray-800 to-gray-700 rounded-lg shadow-lg">
                Slide 2
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="size-full flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-lg shadow-lg">
                Slide 3
              </div>
            </CarouselSlide>
          </CarouselSlides>
          <div className="flex items-center justify-between">
            <CarouselPreviousButton />
            <CarouselNextButton />
          </div>
          <CarouselIndicators />
        </Carousel>
      </div>
    </SectionWithTitle>
  </>
);
export default ComponentsShowcase;
