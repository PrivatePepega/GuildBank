import React from 'react'
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useState } from "react";

import {contractDAOBurner, contractSourceDAO } from "@/utils/functionDump/getContracts"

import { Button, Input } from "@material-tailwind/react";














const BoDDaoBurnerComponent = () => {

  const activeAccount = useActiveAccount();


    const [burnAmount, setBurnAmount] = useState(0);


    const [token, setToken] = useState("");

    const { data: showGovernorBurnArray, isLoading: GovernorBurnLoad } = useReadContract({
      contract: contractDAOBurner,
      method: "function showBurnArray() returns(string[] memory)",
    });
    const { data: showAmount, isLoading: showAmountLoad } = useReadContract({
      contract: contractDAOBurner,
      method: "function showTokenAmount(string memory _name) returns (uint256)",
      params: [token ? token : null],
    });
    const { data: showTokenAddress, isLoading: showTokenAddressLoad } = useReadContract({
      contract: contractDAOBurner,
      method: "function showTokenAddress(string memory _name) returns (address)",
      params: [token ? token : null],
    });
    const { data: showTokenId, isLoading: showTokenIdLoad } = useReadContract({
      contract: contractDAOBurner,
      method: "function showTokenId(string memory _name) returns (uint256)",
      params: [token ? token : null],
    });
    const { data: showTokenIsERC20, isLoading: showTokenIsERC20Load } = useReadContract({
      contract: contractDAOBurner,
      method: "function showTokenIsERC20(string memory _name) returns (bool)",
      params: [token ? token : null],
    });
  




  const { mutate: BurnDaoToken, data: BurnDaoTokenData } = useSendTransaction();
  const BurnDaoTokenTx = () => {
    const BurnDaoTokenTransaction = prepareContractCall({
        contract: contractDAOBurner,
        method: "function BurnDAOTokenToLocal (uint256 _amount, bytes calldata _data) returns(bool)",
        params: [burnAmount, "0x"],
      })
      BurnDaoToken(BurnDaoTokenTransaction);
    };
  
    const { data: showDcoinBurnCount, isLoading: showDcoinBurnCountLoad } = useReadContract({
      contract: contractDAOBurner,
      method: "function DcoinBurningCounter() returns(uint56)",
    });
      

    const { data: balanceOfSource, isLoading: sourceLoadSoure } = useReadContract({
      contract: contractSourceDAO,
      method: "function balanceOf(address account) returns (uint256)",
      params: [activeAccount ? activeAccount.address : null],
    });





    const [updateToken, setUpdateToken] = useState("");
    const { mutate: updateFundCheck, data: updateFundCheckDAta } = useSendTransaction();

    const updateFundCheckTx = () => {
      const updateFundCheckTrans = prepareContractCall({
          contract: contractDAOBurner,
          method: "function updateFundCheck(string memory _tokenName)",
          params: [updateToken ? updateToken : null],
        })
        updateFundCheck(updateFundCheckTrans);
      };


    







  return (
    <div>
      <h3 className='my-3 font-bold text-lg'>
        Vault Stats
      </h3>
      <ul>
        <li>
          Address: {contractDAOBurner.address}
        </li>
        <li>
          Vault Accepted Donations: {showGovernorBurnArray}
        </li>
        <li>
          Burn Counter: {Number(showDcoinBurnCount)}
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
          Token Addres: {showTokenAddress}
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
      <ul>
        <li>
          Update Treasury Token Funds:
          <div className='w-52'>
            <Input
              type="text"
              size="lg"
              label="Update dis token"
                color="white"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => {setUpdateToken(e.target.value)}}
            />
          </div>
          <Button onClick={() => updateFundCheckTx()}>
            Update
          </Button>
        </li>
      </ul>








      <h3 className='my-3 font-bold text-lg'>
        Burn:
      </h3>
      <ul>
        <li>
          Personal Balance: {Number(balanceOfSource)}
        </li>
        <li>
          <div className='w-52'>
            <Input
            type="number"
            size="lg"
            label="Burn Amount"
                      color="white"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e) => {setBurnAmount(e.target.value)}}
            /> 
          </div>
          <Button onClick={() => BurnDaoTokenTx()}>
            Burn
          </Button>
        </li>
      </ul>

    </div>
  )
}


export default BoDDaoBurnerComponent