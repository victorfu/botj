import { ipcRenderer } from "electron";
import {
  CHAT,
  ON_ROUTE_CHANGE,
  OPEN_FILE,
  SAVE_PNG,
  ON_SOURCE_SELECT,
} from "../constants";

export default {
  openFile: () => ipcRenderer.invoke(OPEN_FILE),
  chat: (messages: { role: string; content: string }[]) =>
    ipcRenderer.invoke(CHAT, messages),
  onRouteChange: (callback: (arg0: string) => void) =>
    ipcRenderer.on(ON_ROUTE_CHANGE, (_event, route) => callback(route)),
  onSourceSelect: () =>
    ipcRenderer.on(ON_SOURCE_SELECT, async (event, sourceId: string) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: sourceId,
            },
          },
        } as unknown);
        handleStream(stream);
      } catch (e) {
        console.error(e);
      }
    }),
};

function handleStream(stream: MediaStream) {
  const video = document.createElement("video");
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    video.play();

    const screenWidth = screen.width;
    const screenHeight = screen.height;

    const canvas = document.createElement("canvas");
    canvas.width = screenWidth;
    canvas.height = screenHeight;

    const context = canvas.getContext("2d");
    video.width = screenWidth;
    video.height = screenHeight;

    console.log(screenHeight, screenWidth);

    context?.drawImage(video, 0, 0, screenWidth, screenHeight);
    const dataURL = canvas.toDataURL("image/png");
    ipcRenderer.send(SAVE_PNG, dataURL);

    // Stop the video stream and remove the video element
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    video.remove();
  };
}
