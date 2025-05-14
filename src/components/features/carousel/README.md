# Carousel Component

A flexible, animated carousel component for React, featuring:
- Slide transitions with animation
- Next/Previous navigation buttons
- Slide indicators
- Progress bar (using shadcn/ui Progress)
- Imperative control via ref (nextSlide, previousSlide, goToSlide)
- Fully tested with Vitest

## Usage

```tsx
import React, { useRef } from 'react';
import {
  Carousel,
  CarouselSlides,
  CarouselSlide,
  CarouselNextButton,
  CarouselPreviousButton,
  CarouselIndicators,
  CarouselHandle
} from './index';

export default function Example() {
  const carouselRef = useRef<CarouselHandle>(null);

  return (
    <div>
      <button onClick={() => carouselRef.current?.nextSlide()}>
        Go to Next Slide (External)
      </button>
      <Carousel ref={carouselRef} slideCount={3}>
        <CarouselSlides>
          <CarouselSlide>Slide Interview Form</CarouselSlide>
          <CarouselSlide>Slide interview Cooking</CarouselSlide>
          <CarouselSlide>Slide interview ready</CarouselSlide>
        </CarouselSlides>
        <CarouselNextButton />
        <CarouselPreviousButton />
        <CarouselIndicators />
      </Carousel>
    </div>
  );
}
```

## API

### `<Carousel />` Props
- `slideCount?: number` — (optional) Set the number of slides manually. If not provided, the number of children in `<CarouselSlides>` is used.
- `ref` — (optional) Attach a ref to access imperative methods.

### Imperative Handle (`CarouselHandle`)
- `nextSlide(): void` — Advance to the next slide.
- `previousSlide(): void` — Go to the previous slide.
- `goToSlide(index: number): void` — Jump to a specific slide (0-based).

### Other Components
- `<CarouselSlides>` — Container for `<CarouselSlide>` elements.
- `<CarouselSlide>` — Individual slide content.
- `<CarouselNextButton>` — Button to go to the next slide.
- `<CarouselPreviousButton>` — Button to go to the previous slide.
- `<CarouselIndicators>` — Dots indicating the current slide.
- Progress bar is shown at the top, reflecting the current slide.

## Features
- Animated slide transitions
- Progress bar using [shadcn/ui Progress](https://ui.shadcn.com/docs/components/progress)
- Keyboard and button navigation
- Imperative control for advanced use cases
- Fully tested with Vitest (see `__tests__/carousel.test.tsx`)

## Testing

Run tests with:
```sh
npx vitest run src/components/features/carousel/__tests__/carousel.test.tsx
```

---

Feel free to customize and extend the carousel for your needs! 