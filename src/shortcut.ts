import { globalShortcut } from "electron";

const shortcuts = ["CommandOrControl+X"];

export function registerShortcuts() {
  shortcuts.forEach((shortcut) => {
    if (globalShortcut.isRegistered(shortcut)) {
      console.log(`${shortcut} is already registered`);
      return;
    }

    const ret = globalShortcut.register(shortcut, () => {
      console.log(`${shortcut} is pressed`);
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
