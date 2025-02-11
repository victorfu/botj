import { ipcMain } from "electron";
import { handleFileOpen } from "./dialog";
import {
  CAPTURE_SCREEN,
  CHAT,
  OPEN_FILE,
  SHOW_IMAGE,
  START_CAPTURE,
} from "./constants";
import { createImageWindow, getMainWindow } from "./window";
import { ddgChat, getScreenSources } from "./utils";

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
  ipcMain.handle(START_CAPTURE, async () => {
    const sources = await getScreenSources();
    getMainWindow().webContents.send(CAPTURE_SCREEN, sources[0].id);
  });
  ipcMain.on(SHOW_IMAGE, (event, dataURL) => {
    createImageWindow(dataURL);
  });
}
