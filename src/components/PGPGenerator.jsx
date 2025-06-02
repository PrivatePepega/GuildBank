"use client";
import { useState } from "react";
import * as openpgp from "openpgp";
import { createHash } from "crypto"; // Node.js crypto for SHA-256
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { Button } from "@material-tailwind/react";
import {contractPassport} from "@/utils/functionDump/getContracts"







export default function PGPGenerator() {


  function processInputs(input1, input2) {
    // Step 1: Validate inputs
    if (typeof input1 !== 'string' || typeof input2 !== 'string') {
      throw new Error('Both inputs must be strings');
    }
  
    // Step 2: Remove all whitespace from both inputs
    const cleaned1 = input1.replace(/\s+/g, '');
    const cleaned2 = input2.replace(/\s+/g, '');
  
    // Step 3: Combine inputs (concatenate)
    const combined = cleaned1 + cleaned2;
  
    // Step 4: JSON.stringify the result
    let result;
    try {
      result = JSON.stringify(combined);
    } catch (error) {
      throw new Error('Failed to JSON.stringify the combined input');
    }
  
    // Step 5: Return the stringified result
    return result;
  }

  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState();

  // Generate random complex string
  const generateRandomId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result; // e.g., "aX9kP2qW7zR8"
  };

  // Generate PGP key pair
  const generateKeys = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Generating keys...");

    try {
      const randomId = generateRandomId();
      const { publicKey: pubKey, privateKey: privKey } = await openpgp.generateKey({
        type: "rsa",
        rsaBits: 2048,
        userIDs: [{ name: randomId }],
        format: "armored",
      });

      setPublicKey(pubKey);
      setPrivateKey(privKey);
      const passwordstring = processInputs(pubKey, privKey);
      const hashBrowns = createHash("sha256").update(passwordstring).digest("hex");
      setHash(hashBrowns);   
      setStatus("Keys generated successfully!");
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Download key as file
  const downloadKey = (key, type) => {
    const blob = new Blob([key], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-key.asc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy key to clipboard
  const copyKey = async (key, type) => {
    try {
      await navigator.clipboard.writeText(key);
      setStatus(`${type} key copied to clipboard!`);
    } catch (err) {
      setStatus(`Failed to copy ${type} key`);
    }
  };





    const { mutate: changlePasswordTx, data: changlePasswordTxData } = useSendTransaction();
    const changePassword = (_password) => {
      const changePasswordTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function changePassword(string memory _password) public",
        params: [_password],
      });
      changlePasswordTx(changePasswordTransaction);
    };








  return (
    <div className="max-w-lg mx-auto p-6">
      <form onSubmit={generateKeys} className="space-y-4">
        <button
          type="submit"
          className={`w-full py-2 rounded-lg text-white transition flex items-center justify-center ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Generating...
            </>
          ) : (
            "Generate Keys"
          )}
        </button>
      </form>

      {publicKey && privateKey && (
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Public Key</h3>
            <textarea
              value={publicKey}
              readOnly
              className="w-full h-32 p-2 border rounded-lg bg-gray-50 text-sm font-mono text-black"
            />
            <div className="mt-2 space-x-2">
              <button
                onClick={() => downloadKey(publicKey, "public")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Download Public Key
              </button>
              <button
                onClick={() => copyKey(publicKey, "Public")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy Public Key
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Private Key</h3>
            <textarea
              value={privateKey}
              readOnly
              className="w-full h-32 p-2 border rounded-lg bg-gray-50 text-sm font-mono text-black"
            />
            <div className="mt-2 space-x-2">
              <button
                onClick={() => downloadKey(privateKey, "private")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Download Private Key
              </button>
              <button
                onClick={() => copyKey(privateKey, "Private")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy Private Key
              </button>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Blockchain Password Hash</h3>
              <textarea
                value={hash}
                readOnly
                className="w-full h-16 p-2 border rounded-lg bg-gray-50 text-sm font-mono text-black"
              />
            </div>
            <div className=" flex justify-center items-center"> 
              <Button onClick={() => changePassword(hash)} >
                  Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}