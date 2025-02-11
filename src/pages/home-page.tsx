import { WINDOW_SCREEN_CAPTURE } from "../constants";
import CaptureOverlay from "../components/capture-overlay";
import { useEffect, useState } from "react";

interface CaptureButtonProps {
  onCapture: (bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
}

const CaptureButton = ({ onCapture }: CaptureButtonProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <button
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setShowOverlay(true)}
      >
        Select Area
      </button>

      {showOverlay && (
        <CaptureOverlay
          onCapture={(bounds) => {
            onCapture(bounds);
            setShowOverlay(false);
          }}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </>
  );
};

const HomePage = () => {
  const [dataURL, setDataURL] = useState<string | null>(null);

  const handleCapture = async (bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    try {
      console.log(bounds);
      // Handle the captured image (save it, display it, etc.)
    } catch (error) {
      console.error("Failed to capture screen:", error);
    }
  };

  useEffect(() => {
    window.addEventListener(
      WINDOW_SCREEN_CAPTURE,
      (event: CustomEvent<{ dataURL: string }>) => {
        console.log(event.detail.dataURL);
        setDataURL(event.detail.dataURL);
      },
    );

    return () => {
      window.removeEventListener(WINDOW_SCREEN_CAPTURE, () => {});
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        {dataURL && <img src={dataURL} alt="Captured" />}
        <div className="absolute top-4 right-4">
          <CaptureButton onCapture={handleCapture} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
