import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Carousel, CarouselSlides, CarouselSlide, CarouselNextButton, CarouselPreviousButton, CarouselIndicators, CarouselHandle } from '../index';

function setupCarouselWithRef() {
  const ref = React.createRef<CarouselHandle>();
  render(
    <Carousel ref={ref} slideCount={3}>
      <CarouselSlides>
        <CarouselSlide>Slide 1</CarouselSlide>
        <CarouselSlide>Slide 2</CarouselSlide>
        <CarouselSlide>Slide 3</CarouselSlide>
      </CarouselSlides>
      <CarouselNextButton />
      <CarouselPreviousButton />
      <CarouselIndicators />
    </Carousel>
  );
  return ref;
}

describe('Carousel', () => {
  it('renders the Carousel and slides', () => {
    render(
      <Carousel slideCount={3}>
        <CarouselSlides>
          <CarouselSlide>Slide 1</CarouselSlide>
          <CarouselSlide>Slide 2</CarouselSlide>
          <CarouselSlide>Slide 3</CarouselSlide>
        </CarouselSlides>
        <CarouselNextButton />
        <CarouselPreviousButton />
        <CarouselIndicators />
      </Carousel>
    );
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.queryByText('Slide 2')).not.toBeInTheDocument();
  });

  it('nextSlide method advances the slide', () => {
    const ref = setupCarouselWithRef();
    // Initially, only Slide 1 is visible
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.queryByText('Slide 2')).not.toBeInTheDocument();
    // Call nextSlide
    ref.current?.nextSlide();
    // After advancing, Slide 2 should be visible
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('previousSlide method goes to the last slide from the first', () => {
    const ref = setupCarouselWithRef();
    // Call previousSlide
    ref.current?.previousSlide();
    // Should wrap to last slide
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('goToSlide method jumps to a specific slide', () => {
    const ref = setupCarouselWithRef();
    ref.current?.goToSlide(2);
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });
}); 