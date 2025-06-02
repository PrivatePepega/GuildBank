"use client"



import Image from "next/image";
// import NavbarCollapse from "./NavbarCollapse";
import GNaUnkea4AAivb7 from "@/assets/img/guildbank heletica r.png";
import Link from "next/link";



import {  ConnectButton } from "@/utils/thirdweb/thirdweb";

import {  client  } from "@/utils/thirdweb/client";
import {  chainById } from "@/utils/thirdweb/chains";
import DropDownNavBar from "./DropDownNavBar";



export default function Navbar () {





  return (
    <div className="flex flex-row w-full h-20 justify-center items-center">


      <DropDownNavBar/>
      <Link href="/home">
        <Image src={GNaUnkea4AAivb7} alt="GuildBank Logo" width={255} height={255} className="invert"/>
      </Link>
      {/* <NavbarCollapse /> */}
      <ul className="flex flex-row w-full justify-end gap-8 items-center">
        <Link href="https://www.tally.xyz/">
          <li>Tally</li>
        </Link>
        <Link href="/mint">
          <li>mint</li>
        </Link>
        <Link href="/store">
          <li>store</li>
        </Link>
        <Link href="/guild">
          <li>guild</li>
        </Link>
        <Link href="/user">
          <li>user</li>
        </Link>
        <li>
          <ConnectButton client={client} chain={chainById} connectButton={{ label: "Login" }}/>
        </li>
      </ul>
      
    </div>
  );
}