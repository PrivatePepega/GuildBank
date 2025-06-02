"use client";




// Contracts


import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { contractSourceDAO, contractMoneyDAO } from "@/utils/functionDump/getContracts"
import { useSendTransaction } from "thirdweb/react";

import { prepareContractCall } from "thirdweb";

import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import WoWUpload from "@/components/wowFileUpload";




const Mint = () => {



    const activeAccount = useActiveAccount();







    const { mutate: mintDAO, isPending: daopending } = useSendTransaction();
    const handleDAOMint = async () => {
      const mintDAOTX = prepareContractCall({
        contract: contractSourceDAO,
        method: "function Mint()",
      });
      mintDAO(mintDAOTX);
    };



    const { mutate: DAONoMint, isPending: DAONoMintpending } = useSendTransaction();
    const handleDAONoMint = async () => {
      const punishDAOTX = prepareContractCall({
        contract: contractSourceDAO,
        method: "function NoMintPunishment()",
      });
      DAONoMint(punishDAOTX);
    };
    
    const { data: daoAmount, isLoading: daoAmountLoading } = useReadContract({
      contract: contractSourceDAO,
      method: "function amountPerMint() returns (uint256)",
    });
    const { data: nextMintableDao, isLoading: nextMintableDaoLoading } = useReadContract({
      contract: contractSourceDAO,
      method: "function nextMintable() returns (uint256)",
    });

    const dateDAO = new Date(Number(nextMintableDao) * 1000); // JS needs milliseconds
    const formattedDate = dateDAO.toLocaleString();








    const { mutate: mintMoney, isPending: moneyPending } = useSendTransaction();
    const handleMoneyMint = async () => {
      const mintMoneyTX = prepareContractCall({
        contract: contractMoneyDAO,
        method: "function Mint()",
      });
      mintMoney(mintMoneyTX);
    };

    const { mutate: MoneyNoMint, isPending: MoneyNoMintpending } = useSendTransaction();
    const handleMoneyNoMint = async () => {
      const punishMoneyTX = prepareContractCall({
        contract: contractMoneyDAO,
        method: "function NoMintPunishment()",
      });
      MoneyNoMint(punishMoneyTX);
    };

    const { data: moneyAmount, isLoading: moneyAmountLoading } = useReadContract({
      contract: contractMoneyDAO,
      method: "function amountPerMint() returns (uint256)",
    });
    const { data: nextMintablemoney, isLoading: nextMintablemoneyLoading } = useReadContract({
      contract: contractMoneyDAO,
      method: "function nextMintable() returns (uint256)",
    });
    const dateMoney = new Date(Number(nextMintablemoney) * 1000); // JS needs milliseconds
    const formattedDatemoney = dateMoney.toLocaleString();




    





    return (
      <div className='flex flex-row justify-center items-center w-full gap-8'>


        <div className="flex flex-col justify-center items-center">
          <h2>source: ({Number(daoAmount)})</h2>
          <h3>next mint: {formattedDate}</h3>
          <ButtonGroup>
            <Button onClick={()=> {handleDAOMint()}}>minto</Button>
            <Button onClick={()=> {handleDAONoMint()}}>punish</Button>

          </ButtonGroup>
        </div>


        <div className="flex flex-col justify-center items-center">
          <h2>money: ({Number(moneyAmount)})</h2>
          <h3>next mint: {formattedDatemoney}</h3>
          <ButtonGroup>
            <Button onClick={()=> {handleMoneyMint()}}>minto</Button>
            <Button onClick={()=> {handleMoneyNoMint()}}>punish</Button>
          </ButtonGroup>
        </div>        
      </div>
    )

  
}


export default Mint
