"use client";

import { useState } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from 'next/navigation';
import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport,   contractPassportFollow, contractPassportFrens  } from "@/utils/functionDump/getContracts"
import UserClose from '@/components/UserClose';
import UserPassport from '@/components/UserPassport';
import UserSocial from '@/components/UserSocial';
import UserOthers from '@/components/UserOthers';








const User = () => {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const [passportIndex, setPassportIndex] = useState(0);

  const pushToMain = () => {
    router.push("/");
  }

  const { mutate: createSocialPassport, data: createSocialPassportData } = useSendTransaction();
  const createSocialPassportFunc = () => {
  const createSocialPassportTransaction = prepareContractCall({
    contract: contractPassport,
    method: "function createSocialPassport()",
    })
    createSocialPassport(createSocialPassportTransaction);
};







    return (
      <div className='flex flex-col w-full justify-center items-center'>

        <div className='flex flex-col justify-center items-center mt-10'>
          <ButtonGroup >
            <Button onClick={()=>{pushToMain()}}>get</Button>
            <Button onClick={createSocialPassportFunc}>get</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={()=>{setPassportIndex(1)}}>X</Button>
            <Button onClick={()=>{setPassportIndex(2)}}>Passport</Button>
            <Button onClick={()=>{setPassportIndex(3)}}>Social</Button>
            <Button onClick={()=>{setPassportIndex(4)}}>search</Button>
          </ButtonGroup>
        </div>


        <p>my address: {activeAccount && activeAccount.address}</p>
        {passportIndex === 1 &&
          <UserClose />
        }
        {passportIndex === 2 &&
          <UserPassport />
        }
        {passportIndex === 3 &&
          <UserSocial />
        }
        {passportIndex === 4 &&
          <UserOthers />
        }


      </div>
    )

  }



export default User
