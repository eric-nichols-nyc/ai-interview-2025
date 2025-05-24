"use client"
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
import { VideoText } from "@/components/text/video-text";
import Link from "next/link";
import React from "react";
import { AnimatedGradientText } from "@/components/text/animated-gradient-text";
import { MultiSelect,MultiSelectContent,MultiSelectGroup,MultiSelectItem,MultiSelectList,MultiSelectTrigger,MultiSelectValue } from "@/components/ui/mulit-select";
import { TimerComponent } from "@/components/timer/timer";
import { SpinningText } from "@/components/text/spinning-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

    <SectionWithTitle title="Animated Gradient Button">
    <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
      <span
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
      <AnimatedGradientText className="text-sm font-medium">
        Introducing Magic UI
      </AnimatedGradientText>
      <ChevronRight
        className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
      />
    </div>
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
    <SectionWithTitle title="Video Text">
      <div className="relative h-[200px] w-full overflow-hidden">
        <VideoText src="https://cdn.magicui.design/ocean-small.webm">
          OCEAN
        </VideoText>
      </div>
    </SectionWithTitle>
    <SectionWithTitle title="Spinning Text">
        <div className="flex items-center justify-center h-[240px]">
    <SpinningText className="text-4xl" duration={6}>
      learn more • earn more • grow more •
    </SpinningText>
    </div>
    </SectionWithTitle>
    <SectionWithTitle title="Spinning Text Reverse">
        <div className="flex items-center justify-center h-[240px]">
    <SpinningText reverse className="text-4xl" duration={4} radius={5}>
      learn more • earn more • grow more •
    </SpinningText>
    </div>
    </SectionWithTitle>
    <SectionWithTitle title="Multi Select">
    <div className="flex items-center justify-center bg-black">
    <MultiSelect>
         <MultiSelectTrigger className="w-96">
            <MultiSelectValue placeholder="Select stack" />
         </MultiSelectTrigger>
         <MultiSelectContent>
            <MultiSelectList>
               <MultiSelectGroup heading="React">
                  <MultiSelectItem value="react">React</MultiSelectItem>
                  <MultiSelectItem value="next">Next.js</MultiSelectItem>
                  <MultiSelectItem value="remix">Remix</MultiSelectItem>
               </MultiSelectGroup>
               <MultiSelectGroup heading="Vue">
                  <MultiSelectItem value="vue">Vue</MultiSelectItem>
                  <MultiSelectItem value="nuxt">Nuxt</MultiSelectItem>
               </MultiSelectGroup>
               <MultiSelectGroup heading="Others">
                  <MultiSelectItem value="angular">Angular</MultiSelectItem>
                  <MultiSelectItem value="svelte">Svelte</MultiSelectItem>
               </MultiSelectGroup>
            </MultiSelectList>
         </MultiSelectContent>
      </MultiSelect>
    </div>
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
    <SectionWithTitle title="Timer (Count Up, starts at 0:30)">
      <TimerComponent mode="up" initialMinutes={0} initialSeconds={30} />
    </SectionWithTitle>
    <SectionWithTitle title="Timer (Count Down, starts at 0:15, with onComplete)">
      <TimerComponent
        mode="down"
        initialMinutes={0}
        initialSeconds={15}
        onComplete={() => alert("Countdown complete!")}
      />
    </SectionWithTitle>
  </>
);
export default ComponentsShowcase;
