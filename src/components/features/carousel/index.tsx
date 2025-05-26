"use client";
import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  Children,
  cloneElement,
  ReactNode,
  ButtonHTMLAttributes,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion, AnimatePresence, MotionProps } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
    throw new Error(
      "Carousel compound components must be used within a Carousel component"
    );
  }
  return context;
};

// Props for main Carousel component
interface CarouselProps {
  children: ReactNode;
  className?: string;
  /**
   * Optional: Set the number of slides manually. If not provided, Carousel will count CarouselSlides' children.
   */
  slideCount: number;
  /**
   * Optional: Set the width of the carousel (e.g., '400px', '100%').
   */
  width?: string | number;
  /**
   * Optional: Set the height of the carousel (e.g., '600px', '100%').
   */
  height?: string | number;
}

export interface CarouselHandle {
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
}

const Carousel = forwardRef<CarouselHandle, CarouselProps>(
  ({ children, className, slideCount: slideCountProp, width, height }, ref) => {
    console.log("Carousel rendered");
    // Use slideCount prop if provided, otherwise count CarouselSlides' children
    let slideCount = slideCountProp ?? 0;
    if (slideCountProp == null) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === CarouselSlides) {
          console.log("[Carousel] child is CarouselSlides");
          const props = child.props as { children?: React.ReactNode };
          slideCount = React.Children.count(props.children);
        }
      });
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    console.log(
      "[Carousel] Rendered with slideCount:",
      slideCount,
      "currentIndex:",
      currentIndex,
      "isAnimating:",
      isAnimating
    );

    const handleNext = useCallback(() => {
      console.log(
        "[Carousel] handleNext called. isAnimating:",
        isAnimating,
        "slideCount:",
        slideCount
      );
      if (!isAnimating && slideCount > 0) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % slideCount;
          console.log("[Carousel] handleNext setCurrentIndex:", nextIndex);
          return nextIndex;
        });
      }
    }, [slideCount, isAnimating]);

    const handlePrevious = useCallback(() => {
      console.log(
        "[Carousel] handlePrevious called. isAnimating:",
        isAnimating,
        "slideCount:",
        slideCount
      );
      if (!isAnimating && slideCount > 0) {
        setCurrentIndex((prevIndex) => {
          const prev = (prevIndex - 1 + slideCount) % slideCount;
          console.log("[Carousel] handlePrevious setCurrentIndex:", prev);
          return prev;
        });
      }
    }, [slideCount, isAnimating]);

    useImperativeHandle(
      ref,
      () => ({
        nextSlide: handleNext,
        previousSlide: handlePrevious,
        goToSlide: (index: number) => {
          if (
            !isAnimating &&
            slideCount > 0 &&
            index >= 0 &&
            index < slideCount
          ) {
            setCurrentIndex(index);
          }
        },
      }),
      [handleNext, handlePrevious, isAnimating, slideCount]
    );

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
        <div
          className={`border-white/20 border-2 relative w-full h-full rounded-lg overflow-hidden ${
            className || ""
          }`}
          style={{ width, height }}
        >
          {/* Progress bar at the top */}
          <div className="absolute top-0 left-0 w-full z-20">
            <Progress
              value={
                slideCount > 0 ? ((currentIndex + 1) / slideCount) * 100 : 0
              }
            />
          </div>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

// Props for Slides component
interface SlidesProps {
  children: ReactNode;
  className?: string;
}

// CarouselSlides component to contain all slides
const CarouselSlides: React.FC<SlidesProps> = ({ children, className }) => {
  const { currentIndex } = useCarouselContext();
  return (
    <div className={`w-full h-full relative ${className || ""}`}>
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
CarouselSlides.displayName = "CarouselSlides";

// Props for Slide component
interface SlideProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

// Individual Slide component
const CarouselSlide: React.FC<SlideProps> = ({
  children,
  className,
  ...props
}) => {
  const { setIsAnimating } = useCarouselContext();
  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full ${className || ""}`}
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
const CarouselNextButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  const { handleNext, isAnimating } = useCarouselContext();
  console.log("[CarouselNextButton] Rendered. isAnimating:", isAnimating);
  return (
    <Button
      onClick={() => {
        console.log("[CarouselNextButton] Clicked");
        handleNext();
      }}
      className={`bg-white text-black hover:bg-gray-200 flex items-center gap-2 absolute top-1/2 -translate-y-1/2 right-0 ${
        className || ""
      }`}
      type="button"
      disabled={isAnimating}
      {...props}
    >
      <ChevronRight size={18} />
    </Button>
  );
};

// Previous button component
const CarouselPreviousButton: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  const { handlePrevious, isAnimating } = useCarouselContext();
  console.log("[CarouselPreviousButton] Rendered. isAnimating:", isAnimating);
  return (
    <Button
      onClick={() => {
        console.log("[CarouselPreviousButton] Clicked");
        handlePrevious();
      }}
      className={`bg-white text-black hover:bg-gray-200 flex items-center gap-2 absolute top-1/2 -translate-y-1/2 left-0 ${
        className || ""
      }`}
      type="button"
      disabled={isAnimating}
      {...props}
    >
      <ChevronLeft size={18} />
    </Button>
  );
};

// Props for indicators component
interface IndicatorsProps {
  className?: string;
}

// Indicators for slide position
const CarouselIndicators: React.FC<IndicatorsProps> = ({
  className,
  ...props
}) => {
  const { currentIndex, slideCount } = useCarouselContext();

  return (
    <div
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 ${
        className || ""
      }`}
      {...props}
    >
      {Array.from({ length: slideCount }, (_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${
            currentIndex === index ? "bg-white" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
};

export {
  Carousel,
  CarouselSlides,
  CarouselSlide,
  CarouselNextButton,
  CarouselPreviousButton,
  CarouselIndicators,
};
