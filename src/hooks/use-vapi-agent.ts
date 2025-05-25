// hooks/useVapiAgent.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

type SavedMessage = {
  role: "user" | "assistant";
  content: string;
};

type VapiAgentOptions = {
  apiKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assistantOptions: any;
  onCallStart?: () => void;
  onCallEnd?: (transcript: SavedMessage[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => void;
};

export const useVapiAgent = ({ 
  apiKey, 
  assistantOptions, 
  onCallStart, 
  onCallEnd, 
  onError 
}: VapiAgentOptions) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [status, setStatus] = useState("Ready");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(true);
  const [transcriptMessages, setTranscriptMessages] = useState<SavedMessage[]>([]);
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

  // Keep transcript ref in sync
  useEffect(() => {
    transcriptRef.current = transcriptMessages;
  }, [transcriptMessages]);

  // Initialize Vapi
  useEffect(() => {
    if (typeof window === "undefined" || !apiKey) {
      setErrorMessage("Api key is missing");
      setStatus("Error");
      setIsApiKeyValid(false);
      return;
    }

    import("@vapi-ai/web").then((module) => {
      const Vapi = module.default;
      const vapiInstance = new Vapi(apiKey);
      
      setVapi(vapiInstance);
      setIsApiKeyValid(true);

      // Set up event listeners
      vapiInstance.on("call-start", () => {
        setIsConnecting(false);
        setIsConnected(true);
        setErrorMessage("");
        setStatus("Connected");
        onCallStart?.();
      });

      vapiInstance.on("call-end", () => {
        setIsConnecting(false);
        setIsConnected(false);
        setStatus("Call ended");
        onCallEnd?.(transcriptRef.current);
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
          setTranscriptMessages((prev) => [...prev, newMessage]);
        }
      });

      vapiInstance.on("error", (error) => {
        console.error("Vapi error:", error);
        setIsConnecting(false);

        let errorMsg = "An error occurred";
        
        if (error?.error?.message?.includes("card details")) {
          errorMsg = "Payment required. Visit the Vapi dashboard to set up your payment method.";
        } else if (
          error?.error?.statusCode === 401 ||
          error?.error?.statusCode === 403
        ) {
          errorMsg = "API key is invalid. Please check your environment variables.";
          setIsApiKeyValid(false);
        } else {
          errorMsg = error?.error?.message || "An error occurred";
        }

        setErrorMessage(errorMsg);
        setStatus("Error");
        onError?.(error);
      });
    });

    return () => {
      if (vapi) {
        vapi.stop();
      }
    };
  }, [apiKey, onCallStart, onCallEnd, onError]);

  const startCall = useCallback(() => {
    if (!isApiKeyValid) {
      setErrorMessage("Cannot start call: API key is invalid or missing.");
      return;
    }

    setIsConnecting(true);
    setStatus("Connecting...");
    setErrorMessage("");
    setTranscriptMessages([]); // Reset transcript for new call

    vapi?.start(assistantOptions);
  }, [vapi, assistantOptions, isApiKeyValid]);

  const endCall = useCallback(() => {
    if (vapi) {
      vapi.stop();
    }
  }, [vapi]);

  return {
    // State
    status,
    isConnecting,
    isConnected,
    isSpeaking,
    volumeLevel,
    errorMessage,
    isApiKeyValid,
    transcriptMessages,
    
    // Actions
    startCall,
    endCall,
  };
};