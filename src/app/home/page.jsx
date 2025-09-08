"use client";



import MaterialCard from '@/components/MaterialCard'; // Adjust the path as necessary
import GuildBankCard from '@/components/GuildBankCard'; // Adjust the path as necessary
import LocalBankCard from '@/components/LocalBankCard'; // Adjust the path as necessary


import InformationGallery from '@/components/InformationGallery'; // Adjust the path as necessary






// Contracts
import { useActiveAccount } from "thirdweb/react";
import Socials from '@/components/Socials';


const page = () => {


  const activeAccount = useActiveAccount();






    return (
      <div>
        <div className="flex flex-row w-full justify-around">
          <div className="flex flex-col justify-center items-center mx-8 gap-5">
            <p className="font-black">
              GuildBank Global
            </p>
              <GuildBankCard />  
          </div>
          <div className="flex flex-col justify-center items-center mx-8 gap-5">
            <p className="font-black">
              GuildBank Local
            </p>
              <LocalBankCard />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-4xl my-8'>
            Newsletter
          </h2>
          <InformationGallery />
        </div>
        <Socials />
      </div>  
      )
  }







export default page;