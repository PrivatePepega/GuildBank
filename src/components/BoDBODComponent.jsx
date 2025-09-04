"use client";


import { useState, useEffect } from "react";
import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { Interface, getAddress, hexlify, toUtf8Bytes } from "ethers";


// Contracts
import { useActiveAccount } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import { contractBoDTreasury } from "@/utils/functionDump/getContracts"
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import BoDSubmitAction from "./BoDSubmitAction";
import BoDBODTabComponent from "./BoDBODTabComponent";

import IPFSFileViewer from "@/components/IPFSFileViewer";







// we are creating a component to render a decodebyte code button and display the decoded and this needs to be a SSR component








const BoDBODComponent = () => {




    const activeAccount = useActiveAccount();
    const [BoDTabs, setBoDTabs] = useState(0);





    
    const { data: showActionOnQueueArray, isLoading: showActionOnQueueArrayLoad } = useReadContract({
      contract: contractBoDTreasury,
      method: "function showActionOnQueueArray() returns(uint256[] memory)",
    });
      








  const [actionTicket, setActionTicket] = useState();
  const [humanReadableDateAction, setHumanReadableDateAction] = useState("");
  const [decodedData, setDecodedData] = useState([]);






  const { data: ActionsVoteLedger, ActionsVoteLedgerLoading } = useReadContract({
    contract: contractBoDTreasury,
    method: "function ActionsVoteLedger(uint256, address) public view returns (bool)",
    params: [actionTicket, activeAccount ? activeAccount.address : null],
  });
  const { data: actionTransaction, actionTransactionLoading } = useReadContract({
    contract: contractBoDTreasury,
    method: "function actionsMapping(uint256) returns(string,address,address,bytes,bool,uint256,uint256,uint256,uint256,uint256,uint8,bool)",
    params: [actionTicket],
  });
  const { data: actionTokenNames, actionTokenNamesLoading } = useReadContract({
    contract: contractBoDTreasury,
    method: "function getActionTokenNames(uint256 _key) public view returns (string[] memory)",
    params: [actionTicket],
  });

  const { data: actionTokenAmount, actionTokenAmountLoading } = useReadContract({
    contract: contractBoDTreasury,
    method: "function getActionAmount(uint256 _key) public view returns (uint256[] memory)",
    params: [actionTicket],
  });






  useEffect(() => {
    if (actionTransaction && actionTransaction[7]) {
      const unixTimestamp = Number(actionTransaction[7]);
      const date = new Date(unixTimestamp * 1000);
      const readableDate = date.toLocaleString();
      console.log("Human readable auto delete:", readableDate);
      setHumanReadableDateAction(readableDate);
    } else {
      console.log("No timestamp available:", { actionTransaction });
      setHumanReadableDateAction("");
    }
  }, [actionTransaction]);

    



  const { mutate: actionAccept, data: actionAcceptData } = useSendTransaction();
  const ActionAccept = () => {
  const ActionAcceptTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function approveAction(uint256 _ActionId)",
      params: [actionTicket],
      })
      actionAccept(ActionAcceptTransaction);
  };
  const { mutate: denyAction, data: denyActionData } = useSendTransaction();
  const DenyAction = () => {
  const denyActionTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function denyAction(uint256 _ActionId)",
      params: [actionTicket],
      })
      denyAction(denyActionTransaction);
  };
  const { mutate: executeAction, data: executeActionData } = useSendTransaction();
  const ExecuteActionFun = () => {
  const executeActionTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function executeAction(uint _ActionId, bytes calldata _data)",
      params: [actionTicket, "0x"],
      })
      executeAction(executeActionTransaction);
  };















const [ipfsData, setIpfsData] = useState(null);

useEffect(() => {
  const fetchIpfsData = async () => {
    if (!actionTransaction || typeof actionTransaction[0] !== "string" || !actionTransaction[0].startsWith("ipfs://")) {
      console.log("Invalid or missing IPFS URL:", actionTransaction?.[0]);
      setIpfsData(null);
      return;
    }
    try {
      console.log("Fetching IPFS:", actionTransaction[0]);
      const gatewayUrl = actionTransaction[0].replace("ipfs://", "https://ipfs.io/ipfs/");
      const response = await fetch(gatewayUrl);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const text = await response.text();
      const json = JSON.parse(text);
      console.log("IPFS Data:", json);
      setIpfsData(json);
    } catch (error) {
      console.error("Error fetching IPFS:", error.message);
      setIpfsData(null);
    }
  };
  fetchIpfsData();
}, [actionTransaction]);





const decodeFunctionCall = () => {
  try {
    console.log("ipfsData:", ipfsData);
    console.log("actionTransaction[3]:", actionTransaction[3]);

    let functionSignature = ipfsData?.functionSignature?.trim();
    if (!functionSignature) throw new Error("Missing function signature");

    console.log("Raw functionSignature:", functionSignature);

    functionSignature = functionSignature
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\b(memory|calldata|payable)\b/g, "")
      .replace(/\s*(bytes|string)\s+(?=\w)/g, "$1 ")
      .replace(/,\s*/g, ",")
      .replace(/\s*\)/g, ")")
      .replace(/\(\s*/g, "(")
      .replace(/^function\s+/, "function ")
      .trim();

    console.log("Cleaned functionSignature:", functionSignature);

    const iface = new Interface([functionSignature]);

    const fnNameMatch = functionSignature.match(/function\s+(\w+)\s*\(/);
    const fnName = fnNameMatch ? fnNameMatch[1] : null;
    if (!fnName) throw new Error("Could not extract function name");
    console.log("Function Name:", fnName);

    const decoded = iface.decodeFunctionData(fnName, actionTransaction[3]);

    const decodedReadable = decoded.map((value, index) => {
      const paramTypes = functionSignature.match(/\(([^)]+)\)/)[1].split(",");
      const paramType = paramTypes[index].trim().split(/\s+/)[0];
      console.log(`Param ${index + 1} Type:`, paramType, "Value:", value);
      if (paramType === "address") return getAddress(value);
      if (paramType.includes("uint") || paramType.includes("int")) return value.toString();
      if (paramType === "bool") return value.toString();
      if (paramType === "string") return value;
      return value.toString();
    });

    console.log("Decoded Data:", decodedReadable);
    setDecodedData(decodedReadable);
  } catch (error) {
    console.error("Decoding Error:", error.message);
    setDecodedData(["Error: Unable to decode bytecode"]);
  }
};














    return (
    <div>
      <div className="flex justify-center items-center">
        <h3 className='font-bold text-lg my-5'>
          BoD, Board of Directors
        </h3>
      </div>
        <div className="flex flex-row gap-12 justify-center items-center">
          <ButtonGroup>
            <Button onClick={()=>{setBoDTabs(0)}}>Tickets</Button>
            <Button onClick={()=>{setBoDTabs(1)}}>Proposal</Button>
            <Button onClick={()=>{setBoDTabs(2)}}>BoD Chairs</Button>
          </ButtonGroup>
        </div>
        {BoDTabs === 0 && 
        <div>
          <div className="flex justify-center items-center w-full">
            <h3 className='my-3 font-bold text-lg'>
              Tickets
            </h3>
          </div>
          <div>
            Active Tickets: [{showActionOnQueueArray?.map((tx) => tx.toString()).join(", ")}]
          </div>

              <div>
                <div>
                  <div>
                    <h3>Ticket id: </h3>
                      <Input
                      type="number"
                      label="Ticket ID"
                      color="white"
                      onChange={(e) => setActionTicket(e.target.value)}
                      />
                  </div>
                  <div>
                    <h2>
                      YOU, BoD, Voted for Ticket #: 
                    </h2>
                    <h2>
                      {actionTicket}: {ActionsVoteLedger ? "Voted" : "Not Voted" }
                    </h2>
                  </div>

                  <ButtonGroup className="my-7">
                    <Button onClick={()=>{ActionAccept()}}>Accept Ticket</Button>
                    <Button onClick={()=>{DenyAction()}}>Deny Ticket</Button>
                    {
                      actionTransaction && actionTransaction[5] >= 12 ? (
                        <Button onClick={() => ExecuteActionFun()}>Execute Ticket</Button>
                      ) : null
                    }
                  </ButtonGroup>
                </div>



                <div className="mb-12">
                  <ul className="my-6 w-full h-full overflow-auto flex flex-col gap-1">
                    <li><strong>IPFS Link:</strong></li>
                    <li><IPFSFileViewer ipfsUrl={actionTransaction ? actionTransaction[0] : null} /></li>
                    <li><strong>Submitter:</strong></li>
                    <li>{actionTransaction ? actionTransaction[1] : null}</li>
                    <li><strong>To:</strong></li>
                    <li>{actionTransaction ? actionTransaction[2] : null}</li>
                    <li><strong>ByteCode _data:</strong></li>
                    <li className="whitespace-pre text-wrap break-all"> {actionTransaction ? actionTransaction[3] : null}</li>
                    <li><Button onClick={()=>{decodeFunctionCall()}}>Decode bytecode</Button>{decodedData}</li>
                    {decodedData.length > 0 ? (
                      <ul className="ml-4 mt-2">
                        {decodedData.map((value, index) => (
                          <li key={index} ><strong>Input {index + 1}:</strong> {value}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="ml-2 text-red-500">{decodedData[0] || "No decoded data"}</span>
                    )}
                    <li><strong>Active:</strong> </li>
                    <li>{actionTransaction ? (actionTransaction[4] ? "Yes" : "No") : null}</li>
                    <li><strong>ApprovalCount:</strong> </li>
                    <li>{actionTransaction ? Number(actionTransaction[5]) : null}</li>
                    <li><strong>DeniedCount:</strong> </li>
                    <li>{actionTransaction ? Number(actionTransaction[6]) : null}</li>
                    <li><strong>AutoDelete:</strong> </li>
                    <li>{actionTransaction ? humanReadableDateAction : null}</li>
                    <li><strong>TicketId:</strong> </li>
                    <li>{actionTransaction ? Number(actionTransaction[8]) : null}</li>
                    <li><strong>ArrayId:</strong> </li>
                    <li>{actionTransaction ? Number(actionTransaction[9]) : null}</li>
                    <li><strong>is Tx:</strong> </li>
                    <li>{actionTransaction ? (actionTransaction[11] ? "Yes" : "No") : null}</li>
                    <li><strong>Token Names:</strong> </li>
                    <li>{actionTokenNames ? actionTokenNames?.map((tx) => tx.toString()).join(", ") : null}</li>
                    <li><strong>Token Amount:</strong> </li>
                    <li>{actionTokenAmount ? actionTokenAmount?.map((tx) => tx.toString()).join(", ") : null}</li>
                  </ul>
                </div>
              </div>
            </div>
      }
        















        {BoDTabs === 1 && 
        <div>
          <BoDSubmitAction />
        </div>
        }













        {BoDTabs === 2 && 
          <BoDBODTabComponent />
        }


      </div>
    )

  }



export default BoDBODComponent
