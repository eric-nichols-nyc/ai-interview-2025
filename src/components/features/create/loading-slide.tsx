import React from "react";

export function LoadingSlide({ isLoading, isError }: { isLoading: boolean; isError: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {isLoading && <div className="mt-4 animate-spin">🔄 Loading...</div>}
      {isError && <div className="mt-4 text-red-500">An error occurred. Please try again.</div>}
    </div>
  );
}