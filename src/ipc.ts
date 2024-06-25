import { ipcMain } from "electron";
import { handleFileOpen } from "./dialog";
import { ddgChat } from "./utils";
import { CHAT, OPEN_FILE, SAVE_PNG } from "./constants";
import { createImageWindow } from "./window";

export function registerIpc() {
  ipcMain.handle(OPEN_FILE, handleFileOpen);
  ipcMain.handle(CHAT, async (event, messages) => {
    return await ddgChat(messages);
  });
  ipcMain.on(SAVE_PNG, (event, dataURL) => {
    createImageWindow(dataURL);
  });
}
