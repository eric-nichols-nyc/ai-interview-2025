"use client";
import React, { useState, createContext, useContext, useCallback, Children, cloneElement, ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, AnimatePresence, MotionProps } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define carousel context type
interface CarouselContextType {
  currentIndex: number;
  slideCount: number;
  handleNext: () => void;
  handlePrevious: () => void;
  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;
}

// Create context for carousel state
const CarouselContext = createContext<CarouselContextType | null>(null);

// Custom hook to use carousel context with type safety
const useCarouselContext = (): CarouselContextType => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel compound components must be used within a Carousel component');
  }
  return context;
};

// Props for main Carousel component
interface CarouselProps {
  children: ReactNode;
  className?: string;
}

// Main Carousel component that manages state
const Carousel: React.FC<CarouselProps> & {
  Slides: React.FC<SlidesProps>;
  Slide: React.FC<SlideProps>;
  NextButton: React.FC<ButtonProps>;
  PreviousButton: React.FC<ButtonProps>;
  Indicators: React.FC<IndicatorsProps>;
} = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const childrenArray = Children.toArray(children);
  const slideCount = childrenArray.length;

  const handleNext = useCallback(() => {
    if (!isAnimating) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }
  }, [slideCount, isAnimating]);

  const handlePrevious = useCallback(() => {
    if (!isAnimating) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
    }
  }, [slideCount, isAnimating]);

  const contextValue: CarouselContextType = {
    currentIndex,
    slideCount,
    handleNext,
    handlePrevious,
    isAnimating,
    setIsAnimating,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={`relative w-full h-full rounded-lg overflow-hidden ${className || ''}`}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

// Props for Slides component
interface SlidesProps {
  children: ReactNode;
  className?: string;
}

// Carousel.Slides component to contain all slides
const Slides: React.FC<SlidesProps> = ({ children, className }) => {
  const { currentIndex } = useCarouselContext();
  
  return (
    <div className={`w-full h-full relative ${className || ''}`}>
      <AnimatePresence initial={false} mode="popLayout">
        {Children.map(children, (child, index) => {
          if (React.isValidElement(child) && index === currentIndex) {
            return cloneElement(child, {
              key: index,
            });
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
};

// Props for Slide component
interface SlideProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

// Individual Slide component
const Slide: React.FC<SlideProps> = ({ children, className, ...props }) => {
  const { setIsAnimating } = useCarouselContext();
  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full ${className || ''}`}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Props for button components
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

// Next button component
const NextButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  const { handleNext, isAnimating } = useCarouselContext();
  
  return (
    <Button 
      onClick={handleNext}
      className={`bg-white text-black hover:bg-gray-200 flex items-center gap-2 absolute bottom-6 right-6 ${className || ''}`}
      type="button"
      disabled={isAnimating}
      {...props}
    >
      Next
      <ChevronRight size={18} />
    </Button>
  );
};

// Previous button component
const PreviousButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  const { handlePrevious, isAnimating } = useCarouselContext();
  
  return (
    <Button 
      onClick={handlePrevious}
      className={`bg-white text-black hover:bg-gray-200 flex items-center gap-2 absolute bottom-6 left-24 ${className || ''}`}
      type="button"
      disabled={isAnimating}
      {...props}
    >
      <ChevronLeft size={18} />
      Previous
    </Button>
  );
};

// Props for indicators component
interface IndicatorsProps {
  className?: string;
}

// Indicators for slide position
const Indicators: React.FC<IndicatorsProps> = ({ className, ...props }) => {
  const { currentIndex, slideCount } = useCarouselContext();
  
  return (
    <div className={`absolute bottom-6 left-6 flex gap-2 ${className || ''}`} {...props}>
      {Array.from({ length: slideCount }, (_, index) => (
        <div 
          key={index} 
          className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
        />
      ))}
    </div>
  );
};

// Attach sub-components to Carousel
Carousel.Slides = Slides;
Carousel.Slide = Slide;
Carousel.NextButton = NextButton;
Carousel.PreviousButton = PreviousButton;
Carousel.Indicators = Indicators;

// Example usage
export default function CarouselDemo() {
  return (
    <div className="w-full max-w-md mx-auto" style={{ width: '400px', height: '600px' }}>
      <Carousel>
        <Carousel.Slides>
          <Carousel.Slide>
            <div className="bg-blue-500 w-full h-full flex items-center justify-center">
              <h2 className="text-white text-4xl font-bold">Slide 1</h2>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="bg-red-500 w-full h-full flex items-center justify-center">
              <h2 className="text-white text-4xl font-bold">Slide 2</h2>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="bg-green-500 w-full h-full flex items-center justify-center">
              <h2 className="text-white text-4xl font-bold">Slide 3</h2>
            </div>
          </Carousel.Slide>
          <Carousel.Slide>
            <div className="bg-purple-500 w-full h-full flex items-center justify-center">
              <h2 className="text-white text-4xl font-bold">Slide 4</h2>
            </div>
          </Carousel.Slide>
        </Carousel.Slides>
        <Carousel.NextButton />
        <Carousel.PreviousButton />
        <Carousel.Indicators />
      </Carousel>
    </div>
  );
}