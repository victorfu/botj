import { dialog } from "electron";
import { getMainWindow } from "./window";

export async function handleFileOpen() {
  const mainWindow = getMainWindow();
  if (!mainWindow) return;
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow);
  if (!canceled) {
    return filePaths[0];
  }
}
