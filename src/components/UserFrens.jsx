"use client";

import { useState } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useCheckPassport } from "@/utils/functionDump/checkPassport";
import { useReadContract } from "thirdweb/react";


import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport,   contractPassportFollow, contractPassportFrens  } from "@/utils/functionDump/getContracts"




const UsersFrens = () => {
  const activeAccount = useActiveAccount();
  const { passportBalance, isLoading } = useCheckPassport(contractPassport, activeAccount);








    return (
      <div>
        <h1>
        UsersFrens
        </h1>



      </div>
    )

  }



export default UsersFrens
