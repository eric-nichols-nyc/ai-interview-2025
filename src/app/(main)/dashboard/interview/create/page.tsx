'use client'
import React, { useRef } from "react";
import { Carousel, CarouselSlides, CarouselSlide, CarouselHandle } from "@/components/features/carousel";
import Link from "next/link";

export default function CreateInterview() {
  const carouselRef = useRef<CarouselHandle>(null);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Create Interview</h1>
      {/* Section Tabs */}
      <div className="flex gap-2 mb-2">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="px-4 py-2 rounded-t bg-gray-200 border-b-2 border-transparent cursor-pointer"
          >
            Section {n}
          </div>
        ))}
      </div>
      <button onClick={() => carouselRef.current?.nextSlide()}>Go to Next Slide (External)</button>
      <div className="w-[500px] h-[500px]">
      <Carousel ref={carouselRef} slideCount={3}>
        <CarouselSlides>
          <CarouselSlide>
            <div className="w-full h-full bg-red-500">
              <h1>Slide Interview Form</h1>
            </div>
          </CarouselSlide>
            <CarouselSlide>
            <div className="w-full h-full bg-blue-500">
              <h1>Slide Cooking</h1>
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div className="w-full h-full bg-green-500">
              <h1>Slide Interview Ready</h1>
            <Link href="/dashboard/interview/1234">Start Interview</Link>
            </div>
          </CarouselSlide>
        </CarouselSlides>
      </Carousel>
      </div>
    </div>
  );
}