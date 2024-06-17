import { app, BrowserWindow } from "electron";
import { createWindow, getMainWindow } from "./window";
import { createTray } from "./tray";
import { registerShortcuts, unregisterShortcuts } from "./shortcut";
import appState from "./state";
import { registerIpc } from "./ipc";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

app.whenReady().then(() => {
  appState.isQuitting = false;
  createWindow();
  createTray();
  registerShortcuts();
  registerIpc();
});

app.on("before-quit", () => (appState.isQuitting = true));

app.on("will-quit", () => {
  unregisterShortcuts();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  const mainWindow = getMainWindow();
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    mainWindow.show();
  }
});
