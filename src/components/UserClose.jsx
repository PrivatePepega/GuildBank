"use client";

import { useState } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useCheckPassport } from "@/utils/functionDump/checkPassport";
import { useReadContract } from "thirdweb/react";


import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport  } from "@/utils/functionDump/getContracts"




const UserClose = () => {

  
  const activeAccount = useActiveAccount();
  const { passportBalance, isLoading } = useCheckPassport(contractPassport, activeAccount);









const { mutate: deletePassport, data: deletePassportData } = useSendTransaction();
const deletePassportFunc = () => {
  const deletePassportTransaction = prepareContractCall({
    contract: contractPassport,
    method: "function deletePassport()",
  })
  deletePassport(deletePassportTransaction);
};

const { mutate: deleteSocialPassport, data: deleteSocialPassportData } = useSendTransaction();
const deleteSocialPassportFunc = () => {
  const deleteSocialPassportTransaction = prepareContractCall({
    contract: contractPassport,
    method: "function deleteSocialPassport()",
  });
  deleteSocialPassport(deleteSocialPassportTransaction);
};







// const { mutate: actionAccept, data: actionAcceptData } = useSendTransaction();
// const ActionAccept = () => {
// const ActionAcceptTransaction = prepareContractCall({
//     contract: contractBoDTreasury,
//     method: "function approveAction(uint256 _ActionId)",
//     params: [actionTicket],
//     })
//     actionAccept(ActionAcceptTransaction);
// };




    return (
        <div>
        <h1 className='my-3 font-bold text-lg'>
            Delete
        </h1>

        <div>
        {/* <Button onClick={()=>{ActionAccept()}}>Accept Ticket</Button> */}

            <Button onClick={()=>{deletePassportFunc()}}>Delete Passport</Button>
            <Button onClick={deleteSocialPassportFunc}>Delete SocialPassport</Button>

        </div>


        </div>
    )

  }



export default UserClose
