import { ipcRenderer } from "electron";
import {
  CHAT,
  ON_ROUTE_CHANGE,
  OPEN_FILE,
  SHOW_IMAGE,
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
  video.autoplay = true;
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    const screenWidth = screen.width;
    const screenHeight = screen.height;

    const canvas = document.createElement("canvas");
    canvas.width = screenWidth;
    canvas.height = screenHeight;

    const context = canvas.getContext("2d");
    video.width = screenWidth;
    video.height = screenHeight;

    console.log(
      `${screenWidth}x${screenHeight}`,
      video.width,
      video.height,
      canvas.width,
      canvas.height,
    );

    context?.drawImage(video, 0, 0, screenWidth, screenHeight);
    const dataURL = canvas.toDataURL("image/png");
    ipcRenderer.send(SHOW_IMAGE, dataURL);

    // Stop the video stream and remove the video element
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    video.remove();
  };
}
