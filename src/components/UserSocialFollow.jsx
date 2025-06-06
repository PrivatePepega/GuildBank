"use client";

import { useState } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";

import { MediaRenderer } from "thirdweb/react";

import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport,   contractPassportFollow, contractPassportFrens  } from "@/utils/functionDump/getContracts"
import IPFSFileViewer from "@/components/IPFSFileViewer";




const UserSocialFollow = () => {
  const activeAccount = useActiveAccount();


  const [toFollow, setToFollow] = useState("");


  const { mutate: followPerson, data: followPersonData } = useSendTransaction();
  const followPersonFunc = (_user) => {
    const followPersonTransaction = prepareContractCall({
      contract: contractPassportFollow,
      method: "function followPerson(address _user) public",
      params: [_user],
    });
    followPerson(followPersonTransaction);
  };

  const { mutate: unFollowPerson, data: unFollowPersonData } = useSendTransaction();
  const unFollowPersonFunc = (_user) => {
    const unFollowPersonTransaction = prepareContractCall({
      contract: contractPassportFollow,
      method: "function unFollowPerson(address _user) public",
      params: [_user],
    });
    unFollowPerson(unFollowPersonTransaction);
  };









    const [indexFollowing, setIndexFollowing] = useState(0);
    const [viewFollowing, setViewFollowing] = useState(null);
    const [candidateFollowing, setCandidatesFollowing] = useState(null);

    const { data: PassportFollowing, PassportFollowingLoading } = useReadContract({
      contract: contractPassport,
      method: "function Passport(address) returns (string, address, string, string, string, uint256, bool, string)",
      params: [viewFollowing ? viewFollowing : null],
    });
    const { data: viewFollowingArray, isLoading: viewFollowingLoad } = useReadContract({
      contract: contractPassportFollow,
      method: "function viewFollowingPage(address _user, uint256 _index) view returns(address[] memory){",
      params: [activeAccount ? activeAccount.address : null, indexFollowing],
    });





    const handleSearchFollowing = (Candidate) => {
      setViewFollowing(Candidate);
    }; 
    const handleNextFollowing = () => {
        const newIndex = indexFollowing + 1;
        setIndexFollowing(newIndex);
    }; 

    const handleBackFollowing = () => {
      if (indexFollowing > 0) {
        const newIndex = indexFollowing - 1;
        setIndexFollowing(newIndex);
      } else {
        console.log("error");
      }  
    };












    const [indexFollower, setIndexFollower] = useState();
    const [viewFollower, setViewFollower] = useState(null);
    const [candidateFollower, setCandidatesFollower] = useState(null);

    const { data: PassportFollower, PassportFollowerLoading } = useReadContract({
      contract: contractPassport,
      method: "function Passport(address) returns (string, address, string, string, string, uint256, bool, string)",
      params: [viewFollower ? viewFollower : null],
    });

    const { data: viewFollowersArray, isLoading: viewFollowersLoad } = useReadContract({
        contract: contractPassportFollow,
        method: "function viewFollowersPage(address _user, uint256 _index) view returns(address[] memory)",
        params: [activeAccount ? activeAccount.address : null, indexFollower],
      });


    const handleSearchFollower = (Candidate) => {
      setViewFollower(Candidate);
    }; 
    const handleNextFollower = () => {
      const newIndex = indexFollower + 1;
      setIndexFollower(newIndex);
    }; 

    const handleBackFollower = () => {
      if (indexFollower > 0) {
        const newIndex = indexFollower + 1;
        setIndexFollower(newIndex);
      } else {
        console.log("No previous candidates");
      }  
    };












    return (


<div>

<h1>On da workshop bench, free dlc</h1>


</div>



      // <div>

      //   <div className='flex flex-col justify-center items-center'>
      //     <h1 className='my-3 font-bold text-lg mt-7'>
      //       Follow
      //     </h1>
      //     <div className='w-52'>
      //       <Input
      //         type="text"
      //         label="Address"
      //         color="white"
      //         onChange={(e) => setToFollow(e.target.value)}
      //       />
      //     </div>
      //     <ButtonGroup>
      //       <Button onClick={()=>{followPersonFunc(toFollow)}}>Follow</Button>
      //       <Button onClick={()=>{unFollowPersonFunc(toFollow)}}>UnFollow</Button>
      //     </ButtonGroup>

      //   </div>















      //   <div className='flex justify-center items-center my-5'>
      //     <h1 className=' font-bold text-lg mt-7'>
      //       Following Section
      //     </h1>
      //   </div>


      //   <div className='flex flex-row gap-5'>
      //       <div className='flex flex-col'>
      //           <div className='flex flex-col'>
      //               <Input
      //                   type="string"
      //                   color="white"
      //                   label="Search Following Address"
      //                   onChange={(e) => setCandidatesFollowing(e.target.value)}
      //               />
      //               <div className='flex flex-row'>
      //                   <Button onClick={()=>{handleNextFollowing()}}>Left</Button>
      //                   <Button onClick={()=>{handleSearchFollowing(candidateFollowing)}}>Search</Button>
      //                   <Button onClick={()=>{handleBackFollowing()}}>Right</Button>
      //               </div>
      //           </div>
      //           <div className='max-h-52 overflow-y-auto border w-72'>
      //               <h1>following list {indexFollowing}</h1>
      //               [{viewFollowingArray?.map((user) => user.toString()).join(", ")}]
      //           </div>
      //       </div>
      //       <div className="flex flex-row items-center">
      //           <div>
      //               <MediaRenderer src={PassportFollowing && PassportFollowing[0]}/>
      //           </div>
      //           <div>
      //               <div>
      //                   UserName: <IPFSFileViewer ipfsUrl={PassportFollowing && PassportFollowing[2]} />
      //               </div>
      //               <div>
      //                   Address: {PassportFollowing && PassportFollowing[1]}
      //               </div>
      //               <div>
      //                   Handle: {PassportFollowing && PassportFollowing[3]}
      //               </div>
      //               <div>
      //                   Status MSG: <IPFSFileViewer ipfsUrl={PassportFollowing && PassportFollowing[4]} />
      //               </div>
      //               <div>
      //                   Is Minor: {PassportFollowing && PassportFollowing[6]}
      //               </div>
      //               <div>
      //                   Passport Creation: {PassportFollowing && PassportFollowing[5]}
      //               </div>
      //           </div>
      //       </div>
      //   </div>












      //   <div className='flex items-center justify-center my-5'>
      //     <h1 className=' font-bold text-lg mt-7'>
      //       Follower Section
      //     </h1>
      //   </div>
      //   <div className='flex flex-row mb-10'>
      //       <div className='flex flex-col'>
      //           <div className='flex flex-col'>
      //               <Input
      //                   type="string"
      //                   color="white"
      //                   label="Search Followers Address"
      //                   onChange={(e) => setCandidatesFollower(e.target.value)}
      //               />
      //               <div className='flex flex-row'>
      //                   <Button onClick={()=>{handleNextFollower()}}>Left</Button>
      //                   <Button onClick={()=>{handleSearchFollower(candidateFollower)}}>Search</Button>
      //                   <Button onClick={()=>{handleBackFollower()}}>Right</Button>
      //               </div>
      //           </div>
      //           <div className='max-h-52 overflow-y-auto border w-72'>
      //           <h1>followers list</h1>
      //           [{viewFollowersArray?.map((user) => user.toString()).join(", ")}]
      //           </div>
      //       </div>
      //       <div className="flex flex-row items-center">
      //           <div>
      //               <MediaRenderer src={PassportFollower && PassportFollower[0]}/>
      //           </div>
      //           <div>
      //               <div>
      //                   UserName: <IPFSFileViewer ipfsUrl={PassportFollower && PassportFollower[2]} />
      //               </div>
      //               <div>
      //                   Address: {PassportFollower && PassportFollower[1]}
      //               </div>
      //               <div>
      //                   Handle: {PassportFollower && PassportFollower[3]}
      //               </div>
      //               <div>
      //                   Status MSG: <IPFSFileViewer ipfsUrl={PassportFollower && PassportFollower[4]} />
      //               </div>
      //               <div>
      //                   Is Minor: {PassportFollowing && PassportFollowing[6]}
      //               </div>
      //               <div>
      //                   Passport Creation: {PassportFollower && PassportFollower[5]}
      //               </div>
      //           </div>
      //       </div>
      //   </div>
      // </div>
    )

  }



export default UserSocialFollow
