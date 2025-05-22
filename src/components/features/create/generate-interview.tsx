
'use client'
import React, { useRef, useState, useEffect } from "react";
import { Carousel, CarouselSlides, CarouselSlide, CarouselHandle } from "@/components/features/carousel";
import { CreateSlide } from "@/components/features/create/create-slide";
import { LoadingSlide } from "@/components/features/create/loading-slide";
import { ReadySlide } from "@/components/features/create/ready-slide";
import Link from "next/link";

export function GenerateInterview() {
  const carouselRef = useRef<CarouselHandle>(null);
  const [slide, setSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const nextSlide = () => {
    setSlide(slide + 1);
    carouselRef.current?.nextSlide()
  }

  useEffect(() => {
    if (isValid) {
      nextSlide();
      setIsValid(false);
    }
  }, [isValid]);
  
  return (
    <div className="flex flex-col justify-center items-center gap-4">
    <h1>Create Interview</h1>
    <button onClick={nextSlide}>Go to Next Slide (External)</button>
    <div className="w-[500px] h-[500px]">
      <Carousel ref={carouselRef} slideCount={3}>
    <CarouselSlides>
      <CarouselSlide>
        <div className="w-full h-full">
          <CreateSlide isValid={setIsValid} />
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