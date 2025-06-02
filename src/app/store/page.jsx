"use client";



// Contracts

import { useActiveAccount } from "thirdweb/react";







const Store = () => {

  
  
    const activeAccount = useActiveAccount();






    return (
      <div className="flex justify-center items-center h-80 font-bold text-lg">
        <h1>
          Gone Fishing
        </h1>
      </div>
    )


}


export default Store
