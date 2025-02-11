import { ipcMain } from "electron";
import { handleFileOpen } from "./dialog";
import { CHAT, OPEN_FILE } from "./constants";
import { ddgChat } from "./utils";

export function registerIpc() {
  ipcMain.handle(OPEN_FILE, handleFileOpen);
  ipcMain.handle(CHAT, async (event, messages) => {
    const chatPromise = new Promise((resolve) => {
      ddgChat(messages).then((answer) => {
        resolve(answer);
      });
    });
    return await chatPromise;
  });
}
