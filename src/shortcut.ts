import { globalShortcut } from "electron";
import { getMainWindow } from "./window";
import { CAPTURE_SCREEN } from "./constants";
import { getScreenSources } from "./utils";

const captureScreen = async () => {
  const sources = await getScreenSources();
  getMainWindow().webContents.send(CAPTURE_SCREEN, sources[0].id);
};

const shortcutsActions = {
  F2: () => {
    captureScreen();
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
