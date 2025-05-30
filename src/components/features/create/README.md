# Interview Creation Flow

This folder contains the components for the multi-step AI interview creation process, using a carousel UI and a global zustand store for interview questions.

## Steps Overview

1. **CreateSlide**: User fills out a form to generate an interview.
2. **LoadingSlide**: Shows a loading indicator while the interview is being generated (simulated with a timeout). Displays an error message if the API fails.
3. **ReadySlide**: Shows a success message and a button to start the interview.

## State Management with Zustand
- When questions are generated, they are stored in a global zustand store as an array of objects, each containing:
  - `question`: The question text
  - `position`: The job position for the interview
  - `answer`: The candidate's answer (initially empty)
- The zustand store is used throughout the interview process, including in the interview UI.
- The job position is now dynamic and is read from the current question in the store, ensuring the interview always reflects the correct position.

## Simulated API Logic
- When the form is submitted, the carousel advances to the loading slide.
- A simulated API call (using `setTimeout`) triggers:
  - On success, advances to the ready slide after a delay.
  - On error, displays an error message on the loading slide.
- You can toggle the `shouldError` variable in `generate-interview.tsx` to test error handling.

## Carousel Looping
- The carousel loops back to the first slide after the last slide, using a `MAX_SLIDE` constant.

## Component Props
- `LoadingSlide` receives `isLoading` and `isError` as props to control its display.

## Customization
- The success slide (`ReadySlide`) features a celebratory graphic, headline, and a styled link to start the interview.

---

Feel free to extend this flow or customize the UI as needed!
