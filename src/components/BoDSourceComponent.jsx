import React from 'react'
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useState } from "react";

import {contractSourceDAO } from "@/utils/functionDump/getContracts"

import { Button, Input } from "@material-tailwind/react";














const BoDSourceComponent = () => {



    const activeAccount = useActiveAccount();

  // Source Stats   // Source Stats  // Source Stats
  // Source Stats   // Source Stats  // Source Stats
  // Source Stats  // Source Stats  // Source Stats

  const [delegateAccount, setDelegateAccount] = useState("");
  const { mutate: delegateTx, data: delegateTxData } = useSendTransaction();
  const delegatePerson = () => {
    const delegateTransaction = prepareContractCall({
        contract: contractSourceDAO,
        method: "function delegate(address _account)",
        params: [delegateAccount],
      })
      delegateTx(delegateTransaction);
    };
  
  
    const { data: amountPerMintSource, isLoading: amountLoadSource } = useReadContract({
      contract: contractSourceDAO,
      method: "function amountPerMint() returns (uint256)",
    });
  
    const { data: balanceOfSource, isLoading: sourceLoadSoure } = useReadContract({
      contract: contractSourceDAO,
      method: "function balanceOf(address account) returns (uint256)",
      params: [activeAccount ? activeAccount.address : null],
    });



    const { data: capTotalSource, isLoading: capLoadSource } = useReadContract({
      contract: contractSourceDAO,
      method: "function cap() returns (uint256)",
    });
  
    const { data: delegates, isLoading: delLoad } = useReadContract({
      contract: contractSourceDAO,
      method: "function delegates(address account) returns (address)",
      params: [activeAccount ? activeAccount.address : null],
    });
  
    const { data: showVotingPower, isLoading: votingLoad } = useReadContract({
      contract: contractSourceDAO,
      method: "function showVotingUnits(address account) returns (uint256)",
      params: [activeAccount ? activeAccount.address : null],
    });
  
    const { data: showDelegateVotingPower, isLoading: delegateLoad } = useReadContract({
      contract: contractSourceDAO,
      method: "function showVotingUnits(address account) returns (uint256)",
      params: [delegates ? delegates : null],
    });
  
    const { data: nameSource, isLoading: nameLoadSource } = useReadContract({
      contract: contractSourceDAO,
      method: "function name() returns (string memory)",
    });
    const { data: symbolSource, isLoading: symbolSourceLoad } = useReadContract({
      contract: contractSourceDAO,
      method: "function symbol() returns (string memory)",
    });
  
    const { data: totalSupplySource, isLoading: supplyLoadSource } = useReadContract({
      contract: contractSourceDAO,
      method: "function totalSupply() returns (uint256)",
    });
  
  
    // Source Stats   // Source Stats  // Source Stats
    // Source Stats   // Source Stats  // Source Stats
    // Source Stats  // Source Stats  // Source Stats
  
  
  





  return (
      <div>
        <h3 className='my-3 font-bold text-lg'>
          DAO Token Stats
        </h3>
        <ul>
          <li>
            Address: {contractSourceDAO.address}
          </li>
          <li>
            Name: {nameSource}
          </li>
          <li>
            Symbol: {symbolSource}
          </li>
          <li>
            Amount per Mint: {Number(amountPerMintSource)}
          </li>
          <li>
            Max Capacity: {Number(capTotalSource)}
          </li>
          <li>
            Total Minted Supply: {Number(totalSupplySource)}
          </li>

        </ul>
        <h3 className='my-3 font-bold text-lg'>
          Personal Stats:
        </h3>
        <ul>
          <li>
            Personal Balance: {Number(balanceOfSource)}
          </li>
          <li>
            Delegatee Address: {delegates}
          </li>
          <li>
            Delegatee Power: {Number(showDelegateVotingPower)}
          </li>
          <li>
            Delegate To: 
            <div className='w-52'>
              <Input
                type="text"
                size="lg"
                label="Delegate To"
                        color="white"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={(e) => {setDelegateAccount(e.target.value)}}
              />
            </div>
            <Button
              onClick={() => delegatePerson()}
            >
              Delegate
            </Button>
          </li>
        </ul>
      </div>
  )
}


export default BoDSourceComponent