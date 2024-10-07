import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { quotes } from "./quotes";

const getRandomQuoteInterval = () => {
  return (
    Math.floor(Math.random() * (MAX_DURATION * 2 - MIN_DURATION + 1)) +
    MIN_DURATION
  );
};

function App() {
  const [showQuote, setShowQuote] = useState(false);
  const [quoteInterval, setQuoteInterval] = useState(getRandomQuoteInterval());

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  // TODO scroll if overflow

  useEffect(() => {
    let timeout: number | undefined;

    const showRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      setCurrentQuote(quote);
      setShowQuote(true);

      // Calculate display duration based on quote length
      const displayDuration = Math.max(3000, quote.length * 100); // Minimum 2 seconds, then 50ms per character

      timeout = setTimeout(() => {
        setShowQuote(false);
        setQuoteInterval(getRandomQuoteInterval());
      }, displayDuration);
    };

    const timer = setTimeout(showRandomQuote, quoteInterval);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timer);
    };
  }, [quoteInterval]);

  return (
    <div
      style={{
        boxSizing: "border-box",
        fontSize: showQuote ? "5rem" : "10vw",
        display: "flex",
        padding: "1rem",
        flexWrap: "wrap",
        gap: "1vw",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      {showQuote ? (
        <p
          style={{
            width: "100%",
            textAlign: "justify",
            textJustify: "inter-word",
            letterSpacing: "0.5vw",
          }}
        >
          {currentQuote}
        </p>
      ) : (
        <Letter
          style={{
            margin: 0,
            rotate: "-90deg",
            width: "20vw",
            height: "20vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
    </div>
  );
}

const MAX_DURATION = 5000;
const MIN_DURATION = 3000;
const Letter = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const [index, setIndex] = useState(Math.floor(Math.random() * 26));

  const intervalTime = useMemo(() => {
    return (
      Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1)) +
      MIN_DURATION
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(() => Math.floor(Math.random() * 26));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [index, intervalTime]);

  return <h2 {...props}>{String.fromCharCode(65 + index).toUpperCase()}</h2>;
};

export default App;
