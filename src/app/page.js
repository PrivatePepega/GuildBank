"use client";










import {  ConnectButton } from "@/utils/thirdweb/thirdweb";

import { Button } from "@material-tailwind/react";
import Socials from "@/components/Socials";
import Link from "next/link";


// Contracts
import {  client  } from "@/utils/thirdweb/client";
import {  chainById } from "@/utils/thirdweb/chains";


import { useActiveAccount } from "thirdweb/react";
import {contractPassport} from "@/utils/functionDump/getContracts"
import { useCheckPassport } from "@/utils/functionDump/checkPassport";












export default function Home() {
  

  const activeAccount = useActiveAccount();
  const { passportBalance, isLoading } = useCheckPassport(contractPassport, activeAccount);







  

  return ( 
    <main className="">
      <div className="flex flex-col justify-center items-center gap-3">
        {passportBalance == 0n && (
          <div>you do not possess a passport my fren,</div>
        )}
        <ConnectButton client={client} chain={chainById} connectButton={{ label: "Login" }}/>
        <Link href="/login/introduction">
          <Button className="w-40">Join GuildBank-(its free)</Button>    
        </Link>
          <Socials />
      </div>
    </main>
  )
}
