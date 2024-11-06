import { ipcMain } from "electron";
import { handleFileOpen } from "./dialog";
import { CHAT, OPEN_FILE, SHOW_IMAGE } from "./constants";
import { createImageWindow } from "./window";

export function registerIpc() {
  ipcMain.handle(OPEN_FILE, handleFileOpen);
  ipcMain.handle(CHAT, async (event, messages) => {
    const chatPromise = new Promise((resolve) => {
      resolve("Hello, world!");
    });
    return await chatPromise;
  });
  ipcMain.on(SHOW_IMAGE, (event, dataURL) => {
    createImageWindow(dataURL);
  });
}
