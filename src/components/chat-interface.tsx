import { useState } from "react";

export const ChatInterface = () => {
  const [question, setQuestion] = useState<string>("Hello, nice to meet you!");
  const [answer, setAnswer] = useState<string>("");

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

  return (
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
  );
};
