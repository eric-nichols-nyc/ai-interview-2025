import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { CreateSlide } from "./create-slide";

// Mock shadcn/ui Select component's portal behavior if needed

describe("CreateSlide", () => {
  it("shows error messages when submitting empty form", () => {
    render(<CreateSlide />);
    fireEvent.click(screen.getByText(/generate question/i));
    expect(screen.getByText(/string must contain at least 1 character/i)).toBeInTheDocument();
    // Only 'type' error message may differ if select is not interacted with
  });

  it("removes error messages when form is valid", () => {
    render(<CreateSlide />);
    fireEvent.change(screen.getByPlaceholderText(/position/i), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: "A description" } });
    // Open select and choose 'Text'
    fireEvent.mouseDown(screen.getByText(/select a type/i));
    fireEvent.click(screen.getByText(/text/i));
    fireEvent.click(screen.getByText(/generate question/i));
    expect(screen.queryByText(/string must contain at least 1 character/i)).not.toBeInTheDocument();
  });
}); 