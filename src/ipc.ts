import { ipcMain } from "electron";
import { handleFileOpen } from "./dialog";
import { CHAT, OPEN_FILE, SHOW_IMAGE, START_CAPTURE } from "./constants";
import { createImageWindow } from "./window";
import { ddgChat } from "./utils";
import { Monitor } from "node-screenshots";

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
  ipcMain.handle(START_CAPTURE, async (event) => {
    const monitor = Monitor.fromPoint(100, 100);
    const image = await monitor.captureImage();
    const dataURL = `data:image/png;base64,${image
      .toPngSync()
      .toString("base64")}`;
    return dataURL;
  });
  ipcMain.on(SHOW_IMAGE, (event, dataURL) => {
    createImageWindow(dataURL);
  });
}
