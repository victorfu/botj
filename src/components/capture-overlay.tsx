import React, { useState, useRef, useEffect } from "react";

// Add camera icon component
const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
    <path
      fillRule="evenodd"
      d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM12 15a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

// Add this tooltip component at the top of the file after the icons
const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 -top-10 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity duration-200">
        {text}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
};

interface CaptureOverlayProps {
  onCapture: (bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
  onClose: () => void;
}

const CaptureOverlay: React.FC<CaptureOverlayProps> = ({
  onCapture,
  onClose,
}) => {
  const [isSelecting, setIsSelecting] = useState(true);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left click only
      setIsMouseDown(true);
      if (isSelecting && !startPoint) {
        setStartPoint({ x: e.clientX, y: e.clientY });
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isSelecting && startPoint && isMouseDown) {
      setIsSelecting(false);
    }
    setIsMouseDown(false);
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isSelecting && startPoint && isMouseDown) {
      // Update the preview size while selecting
      const width = Math.abs(e.clientX - startPoint.x);
      const height = Math.abs(e.clientY - startPoint.y);
      const newX = Math.min(e.clientX, startPoint.x);
      const newY = Math.min(e.clientY, startPoint.y);

      setPosition({ x: newX, y: newY });
      setSize({ width, height });
    } else if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (isResizing) {
      const newSize = { ...size };
      const newPosition = { ...position };

      switch (resizeDirection) {
        case "e":
          newSize.width = e.clientX - position.x;
          break;
        case "w":
          const newWidth = size.width + (position.x - e.clientX);
          newPosition.x = e.clientX;
          newSize.width = newWidth;
          break;
        case "s":
          newSize.height = e.clientY - position.y;
          break;
        case "n":
          const newHeight = size.height + (position.y - e.clientY);
          newPosition.y = e.clientY;
          newSize.height = newHeight;
          break;
        case "se":
          newSize.width = e.clientX - position.x;
          newSize.height = e.clientY - position.y;
          break;
        case "sw":
          const swWidth = size.width + (position.x - e.clientX);
          newPosition.x = e.clientX;
          newSize.width = swWidth;
          newSize.height = e.clientY - position.y;
          break;
        case "ne":
          newSize.width = e.clientX - position.x;
          const neHeight = size.height + (position.y - e.clientY);
          newPosition.y = e.clientY;
          newSize.height = neHeight;
          break;
        case "nw":
          const nwWidth = size.width + (position.x - e.clientX);
          const nwHeight = size.height + (position.y - e.clientY);
          newPosition.x = e.clientX;
          newPosition.y = e.clientY;
          newSize.width = nwWidth;
          newSize.height = nwHeight;
          break;
      }

      setSize(newSize);
      setPosition(newPosition);
    }
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    if (isSelecting) return;

    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({
      x: e.clientX - size.width,
      y: e.clientY - size.height,
    });
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelecting) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, isSelecting, startPoint, isMouseDown]);

  return (
    <div
      className="fixed inset-0 z-50"
      onMouseDown={handleMouseDown}
      style={{ cursor: isSelecting ? "crosshair" : "default" }}
    >
      {/* Show starting point indicator */}
      {startPoint && isSelecting && isMouseDown && (
        <div
          className="absolute w-1 h-1 bg-blue-700 rounded-full"
          style={{
            left: startPoint.x,
            top: startPoint.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Crosshair lines */}
          <div className="absolute w-4 h-px bg-blue-700 left-1/2 top-1/2 -translate-x-1/2" />
          <div className="absolute h-4 w-px bg-blue-700 left-1/2 top-1/2 -translate-y-1/2" />
        </div>
      )}

      {(size.width !== 0 || size.height !== 0) && (
        <div
          ref={windowRef}
          className="absolute cursor-move border-2 border-blue-700 bg-transparent"
          style={{
            left: position.x,
            top: position.y,
            width: Math.abs(size.width),
            height: Math.abs(size.height),
          }}
          onMouseDown={handleDragStart}
        >
          {!isSelecting && (
            <>
              {/* Resize handles */}
              <div
                className="absolute w-1.5 h-1.5 -top-1.5 -left-1.5 bg-blue-700 cursor-nw-resize"
                onMouseDown={(e) => handleResizeStart(e, "nw")}
              />
              <div
                className="absolute w-1.5 h-1.5 -top-1.5 -right-1.5 bg-blue-700 cursor-ne-resize"
                onMouseDown={(e) => handleResizeStart(e, "ne")}
              />
              <div
                className="absolute w-1.5 h-1.5 -bottom-1.5 -left-1.5 bg-blue-700 cursor-sw-resize"
                onMouseDown={(e) => handleResizeStart(e, "sw")}
              />
              <div
                className="absolute w-1.5 h-1.5 -bottom-1.5 -right-1.5 bg-blue-700 cursor-se-resize"
                onMouseDown={(e) => handleResizeStart(e, "se")}
              />

              {/* Edge handles */}
              <div
                className="absolute h-1.5 left-0 right-0 -top-1.5 bg-blue-700 cursor-n-resize"
                onMouseDown={(e) => handleResizeStart(e, "n")}
              />
              <div
                className="absolute h-1.5 left-0 right-0 -bottom-1.5 bg-blue-700 cursor-s-resize"
                onMouseDown={(e) => handleResizeStart(e, "s")}
              />
              <div
                className="absolute w-1.5 top-0 bottom-0 -left-1.5 bg-blue-700 cursor-w-resize"
                onMouseDown={(e) => handleResizeStart(e, "w")}
              />
              <div
                className="absolute w-1.5 top-0 bottom-0 -right-1.5 bg-blue-700 cursor-e-resize"
                onMouseDown={(e) => handleResizeStart(e, "e")}
              />

              {/* Toolbar */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white rounded-lg shadow-lg p-1">
                <Tooltip text="Capture">
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
                    onClick={() =>
                      onCapture({
                        x: position.x,
                        y: position.y,
                        width: size.width,
                        height: size.height,
                      })
                    }
                  >
                    <CameraIcon />
                  </button>
                </Tooltip>
                <div className="w-px h-6 my-auto bg-gray-200" />
                <Tooltip text="Cancel">
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </button>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CaptureOverlay;
