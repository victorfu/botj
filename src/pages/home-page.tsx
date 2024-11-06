import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [answer, setAnswer] = useState<string>("");

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

  return (
    <div>
      <div>
        Home Page <Link to="/settings">Settings</Link>
      </div>

      <div>
        <button onClick={chat}>Chat</button>
        {answer && answer !== "" && (
          <div>
            <span>Answer: </span>
            <span>{answer}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
