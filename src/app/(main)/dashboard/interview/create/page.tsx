'use client'
import React, { useRef } from "react";
import { Carousel, CarouselSlides, CarouselSlide, CarouselHandle } from "@/components/features/carousel";
import { CreateSlide } from "@/components/features/create/create-slide";
import { LoadingSlide } from "@/components/features/create/loading-slide";
import { ReadySlide } from "@/components/features/create/ready-slide";
import Link from "next/link";

export default function CreateInterview() {
  const carouselRef = useRef<CarouselHandle>(null);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Create Interview</h1>
      <button onClick={() => carouselRef.current?.nextSlide()}>Go to Next Slide (External)</button>
      <div className="w-[500px] h-[500px]">
      <Carousel ref={carouselRef} slideCount={3}>
        <CarouselSlides>
          <CarouselSlide>
            <div className="w-full h-full">
              <CreateSlide />
            </div >
          </CarouselSlide>
            <CarouselSlide>
            <div className="w-full h-full">
              <LoadingSlide />
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div className="w-full h-full">
              <ReadySlide />
            <Link href="/dashboard/interview/1234">Start Interview</Link>
            </div>
          </CarouselSlide>
        </CarouselSlides>
      </Carousel>
      </div>
    </div>
  );
}