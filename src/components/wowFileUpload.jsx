"use client";
import { useState, useRef, useCallback } from "react";
import { useActiveAccount } from "thirdweb/react";

export default function WoWUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const activeAccount = useActiveAccount();
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Drop files
  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.name.endsWith(".json"));
    console.log("Dropped files:", files.map((f) => ({ name: f.name, size: f.size })));
    await processFiles(files);
  }, []);

  // File input
  const handleChange = async (e) => {
    const files = Array.from(e.target.files).filter((f) => f.name.endsWith(".json"));
    console.log("Selected files via input:", files.map((f) => ({ name: f.name, size: f.size })));
    await processFiles(files);
  };

  // Validate and store files
  const processFiles = async (files) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = files.filter((f) => {
      if (f.size > maxSize) {
        console.warn(`File ${f.name} exceeds 5MB limit (size: ${f.size})`);
        setStatus(`File ${f.name} exceeds 5MB limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      console.warn("No valid JSON files selected");
      setStatus("No valid .json files selected!");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    console.log("Valid files added to state:", validFiles.map((f) => f.name));
    setStatus(`${validFiles.length} file(s) selected`);
  };

  // Submit to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeAccount) {
      console.error("No wallet connected");
      setStatus("Connect your wallet first!");
      return;
    }
    if (selectedFiles.length === 0) {
      console.warn("No files selected for upload");
      setStatus("No valid .json files selected!");
      return;
    }

    setLoading(true);
    setStatus("");
    console.log("Submitting form with wallet:", activeAccount.address);
    console.log("Files to upload:", selectedFiles.map((f) => f.name));

    const formData = new FormData();
    formData.append("wallet", activeAccount.address);
    // Send only the first file (modify if multiple files are needed)
    formData.append("file", selectedFiles[0]);
    console.log("FormData prepared with file:", selectedFiles[0].name);

    try {
      console.log("Sending POST request to /api/verify-files");
      const res = await fetch("/api/verify-files", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("API response:", data);

      setLoading(false);
      if (data.success) {
        console.log(`Upload successful! Daily count: ${data.dailyCount}, Weekly count: ${data.weeklyCount}`);
        setStatus(`Yey, we dee maa! Daily: ${data.dailyCount}, Weekly: ${data.weeklyCount}`);
        setSelectedFiles([]);
      } else {
        console.error("API error:", data.error);
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setLoading(false);
      setStatus("Upload failed, try again!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed p-8 rounded-lg text-center transition-all ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".json"
          multiple
          onChange={handleChange}
          className="hidden"
        />
        <p className="text-lg text-gray-700">
          Drag & drop .json files (max 5MB) or{" "}
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="text-blue-600 underline hover:text-blue-800"
          >
            browse
          </button>
        </p>
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        className={`mt-4 w-full py-2 rounded-lg text-white transition ${
          loading || selectedFiles.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        disabled={loading || selectedFiles.length === 0}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Uploading...
          </div>
        ) : (
          "Upload & Mint"
        )}
      </button>
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-800 font-semibold">Selected Files:</h3>
          <ul className="text-gray-600">
            {selectedFiles.map((f, i) => (
              <li key={`file-${i}`}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}
      {status && (
        <p
          className={`mt-4 text-center ${
            status.includes("Error") || status.includes("failed")
              ? "text-red-600"
              : status.includes("Yey")
              ? "text-green-600 font-bold"
              : "text-blue-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}