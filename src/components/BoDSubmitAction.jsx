"use client";


import { useState } from "react";
import { ButtonGroup, Button, Input, Textarea  } from "@material-tailwind/react";
import { Interface, getAddress, hexlify, toUtf8Bytes } from "ethers";


// Contracts
import { useActiveAccount } from "thirdweb/react";
import {contractPassport, contractBoDTreasury } from "@/utils/functionDump/getContracts"
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {uploadData} from "@/utils/functionDump/Passport.js"
import IPFSFileViewer from "./IPFSFileViewer";











const BoDSubmitAction = () => {





const inputTypes = ["uint256", "address", "string", "bytes", "bool"];
const [pairs, setPairs] = useState([]);
const [functionSignature, setTXFunctionSignature] = useState("");
const [TXEncodedData, setTXEncodedData] = useState("");
const [proposalExplanation, setProposalExplanaition] = useState("");
const [txIPFS, setTxIPFS] = useState("");
const [targetAddress, setTargetAddress] = useState("");
const [isTXChecked, setIsChecked] = useState(false);
const [TxTokenArray, setTxTokenArray] = useState([]);
const [TxAmountArray, setTxAmountArray] = useState([]);


















// Add a new pair of inputs
const addPair = () => {
    setPairs([...pairs, { type: "", value: "" }]);
    console.log("Added pair:", [...pairs, { type: "", value: "" }]);
  };
  
  // Remove a pair
  const removePair = (index) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    setPairs(newPairs);
    console.log("Removed pair at index:", index, "New pairs:", newPairs);
  };
  
  // Update input values in a pair
  const updatePair = (index, key, newValue) => {
    const updatedPairs = [...pairs];
    if (key === "type" && newValue === "bool") {
      updatedPairs[index] = { type: "bool", value: "true" }; // Default bool to true
    } else {
      updatedPairs[index] = { ...updatedPairs[index], [key]: newValue };
    }
    setPairs(updatedPairs);
    console.log(`Updated pair ${index}:`, { key, newValue, updatedPairs });
  };



const IPFSThis = () =>{
    const combinedTXipfs = {proposalExplanation, functionSignature}
    const blob = new Blob([JSON.stringify(combinedTXipfs)], { type: 'application/json' });
    const txIpfs = new File([blob], `TxIpfs.txt`, { type: 'application/json' });
    const url = uploadData(txIpfs); 
    console.log("ipfsData", url);
    if (url) {
        url.then(res => {setTxIPFS(res)});
    }
}


const encodeFunctionCall = () => {
    try {
      IPFSThis();
  
      let cleanedSignature = functionSignature
      .trim()
      .replace(/\s+/g, " ") // collapse extra spaces
      .replace(/\b(memory|calldata|payable)\b/g, "") // remove memory/calldata/payable
      .replace(/\s*(bytes|string)\s+(?=\w)/g, "$1 ") // ensure `bytes _data` or `string _name` stays as "bytes _data"
      .replace(/,\s*/g, ",") // normalize comma spacing
      .replace(/\s*\)/g, ")") // normalize end paren spacing
      .replace(/\(\s*/g, "(") // normalize start paren spacing
      .replace(/^function\s+/, "function ") // ensure single space after "function"
      .trim();
  

      const iface = new Interface([cleanedSignature]);
  
      const fnNameMatch = cleanedSignature.match(/function\s+(\w+)\s*\(/);
      console.log("fnNameMatch", fnNameMatch);
      const fnName = fnNameMatch ? fnNameMatch[1] : null;
  
      if (!fnName) {
        throw new Error("Could not extract function name from signature.");
      }
  
      const values = pairs.map((pair) => {
        switch (pair.type) {
          case "uint256":
            return BigInt(pair.value);
          case "address":
            return getAddress(pair.value);
          case "bytes":
            return hexlify(toUtf8Bytes(pair.value));
          case "bool":
            return pair.value === "true" || pair.value === "1";
          default:
            return pair.value; // for string, etc.
        }
      });
  
      const encodedData = iface.encodeFunctionData(fnName, values);
  
      console.log("Encoded Data:", encodedData);
      setTXEncodedData(encodedData);
    } catch (error) {
      console.error("Encoding Error:", error.message);
      setTXEncodedData(null);
    }
  };
  








  



    const handleCheck = () => {
        setIsChecked(!isTXChecked);
    };

    const handleTXTokenNameInput = (e) => {
        const input = e.target.value;
        // console.log("Raw Input:", input); // Debugging: Log the raw input
        const tokens = input
        .split(",") // Split by commas
        .map((token) => token.trim()) // Remove extra spaces
        .filter((token) => token !== ""); // Remove empty strings
    
        // console.log("Processed Tokens:", tokens); // Debugging: Log processed tokens
        setTxTokenArray(tokens); // Update the state
    };
    const handleTXTokenAmountInput = (e) => {
        const input = e.target.value;
        // Split the input string by commas, trim whitespace, and convert to integers
        const amounts = input
        .split(",")
        .map((amount) => amount.trim()) // Remove any extra spaces
        .filter((amount) => amount !== "") // Filter out empty strings
        .map((amount) => {
            const num = parseInt(amount, 10); // Convert to integer
            return isNaN(num) ? 0 : num; // Handle invalid numbers by defaulting to 0
        });
        // console.log("Processed amounts:", amounts); // Debugging: Log processed tokens
        setTxAmountArray(amounts); // Update the state with the array of integers
    };









    const SubmitTicket = () => {
        if(txIPFS && TXEncodedData){
            const ActionTXTransaction = prepareContractCall({
                contract: contractBoDTreasury,
                method: "function submitAction(address _target, bytes memory _data, string memory _ipfsLink, bool _Tx, string[] memory _tokenName, uint256[] memory _tokenAmount)",
                params: [targetAddress, TXEncodedData, txIPFS, isTXChecked, TxTokenArray, TxAmountArray],
                })
            actionTX(ActionTXTransaction);
        }else{
            alert("Musto press encode");
        }
    };
    const { mutate: actionTX, data: actionTXData } = useSendTransaction();














    return (

    <div>
        <div className="flex justify-center items-center">
            <h3 className='my-3 font-bold text-lg'>
                Proposal
            </h3>
        </div>


        <div className="my-4">
            Purpose:
            <Textarea
                label="Proposal Explanation"
                onChange={(e) => setProposalExplanaition(e.target.value)}
            />
        </div>
        <div className="my-4"> 
            <h2>Target Contract:</h2>
            <p className="my-2">the contract you're triggering</p>
            <Input
                type="text"
                label="Target Address"
                color="white"
                onChange={(e) => setTargetAddress(e.target.value)}
            />
        </div>
        <div className="my-4">
            <h2>Function Signature:</h2>
            <p className="my-2">Example: function addTokenTreasury (string memory _tokenName, address _TokenAddress, bool _isErc20, uint256 _id)</p>
            <Input
                type="text"
                label="Enter Function Signature"
                color="white"
                onChange={(e) => setTXFunctionSignature(e.target.value)}
            />
        </div>


        
        <div style={{ padding: "20px" }}>
            <h2>Function's Signature Inputs: </h2>
            {pairs.map((pair, index) => (
            <div key={index} className="flex gap-2 my-2">
                <select
                className="text-white bg-blue-gray-500 rounded"
                value={pair.type}
                onChange={(e) => updatePair(index, "type", e.target.value)}
                >
                <option value="">Select Type</option>
                {inputTypes.map((type) => (
                    <option key={type} value={type} className="text-white bg-blue-gray-500 rounded">
                    {type}
                    </option>
                ))}
                </select>

                {pair.type === "bool" ? (
                <select
                    className="text-white bg-blue-gray-500 rounded"
                    value={pair.value || "true"} // Default to true if empty
                    onChange={(e) => updatePair(index, "value", e.target.value)}
                >
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
                ) : (
                <input
                    type="text"
                    className="text-white bg-blue-gray-500 rounded"
                    value={pair.value}
                    onChange={(e) => updatePair(index, "value", e.target.value)}
                    placeholder={pair.type ? `Enter ${pair.type}` : "Select type first"}
                />
                )}
                <Button onClick={() => removePair(index)}>Remove</Button>
            </div>
        ))}

            <div>
                <Button onClick={addPair}>
                    Add Pair
                </Button>
            </div>

            <div className="my-6 w-full h-full overflow-auto">
                <Button onClick={() => {encodeFunctionCall() }}>encode</Button>
                <div className="whitespace-pre text-wrap break-all">IPFS: <IPFSFileViewer ipfsUrl={txIPFS && txIPFS} /></div>
                <div className="whitespace-pre text-wrap break-all">ByteCode: {TXEncodedData}</div>
            </div>





            <div className="my-4">
                <div className="my-4">
                    <h2>Is this a Tx Transaction?</h2>
                    <Input
                        type="checkbox"
                        color="white"
                        checked={isTXChecked}
                        onClick={() => {handleCheck()}}
                    />
                <div className="my-4">
                    List, of, Token, Names, that, Treasury, accepted, with, their, proper, Names's, : {TxTokenArray.join(", ")}
                    <Input
                    type="text"
                    color="white"
                    label="List, of, Token, Names, that, Treasury, accepted, with, their, proper, Names's,"
                    onChange={handleTXTokenNameInput}
                    />
                </div>
                <div className="my-4">
                    List, of, Token, Amounts: {TxAmountArray.join(", ")}
                    <Input
                    type="text"
                    color="white"
                    label="List, of, Token, Amounts,"
                    onChange={handleTXTokenAmountInput}
                    />
                </div>

            </div>
                {proposalExplanation && targetAddress && functionSignature && txIPFS && TXEncodedData ? (
                    <Button onClick={() => SubmitTicket()} className="my-4">
                        Submit Action
                    </Button>
                    ) : (
                    <p className="text-red-400 mt-4">Please fill in all required fields before submitting.</p>
                )}
            </div>
        </div>
    </div>

)

}


export default BoDSubmitAction
