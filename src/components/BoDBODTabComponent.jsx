"use client";


import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useState, useEffect } from "react";


// Contracts
import { useReadContract } from "thirdweb/react";
import {contractPassport, contractSourceDAO, contractBoD } from "@/utils/functionDump/getContracts"

import { MediaRenderer } from "thirdweb/react";

import { useActiveAccount } from "thirdweb/react";
import { useSendTransaction } from "thirdweb/react";

import { prepareContractCall } from "thirdweb";

import IPFSFileViewer from "./IPFSFileViewer";








const BoDBODTabComponent = () => {

    const activeAccount = useActiveAccount();



    const { data: showUserVotingUnits, showUserVotingUnitsLoading } = useReadContract({
        contract: contractSourceDAO,
        method: "function showVotingUnits() returns (uint256])",
        params: [activeAccount ? activeAccount.address : null],
    });

    const { data: returnBoD, returnBoDLoading } = useReadContract({
        contract: contractBoD,
        method: "function returnBoD() returns (address[16])",
    });


console.log("returnBoD" , returnBoD);



    const { data: Passport0, Passport0Loading } = useReadContract({
        contract: contractPassport,
        method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
        params: [returnBoD? returnBoD[0] : null],
    });







    const { data: Passport1, Passport1Loading } = useReadContract({
        contract: contractPassport,
        method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
        params: [returnBoD? returnBoD[1] : null],
    });
    const { data: showUser1VotingUnits, showUser1VotingUnitsLoading } = useReadContract({
        contract: contractSourceDAO,
        method: "function showVotingUnits() returns (uint256])",
        params: [returnBoD? returnBoD[1] : null],
    });
    const { mutate: ChallengeUser1, data: ChallengeUser1Data } = useSendTransaction();
    const ChallengeUser1Tx = () => {
    const ChallengeUser1Transaction = prepareContractCall({
        contract: contractBoD,
        method: "function challengeSenatorChair(uint8 index)returns (bool)",
        params: [1],
        })
        ChallengeUser1(ChallengeUser1Transaction);
    };






  const { data: Passport2, Passport2Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[2] : null],
  });
  const { data: showUser2VotingUnits, showUser2VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[2] : null],
  });
  const { mutate: ChallengeUser2, data: ChallengeUser2Data } = useSendTransaction();
  const ChallengeUser2Tx = () => {
  const ChallengeUser2Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [2],
    })
    ChallengeUser2(ChallengeUser2Transaction);
  };





  const { data: Passport3, Passport3Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[3] : null],
  });
  const { data: showUser3VotingUnits, showUser3VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[3] : null],
  });
  const { mutate: ChallengeUser3, data: ChallengeUser3Data } = useSendTransaction();
  const ChallengeUser3Tx = () => {
  const ChallengeUser3Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [3],
    })
    ChallengeUser3(ChallengeUser3Transaction);
  };





  const { data: Passport4, Passport4Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[4] : null],
  });
  const { data: showUser4VotingUnits, showUser4VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[4] : null],
  });
  const { mutate: ChallengeUser4, data: ChallengeUser4Data } = useSendTransaction();
  const ChallengeUser4Tx = () => {
  const ChallengeUser4Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [4],
    })
    ChallengeUser4(ChallengeUser4Transaction);
  };








  const { data: Passport5, Passport5Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[5] : null],
  });
  const { data: showUser5VotingUnits, showUser5VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[5] : null],
  });
  const { mutate: ChallengeUser5, data: ChallengeUser5Data } = useSendTransaction();
  const ChallengeUser5Tx = () => {
  const ChallengeUser5Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [5],
    })
    ChallengeUser5(ChallengeUser5Transaction);
  };











  const { data: Passport6, Passport6Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[6] : null],
  });
  const { data: showUser6VotingUnits, showUser6VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[6] : null],
  });
  const { mutate: ChallengeUser6, data: ChallengeUser6Data } = useSendTransaction();
  const ChallengeUser6Tx = () => {
  const ChallengeUser6Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [6],
    })
    ChallengeUser6(ChallengeUser6Transaction);
  };










  const { data: Passport7, Passport7Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[7] : null],
  });
  const { data: showUser7VotingUnits, showUser7VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[7] : null],
  });
  const { mutate: ChallengeUser7, data: ChallengeUser7Data } = useSendTransaction();
  const ChallengeUser7Tx = () => {
  const ChallengeUser7Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [7],
    })
    ChallengeUser7(ChallengeUser7Transaction);
  };







  const { data: Passport8, Passport8Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[8] : null],
  });
  const { data: showUser8VotingUnits, showUser8VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[8] : null],
  });
  const { mutate: ChallengeUser8, data: ChallengeUser8Data } = useSendTransaction();
  const ChallengeUser8Tx = () => {
  const ChallengeUser8Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [8],
    })
    ChallengeUser8(ChallengeUser8Transaction);
  };










  const { data: Passport9, Passport9Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[9] : null],
  });
  const { data: showUser9VotingUnits, showUser9VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[9] : null],
  });
  const { mutate: ChallengeUser9, data: ChallengeUser9Data } = useSendTransaction();
  const ChallengeUser9Tx = () => {
  const ChallengeUser9Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [9],
    })
    ChallengeUser9(ChallengeUser9Transaction);
  };








  const { data: Passport10, Passport10Loading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[10] : null],
  });
  const { data: showUser10VotingUnits, showUser10VotingUnitsLoading } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits() returns (uint256])",
    params: [returnBoD? returnBoD[10] : null],
  });
  const { mutate: ChallengeUser10, data: ChallengeUser10Data } = useSendTransaction();
  const ChallengeUser10Tx = () => {
  const ChallengeUser10Transaction = prepareContractCall({
    contract: contractBoD,
    method: "function challengeSenatorChair(uint8 index)returns (bool)",
    params: [10],
    })
    ChallengeUser10(ChallengeUser10Transaction);
  };









  const { data: PassportCeo, PassportCeoLoading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[11] : null],
  });
  const { data: PassportCto, PassportCtoLoading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[12] : null],
  });
  const { data: PassportCfo, PassportCfoLoading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[13] : null],
  });
  const { data: PassportCco, PassportCcoLoading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[14] : null],
  });
  const { data: PassportCoo, PassportCooLoading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [returnBoD? returnBoD[15] : null],
  });





return (
    <div>
        <div className="flex justify-center items-center">
            <h3 className='font-bold text-lg my-5'>
            Board of Directors Chair Holders
            </h3>
        </div>
        Your Voting Power: {Number(showUserVotingUnits)}
        <ul className="flex flex-col gap-14">
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair1:
                    <MediaRenderer src={Passport1 && Passport1[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport1 && Passport1[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport1 && Passport1[2]} />
                    </li>
                    <li>
                        Handle: {Passport1 && Passport1[3]}
                    </li>
                    <li>
                        Status MSG: {Passport1 && Passport1[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser1VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser1Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair2:
                    <MediaRenderer src={Passport2 && Passport2[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport2 && Passport2[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport2 && Passport2[2]} />
                    </li>
                    <li>
                        Handle: {Passport2 && Passport2[3]}
                    </li>
                    <li>
                        Status MSG: {Passport2 && Passport2[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser2VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser2Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair3:
                    <MediaRenderer src={Passport3 && Passport3[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport3 && Passport3[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport3 && Passport3[2]} />
                    </li>
                    <li>
                        Handle: {Passport3 && Passport3[3]}
                    </li>
                    <li>
                        Status MSG: {Passport3 && Passport3[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser3VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser3Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair4:
                    <MediaRenderer src={Passport4 && Passport4[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport4 && Passport4[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport4 && Passport4[2]} />
                    </li>
                    <li>
                        Handle: {Passport4 && Passport4[3]}
                    </li>
                    <li>
                        Status MSG: {Passport4 && Passport4[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser4VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser4Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair5:
                    <MediaRenderer src={Passport5 && Passport5[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport5 && Passport5[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport5 && Passport5[2]} />
                    </li>
                    <li>
                        Handle: {Passport5 && Passport5[3]}
                    </li>
                    <li>
                        Status MSG: {Passport5 && Passport5[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser5VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser5Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair6:
                    <MediaRenderer src={Passport6 && Passport6[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport6 && Passport6[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport6 && Passport6[2]} />
                    </li>
                    <li>
                        Handle: {Passport6 && Passport6[3]}
                    </li>
                    <li>
                        Status MSG: {Passport6 && Passport6[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser6VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser6Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair7:
                    <MediaRenderer src={Passport7 && Passport7[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport7 && Passport7[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport7 && Passport7[2]} />
                    </li>
                    <li>
                        Handle: {Passport7 && Passport7[3]}
                    </li>
                    <li>
                        Status MSG: {Passport7 && Passport7[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser7VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser7Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair8:
                    <MediaRenderer src={Passport8 && Passport8[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport8 && Passport8[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport8 && Passport8[2]} />
                    </li>
                    <li>
                        Handle: {Passport8 && Passport8[3]}
                    </li>
                    <li>
                        Status MSG: {Passport8 && Passport8[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser8VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser8Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair9:
                    <MediaRenderer src={Passport9 && Passport9[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport9 && Passport9[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport9 && Passport9[2]} />
                    </li>
                    <li>
                        Handle: {Passport9 && Passport9[3]}
                    </li>
                    <li>
                        Status MSG: {Passport9 && Passport9[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser9VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser9Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    SenatorChair10:
                    <MediaRenderer src={Passport10 && Passport10[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport10 && Passport10[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport10 && Passport10[2]} />
                    </li>
                    <li>
                        Handle: {Passport10 && Passport10[3]}
                    </li>
                    <li>
                        Status MSG: {Passport10 && Passport10[4]}
                    </li>
                    <li>
                        Voting Power: {Number(showUser10VotingUnits)}
                    </li>
                    <li>
                        <Button onClick={()=>{ChallengeUser10Tx()}}>Challenge</Button>
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    CEO Chair:
                    <MediaRenderer src={PassportCeo && PassportCeo[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {PassportCeo && PassportCeo[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={PassportCeo && PassportCeo[2]} />
                    </li>
                    <li>
                        Handle: {PassportCeo && PassportCeo[3]}
                    </li>
                    <li>
                        Status MSG: {PassportCeo && PassportCeo[4]}
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    CTO Chair:
                    <MediaRenderer src={PassportCto && PassportCto[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {PassportCto && PassportCto[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={PassportCto && PassportCto[2]} />
                    </li>
                    <li>
                        Handle: {PassportCto && PassportCto[3]}
                    </li>
                    <li>
                        Status MSG: {PassportCto && PassportCto[4]}
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    CFO Chair:
                    <MediaRenderer src={PassportCfo && PassportCfo[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {PassportCfo && PassportCfo[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={PassportCfo && PassportCfo[2]} />
                    </li>
                    <li>
                        Handle: {PassportCfo && PassportCfo[3]}
                    </li>
                    <li>
                        Status MSG: {PassportCfo && PassportCfo[4]}
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    CCO Chair:
                    <MediaRenderer src={PassportCco && PassportCco[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {PassportCco && PassportCco[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={PassportCco && PassportCco[2]} />
                    </li>
                    <li>
                        Handle: {PassportCco && PassportCco[3]}
                    </li>
                    <li>
                        Status MSG: {PassportCco && PassportCco[4]}
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    COO Chair:
                    <MediaRenderer src={PassportCoo && PassportCoo[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {PassportCoo && PassportCoo[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={PassportCoo && PassportCoo[2]} />
                    </li>
                    <li>
                        Handle: {PassportCoo && PassportCoo[3]}
                    </li>
                    <li>
                        Status MSG: {PassportCoo && PassportCoo[4]}
                    </li>
                </ul>
            </li>
            <li className="flex flex-row justify-center items-center">
                <div>
                    GuildBankChair:
                    <MediaRenderer src={Passport0 && Passport0[0]}/>
                </div>
                <ul className="flex flex-col">
                    <li>
                        Address: {Passport0 && Passport0[1]}
                    </li>
                    <li>
                        UserName: <IPFSFileViewer ipfsUrl={Passport0 && Passport0[2]} />
                    </li>
                    <li>
                        Handle: {Passport0 && Passport0[3]}
                    </li>
                    <li>
                        Status MSG: {Passport0 && Passport0[4]}
                    </li>
                </ul>
            </li>
        </ul>
    </div>


    )
}


export default BoDBODTabComponent
