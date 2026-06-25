"use client";
import React, { useState } from 'react';
import { Progress } from "@material-tailwind/react";
import { ButtonGroup, Button } from "@material-tailwind/react";
import GuildBankPassport from '../../../components/GuildBankPassport';
import Image from 'next/image';
import scriptJson from '../../../assets/introscript/introscript1.json';
import { ConnectButton } from "@/utils/thirdweb/thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { chainById } from "@/utils/thirdweb/chains";
import { client } from "@/utils/thirdweb/client";
import TurnstileWidget from '@/components/Turnstile';

const Introduction = () => {
  const activeAccount = useActiveAccount();
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  return (
    <div className='flex flex-col w-full justify-around items-center gap-10'>

      {/* Intro slides */}
        <>
          <div className='flex flex-row justify-center items-center w-[400px] border border-gray-500 rounded-lg'>
            <div className='flex w-1/2 h-60 justify-center items-center p-4 rounded-lg'>
              <Image
                className='h-full object-contain'
                src={scriptJson.items[page].image}
                alt="image"
                width={300}
                height={300}
              />
            </div>
            <div className='flex w-1/2 h-60 justify-center items-center p-4'>
              {scriptJson.items[page].script}
              {scriptJson.items[page].link && (
                <a
                  href={scriptJson.items[page].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm"
                >
                  open link
                </a>
              )}
              
            </div>
          </div>

          <div className='flex flex-col gap-3 w-[400px] items-center'>
            <Progress value={progress} size="lg" color="orange" />
            <ButtonGroup>
              <Button onClick={() => {
                if (page > 0) {
                  setPage(page - 1);
                  setProgress((page - 1) * 100 / scriptJson.items.length);
                }
              }}>Back</Button>
              <Button onClick={() => {
                if (page < scriptJson.items.length - 1) {
                  setPage(page + 1);
                  setProgress((page + 1) * 100 / scriptJson.items.length);
                } else {
                  setProgress(100);
                  setFinished(true);
                }
              }}>Next</Button>
            </ButtonGroup>
          </div>
        </>

      {/* Step 1 — bot check, always first */}
      {finished && (
        <div className="flex flex-col items-center gap-3">
          <TurnstileWidget onVerify={(token) => setCaptchaToken(token)} />
          {captchaToken ? (
            <ConnectButton
              client={client}
              chain={chainById}
              connectButton={{ label: "Login" }}
            />
          ) : (
            <p className="text-sm text-gray-400">Complete the check above to continue</p>
          )}
        </div>
      )}

      {/* Step 2 — passport, only after wallet connected */}
      {finished && captchaToken && activeAccount && (
        <GuildBankPassport captchaToken={captchaToken} />
      )}

    </div>
  );
};

export default Introduction;