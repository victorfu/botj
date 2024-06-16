import { ipcMain } from "electron";
import { handleFileOpen } from "./dialog";
import { ddgChat } from "./utils";

export function initIpc() {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.handle("chat", async (event, messages) => {
    return await ddgChat(messages);
  });
}
