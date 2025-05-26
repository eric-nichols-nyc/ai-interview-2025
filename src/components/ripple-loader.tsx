"use client";

import { cn } from "@/lib/utils";

interface RippleLoadingProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "purple" | "orange";
  className?: string;
  text?: string;
}
export function RippleLoader({
  size = "md",
  color = "blue",
  className,
  text = "Loading",
}: RippleLoadingProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }[size];

  const colorClasses = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-8">
        <div className={cn("relative", sizeClasses, className)}>
          {/* Center dot */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
              colorClasses[color].replace("border-", "bg-")
            )}
          />

          {/* Ripple circles */}
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "border-2 rounded-full animate-ripple",
                colorClasses[color]
              )}
              style={{
                animationDelay: `${index * 0.6}s`,
                animationDuration: "1.8s",
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-2">{text}</p>
        </div>
      </div>
    </div>
  );
}
