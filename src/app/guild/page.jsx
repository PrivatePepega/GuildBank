"use client";


import Link from "next/link";
import { useState } from "react";
import { ButtonGroup, Button, Input } from "@material-tailwind/react";



// Contracts
import { useActiveAccount } from "thirdweb/react";




import BoDSourceComponent from "@/components/BoDSourceComponent";
import BoDMoneyComponent from "@/components/BoDMoneyComponent";
import BoDDaoTreasuryComponent from "@/components/BoDDaoTreasuryComponent";
import BoDTreasuryComponent from "@/components/BoDTreasuryComponent";
import BoDBODComponent from "@/components/BoDBODComponent";
import BoDDaoBurnerComponent from "@/components/BoDDaoBurnerComponent";
import BoDElectionComponent from "@/components/BoDElectionComponent";









const BoD = () => {
  const [stateBoD, setstateBoD] = useState(0);
  const [StateLocalGuild, setStateLocalGuild] = useState(0);










    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row gap-12">
          <ButtonGroup>
            <Button onClick={()=>{setstateBoD(0)}}>Guild</Button>
            <Button onClick={()=>{setstateBoD(1)}}>BoD</Button>
            <Button onClick={()=>{setstateBoD(2)}}>Events Tab</Button>
            <Button onClick={()=>{setstateBoD(3)}}>Election Season</Button>
          </ButtonGroup>
        </div>
        
  
        {stateBoD === 0 &&
          <div>
            <div className="flex justify-center items-center">
              <h3 className='font-bold text-lg my-5'>
                Guild
              </h3>
            </div>


            <div className="flex flex-row gap-12">
              <ButtonGroup>
                <Button onClick={()=>{setStateLocalGuild(0)}}>DAO</Button>
                <Button onClick={()=>{setStateLocalGuild(1)}}>Money</Button>
                <Button onClick={()=>{setStateLocalGuild(2)}}>DAO Treasury</Button>
                <Button onClick={()=>{setStateLocalGuild(3)}}>BoD Treasury</Button>
                <Button onClick={()=>{setStateLocalGuild(4)}}>Vault</Button>
              </ButtonGroup>
            </div>
              {StateLocalGuild === 0 &&
                <div>
                  <BoDSourceComponent />
                </div>
              }
              {StateLocalGuild === 1 &&
                <div>
                  <BoDMoneyComponent />
                </div>
              }
              {StateLocalGuild === 2 &&
                <div>
                  <BoDDaoTreasuryComponent />
                </div>
              }
              {StateLocalGuild === 3 &&
                <div>
                  <BoDTreasuryComponent />
                </div>
              }
              {StateLocalGuild === 4 &&
                <div>
                 <BoDDaoBurnerComponent />
                </div>
              }



          </div>
        }

        
        {stateBoD === 1 && 
          <div>
            <BoDBODComponent /> 
          </div>
        }





        {stateBoD === 2 && <div>Live Events Coming Soon</div>}



        {stateBoD === 3 && 
        <div>
          <BoDElectionComponent />
        </div>}
  
  
      </div>
    )


}


export default BoD
