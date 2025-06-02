"use client";



import MaterialCard from '@/components/MaterialCard'; // Adjust the path as necessary

import InformationGallery from '@/components/InformationGallery'; // Adjust the path as necessary






// Contracts
import { useActiveAccount } from "thirdweb/react";


const page = () => {


  const activeAccount = useActiveAccount();






    return (
      <div>
        <div className="flex flex-row w-full justify-around">
          <div className="flex flex-col justify-center items-center mx-8 gap-5">
            <p className="font-black">
              GuildBank Global
            </p>
              <MaterialCard />  
          </div>
          <div className="flex flex-col justify-center items-center mx-8 gap-5">
            <p className="font-black">
              GuildBank Local
            </p>
              <MaterialCard />
          </div>
        </div>
        <div>
          <InformationGallery />
        </div>
      </div>  
      )
  }







export default page;