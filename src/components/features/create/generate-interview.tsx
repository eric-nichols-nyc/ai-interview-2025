"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Carousel,
  CarouselSlides,
  CarouselSlide,
  CarouselHandle,
} from "@/components/features/carousel";
import { CreateSlide } from "@/components/features/create/create-slide";
import { LoadingSlide } from "@/components/features/create/loading-slide";
import { ReadySlide } from "@/components/features/create/ready-slide";
import Link from "next/link";

export function GenerateInterview() {
  const MAX_SLIDE = 3;
  const carouselRef = useRef<CarouselHandle>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % MAX_SLIDE);
    carouselRef.current?.nextSlide();
  };

  // Simulate API call when on loading slide
  useEffect(() => {
    if (currentSlide === 1) {
      setIsLoading(true);
      setIsError(false);
      // Simulate API delay
      const timeout = setTimeout(() => {
        const shouldError = false; // Set to true to test error state
        if (shouldError) {
          setIsError(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          nextSlide(); // Move to ready slide
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentSlide]);

  useEffect(() => {
    if (isValid) {
      nextSlide();
      setIsValid(false);
    }
  }, [isValid]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Create Interview</h1>
      <button onClick={nextSlide}>Go to Next Slide (External){currentSlide}</button>
      <div className="w-[500px] h-[500px]">
        <Carousel ref={carouselRef} slideCount={MAX_SLIDE}>
          <CarouselSlides>
            <CarouselSlide>
              <div className="w-full h-full">
                <CreateSlide isValid={setIsValid} />
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <LoadingSlide isLoading={isLoading} isError={isError} />
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
