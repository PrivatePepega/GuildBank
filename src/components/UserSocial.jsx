"use client";

import { useState } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useCheckPassport } from "@/utils/functionDump/checkPassport";
import { useReadContract } from "thirdweb/react";


import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport,   contractPassportFollow, contractPassportFrens  } from "@/utils/functionDump/getContracts";
import UserSocialSocial from "@/components/UserSocialSocial";
import UserSocialFollow from "@/components/UserSocialFollow";
import { useCheckSocial } from '@/utils/checkSocial';
import UserSocialFrens from './UserSocialFrens';



const UserSocial = () => {
  const activeAccount = useActiveAccount();
  const { passportBalance, isLoading } = useCheckPassport(contractPassport, activeAccount);
  const { socialBalance, isLoadingSocial } = useCheckSocial(contractPassport, activeAccount);






const [socialIndex, setSocialIndex] = useState(0);


    return (
      <div className='flex flex-col justify-center items-center'>
        <h1 className='my-3 font-bold text-lg'>
          Social Passport
        </h1>
        <ButtonGroup>
          <Button onClick={()=>{setSocialIndex(1)}}>Social</Button>
          <Button onClick={() =>{setSocialIndex(2)}}>Follow</Button>
          <Button onClick={() => {setSocialIndex(3)}}>Frens</Button>
        </ButtonGroup>


        {socialIndex === 1 && 
          <div className='w-full'>
            <UserSocialSocial />
          </div>
         }
        {socialIndex === 2 &&
          <div>
            <UserSocialFollow />
          </div>        
        }
        {socialIndex === 3 &&
          <div>
            <UserSocialFrens />
          </div>        
        }

      </div>
    )

  }



export default UserSocial
