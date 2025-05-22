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
import { InterviewQuestions } from "@/schemas/interview-questions.schema";
import { useQuestionsStore } from '@/hooks/use-questions-store';
import { generateUUID } from '@/hooks/use-questions-store';

export function GenerateInterview() {
  const MAX_SLIDE = 3;
  const carouselRef = useRef<CarouselHandle>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const addQuestion = useQuestionsStore((state) => state.addQuestion);
  const setQuestions = useQuestionsStore((state) => state.setQuestions);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % MAX_SLIDE);
    carouselRef.current?.nextSlide();
  };

  const handleFormSubmit = async (formData: InterviewQuestions) => {
    console.log('[GenerateInterview] Form submitted:', formData);
    setIsLoading(true);
    setIsError(false);
    try {
      console.log('[GenerateInterview] Sending API request...');
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      console.log('[GenerateInterview] API response:', data);
      // Save to zustand store
      if (Array.isArray(data.questions)) {
        setQuestions(data.questions.map((q: string) => ({
          id: generateUUID(),
          question: q,
          position: formData.position,
          answer: ""
        })));
        console.log('[GenerateInterview] Saved array of questions to store:', data.questions);
      } else if (typeof data.questions === "string") {
        addQuestion({
          id: generateUUID(),
          question: data.questions,
          position: formData.position,
          answer: ""
        });
        console.log('[GenerateInterview] Added single question to store:', data.questions);
      }
      setIsLoading(false);
      console.log('[GenerateInterview] Loading finished, moving to next slide.');
      nextSlide();
    } catch (err) {
      console.error('[GenerateInterview] API error:', err);
      setIsError(true);
      setIsLoading(false);
    }
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
                <CreateSlide onSubmit={handleFormSubmit} />
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
