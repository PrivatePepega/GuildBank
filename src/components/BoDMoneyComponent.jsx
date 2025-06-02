import React from 'react'
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";

import {contractMoneyDAO } from "@/utils/functionDump/getContracts"















const BoDMoneyComponent = () => {



    const activeAccount = useActiveAccount();

// money stats  // money stats  // money stats
// money stats  // money stats  // money stats
// money stats  // money stats  // money stats

// get money address to display



  const { data: amountPerMintMoney, isLoading: amountLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function amountPerMint() returns (uint256)",
  });

  const { data: balanceOfMoney, isLoading: sourceLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function balanceOf(address account) returns (uint256)",
    params: [activeAccount ? activeAccount.address : null],
  });


  

  const { data: capTotalMoney, isLoading: capLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function cap() returns (uint256)",
  });

  const { data: lastMintMoney, isLoading: lastMintMoneyLoad } = useReadContract({
    contract: contractMoneyDAO,
    method: "function lastMinted() returns (uint256)",
  });

  const { data: nameMoney, isLoading: nameLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function name() returns (string memory)",
  });

  const { data: symbolMoney, isLoading: symbolMoneyLoad } = useReadContract({
    contract: contractMoneyDAO,
    method: "function symbol() returns (string memory)",
  });

  const { data: totalSupplyMoney, isLoading: supplyLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function totalSupply() returns (uint256)",
  });


// money stats  // money stats  // money stats
// money stats  // money stats  // money stats
// money stats  // money stats  // money stats


  
  
  





  return (
    <div>
      <h3 className='my-3 font-bold text-lg'>
        Money Token Stats
      </h3>
      <ul>
        <li>
          Address: {contractMoneyDAO.address}
        </li>
        <li>
          Name: {nameMoney}
        </li>
        <li>
          Symbol: {symbolMoney}
        </li>
        <li>
          Amount per Mint: {Number(amountPerMintMoney)}
        </li>
        <li>
          Max Capacity: {Number(capTotalMoney)}
        </li>
        <li>
          Total Minted Supply: {Number(totalSupplyMoney)}
        </li>

      </ul>
      <h3 className='my-3 font-bold text-lg'>
        Personal Stats:
      </h3>
      <ul>
        <li>
            Personal Balance: {Number(balanceOfMoney)}
        </li>
      </ul>
    </div>
  )
}


export default BoDMoneyComponent