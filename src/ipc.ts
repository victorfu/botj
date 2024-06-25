import { ipcMain } from "electron";
import { handleFileOpen } from "./dialog";
import { ddgChat } from "./utils";
import { CHAT, OPEN_FILE, SHOW_IMAGE } from "./constants";
import { createImageWindow } from "./window";

export function registerIpc() {
  ipcMain.handle(OPEN_FILE, handleFileOpen);
  ipcMain.handle(CHAT, async (event, messages) => {
    return await ddgChat(messages);
  });
  ipcMain.on(SHOW_IMAGE, (event, dataURL) => {
    createImageWindow(dataURL);
  });
}
