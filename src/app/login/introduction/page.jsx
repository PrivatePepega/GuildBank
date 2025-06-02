"use client";
import React from 'react'

import { Progress } from "@material-tailwind/react";
import { useState } from 'react';
import { ButtonGroup, Button } from "@material-tailwind/react";
import GuildBankPassport from '../../../components/GuildBankPassport';
import Image from 'next/image';

import scriptJson from '../../../assets/introscript/introscript1.json';

import { ConnectButton } from "@/utils/thirdweb/thirdweb";
import { useActiveAccount } from "thirdweb/react";


// Contracts

import { chainById } from "@/utils/thirdweb/chains";
import {client} from "@/utils/thirdweb/client";









const Introduction = () => {







const activeAccount = useActiveAccount();

const [page, setPage] = useState(0);
const [progress, setProgress] = useState(0);
const [img, setImg] = useState(0);
const [finished, setFinished] = useState(false);












  return (
    <div className='flex flex-col w-full justify-around items-center gap-10'>

      <div className='flex flex-row justify-center items-center w-[400px] border border-gray-500 rounded-lg'>
        <div className='flex w-1/2 h-60 justify-center items-center p-4 rounded-lg'>
          <Image className='h-full object-contain ' src={scriptJson.items[page].image} alt="image" width={300} height={300} />
        </div>
        <div className='flex w-1/2 h-60 justify-center items-center p-4'>
          {scriptJson.items[page].script}
        </div> 
      </div>

      <div className='flex flex-col gap-3'>
        <div className='w-full'>
          <Progress value={progress} size="lg" color="orange"/>
        </div>
        <ButtonGroup>
          <Button onClick={()=>{
            if(page <= scriptJson.items.length){
              setProgress(page * 100 / scriptJson.items.length)
              setPage(page - 1)
              setImg(img - 1)
            }if(page === 0){
              setProgress(0)
              setPage(page)
              setImg(img)

            }
            }}>Back
          </Button>
          <Button onClick={()=>{
            if(page < scriptJson.items.length){
              setProgress(page * 100 / scriptJson.items.length)
              setPage(page + 1)
              setImg(img + 1)
            }if(page === scriptJson.items.length - 1){
              setProgress(100)
              setPage(page)
              setImg(img)
              setFinished(true)
            }
          }}
          >Next
          </Button>
        </ButtonGroup>
      </div>


      {finished ? <ConnectButton client={client} chain={chainById} connectButton={{ label: "Login" }}/> : null}


      {activeAccount && finished ? <GuildBankPassport/> : null}
      



    </div>
  )
}


export default Introduction
