import { create } from "zustand";
import { quotes } from "./quotes";

type State = {
  showQuote: boolean;
  quoteInterval: number;
  currentQuote: string;
};

type Action = {
  setShowQuote: (showQuote: boolean) => void;
  setQuoteInterval: (quoteInterval: number) => void;
  setCurrentQuote: (currentQuote: string) => void;
};

type Store = State & Action;

const MAX_DURATION = 4000;
const MIN_DURATION = 2000;

export const getRandomQuoteInterval = () => {
  return (
    Math.floor(Math.random() * (MAX_DURATION * 3 - MIN_DURATION * 3 + 1)) +
    MIN_DURATION * 3
  );
};

export const getRandomLetterInterval = () => {
  return (
    Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1)) + MIN_DURATION
  );
};

export const useStore = create<Store>((set) => ({
  showQuote: false,
  quoteInterval: getRandomQuoteInterval(),
  currentQuote: quotes[0],
  setShowQuote: (showQuote: boolean) => set({ showQuote }),
  setQuoteInterval: (quoteInterval: number) => set({ quoteInterval }),
  setCurrentQuote: (currentQuote: string) => set({ currentQuote }),
}));
