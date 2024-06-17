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
    setAnswer(answer.join(""));
  }

  async function openFile() {
    const filePaths = await api.openFile();
    console.log(filePaths);
  }

  return (
    <div>
      <div>
        Home Page <Link to="/settings">Settings</Link>
      </div>

      <div>
        <button onClick={openFile}>Open File</button>
      </div>
      <div>
        <button onClick={chat}>GPT3.5-Turbo</button>
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
