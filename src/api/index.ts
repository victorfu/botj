import { ipcRenderer } from "electron";

export default {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  chat: (messages: { role: string; content: string }[]) =>
    ipcRenderer.invoke("chat", messages),
  onNavigate: (callback: (arg0: string) => void) =>
    ipcRenderer.on("navigate", (_event, route) => callback(route)),
};
