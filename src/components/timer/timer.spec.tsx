import { render, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { TimerComponent, TimerComponentHandle } from "@/components/timer/timer";

describe("TimerComponent", () => {
  it("calls onComplete when countdown finishes", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    const ref = React.createRef<TimerComponentHandle>();

    render(
      <TimerComponent
        ref={ref}
        mode="down"
        initialSeconds={2}
        onComplete={onComplete}
      />
    );

    // Start the timer via the ref
    act(() => {
      ref.current?.start();
    });

    // Fast-forward time by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onComplete).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
