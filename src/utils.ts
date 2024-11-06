import axios from "axios";
import { app } from "electron";
import fs from "fs";

const statusUrl = "https://duckduckgo.com/duckchat/v1/status";
const chatUrl = "https://duckduckgo.com/duckchat/v1/chat";
const headers = {
  "User-Agent": "PostmanRuntime/7.39.0",
  Accept: "text/event-stream",
  "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
  "Accept-Encoding": "gzip, deflate, br",
  Referer: "https://duckduckgo.com/",
  "Content-Type": "application/json",
  Origin: "https://duckduckgo.com",
  Connection: "keep-alive",
  Cookie: "dcm=1",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  Pragma: "no-cache",
  TE: "trailers",
};

export async function ddgChat(messages: { role: string; content: string }[]) {
  try {
    const response = await axios.get(statusUrl, {
      headers: {
        "x-vqd-accept": "1",
        ...headers,
      },
    });

    if (response.status !== 200) {
      console.error(`Status request failed: ${response.status}`);
      return;
    }

    const vqd4 = response.headers["x-vqd-4"];
    if (!vqd4) {
      console.error("VQD-4 header not found");
      return;
    }

    const payload = JSON.stringify({
      model: "gpt-4o-mini",
      messages: messages,
    });

    const chatResponse = await axios.post(chatUrl, payload, {
      headers: {
        "x-vqd-4": vqd4,
        ...headers,
      },
    });

    if (chatResponse.status !== 200) {
      console.error(`Chat request failed: ${chatResponse.status}`);
      return;
    }

    const result: string[] = [];
    const lines = chatResponse.data.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const chunk = line.slice(6);
        if (chunk === "[DONE]") {
          break;
        }
        try {
          const data = JSON.parse(chunk);
          // const id = data.id || "";
          // const created = data.created || 0;
          // const model = data.model || "";
          const resultContent = data.message || "";
          result.push(resultContent);
        } catch (error) {
          continue;
        }
      }
    }
    console.log(`Chat result: ${result.join("")}`);
    return result;
  } catch (error) {
    console.error(`Status request error: ${error}`);
  }
}

export function save(dataURL: string) {
  const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
  const tmpFolder = app.getPath("temp");
  const timestamp = new Date().getTime();
  const filePath = `${tmpFolder}screenshot-${timestamp}.png`;
  fs.writeFile(filePath, base64Data, "base64", (err) => {
    if (err) console.error(err);
    else console.log(`Saved to ${filePath}`);
  });
}
