import { useState, useEffect } from "react";
import { getRandomLetterInterval } from "./useStore";

export const Letter = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const [index, setIndex] = useState(Math.floor(Math.random() * 26));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(() => Math.floor(Math.random() * 26));
    }, getRandomLetterInterval());

    return () => clearInterval(interval);
  }, [index]);

  return <h2 {...props}>{String.fromCharCode(65 + index).toUpperCase()}</h2>;
};
