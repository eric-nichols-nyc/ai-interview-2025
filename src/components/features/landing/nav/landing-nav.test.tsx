// eslint-disable-next-line react/display-name
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import LandingNav from "./landing-nav";
import { describe, it, expect, vi } from "vitest";

// Mock next/link to avoid errors in test environment
vi.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return {
    default: ({ children, ...props }: { children: ReactNode }) => <a {...props}>{children}</a>,
  };
});

// Mock lucide-react Brain icon
vi.mock("lucide-react", () => ({
  Brain: () => <svg data-testid="brain-icon" />,
}));

describe("LandingNav", () => {
  it("renders InterviewAI brand text", () => {
    render(<LandingNav />);
    expect(screen.getByText("InterviewAI")).toBeInTheDocument();
    expect(screen.getByTestId("brain-icon")).toBeInTheDocument();
  });
}); 