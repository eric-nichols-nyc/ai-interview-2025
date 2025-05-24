"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface TimerComponentProps {
  mode: "up" | "down"
  initialMinutes?: number
  initialSeconds?: number
  compact?: boolean
  onComplete?: () => void
}

export function TimerComponent({ mode, initialMinutes, initialSeconds, compact, onComplete }: TimerComponentProps) {
  // Calculate initial time in seconds
  const getInitialTime = () => {
    const mins = typeof initialMinutes === "number" ? initialMinutes : mode === "down" ? 1 : 0
    const secs = typeof initialSeconds === "number" ? initialSeconds : 0
    return mins * 60 + secs
  }

  const [time, setTime] = useState(getInitialTime())
  const [isRunning, setIsRunning] = useState(false)
  const [countdownStart, setCountdownStart] = useState(getInitialTime())
  const [inputMinutes, setInputMinutes] = useState((typeof initialMinutes === "number" ? initialMinutes : mode === "down" ? 1 : 0).toString())
  const [inputSeconds, setInputSeconds] = useState((typeof initialSeconds === "number" ? initialSeconds : 0).toString())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [hasCompleted, setHasCompleted] = useState(false)

  // Update time when mode or initial values change
  useEffect(() => {
    setIsRunning(false)
    const newInitial = getInitialTime()
    if (mode === "up") {
      setTime(newInitial)
      setInputMinutes((typeof initialMinutes === "number" ? initialMinutes : 0).toString())
      setInputSeconds((typeof initialSeconds === "number" ? initialSeconds : 0).toString())
    } else {
      setTime(newInitial)
      setCountdownStart(newInitial)
      setInputMinutes((typeof initialMinutes === "number" ? initialMinutes : 1).toString())
      setInputSeconds((typeof initialSeconds === "number" ? initialSeconds : 0).toString())
    }
  }, [mode, initialMinutes, initialSeconds])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60)
    const secs = Math.abs(seconds) % 60
    const sign = seconds < 0 ? "-" : ""
    return `${sign}${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Start/pause timer
  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false)
    if (mode === "up") {
      setTime(getInitialTime())
    } else {
      setTime(countdownStart)
    }
  }

  // Set countdown time
  const setCountdownTime = () => {
    const minutes = Number.parseInt(inputMinutes) || 0
    const seconds = Number.parseInt(inputSeconds) || 0
    const totalSeconds = minutes * 60 + seconds
    setCountdownStart(totalSeconds)
    if (mode === "down") {
      setTime(totalSeconds)
    }
  }

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (mode === "up") {
            return prevTime + 1
          } else {
            const newTime = prevTime - 1
            if (newTime <= 0) {
              setIsRunning(false)
              return 0
            }
            return newTime
          }
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, mode])

  // Call onComplete when countdown reaches zero
  useEffect(() => {
    if (mode === "down" && time === 0 && !hasCompleted) {
      setHasCompleted(true)
      if (onComplete) onComplete()
    }
    if (mode === "down" && time > 0 && hasCompleted) {
      setHasCompleted(false)
    }
  }, [mode, time, onComplete, hasCompleted])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center">
      {compact ? (
        <div className="text-6xl font-mono font-bold text-gray-800">
          {formatTime(time)}
        </div>
      ) : (
        <Card className="w-full max-w-md">
          <CardContent className="space-y-6">
            {mode === "up" ? (
              <div className="text-center">
                <div className="text-6xl font-mono font-bold text-gray-800 mb-4">{formatTime(time)}</div>
                <p className="text-sm text-gray-600">Stopwatch Mode</p>
              </div>
            ) : (
              <>
                <div className="hidden space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minutes">Minutes</Label>
                      <Input
                        id="minutes"
                        type="number"
                        min="0"
                        max="59"
                        value={inputMinutes}
                        onChange={(e) => setInputMinutes(e.target.value)}
                        disabled={isRunning}
                      />
                    </div>
                    <div>
                      <Label htmlFor="seconds">Seconds</Label>
                      <Input
                        id="seconds"
                        type="number"
                        min="0"
                        max="59"
                        value={inputSeconds}
                        onChange={(e) => setInputSeconds(e.target.value)}
                        disabled={isRunning}
                      />
                    </div>
                  </div>
                  <Button onClick={setCountdownTime} variant="outline" className="w-full" disabled={isRunning}>
                    Set Time
                  </Button>
                </div>
                <div className="text-center">
                  <div
                    className={`text-6xl font-mono font-bold mb-4 ${
                      time <= 10 && time > 0 ? "text-red-600" : time === 0 ? "text-red-700" : "text-gray-800"
                    }`}
                  >
                    {formatTime(time)}
                  </div>
                  <p className="text-sm text-gray-600">{time === 0 ? "Time's up!" : "Countdown Mode"}</p>
                </div>
              </>
            )}
            <div className="flex justify-center gap-4">
              <Button
                onClick={toggleTimer}
                size="lg"
                className="flex items-center gap-2"
                disabled={mode === "down" && time === 0}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Start
                  </>
                )}
              </Button>

              <Button onClick={resetTimer} variant="outline" size="lg" className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
