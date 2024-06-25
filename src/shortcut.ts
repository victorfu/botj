import { desktopCapturer, globalShortcut } from "electron";
import { closeImageWindow, getMainWindow, isImageWindowOpen } from "./window";
import { ON_SOURCE_SELECT } from "./constants";

const shortcutsActions = {
  "CommandOrControl+X": () => {
    console.log("CommandOrControl+X is pressed");

    if (isImageWindowOpen()) {
      closeImageWindow();
    } else {
      const mainWindow = getMainWindow();
      desktopCapturer
        .getSources({ types: ["screen"] })
        .then(async (sources) => {
          mainWindow.webContents.send(ON_SOURCE_SELECT, sources[0].id);
        });
    }
  },
  "CommandOrControl+Y": () => {
    console.log("CommandOrControl+Y is pressed");
    closeImageWindow();
  },
};

export function registerShortcuts() {
  Object.entries(shortcutsActions).forEach(([shortcut, action]) => {
    if (globalShortcut.isRegistered(shortcut)) {
      console.log(`${shortcut} is already registered`);
      return;
    }

    const ret = globalShortcut.register(shortcut, action);

    if (!ret) {
      console.error(`Registration failed for ${shortcut}`);
    } else {
      console.log(
        `${shortcut} registered: ${globalShortcut.isRegistered(shortcut)}`,
      );
    }
  });
}

export function unregisterShortcuts() {
  globalShortcut.unregisterAll();
}
