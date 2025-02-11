import { ipcRenderer } from "electron";
import {
  CHAT,
  CHANGE_ROUTE,
  OPEN_FILE,
  SHOW_IMAGE,
  CAPTURE_SCREEN,
  START_CAPTURE,
} from "../constants";

export default {
  openFile: () => ipcRenderer.invoke(OPEN_FILE),
  chat: (messages: { role: string; content: string }[]) =>
    ipcRenderer.invoke(CHAT, messages),
  startCapture: () => ipcRenderer.invoke(START_CAPTURE),
  onChangeRoute: (callback: (arg0: string) => void) =>
    ipcRenderer.on(CHANGE_ROUTE, (_event, route) => callback(route)),
  onCaptureScreen: () =>
    ipcRenderer.on(CAPTURE_SCREEN, async (event, sourceId: string) => {
      try {
        const stream = await getMediaStream(sourceId);
        const dataURL = await handleStream(stream);
        event.sender.send(SHOW_IMAGE, dataURL);
      } catch (e) {
        console.error(e);
      }
    }),
};

async function getMediaStream(sourceId: string) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: sourceId,
      },
    },
  } as unknown);
  return stream;
}

async function handleStream(stream: MediaStream) {
  const video = document.createElement("video");
  video.autoplay = true;
  video.srcObject = stream;

  await new Promise<void>((resolve) => {
    video.onloadedmetadata = () => resolve();
  });

  // Get the actual video track settings for highest quality
  const track = stream.getVideoTracks()[0];
  const settings = track.getSettings();
  const width = settings.width || screen.width;
  const height = settings.height || screen.height;

  // Create high resolution canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", {
    alpha: false,
    desynchronized: true,
  });

  if (context) {
    // Set image smoothing for better quality
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    // Draw at native resolution
    context.drawImage(video, 0, 0, width, height);
  }

  // Cleanup
  stream.getTracks().forEach((track) => track.stop());
  video.srcObject = null;
  video.remove();

  // Get highest quality PNG
  const dataURL = canvas.toDataURL("image/png", 1.0);
  return dataURL;
}
