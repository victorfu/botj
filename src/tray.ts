import path from "path";
import { Tray, Menu, nativeImage, app } from "electron";
import appState from "./state";
import { getMainWindow } from "./window";

export function createTray() {
  const filePath = path.join(
    app.getAppPath(),
    ".webpack/renderer",
    "images/tray.png",
  );
  const icon = nativeImage.createFromPath(filePath);
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Settings",
      type: "normal",
      click: () => {
        console.log("Settings clicked");
      },
    },
    { type: "separator" },
    {
      label: "Option1",
      type: "checkbox",
      checked: true,
      click: () => {
        console.log("Option1 toggled");
      },
    },
    {
      label: "Option2",
      type: "checkbox",
      click: () => {
        console.log("Option2 toggled");
      },
    },
    { type: "separator" },
    {
      label: "Exit",
      type: "normal",
      click: () => {
        appState.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Botj version 0.0.1");
  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    const mainWindow = getMainWindow();
    if (mainWindow.isVisible()) {
      mainWindow.focus();
    } else {
      mainWindow.show();
    }
  });
}
