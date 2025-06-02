"use client";


import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
import {uploadData} from "@/utils/functionDump/Passport.js"
import { useActiveAccount } from "thirdweb/react";
import { MediaRenderer } from "thirdweb/react";
import passportIcon from "@/assets/img/coin_matrix.jpg"
import { useSendTransaction } from "thirdweb/react";
import {contractPassport} from "@/utils/functionDump/getContracts.js"


import * as openpgp from "openpgp";
import { createHash } from "crypto"; // Node.js crypto for SHA-256
import { prepareContractCall } from "thirdweb";







const GuildBankPassport = () => {


  const router = useRouter();

  
  const [alias, setAlias] = useState('');
  const [minor, setMinor] = useState();
  const activeAccount = useActiveAccount();
  const [pfp, setPfp] = useState(null);
  const [userName, setUserName] = useState(null);
  const [pfpCID, setPfpCID] = useState(null);
  const [userNameCID, setUserNameCID] = useState(null);
  const [pfpLoading, setPfpLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);




  const uploadPFP = (_file) => {
    setPfpLoading(true);
    const url = uploadData(_file);
    if (url) {
      url.then(res => {setPfpCID(res)});
      setPfpLoading(false);
    }
  };
const uploadUserName = (_userName) => {
  setNameLoading(true);
  // Create a new Blob with the username content
  const blob = new Blob([_userName], { type: 'text/plain' });
  // Create a new File with the Blob and the desired filename
  const renamedFile = new File([blob], `userName.txt`, { type: 'text/plain' });
  const url = uploadData(renamedFile); 
  if (url) {
    url.then(res => {setUserNameCID(res)});
    setNameLoading(false);
  }
  setUserName(_userName);
  const reader = new FileReader();
  reader.onload = () => {
      console.log("File Content (from FileReader):", reader.result);
    };
  reader.readAsText(renamedFile);
};



const [msgStatus, setMSGStatus] = useState('');
const [statusCID, setStatusCID] = useState("");
const [chainMode, setChainMode] = useState(true);
const [msgLoading, setMsgLoading] = useState(false);
const uploadMSGPushToIPFS = () => {
  setMsgLoading(true);
  setChainMode(false);
  // Create a new Blob with the username content
  const blob = new Blob([msgStatus], { type: 'text/plain' });
  // Create a new File with the Blob and the desired filename
  const renamedFile = new File([blob], `msgStatus.txt`, { type: 'text/plain' });
  const url = uploadData(renamedFile); 
  if (url) {
    url.then(res => {setStatusCID(res)});
    setMsgLoading(false);
  }
};

const pushToChain = () => {
  setChainMode(true);
  setStatusCID("");
};


const now = new Date();
const timestamp = Math.floor(now.getTime() / 1000);

const [checkTOS, setCheckTOS] = useState(false);


















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
















  



  const { mutate: sendTx, data: transactionResult } = useSendTransaction();
 
  const onSubmit = () => {
    const transaction = prepareContractCall({
        contract: contractPassport,
        method: "function createPassport(string memory _profilePic, string memory _userName, string memory _handle, string memory _statusMSG, bool _TOS, bool _minor, string memory _password)",
        params: [pfpCID, userNameCID, alias, statusCID ? statusCID : msgStatus, checkTOS, minor, hash],
      })
      sendTx(transaction);
    };
  if(transactionResult){
    console.log(transactionResult.transactionHash);
    router.push("/home");
  }





















  return (
    <div className="flex flex-row justify-around w-full">
      


      {transactionResult ? 
  <p>welcome fren, you will be rerouted in 10,9,8,7,6,5,4,3,2,1....</p>
: 
<Card color="transparent" shadow={false} className="w-1/2 justify-center items-center">
        <Typography variant="h4" color="white">
          GuildBank Passport
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          This is our badge to PvP in the metaverse.
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          You can change these later btw,
        </Typography>
        <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">


      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="white" className="mt-3">
          !IPFS! Profile Picture  
        </Typography>
          <div>
            <Input
              type="file"
              size="lg"
              label="Metaverse Profile Picture"
              className=" !border-t-white-200  "
              onChange={(e) =>{
                setPfp(e.target.files[0]);
              }
              }
            />
            <Button onClick={() => uploadPFP(pfp)}>
              IPFS
            </Button>
          </div>



        <Typography variant="h6" color="white" className="mt-3">
          !ONCHAIN! Your Wallet Address
        </Typography>
            <p className="text-white">{activeAccount.address}</p>



        <Typography variant="h6" color="white" className="mt-3">
          !IPFS! Username 
        </Typography>
            <div>
              <Input
                type="text"
                size="lg"
                label="Metaverse Username"
                color="white"
                className=" !border-t-white-200 text-white placeholder-visible"
                onChange={(e) =>{
                  setUserName(e.target.value);
                  setUserNameCID("");
                  }
                }
              />
              <Button
              onClick={() => uploadUserName(userName)}
              loading={nameLoading ? true : false}
              >
                IPFS
              </Button>
            </div>






        <Typography variant="h6" color="white" className="mt-3">
          !ONCHAIN! Handle
        </Typography>
            <Input
              type="text"
              size="lg"
              color="white"
              label="Metaverse Handle"
              className=" !border-t-white-200 "
              onChange={(e) => setAlias(e.target.value)}

            />

  <Typography variant="h6" color="white" className="mt-3">
    !IPFS or ONCHAIN! Public Status
  </Typography>
            <div>
              <Input
                type="text"
                size="lg"
                label="Metaverse Public Status"
                color="white"
                onChange={(e) => {setMSGStatus(e.target.value); setStatusCID(""); setChainMode(true);}}
              />
              <div className="flex flex-row gap-1">
                <Button
                onClick={() => uploadMSGPushToIPFS()
                }
                loading={chainMode ? false : true}
                >
                  IPFS
                </Button>
                <Button
                onClick={() => pushToChain()}
                loading={chainMode ? true : false}
                >
                  Chain
                </Button>
              </div>
              <p>{statusCID}</p>
            </div>







      <Typography variant="h6" color="white" className="mt-3">
        !ONCHAIN! Account Creation Date
      </Typography>
          <p>{timestamp}</p>
          </div>

      <Typography variant="h6" color="white" className="mt-3">
        !ONCHAIN! User is Minor?
      </Typography>
          <Checkbox
          defaultChecked
            label={
              <Typography
                variant="small"
                color="white"
                className="flex items-center font-normal"
              >
                <p className="mr-4"> MINOR: </p>
                <div>
                  <a className="font-medium transition-colors hover:text-gray-900">
                    Box must be Checked if you're a Minor.
                  </a>
                  <a className="font-medium transition-colors hover:text-gray-900">
                    skibidi kid.
                  </a>
                </div>

              </Typography>
            }
            onChange={(e) => {
              if (e.target.checked) {
                setMinor(true);
              }else{
                setMinor(false);
              }
            }}
          />




















<Typography variant="h6" color="white" className="mt-3">
        !ONCHAIN! Account Password
  </Typography>
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
            "Generate Password"
          )}
        </button>
      </form>

      {publicKey && privateKey && (
        <div className="mt-6 space-y-4">
          <div>
            <Typography variant="h6" color="white" className="mt-3 flex justify-center items-center">
              READ, tard.
            </Typography>
            <p>
              Save and Keep these Keys to yourself, you'll need to input these into the APP.
              The actual password is Public Key + Private Key. We sha256 hash the  password,
              and upload the hash to the blockchain. Now the APP can confirm YOU(the wallet),
              is actually YOU and not a hacker or scammer.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Public Key</h3>
            <textarea
              value={publicKey}
              readOnly
              className="w-full h-32 p-2 border rounded-lg bg-gray-50 text-sm font-mono text-black"
            />
            <div className="mt-2 space-x-2 flex flex-row">
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
            <div className="mt-2 space-x-2 flex flex-row">
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
        </div>
      )}

      {status && (
        <div className="mt-4">
          <p
            className={`text-center ${
              status.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {status}
          </p>
          {status.includes("successfully") && (
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Blockchain Password Hash</h3>
                <textarea
                  value={hash}
                  readOnly
                  className="w-full h-16 p-2 border rounded-lg bg-gray-50 text-sm font-mono text-black"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>



































    <Typography variant="h6" color="white" className="mt-3">
        !ONCHAIN! Terms of Service
      </Typography>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="white"
                className="flex items-center font-normal"
              >
                I agree that:
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900 my-6"
                >
                  &nbsp;We retarded ngl, SHEEEEESH.
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            onChange={(e) => {
              if (e.target.checked) {
                setCheckTOS(true);
              }else{
                setCheckTOS(false);
              }
            }}
          />
          {checkTOS && userNameCID && alias && activeAccount.address && msgStatus && hash && checkTOS ?                     
            <Button className="mt-6 mb-6" fullWidth onClick={() => {onSubmit()}}>
              gib de Passport,
            </Button> : ""
            }

        </div>
      </Card>
}



      <div className="w-1/2">
        <h4>
          GuildBank Passport (preview)
        </h4>
        <div className="flex flex-col border-2 border-solid border-gray-500 ">
          <MediaRenderer src={pfpCID}/>
          <div className="">
            <p> Wallet: {activeAccount.address}</p>
            <div className="w-full overflow-x-auto">userName ({userName}): {userNameCID ? userNameCID : ""}</div>
            <div>Handle: {alias}</div>
            <div>statusMsg ({statusCID ? msgStatus : null}): {statusCID ? statusCID : msgStatus}</div>
            <div>Creation Time: {timestamp}</div>
            <div>is Minor: {minor ? "True" : "False"}</div>
            <div>Password Hash: {hash}</div>
            <div className="flex flex-row items-center">TOS:  {checkTOS ? <img className="h-20 mx-2" src={passportIcon.src}/> : ""}</div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default GuildBankPassport




