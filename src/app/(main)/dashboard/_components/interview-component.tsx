'use client'
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
const INITIAL_QUESTION = 'Tell me about yourself.';

const InterviewComponent = () => {
  const [conversation, setConversation] = useState([
    { role: 'interviewer', text: INITIAL_QUESTION }
  ]);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const audioRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [answerAudioUrl, setAnswerAudioUrl] = useState<string | null>(null);

  // Use speech synthesis to speak the AI question
  const speakResponse = async (text: string) => {
    console.log('speaking');
    try {
      // Call your own API route, not ElevenLabs directly!
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error('Error with text-to-speech:', error);
      // Fallback to browser's speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Initialize Deepgram connection
  const initializeDeepgram = async () => {
    const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY!;
    try {
      const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
        'token',
        deepgramApiKey,
      ]);
      socket.onopen = () => {
        const params = {
          sample_rate: 16000,
          encoding: 'linear16',
          channels: 1,
          language: 'en',
          model: 'novaaura-asteria-en',
          smart_format: true,
          interim_results: true,
        };
        socket.send(JSON.stringify({ type: 'start', parameters: params }));
      };
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'Results') {
          const received = data.channel.alternatives[0];
          if (received.transcript && received.confidence > 0.7) {
            setTranscript(prev => prev + ' ' + received.transcript);
          }
        }
      };
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      socket.onclose = () => {
        console.log('Connection closed');
      };
      socketRef.current = socket;
    } catch (error) {
      console.error('Failed to initialize Deepgram:', error);
    }
  };

  // Start recording and listening (and speak the question)
  const startListening = async () => {
    try {
      // Speak the question
      await speakResponse(INITIAL_QUESTION);

      // Request mic permission and start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      await initializeDeepgram();
      audioChunksRef.current = []; // Reset chunks before starting
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data); // Save chunk
          if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(event.data);
          }
        }
      };
      mediaRecorder.start(250); // Collect data every 250ms
      setIsListening(true);
    } catch (error) {
      console.error('Error starting audio recording:', error);
    }
  };

  // Stop recording and listening
  const stopListening = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (audioRef.current) audioRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    if (socketRef.current) socketRef.current.close();
    setIsListening(false);
    // Prepare the answer audio for playback
    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAnswerAudioUrl(audioUrl);
      audioChunksRef.current = []; // Reset for next recording
    }
    processTranscript();
  };

  // Process transcript and get next interviewer question
  const processTranscript = async () => {
    try {
      const updatedConversation = [
        ...conversation,
        { role: 'candidate', text: transcript }
      ];
      setConversation(updatedConversation);
      const response = await fetch('/api/interview-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation: updatedConversation }),
      });
      const data = await response.json();
      setConversation([
        ...updatedConversation,
        { role: 'interviewer', text: data.response }
      ]);
      setTranscript('');
      speakResponse(data.response);
    } catch (error) {
      console.error('Error processing transcript:', error);
    }
  };

  return (
    <div className="interview-container">
      <h2>AI Interview Session</h2>
      <div className="interviewer-question">
        <h3>Interviewer:</h3>
        <p>{conversation[conversation.length - 1].role === 'interviewer'
          ? conversation[conversation.length - 1].text
          : conversation[conversation.length - 2]?.text}</p>
      </div>
      <div className="controls">
        {!isListening ? (
          <Button onClick={startListening}>Start Interview</Button>
        ) : (
          <Button onClick={stopListening}>Stop Answer</Button>
        )}
      </div>
      <div className="transcript-container">
        <h3>Your Answer:</h3>
        <p>{transcript}</p>
      </div>
      {/* Audio player for user's answer */}
      {answerAudioUrl && (
        <div className="answer-audio-player">
          <h4>Playback Your Answer:</h4>
          <audio controls src={answerAudioUrl} />
        </div>
      )}
      <div className="conversation-history">
        <h4>Conversation History:</h4>
        <ul>
          {conversation.map((turn, idx) => (
            <li key={idx}><b>{turn.role === 'interviewer' ? 'Interviewer' : 'You'}:</b> {turn.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InterviewComponent;