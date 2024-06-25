import { desktopCapturer, globalShortcut } from "electron";
import {
  closeImageWindow,
  createImageWindow,
  getMainWindow,
  isImageWindowOpen,
} from "./window";
import { ON_SOURCE_SELECT } from "./constants";
import { Monitor } from "node-screenshots";

const nativeCaptureScreen = async () => {
  const sources = await desktopCapturer.getSources({ types: ["screen"] });
  const mainWindow = getMainWindow();
  mainWindow.webContents.send(ON_SOURCE_SELECT, sources[0].id);
};

const captureScreen = async () => {
  const monitor = Monitor.fromPoint(100, 100);

  monitor.captureImage().then((image) => {
    const dataURL = `data:image/png;base64,${image
      .toPngSync()
      .toString("base64")}`;
    createImageWindow(dataURL);
  });
};

const shortcutsActions = {
  "CommandOrControl+X": () => {
    console.log("CommandOrControl+X is pressed");

    if (isImageWindowOpen()) {
      closeImageWindow();
    } else {
      captureScreen();
    }
  },
  "CommandOrControl+Y": () => {
    console.log("CommandOrControl+Y is pressed");
    if (isImageWindowOpen()) {
      closeImageWindow();
    } else {
      nativeCaptureScreen();
    }
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
