import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface QuestionItem {
  question: string;
  position: string;
  answer: string;
}

interface QuestionsStore {
  questions: QuestionItem[];
  setQuestions: (questions: QuestionItem[]) => void;
  addQuestion: (question: QuestionItem) => void;
  getQuestions: () => QuestionItem[];
}

export const useQuestionsStore = create<QuestionsStore>()(
  devtools(
    (set, get) => ({
      questions: [],
      setQuestions: (questions) => {
        console.log('[QuestionsStore] setQuestions called with:', questions);
        set({ questions }, false, 'setQuestions');
      },
      addQuestion: (question) => {
        console.log('[QuestionsStore] addQuestion called with:', question);
        set((state) => ({ questions: [...state.questions, question] }), false, 'addQuestion');
      },
      getQuestions: () => {
        const qs = get().questions;
        console.log('[QuestionsStore] getQuestions called, returning:', qs);
        return qs;
      },
    }),
    { name: 'QuestionsStore' }
  )
); 