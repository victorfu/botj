import { BrowserWindow, ipcMain } from "electron";
import { handleFileOpen } from "./dialog";
import { ddgChat } from "./utils";
import { CHAT, OPEN_FILE, SAVE_PNG } from "./constants";

export function registerIpc() {
  ipcMain.handle(OPEN_FILE, handleFileOpen);
  ipcMain.handle(CHAT, async (event, messages) => {
    return await ddgChat(messages);
  });
  ipcMain.on(SAVE_PNG, (event, dataURL) => {
    const imageWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true,
      },
    });

    imageWindow.loadURL(
      `data:text/html,<img src="${dataURL}" style="width:100%;height:100%;" />`,
    );
  });
}
