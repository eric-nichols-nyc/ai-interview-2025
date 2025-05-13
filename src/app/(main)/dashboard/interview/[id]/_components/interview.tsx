"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import q from "../q.json";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";
export default function Interview() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [status, setStatus] = useState("Ready");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(true);
  const userName = "John Doe";
  const jobPosition = "React Engineer";

  // Pizza assistant configuration
const assistantOptions = {
    name: "AI Recruiter",
    firstMessage: `Hello ${userName}, how are you today? are you ready to start the interview for the ${jobPosition} position?`,
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `yOU ARE AN AI voice assistant conducting interviews. Your job is to ask candidates provided interview questions, assess their responses.
    
    Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
  Ask the question and wait for the candidate's response. Keep the question clear and concise. Below is the question to ask:
  Question:${q.questions[0]}
    
    
  Provide brief, encouraging feedback.
    
  If the candidate is struggling to answer the question, offer hints or rephrase the question without giving away the answer.
    
  If the candidate answers the question, congratulate them and move on to the next question.
    
    
  Keep the conversation natural.
    If the candidate goes off-topic or off-track and talks about anything but the
    process of answering the question, politely steer the conversation back to answering the question.
    
    Once you have all the information you need pertaining to their answer, you can
    end the conversation. You can say something like "Awesome, we'll have that ready
    for you in 10-20 minutes." to naturally let the candidate know the question has been
    fully communicated.
    
    It is important that you collect the answer in an efficient manner (succinct replies
    & direct questions). You only have 1 task here, and it is to collect the candidate
    answer, then end the conversation.
    
    Be sure to end on a positive note.

    - Be sure to be kind of funny and witty!
    - Keep all your responses short and simple. Use casual language, phrases like "Umm...", "Well...", and "I mean" are preferred.
    - This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
        },
      ],
    },
  };

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

  // Start call function - no need to recheck API key
  const startCall = () => {
    if (!isApiKeyValid) {
      setErrorMessage("Cannot start call: API key is invalid or missing.");
      return;
    }

    setIsConnecting(true);
    setStatus("Connecting...");
    setErrorMessage("");

    vapi?.start(assistantOptions as any);
  };

  // End call function
  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>AI Interview</h1>
      <div>
        <Image src="/jennifer.png" alt="logo" width={300} height={300} />
        <p>Status: {status}</p>
        {isConnected && (
          <div style={{ marginTop: "10px" }}>
            <p>
              {isSpeaking ? "Assistant is speaking" : "Assistant is listening"}
            </p>

            {/* Simple volume indicator */}
            <div className="flex gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: i / 10 < volumeLevel ? "#3ef07c" : "#444",
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

        <Button className="mt-4 cursor-pointer"
          onClick={isConnected ? endCall : startCall}
          disabled={isConnecting || !isApiKeyValid}
        //   style={{
        //     backgroundColor: isConnected ? "#f03e3e" : "white",
        //     color: isConnected ? "white" : "black",
        //     border: "none",
        //     borderRadius: "8px",
        //     padding: "12px 24px",
        //     fontSize: "16px",
        //     fontWeight: "500",
        //     cursor: isConnecting || !isApiKeyValid ? "not-allowed" : "pointer",
        //     opacity: isConnecting || !isApiKeyValid ? 0.7 : 1,
        //   }}
        >
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? "End Call"
            : "Start Interview"}
        </Button>
        <p>Is Connected: {isConnected ? "Yes" : "No"}</p>
        <p>Is Speaking: {isSpeaking ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}


