# TimerComponent

A flexible and accessible React timer component supporting both count-up (stopwatch) and count-down (timer) modes. Includes imperative controls, customizable start time, and completion callbacks. Designed for use in interview, quiz, and productivity apps.

## Features

- **Count Up (Stopwatch) and Count Down (Timer) modes**
- **Customizable initial time** (minutes/seconds)
- **Imperative control** via `ref` (start, pause, reset)
- **onComplete callback** for countdown completion
- **Compact and Card UI modes**
- **Accessible and keyboard-friendly**
- **Tested with Vitest and React Testing Library**

---

## Installation

This component is part of the project. To use it, import from its path:

```tsx
import { TimerComponent, TimerComponentHandle } from "@/components/timer/timer";
```

---

## Props

| Prop            | Type                | Default | Description                                                      |
|-----------------|---------------------|---------|------------------------------------------------------------------|
| `mode`          | "up" \| "down"      | —       | Timer mode: count up (stopwatch) or count down (timer)           |
| `initialMinutes`| `number`            | 1 (down), 0 (up) | Initial minutes to start from                                    |
| `initialSeconds`| `number`            | 0       | Initial seconds to start from                                    |
| `compact`       | `boolean`           | false   | If true, renders a minimal timer display                         |
| `onComplete`    | `() => void`        | —       | Callback fired when countdown reaches zero (only in down mode)   |

---

## Imperative Handle (Ref API)

You can control the timer programmatically using a `ref`:

```tsx
const ref = React.createRef<TimerComponentHandle>();

<TimerComponent ref={ref} mode="down" initialSeconds={10} />;

// Start the timer:
ref.current?.start();
// Pause the timer:
ref.current?.pause();
// Reset the timer:
ref.current?.reset();
```

---

## Usage Examples

### Basic Count Up (Stopwatch)
```tsx
<TimerComponent mode="up" initialMinutes={0} initialSeconds={30} />
```

### Basic Count Down (Timer)
```tsx
<TimerComponent mode="down" initialMinutes={0} initialSeconds={15} onComplete={() => alert("Done!")} />
```

### Compact Mode
```tsx
<TimerComponent mode="down" initialMinutes={1} compact />
```

### Imperative Control Example
```tsx
const ref = React.useRef<TimerComponentHandle>(null);

<TimerComponent ref={ref} mode="down" initialSeconds={10} onComplete={() => alert("Time's up!")} />

// Start, pause, or reset the timer from code:
ref.current?.start();
ref.current?.pause();
ref.current?.reset();
```

---

## UI/UX
- **Card UI**: By default, the timer renders in a card with controls (start/pause, reset).
- **Compact UI**: Set `compact` to true for a minimal display (e.g., for overlays or status bars).
- **Countdown color**: Timer text turns red in the last 10 seconds, and darker red at zero.

---

## Testing

Unit tests are provided in `timer.spec.tsx` using Vitest and React Testing Library. Example:

```ts
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

  act(() => {
    ref.current?.start();
  });

  act(() => {
    vi.advanceTimersByTime(2000);
  });

  expect(onComplete).toHaveBeenCalled();
  vi.useRealTimers();
});
```

---

## Example in a Real App

```tsx
<TimerComponent
  mode="down"
  initialMinutes={1}
  compact={true}
  onComplete={() => console.log("Timer complete!")}
/>
```

---

## File Structure

- `timer.tsx` — Main component implementation
- `timer.spec.tsx` — Unit tests
- `README.md` — This documentation

---

## License

MIT (or project root license)
