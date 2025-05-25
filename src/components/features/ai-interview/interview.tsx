"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useQuestionsStore, QuestionItem } from "@/hooks/use-questions-store";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";
import { getAssistantOptions } from "./assistantOptions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TimerComponent, TimerComponentHandle } from "@/components/timer/timer";
import { generateFeedback } from "@/actions/google";

type SavedMessage = {
  role: "user" | "assistant";
  content: string;
}

export default function Interview() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [status, setStatus] = useState("Ready");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(true);
  const [transcriptMessages, setTranscriptMessages] = useState<SavedMessage[]>([]);
  const userName = "Eric";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const timerRef = useRef<TimerComponentHandle>(null);
  const setFeedback = useQuestionsStore((state) => state.setFeedback);
  const setTranscript = useQuestionsStore((state) => state.setTranscript);
  // ---
  // Why do we use transcriptRef?
  //
  // React event handlers (like those registered with Vapi) capture the values of variables (like transcriptMessages)
  // at the time the handler is created. If transcriptMessages changes later, the handler still "remembers" the old value.
  // This is called a closure issue. To always access the latest transcript, we use a ref (transcriptRef) that is kept in sync
  // with transcriptMessages using a useEffect. This way, event handlers can always read transcriptRef.current to get the
  // most up-to-date transcript, even if the handler was created earlier.
  // ---
  const transcriptRef = useRef<SavedMessage[]>([]);

  // Get questions from zustand store
  const questions = useQuestionsStore((state) => state.questions);

  // Helper to get the current question item
  const getCurrentQuestionItem = (): QuestionItem | null => {
    return questions[currentQuestionIndex] || null;
  };

  const currentItem = getCurrentQuestionItem();

  const jobPosition = currentItem ? currentItem.position : "React Engineer";

  const assistantOptions = getAssistantOptions(
    userName,
    jobPosition,
    currentItem ? currentItem.question : ""
  );

  const handleTimerComplete = () => {
    console.log("Timer complete");
    endCall();
  };

  // On mount, set to last question if available
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestionIndex(questions.length - 1);
    }
  }, []); // Only run on mount

  useEffect(() => {
    console.log("Transcript messages:", transcriptMessages);
  }, [transcriptMessages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@vapi-ai/web").then((module) => {
        const Vapi = module.default;
        const apiKey = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!;

        if (!apiKey) {
          setErrorMessage("Api key is missing");
          setStatus("Error");
          setIsApiKeyValid(false);
          return;
        }

        // Initialize Vapi
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);
        setIsApiKeyValid(true);

        // Set up event listeners
        vapiInstance.on("call-start", () => {
          setIsConnecting(false);
          setIsConnected(true);
          setErrorMessage("");
          setStatus("Connected");
        });

        vapiInstance.on("call-end", () => {
          setIsConnecting(false);
          setIsConnected(false);
          setStatus("Call ended");
          console.log("Transcript messages (from ref):", transcriptRef.current);
          setTranscript(transcriptRef.current);
          // Example: Advance to next question after call ends
          // setCurrentQuestionIndex((prev) => prev + 1);
        });

        vapiInstance.on("speech-start", () => {
          setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
          setIsSpeaking(false);
        });

        vapiInstance.on("volume-level", (level) => {
          setVolumeLevel(level);
        });
        vapiInstance.on("message", (message) => {
          if (
            message.type === "transcript" &&
            message.transcriptType === "final"
          ) {
            const newMessage = {
              role: message.role,
              content: message.transcript,
            };
            console.log("New message:", newMessage);
            setTranscriptMessages((prev) => [...prev,newMessage]);
          }
        });

        vapiInstance.on("error", (error) => {
          console.error("Vapi error:", error);
          setIsConnecting(false);

          // Handle different types of errors
          if (error?.error?.message?.includes("card details")) {
            setErrorMessage(
              "Payment required. Visit the Vapi dashboard to set up your payment method."
            );
          } else if (
            error?.error?.statusCode === 401 ||
            error?.error?.statusCode === 403
          ) {
            // API key is invalid - update state
            setErrorMessage(
              "API key is invalid. Please check your environment variables."
            );
            setIsApiKeyValid(false);
          } else {
            setErrorMessage(error?.error?.message || "An error occurred");
          }

          setStatus("Error");
        });
      });
    }

    // Cleanup function
    return () => {
      if (vapi) {
        vapi.stop();
      }
    };
  }, []);

  useEffect(() => {
    transcriptRef.current = transcriptMessages;
  }, [transcriptMessages]);

  // Start call function - no need to recheck API key
  const startCall = () => {
    if (!isApiKeyValid) {
      setErrorMessage("Cannot start call: API key is invalid or missing.");
      return;
    }

    setIsConnecting(true);
    setStatus("Connecting...");
    setErrorMessage("");

    timerRef.current?.start();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vapi?.start(assistantOptions as any);
  };

  // End call function
  const endCall = () => {
    console.log("Ending call");
    timerRef.current?.reset();
    if (vapi) {
      vapi.stop();
    }
    setTranscript(transcriptRef.current);
    handleGenerateFeedback();
  };

  // Generate feedback
  const handleGenerateFeedback = async () => {
    console.log("Generating feedback");
    try {
      const interviewId = '1234';
      const userId = '1234';
      const feedback = await generateFeedback({ interviewId, userId, transcript: transcriptRef.current });
      console.log("Feedback:", feedback);
      if (feedback && typeof feedback === 'object' && !('error' in feedback)) {
        setFeedback(feedback);
      }
    } catch (error) {
      console.error("Failed to generate feedback:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl gap-4">
      <h1 className="text-2xl font-bold capitalize">{jobPosition} Interview</h1>

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
            onClick={isConnected ? endCall : startCall}
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

          <p>Is Connected: {isConnected ? "Yes" : "No"}</p>
          <p>Is Speaking: {isSpeaking ? "Yes" : "No"}</p>
        </CardContent>
        <CardFooter>
          <div>
            <p>
              <strong>Question:</strong>{" "}
              {currentItem ? currentItem.question : "No questions available."}
            </p>
            <p>
              <strong>Answer:</strong> {currentItem ? currentItem.answer : "-"}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
