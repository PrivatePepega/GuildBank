"use client";





import { Button } from "@material-tailwind/react";
import Socials from "../../components/Socials";
import Link from "next/link";

import {  ConnectButton } from "../../utils/thirdweb/thirdweb";
import {  client  } from "../../utils/thirdweb/client";
import {  chainById } from "../../utils/thirdweb/chains";





const Login = () => {







  return (
    <div>


      <div className="flex flex-col justify-center items-center gap-3">
        <Link href="/">
          <ConnectButton client={client} chain={chainById} connectButton={{ label: "Login" }}/>
        </Link>
        <Link href="/login/introduction">
          <Button className="w-40">Join GuildBank (it's free)</Button>    
        </Link>
      </div>
      <Socials />
    </div>
  )
}


export default Login


