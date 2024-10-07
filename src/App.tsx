import "./App.css";
import { useStore } from "./useStore";
import { useQuoteSetter } from "./useQuoteSetter";
import { useScroller } from "./useScroller";
import { Letter } from "./Letter";

function App() {
  const showQuote = useStore((state) => state.showQuote);
  const currentQuote = useStore((state) => state.currentQuote);

  useQuoteSetter();
  useScroller();

  return (
    <div
      style={{
        boxSizing: "border-box",
        fontSize: "50vmin",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
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
          <br />
          <span
            style={{
              fontSize: "1rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: "1rem",
            }}
          >
            Jenny Holzer
          </span>
        </p>
      ) : (
        <Letter
          style={{
            margin: 0,
            lineHeight: "1em",
            transform: "rotate(-90deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
    </div>
  );
}

export default App;
