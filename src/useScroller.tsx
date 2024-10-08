import { useEffect } from "react";
import { useStore } from "./useStore";

export const useScroller = () => {
  const currentQuote = useStore((state) => state.currentQuote);
  const showQuote = useStore((state) => state.showQuote);

  useEffect(() => {
    if (!showQuote) {
      document.scrollingElement?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (document.scrollingElement) {
      const element = document.scrollingElement;
      const isOverflowing = element.scrollHeight > element.clientHeight;

      if (isOverflowing) {
        const scrollHeight = element.scrollHeight;
        const height = element.clientHeight;
        const maxScrollTop = scrollHeight - height;
        let scrollTop = 0;

        const scroll = () => {
          scrollTop += 0.25;
          element.scrollTop = scrollTop;

          if (scrollTop >= maxScrollTop) {
            return;
          }

          requestAnimationFrame(scroll);
        };

        requestAnimationFrame(scroll);
      }
    }
  }, [currentQuote.length, showQuote]);
};
