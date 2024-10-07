import { useEffect } from "react";
import { quotes } from "./quotes";
import { useStore, getRandomQuoteInterval } from "./useStore";

export const useQuoteSetter = () => {
  const quoteInterval = useStore((state) => state.quoteInterval);

  useEffect(() => {
    let timeout: number | undefined;

    const showRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      useStore.setState({ currentQuote: quote, showQuote: true });

      // Calculate display duration based on quote length
      const displayDuration = Math.max(2000, quote.length * 100); // Minimum 2 seconds, then ms per character

      timeout = setTimeout(() => {
        useStore.setState({
          showQuote: false,
          quoteInterval: getRandomQuoteInterval(),
        });
      }, displayDuration);
    };

    const timer = setTimeout(showRandomQuote, quoteInterval);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timer);
    };
  }, [quoteInterval]);
};
