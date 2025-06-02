"use client";


import { useState } from "react";
import { ButtonGroup, Button, Input, Textarea  } from "@material-tailwind/react";
import { Interface, getAddress, hexlify, toUtf8Bytes } from "ethers";
import { MediaRenderer } from "thirdweb/react";


// Contracts
import { useActiveAccount } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import {contractPassport, contractBoDTreasury } from "@/utils/functionDump/getContracts"
import { useCheckPassport } from "@/utils/functionDump/checkPassport";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {uploadData} from "@/utils/functionDump/Passport.js"











const BoDSubmitTx = () => {







    const { mutate: sumbitTx, data: sumbitTxData } = useSendTransaction();
    const SumbitTX = () => {
    const SubmitTXTransaction = prepareContractCall({
        contract: contractBoDTreasury,
        method: "function submitTransaction(string memory _ipfsLink, address _to, string[] memory _tokenName, uint256[] memory _amount)",
        params: [TxCid, TxTo, TxTokenArray, TxAmountArray],
        })
        sumbitTx(SubmitTXTransaction);
    };





// Transaction// Transaction// Transaction// Transaction
// Transaction// Transaction// Transaction// Transaction
// Transaction// Transaction// Transaction// Transaction

const [TxIpfs, setTxIpfs] = useState("");
const [TxCid, setTxCid] = useState("");
const [TxTo, setTxTo] = useState("");
const [TxTokenArray, setTxTokenArray] = useState([]);
const [TxAmountArray, setTxAmountArray] = useState([]);




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

  const IPFSTransactionTxTicket = () => {
    const blob = new Blob([TxIpfs], { type: 'application/json' });
    const txIpfs = new File([blob], `TxIpfs.txt`, { type: 'application/json' });
    const url = uploadData(txIpfs); 
    if (url) {
      url.then(res => {setTxCid(res)});
    }
  }

// Transaction// Transaction// Transaction// Transaction
// Transaction// Transaction// Transaction// Transaction
// Transaction// Transaction// Transaction// Transaction





    return (
    <div>
        <div>
        Transaction Description:{TxCid}
        <Textarea
            label="Transaction Description"
            onChange={(e) => setTxIpfs(e.target.value)}
        />
        </div>
        <Button onClick={()=>IPFSTransactionTxTicket()}>
          Tx IPFS
        </Button>
        <div>
          Address To: {TxTo}
        <Input
          type="text"
          color="white"

          label="Address To"
          onChange={(e) => setTxTo(e.target.value)}
        />
        </div>
        <div>
          List, of, Token, Names: {TxTokenArray.join(", ")}
        <Input
          type="text"
          color="white"
          label="List, of, Token, Names"
          onChange={handleTXTokenNameInput}
            />
        </div>
        <div>
          List, of, Token, Amounts: {TxAmountArray.join(", ")}
        <Input
          color="white"
          type="text"
          label="List, of, Token, Amounts"
          onChange={handleTXTokenAmountInput}
            />
        </div>

        <Button onClick={()=>SumbitTX()}>
          Submit Tx
        </Button>
    </div>


    )
}


export default BoDSubmitTx
