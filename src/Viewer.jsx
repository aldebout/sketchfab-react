import React, { useEffect, useRef, useState } from "react";

// Our wonderful chair model
const MODEL_UID = "c632823b6c204797bd9b95dbd9f53a06";

const useSketchfabViewer = () => {
  // This ref will contain the actual iframe object
  const viewerIframeRef = useRef(null);
  const [api, setApi] = useState();

  const ViewerIframe = (
    <iframe
      // We feed the ref to the iframe component to get the underlying DOM object
      ref={viewerIframeRef}
      title="sketchfab-viewer"
      style={{ height: 400, width: 600 }}
    />
  );

  useEffect(
    () => {
      // Initialize the viewer
      let client = new window.Sketchfab(viewerIframeRef.current);
      client.init(MODEL_UID, {
        success: setApi,
        error: () => {
          console.log("Viewer error");
        },
      });
    },
    // We only want to initialize the viewer on first load, so we don't add any dependencies to useEffect
    []
  );

  return [ViewerIframe, api];
};

export const Viewer = ({ apiRef }) => {
  const [ViewerIframe, api] = useSketchfabViewer();

  apiRef.current = api;

  return ViewerIframe;
};
