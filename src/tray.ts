import path from "path";
import { Tray, Menu, nativeImage, app } from "electron";
import appState from "./state";
import { showMainWindow } from "./window";
import { ON_ROUTE_CHANGE } from "./constants";

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
        const mainWindow = showMainWindow();
        mainWindow.webContents.send(ON_ROUTE_CHANGE, "settings");
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

  const name = app.getName();
  const version = app.getVersion();

  tray.setToolTip(`${name} v${version}`);
  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    showMainWindow();
  });
}
