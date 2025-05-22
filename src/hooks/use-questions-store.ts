import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Helper to generate a random UUID (v4)
export function generateUUID() {
  // https://stackoverflow.com/a/2117523/2715716
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export interface QuestionItem {
  id: string; // Unique identifier for the question
  question: string;
  position: string;
  answer: string;
}

interface QuestionsStore {
  questions: QuestionItem[];
  setQuestions: (questions: QuestionItem[]) => void;
  addQuestion: (question: QuestionItem) => void;
  getQuestions: () => QuestionItem[];
  deleteQuestion: (id: string) => void;
}

export const useQuestionsStore = create<QuestionsStore>()(
  persist(
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
        deleteQuestion: (id) => {
          console.log('[QuestionsStore] deleteQuestion called with id:', id);
          set((state) => ({ questions: state.questions.filter(q => q.id !== id) }), false, 'deleteQuestion');
        },
      }),
      { name: 'QuestionsStore' }
    ),
    {
      name: 'questions-storage', // key in localStorage
    }
  )
); 