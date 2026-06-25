"use client";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { uploadData } from "@/utils/functionDump/Passport.js";
import { useActiveAccount } from "thirdweb/react";
import { MediaRenderer } from "thirdweb/react";
import passportIcon from "@/assets/img/coin_matrix.jpg";
import * as openpgp from "openpgp";
import { createHash } from "crypto";


const GuildBankPassport = ({ captchaToken }) => {
  const router = useRouter();
  const activeAccount = useActiveAccount();

  // Passport fields
  const [alias, setAlias] = useState('');
  const [minor, setMinor] = useState(false);
  const [pfp, setPfp] = useState(null);
  const [userName, setUserName] = useState(null);
  const [pfpCID, setPfpCID] = useState(null);
  const [userNameCID, setUserNameCID] = useState(null);
  const [pfpLoading, setPfpLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [msgStatus, setMSGStatus] = useState('');
  const [statusCID, setStatusCID] = useState("");
  const [chainMode, setChainMode] = useState(true);
  const [msgLoading, setMsgLoading] = useState(false);
  const [checkTOS, setCheckTOS] = useState(false);
  const [transactionResult, setTransactionResult] = useState();

  // PGP key state
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState();

  // Phone auth state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpStep, setOtpStep] = useState('idle'); // 'idle' | 'sent' | 'verified'
  const [otpError, setOtpError] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);

  useEffect(() => {
    if (activeAccount?.address) {
      setUserAddress(activeAccount.address);
    }
  }, [activeAccount]);

  // --- IPFS uploads ---
  const uploadPFP = (_file) => {
    setPfpLoading(true);
    const url = uploadData(_file);
    if (url) {
      url.then(res => { setPfpCID(res); setPfpLoading(false); });
    }
  };

  const uploadUserName = (_userName) => {
    setNameLoading(true);
    const blob = new Blob([_userName], { type: 'text/plain' });
    const renamedFile = new File([blob], `userName.txt`, { type: 'text/plain' });
    const url = uploadData(renamedFile);
    if (url) {
      url.then(res => { setUserNameCID(res); setNameLoading(false); });
    }
    setUserName(_userName);
  };

  const uploadMSGPushToIPFS = () => {
    setMsgLoading(true);
    setChainMode(false);
    const blob = new Blob([msgStatus], { type: 'text/plain' });
    const renamedFile = new File([blob], `msgStatus.txt`, { type: 'text/plain' });
    const url = uploadData(renamedFile);
    if (url) {
      url.then(res => { setStatusCID(res); setMsgLoading(false); });
    }
  };

  const pushToChain = () => {
    setChainMode(true);
    setStatusCID("");
  };

  // --- PGP helpers ---
  function processInputs(input1, input2) {
    if (typeof input1 !== 'string' || typeof input2 !== 'string') {
      throw new Error('Both inputs must be strings');
    }
    const combined = input1.replace(/\s+/g, '') + input2.replace(/\s+/g, '');
    return JSON.stringify(combined);
  }

  const generateRandomId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

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

  const downloadKey = (key, type) => {
    const blob = new Blob([key], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-key.asc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyKey = async (key, type) => {
    try {
      await navigator.clipboard.writeText(key);
      setStatus(`${type} key copied to clipboard!`);
    } catch (err) {
      setStatus(`Failed to copy ${type} key`);
    }
  };

  // --- Phone auth ---
  async function handleSendOtp() {
    if (!phone) return setOtpError('Enter a phone number');
    setOtpLoading(true);
    setOtpError(null);
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, captchaToken }),
      });
      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = { error: 'Server error - please try again' };
      }
      setOtpLoading(false);
      if (!res.ok) {
        return setOtpError(data.error || 'Something went wrong');
      }
      setOtpStep('sent');
    } catch (err) {
      console.error(err);
      setOtpLoading(false);
      setOtpError('Network error - please check your connection');
    }
  }

  async function handleVerifyOtp() {
    if (!otp) return setOtpError('Enter the code');
    setOtpLoading(true);
    setOtpError(null);
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp, wallet: activeAccount?.address }),
    });
    const data = await res.json();
    setOtpLoading(false);
    if (!res.ok) return setOtpError(data.error);
    setOtpStep('verified');
  }

  // --- Submit passport ---
  const onSubmit = async () => {
    const statusMSG = statusCID ? statusCID : msgStatus;
    const params = { userAddress, pfpCID, userNameCID, alias, statusMSG, checkTOS, minor, hash };
    try {
      const res = await fetch('/api/create-passport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (data.success) {
        setTransactionResult(data.transactionHash);
        router.push('/home');
      } else {
        console.error('Transaction failed:', data.error);
      }
    } catch (err) {
      console.error('API call error:', err);
    }
  };

  // Passport button gate — all fields + phone verified
  const canSubmit = userNameCID && alias && activeAccount?.address &&
    msgStatus && hash && checkTOS && otpStep === 'verified';

  if (transactionResult) {
    return <p>welcome fren, you will be rerouted in 10,9,8,7,6,5,4,3,2,1....</p>;
  }

  return (
    <div className="flex flex-row justify-around w-full">
      <Card color="transparent" shadow={false} className="w-1/2 justify-center items-center">
        <Typography variant="h4" color="white">GuildBank Passport</Typography>
        <Typography color="gray" className="mt-1 font-normal">This is our badge to PvP in the metaverse.</Typography>
        <Typography color="gray" className="mt-1 font-normal">You can change these later btw.</Typography>

        <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">

            {/* PFP */}
            <Typography variant="h6" color="white" className="mt-3">!IPFS! Profile Picture</Typography>
            <div>
              <Input type="file" size="lg" label="Metaverse Profile Picture"
                className="!border-t-white-200"
                onChange={(e) => setPfp(e.target.files[0])} />
              <Button onClick={() => uploadPFP(pfp)}>IPFS</Button>
            </div>

            {/* Wallet */}
            <Typography variant="h6" color="white" className="mt-3">!ONCHAIN! Your Wallet Address</Typography>
            <p className="text-white">{activeAccount?.address}</p>

            {/* Username */}
            <Typography variant="h6" color="white" className="mt-3">!IPFS! Username</Typography>
            <div>
              <Input type="text" size="lg" label="Metaverse Username" color="white"
                className="!border-t-white-200 text-white"
                onChange={(e) => { setUserName(e.target.value); setUserNameCID(""); }} />
              <Button onClick={() => uploadUserName(userName)} loading={nameLoading}>IPFS</Button>
            </div>

            {/* Handle */}
            <Typography variant="h6" color="white" className="mt-3">!ONCHAIN! Handle</Typography>
            <Input type="text" size="lg" color="white" label="Metaverse Handle"
              className="!border-t-white-200"
              onChange={(e) => setAlias(e.target.value)} />

            {/* Public Status */}
            <Typography variant="h6" color="white" className="mt-3">!IPFS or ONCHAIN! Public Status</Typography>
            <div>
              <Input type="text" size="lg" label="Metaverse Public Status" color="white"
                onChange={(e) => { setMSGStatus(e.target.value); setStatusCID(""); setChainMode(true); }} />
              <div className="flex flex-row gap-1">
                <Button onClick={uploadMSGPushToIPFS} loading={!chainMode}>IPFS</Button>
                <Button onClick={pushToChain} loading={chainMode}>Chain</Button>
              </div>
              <p>{statusCID}</p>
            </div>

            {/* Creation date */}
            <Typography variant="h6" color="white" className="mt-3">!ONCHAIN! Account Creation Date</Typography>
            <p>{timestamp}</p>

            {/* Minor */}
            <Typography variant="h6" color="white" className="mt-3">!ONCHAIN! User is Minor?</Typography>
            <Checkbox
              defaultChecked
              label={
                <Typography variant="small" color="white" className="flex items-center font-normal">
                  <span className="mr-4">MINOR:</span>
                  <span className="font-medium">Box must be Checked if you're a Minor.</span>
                </Typography>
              }
              onChange={(e) => setMinor(e.target.checked)}
            />

            {/* PGP Keys */}
            <Typography variant="h6" color="white" className="mt-3">!ONCHAIN! Account Password</Typography>
            <div className="max-w-lg mx-auto p-6">
              <form onSubmit={generateKeys} className="space-y-4">
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg text-white transition flex items-center justify-center ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Generating...
                    </>
                  ) : "Generate Password"}
                </button>
              </form>

              {publicKey && privateKey && (
                <div className="mt-6 space-y-4">
                  <Typography variant="h6" color="white" className="mt-3 flex justify-center">READ, tard.</Typography>
                  <p>Save and keep these keys to yourself. You'll need to input these into the APP. The actual password is Public Key + Private Key. We sha256 hash the password and upload the hash to the blockchain.</p>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Public Key</h3>
                    <textarea value={publicKey} readOnly className="w-full h-32 p-2 border rounded-lg bg-gray-50 text-sm font-mono text-black" />
                    <div className="mt-2 space-x-2 flex flex-row">
                      <button onClick={() => downloadKey(publicKey, "public")} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Download Public Key</button>
                      <button onClick={() => copyKey(publicKey, "Public")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Copy Public Key</button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Private Key</h3>
                    <textarea value={privateKey} readOnly className="w-full h-32 p-2 border rounded-lg bg-gray-50 text-sm font-mono text-black" />
                    <div className="mt-2 space-x-2 flex flex-row">
                      <button onClick={() => downloadKey(privateKey, "private")} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Download Private Key</button>
                      <button onClick={() => copyKey(privateKey, "Private")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Copy Private Key</button>
                    </div>
                  </div>
                  {hash && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Blockchain Password Hash</h3>
                      <textarea value={hash} readOnly className="w-full h-16 p-2 border rounded-lg bg-gray-50 text-sm font-mono text-black" />
                    </div>
                  )}
                </div>
              )}

              {status && (
                <p className={`text-center mt-4 ${status.includes("Error") ? "text-red-600" : "text-green-600"}`}>{status}</p>
              )}
            </div>

            {/* Phone verification — appears after PGP keys generated */}
            {hash && (
              <div className="flex flex-col gap-3">
                <Typography variant="h6" color="white" className="mt-3">Phone Verification</Typography>
                <p className="text-sm text-gray-400">Use international format e.g. +12025551234</p>

                {otpStep === 'verified' ? (
                  <p className="text-green-500 text-sm">Phone verified</p>
                ) : (
                  <>
                    {(otpStep === 'idle') && (
                      <>
                        <input
                          type="tel"
                          placeholder="+12025551234"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="border border-gray-500 rounded px-3 py-2 w-full bg-transparent text-white"
                        />
                        <Button disabled={otpLoading} onClick={handleSendOtp} className="w-full">
                          {otpLoading ? 'Sending...' : 'Send Code'}
                        </Button>
                      </>
                    )}

                    {otpStep === 'sent' && (
                      <>
                        <p className="text-xs text-gray-400">Code sent to {phone}</p>
                        <input
                          type="text"
                          placeholder="123456"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="border border-gray-500 rounded px-3 py-2 w-full bg-transparent text-white"
                        />
                        <Button disabled={otpLoading} onClick={handleVerifyOtp} className="w-full">
                          {otpLoading ? 'Verifying...' : 'Verify Code'}
                        </Button>
                        <button onClick={() => setOtpStep('idle')} className="text-xs text-gray-400 underline">
                          Wrong number? Go back
                        </button>
                      </>
                    )}

                    {otpError && <p className="text-red-500 text-xs">{otpError}</p>}
                  </>
                )}
              </div>
            )}

            {/* TOS */}
            <Typography variant="h6" color="white" className="mt-3">!ONCHAIN! Terms of Service</Typography>
            <Checkbox
              label={
                <Typography variant="small" color="white" className="flex items-center font-normal">
                  I agree that:{" "}
                  <a href="#" className="font-medium transition-colors hover:text-gray-900 my-6">
                    &nbsp;We retarded ngl, dont know what im doing.
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              onChange={(e) => setCheckTOS(e.target.checked)}
            />

            {/* Submit — only appears when all fields done including phone */}
            {canSubmit && (
              <Button onClick={onSubmit}>gib de Passport</Button>
            )}

          </div>
        </div>
      </Card>

      {/* Preview panel */}
      <div className="w-1/2">
        <h4>GuildBank Passport (preview)</h4>
        <div className="flex flex-col border-2 border-solid border-gray-500">
          <MediaRenderer src={pfpCID} />
          <div>
            <div>Wallet: {activeAccount?.address}</div>
            <div className="w-full overflow-x-auto">userName ({userName}): {userNameCID || ""}</div>
            <div>Handle: {alias}</div>
            <div>statusMsg: {statusCID ? statusCID : msgStatus}</div>
            <div>Creation Time: {timestamp}</div>
            <div>is Minor: {minor ? "True" : "False"}</div>
            <div>Password Hash: {hash}</div>
            <div className="flex flex-row items-center">TOS: {checkTOS ? <img className="h-20 mx-2" src={passportIcon.src} /> : ""}</div>
            <div>Phone: {otpStep === 'verified' ? phone : 'not verified'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuildBankPassport;