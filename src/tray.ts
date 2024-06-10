import path from "path";
import { Tray, Menu, nativeImage } from "electron";

let tray;

export function createTray(app: Electron.App) {
  const filePath = path.join(
    app.getAppPath(),
    ".webpack/renderer",
    "images/tray.png",
  );
  const icon = nativeImage.createFromPath(filePath);
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      type: "normal",
      click: () => {
        console.log("Open clicked");
      },
    },
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
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Botj version 0.0.1");
  tray.setContextMenu(contextMenu);
}
