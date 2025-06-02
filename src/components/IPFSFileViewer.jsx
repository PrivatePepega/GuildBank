import React, { useState, useEffect } from "react";

const IPFSViewer = ({ ipfsUrl }) => {
  const [fileContent, setFileContent] = useState("Loading...");

  useEffect(() => {
    const fetchFile = async () => {
      if (typeof ipfsUrl === "string" && !ipfsUrl.startsWith('ipfs://')) {
        setFileContent(ipfsUrl);
    } else {
      try {
        const gatewayUrl = ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
        const response = await fetch(gatewayUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        setFileContent(text);
      } catch (error) {
        console.error("Error fetching IPFS file:", error);
        setFileContent("Failed to load content.");
      }
    }

    };

    fetchFile();
  }, [ipfsUrl]);

  return (
    <span>{fileContent}</span>
  );
};

export default IPFSViewer;
