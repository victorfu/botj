import CaptureOverlay from "../components/capture-overlay";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [answer, setAnswer] = useState<string>("");
  const [showOverlay, setShowOverlay] = useState(false);

  async function chat(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> {
    event.preventDefault();
    const answer = await api.chat([
      {
        role: "user",
        content: "Hello, world!",
      },
    ]);
    setAnswer(answer);
  }

  const handleCapture = async (bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    try {
      console.log(bounds);
      // Handle the captured image (save it, display it, etc.)
      setShowOverlay(false);
    } catch (error) {
      console.error("Failed to capture screen:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>

      <div className="mt-2">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={chat}
        >
          Chat
        </button>
        {answer && answer !== "" && (
          <div>
            <span>Answer: </span>
            <span>{answer}</span>
          </div>
        )}
      </div>

      <div className="mt-2">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setShowOverlay(true)}
        >
          Start Capture
        </button>
      </div>

      {showOverlay && (
        <CaptureOverlay
          onCapture={handleCapture}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
