import React from "react";
import { RippleLoader } from "@/components/ripple-loader";
export function LoadingSlide({ isLoading, isError }: { isLoading: boolean; isError: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
        {isLoading && <RippleLoader size="lg" color="blue" text="Generating Interview" />}
        {isError && <div className="mt-4 text-red-500">An error occurred. Please try again.</div>}
    </div>
  );
}