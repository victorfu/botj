import CaptureOverlay from "../components/capture-overlay";
import { useState } from "react";

const HomePage = () => {
  const [question, setQuestion] = useState<string>("Hello, nice to meet you!");
  const [answer, setAnswer] = useState<string>("");

  const [capture, setCapture] = useState<string>("");
  const [showOverlay, setShowOverlay] = useState(false);

  async function chat(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> {
    event.preventDefault();
    const answer = await api.chat([
      {
        role: "user",
        content: question,
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

  const startCapture = async () => {
    const dataURL = await api.startCapture();
    setCapture(dataURL);
    setShowOverlay(true);
  };

  return (
    <div>
      <div className="mt-6 max-w-2xl mx-auto px-4">
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={chat}
          >
            Chat
          </button>
        </div>
        {answer && answer !== "" && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
            <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => startCapture()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          Start Capture
        </button>
      </div>

      {showOverlay && (
        <CaptureOverlay
          onCapture={handleCapture}
          onClose={() => setShowOverlay(false)}
        />
      )}

      {capture && <img src={capture} alt="Captured" />}
    </div>
  );
};

export default HomePage;
