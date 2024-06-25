import { desktopCapturer, globalShortcut } from "electron";
import { getMainWindow } from "./window";
import { ON_SOURCE_SELECT } from "./constants";

const shortcuts = ["CommandOrControl+X"];

export function registerShortcuts() {
  shortcuts.forEach((shortcut) => {
    if (globalShortcut.isRegistered(shortcut)) {
      console.log(`${shortcut} is already registered`);
      return;
    }

    const ret = globalShortcut.register(shortcut, () => {
      console.log(`${shortcut} is pressed`);

      const mainWindow = getMainWindow();
      desktopCapturer
        .getSources({ types: ["screen"] })
        .then(async (sources) => {
          mainWindow.webContents.send(ON_SOURCE_SELECT, sources[0].id);
        });
    });

    if (!ret) {
      console.log("registration failed");
    } else {
      console.log(
        `${shortcut} registered : ${globalShortcut.isRegistered(shortcut)}`,
      );
    }
  });
}

export function unregisterShortcuts() {
  globalShortcut.unregisterAll();
}
