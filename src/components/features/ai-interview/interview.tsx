"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuestionsStore, QuestionItem } from "@/hooks/use-questions-store";
import { Button } from "@/components/ui/button";
import { getAssistantOptions } from "./assistantOptions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimerComponent, TimerComponentHandle } from "@/components/timer/timer";
import {
  Carousel,
  CarouselSlides,
  CarouselSlide,
  CarouselHandle,
} from "@/components/features/carousel";
import { generateFeedback } from "@/actions/google";
import { useVapiAgent } from "@/hooks/use-vapi-agent";
import { useUser } from "@clerk/clerk-react";
import { LoadingSlide } from "../create/loading-slide";

type SavedMessage = {
  role: "user" | "assistant";
  content: string;
};
type InterviewProps = {
  id: string;
};

export default function Interview({ id }: InterviewProps) {
  console.log("Interview ID:", id);
  const { user } = useUser();
  const carouselRef = useRef<CarouselHandle>(null);
  const userName = user?.firstName || "Candidate";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const timerRef = useRef<TimerComponentHandle>(null);
  const setFeedback = useQuestionsStore((state) => state.setFeedback);
  const setTranscript = useQuestionsStore((state) => state.setTranscript);
  const apiKey = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!;
  const router = useRouter();

  const transcriptRef = useRef<SavedMessage[]>([]);

  // Get questions from zustand store
  const questions = useQuestionsStore((state) => state.questions);

  // Helper to get the current question item
  const getCurrentQuestionItem = (): QuestionItem | null => {
    return questions[currentQuestionIndex] || null;
  };

  const handleNextSlide = () => {
    console.log("Next slide");
    console.log("Carousel ref:", carouselRef.current);
    carouselRef.current?.nextSlide();
  };

  const currentItem = getCurrentQuestionItem();

  const jobPosition = currentItem ? currentItem.position : "React Engineer";

  const assistantOptions = getAssistantOptions(
    userName,
    jobPosition,
    currentItem ? currentItem.question : ""
  );

  // implement useVapiAgent
  const {
    startCall,
    endCall,
    isConnected,
    isConnecting,
    isSpeaking,
    status,
    volumeLevel,
    isApiKeyValid,
    errorMessage,
    transcriptMessages,
  } = useVapiAgent({
    apiKey,
    assistantOptions,
  });

  const handleTimerComplete = () => {
    console.log("Timer complete");
    endCall();
  };

  // On mount, set to last question if available
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestionIndex(questions.length - 1);
    }
  }, [questions]); // Only run on mount

  useEffect(() => {
    // console.log("Transcript messages:", transcriptMessages);
  }, [transcriptMessages]);

  useEffect(() => {
    transcriptRef.current = transcriptMessages;
  }, [transcriptMessages]);

  const handleStartCall = () => {
    startCall();
    timerRef.current?.start();
  };

  const handleEndCall = () => {
    endCall();
    timerRef.current?.reset();
    setTranscript(transcriptMessages);
    handleGenerateFeedback();
  };

  // Generate feedback
  const handleGenerateFeedback = async () => {
    console.log("Generating feedback");
    console.log("Transcript messages:", transcriptMessages);
    // if transcriptMessages is empty, return
    if (transcriptMessages.length === 0) {
      alert("No transcript messages to generate feedback");
      return;
    }
    handleNextSlide();
    setIsLoading(true);
    setIsError(false);
    try {
      const interviewId = id;
      const userId = "1234";
      const feedback = await generateFeedback({
        interviewId,
        userId,
        transcript: transcriptMessages,
      });
      console.log(
        "Feedback:",
        typeof feedback === "object" ? feedback : "Not an object"
      );
      if (feedback && typeof feedback === "object" && !("error" in feedback)) {
        console.log("Feedback is an object");
        setFeedback(feedback);
        router.push(`/dashboard/interview/${id}/feedback`);
      }
    } catch (error) {
      console.error("Failed to generate feedback:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  function renderInterviewCard({
    timerRef,
    handleTimerComplete,
    status,
    isConnected,
    isSpeaking,
    volumeLevel,
    errorMessage,
    isConnecting,
    isApiKeyValid,
    handleEndCall,
    handleStartCall,
    questions,
    setCurrentQuestionIndex,
    currentQuestionIndex,
    currentItem,
    transcriptMessages,
  }: {
    timerRef: React.RefObject<TimerComponentHandle | null>;
    handleTimerComplete: () => void;
    status: string;
    isConnected: boolean;
    isSpeaking: boolean;
    volumeLevel: number;
    errorMessage: string | null;
    isConnecting: boolean;
    isApiKeyValid: boolean;
    handleEndCall: () => void;
    handleStartCall: () => void;
    questions: QuestionItem[];
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    currentQuestionIndex: number;
    currentItem: QuestionItem | null;
    transcriptMessages: SavedMessage[];
  }) {
    return (
      <Card className="flex flex-col items-center justify-center w-full">
        <CardHeader className="flex flex-col items-center justify-center gap-2">
          <TimerComponent
            ref={timerRef}
            mode="down"
            initialMinutes={1}
            initialSeconds={30}
            compact={true}
            onComplete={handleTimerComplete}
          />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/jennifer.png"
            alt="logo"
            width={250}
            height={250}
            className="rounded-full"
          />
          <p>Status: {status}</p>
          {isConnected && (
            <div style={{ marginTop: "10px" }}>
              <p>
                {isSpeaking
                  ? "Assistant is speaking"
                  : "Assistant is listening"}
              </p>
              {/* Simple volume indicator */}
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor:
                        i / 10 < volumeLevel ? "#90D5FF" : "#444",
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </div>
              <div>
                {errorMessage && (
                  <div
                    style={{
                      backgroundColor: "#f03e3e",
                      padding: "15px",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      maxWidth: "400px",
                      textAlign: "center",
                    }}
                  >
                    <p>{errorMessage}</p>
                    {errorMessage.includes("payment") && (
                      <a
                        href="https://dashboard.vapi.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "10px",
                          color: "white",
                          textDecoration: "underline",
                        }}
                      >
                        Go to Vapi Dashboard
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          <Button
            className="mt-4 cursor-pointer"
            onClick={isConnected ? handleEndCall : handleStartCall}
            disabled={isConnecting || !isApiKeyValid}
          >
            {isConnecting
              ? "Connecting..."
              : isConnected
              ? "End Call"
              : "Start Interview"}
          </Button>
          {/* Button to advance to the next question for demo purposes */}
          {questions.length > 1 && (
            <Button
              className="mt-2"
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              disabled={currentQuestionIndex >= questions.length - 1}
            >
              Next Question
            </Button>
          )}
          <div className="flex items-center">
            <span className="mr-2">Connected:</span>
            <span
              className={`inline-block w-4 h-4 rounded-full mr-1 align-middle ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <span className="mr-2">Question:</span>
              <span className="mr-2">{currentItem?.question}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">Transcript Messages:</span>
              <span className="mr-2">{transcriptMessages.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4">
      <h1 className="text-2xl font-bold capitalize">{jobPosition} Interview</h1>

      <Carousel
        ref={carouselRef}
        slideCount={2}
        height="600px"
        className="w-full"
      >
        <CarouselSlides>
          <CarouselSlide>
            {renderInterviewCard({
              timerRef,
              handleTimerComplete,
              status,
              isConnected,
              isSpeaking,
              volumeLevel,
              errorMessage,
              isConnecting,
              isApiKeyValid,
              handleEndCall,
              handleStartCall,
              questions,
              setCurrentQuestionIndex,
              currentQuestionIndex,
              currentItem,
              transcriptMessages,
            })}
          </CarouselSlide>
          <CarouselSlide>
            <LoadingSlide isLoading={isLoading} isError={isError} />
          </CarouselSlide>
        </CarouselSlides>
      </Carousel>
    </div>
  );
}
