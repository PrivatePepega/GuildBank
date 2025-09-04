import React from 'react'
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useState, useEffect } from "react";

import {contractSourceDAO, contractMoneyDAO, contractBoDTreasury } from "@/utils/functionDump/getContracts"

import { Button, Input } from "@material-tailwind/react";














const BoDTreasuryComponent = () => {






// BoD Treasury // BoD Treasury // BoD Treasury
// BoD Treasury // BoD Treasury // BoD Treasury
// BoD Treasury // BoD Treasury // BoD Treasury

const { data: showTreasuryArray, isLoading: BoDTreasuryLoad } = useReadContract({
    contract: contractBoDTreasury,
    method: "function showTreasuryArray() returns(string[] memory)",
  });
  

  

  

    const { data: balanceOfDAOMoney, isLoading: DaoMoneyLoad } = useReadContract({
      contract: contractMoneyDAO,
      method: "function balanceOf(address account) returns (uint256)",
      params: [contractBoDTreasury.address],
    });


    const { data: balanceOfTreasury, isLoading: balanceOfTreasuryLoad } = useReadContract({
      contract: contractSourceDAO,
      method: "function balanceOf(address account) returns (uint256)",
      params: [contractBoDTreasury.address],
    });




    const [token, setToken] = useState("");

    const { data: showAmount, isLoading: showAmountLoad } = useReadContract({
      contract: contractBoDTreasury,
      method: "function showTokenAmount(string memory _name) returns (uint256)",
      params: [token ? token : null],
    });
    const { data: showTokenAddress, isLoading: showTokenAddressLoad } = useReadContract({
      contract: contractBoDTreasury,
      method: "function showTokenAddress(string memory _name) returns (address)",
      params: [token ? token : null],
    });
    const { data: showTokenId, isLoading: showTokenIdLoad } = useReadContract({
      contract: contractBoDTreasury,
      method: "function showTokenId(string memory _name) returns (uint256)",
      params: [token ? token : null],
    });
    const { data: showTokenIsERC20, isLoading: showTokenIsERC20Load } = useReadContract({
      contract: contractBoDTreasury,
      method: "function showTokenIsERC20(string memory _name) returns (bool)",
      params: [token ? token : null],
    });








    const { mutate: updateFundCheck, data: updateFundCheckDAta } = useSendTransaction();

    const updateFundCheckTx = () => {
      const updateFundCheckTrans = prepareContractCall({
          contract: contractBoDTreasury,
          method: "function updateFundCheck()",
        })
        updateFundCheck(updateFundCheckTrans);
      };




  return (
    <div>
      <h3 className='my-3 font-bold text-lg'>
        BoD Treasury
      </h3>
      <ul>
        <li>
          BoD Treasury: {contractBoDTreasury.address}
        </li>
        <li>
          Accepted Tokens, BoD Treasury: {showTreasuryArray ? showTreasuryArray.join(', ') : null}
        </li>
        <li className='flex flex-row items-center gap-3'>
          <Input
              type="text"
              color="white"
              label="input de token name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => {setToken(e.target.value)}}
            />
        </li>
        <li>
          Token Name: {token}
        </li>
        <li>
          Token Amount: {Number(showAmount)}
        </li>
        <li>
          Token Address: {showTokenAddress}
        </li>
        <li>
          Token Id: {Number(showTokenId)}
        </li>
        <li>
          Token IsERC20: {showTokenIsERC20 ? "Yes, its ERC-20" : "not ERC-20"}
        </li>
      </ul>
      <h3 className='my-3 font-bold text-lg'>
        Update Treasury
      </h3>
      <div className='flex flex-col gap-2'>
        <p>
          Update Treasury Token Funds:
        </p>
        <Button onClick={() => updateFundCheckTx()}>
          Update
        </Button>
      </div>


    </div>
  )
}


export default BoDTreasuryComponent


