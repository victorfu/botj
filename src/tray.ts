import path from "path";
import { Tray, Menu, nativeImage, app } from "electron";
import appState from "./state";
import { getMainWindow, showMainWindow } from "./window";
import { CAPTURE_SCREEN, CHANGE_ROUTE } from "./constants";
import { getScreenSources } from "./utils";

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
      label: "Capture Screen",
      type: "normal",
      click: async () => {
        const sources = await getScreenSources();
        const mainWindow = getMainWindow();
        mainWindow.webContents.send(CAPTURE_SCREEN, sources[0].id);
      },
    },
    {
      label: "Home",
      type: "normal",
      click: () => {
        const mainWindow = showMainWindow();
        mainWindow.webContents.send(CHANGE_ROUTE, "/");
      },
    },
    {
      label: "Settings",
      type: "normal",
      click: () => {
        const mainWindow = showMainWindow();
        mainWindow.webContents.send(CHANGE_ROUTE, "settings");
      },
    },
    {
      label: "Login",
      type: "normal",
      click: () => {
        const mainWindow = showMainWindow();
        mainWindow.webContents.send(CHANGE_ROUTE, "login");
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
