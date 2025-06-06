"use client";

import { useState } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useReadContract } from "thirdweb/react";
import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport,   contractPassportFollow, contractPassportFrens  } from "@/utils/functionDump/getContracts"
import IPFSFileViewer from "@/components/IPFSFileViewer";
import { MediaRenderer } from "thirdweb/react";




const UserOthers = () => {
  const activeAccount = useActiveAccount();




  const [searchOther, setSearchOther] = useState("");




  const { data: PassportOther, PassportOtherLoading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [searchOther ? searchOther : null],
  });

  const { data: SocialPassport, isLoading: SocialPassportLoad } = useReadContract({
    contract: contractPassport,
    method: "function SocialPassport(address _address) view returns (string ipfsEmail, string ipfsDiscord, string ipfsReddit, string ipfsTwitter, string ipfsLinkTree, string ipfsStream)",
    params: [searchOther ? searchOther : null],
  });

  const { data: viewFrensArray, isLoading: viewFrensLoad } = useReadContract({
    contract: contractPassportFrens,
    method: "viewFrenList(address _user) returns (address[] memory)",
    params: [searchOther ? searchOther : null],
  });
  const [indexFren, setIndexFren] = useState();
  const [viewFren, setViewFren] = useState(null);
  const [searchFren, setSearchFren] = useState(null);
  const { data: PassportFren, PassportFrenLoading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [viewFren ? viewFren : null],
  });
  function findObjectIndexFren(Candidate) {
    const index = viewFrensArray?.findIndex(
      (item) => item === Candidate
  );
    if (index === -1) {
        console.log("Object not found");
        return null;
    }
    setIndexFren(index);
    console.log(index);
    setViewFren(viewFrensArray[index])
  }

  const handleSearchFren = (Candidate) => {
    findObjectIndexFren(Candidate);
  }; 
  const handleNextFren = () => {
    if (indexFren < viewFrensArray.length - 1) {
      const newIndex = indexFren + 1;
      setIndexFren(newIndex);
      setViewFren(viewFrensArray[newIndex]);
    } else {
      console.log("No more candidates");
    }
  }; 

  const handleBackFren = () => {
    if (indexFren > 0) {
      const newIndex = indexFren - 1;
      setIndexFren(newIndex);
      setViewFren(viewFrensArray[newIndex]);
    } else {
      console.log("No previous candidates");
    }  
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
    params: [searchOther ? searchOther : null, indexFollowing],
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












  const [indexFollower, setIndexFollower] = useState(0);
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
      params: [searchOther ? searchOther : null, indexFollower],
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


      // <div className='mt-7'>
      //   <div className='flex justify-center items-center my-5'>
      //     <h1  className='font-bold text-lg'>
      //       Search Others
      //     </h1>
      //   </div>
      //   <div className='flex flex-row'>
      //     <div className='w-52'>
      //       <Input
      //         type="text"
      //         color="white"
      //         label="player address"
      //         onChange={(e) =>{
      //             setSearchOther(e.target.value);
      //             }
      //         }
      //         />
      //     </div>
      //     <Button>Search</Button>
      //   </div>










      //   <div>
      //     <div className='mt-7'>
      //       <h1  className='my-3 font-bold text-lg'>
      //       Passport
      //       </h1>
      //       <div className='flex flex-row'>
      //         <div className="flex flex-row items-center">
      //           <div>
      //             <MediaRenderer src={PassportOther && PassportOther[0]}/>
      //           </div>
      //           <div>
      //             <div>
      //               UserName: <IPFSFileViewer ipfsUrl={PassportOther && PassportOther[2]} />
      //             </div>
      //             <div>
      //               Address: {PassportOther && PassportOther[1]}
      //             </div>
      //             <div>
      //               Handle: {PassportOther && PassportOther[3]}
      //             </div>
      //             <div>
      //               Status MSG: <IPFSFileViewer ipfsUrl={PassportOther && PassportOther[4]} />
      //             </div>
      //             <div>
      //               Is Minor: {PassportOther && PassportOther[6]}
      //             </div>
      //             <div>
      //               Passport Creation: {PassportOther && PassportOther[5]}
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>




















      //     <div className='mt-7'>
      //       <h1 className='my-3 font-bold text-lg'>
      //         Social
      //       </h1>
      //       <div className='flex flex-row'>
      //         <p>
      //           Email:
      //         </p>
      //         <IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[0]} />
      //       </div>
      //       <div className='flex flex-row'>
      //         <p>
      //           Chat:
      //         </p>
      //         <IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[1]} />
      //       </div>
      //       <div className='flex flex-row'>
      //         <p>
      //           Forum:
      //         </p>
      //         <IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[2]} />
      //       </div>
      //       <div className='flex flex-row'>
      //         <p>
      //           Twitter:
      //         </p>
      //         <IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[3]} />
      //       </div>
      //       <div className='flex flex-row'>
      //         <p>
      //           Stream:
      //         </p>
      //         <IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[5]} />
      //       </div>
      //       <div className='flex flex-row'>
      //         <p>
      //           LinkHub:
      //         </p>
      //         <IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[4]} />
      //       </div>
      //     </div>






















      //     <div className='mt-7'>
      //       <h1 className='my-3 font-bold text-lg'>
      //         Frens
      //       </h1>
      //       <div className='flex flex-row'>
      //       <div className='flex flex-col'>
      //           <div className='flex flex-col'>
      //               <Input
      //                   type="string"
      //                   color="white"
      //                   label="Search Frens"
      //                   onChange={(e) => setSearchFren(e.target.value)}
      //               />
      //               <div className='flex flex-row'>
      //                   <Button onClick={()=>{handleBackFren()}}>Left</Button>
      //                   <Button onClick={()=>{handleSearchFren(searchFren)}}>Search</Button>
      //                   <Button onClick={()=>{handleNextFren()}}>Right</Button>
      //               </div>
      //           </div>
      //           <div className='max-h-52 overflow-y-auto border w-72'>
      //               <h1>fren list</h1>
      //               [{viewFrensArray?.map((user) => user.toString()).join(", ")}]
      //           </div>
      //       </div>
      //       <div className="flex flex-row items-center">
      //           <div>
      //               <MediaRenderer src={PassportFren && PassportFren[0]}/>
      //           </div>
      //           <div>
      //               <div>
      //                   UserName: <IPFSFileViewer ipfsUrl={PassportFren && PassportFren[2]} />
      //               </div>
      //               <div>
      //                   Address: {PassportFren && PassportFren[1]}
      //               </div>
      //               <div>
      //                   Handle: {PassportFren && PassportFren[3]}
      //               </div>
      //               <div>
      //                   Status MSG: <IPFSFileViewer ipfsUrl={PassportFren && PassportFren[4]} />
      //               </div>
      //               <div>
      //               Is Minor: {PassportFren && PassportFren[6]}
      //               </div>
      //               <div>
      //                   Passport Creation: {PassportFren && PassportFren[5]}
      //               </div>
      //           </div>
      //       </div>
      //   </div>
      //     </div>


















      //     <div className='mt-7'>
      //       <h1 className='my-3 font-bold text-lg'>
      //         Following
      //       </h1>
      //       <div className='flex flex-row'>
      //       <div className='flex flex-col'>
      //           <div className='flex flex-col'>
      //               <Input
      //                   type="string"
      //                   color="white"
      //                   label="Search Following"
      //                   onChange={(e) => setCandidatesFollowing(e.target.value)}
      //               />
      //               <div className='flex flex-row'>
      //                   <Button onClick={()=>{handleNextFollowing()}}>Left</Button>
      //                   <Button onClick={()=>{handleSearchFollowing(candidateFollowing)}}>Search</Button>
      //                   <Button onClick={()=>{handleBackFollowing()}}>Right</Button>
      //               </div>
      //           </div>
      //           <div className='max-h-52 overflow-y-auto border w-72'>
      //               <h1>following list</h1>
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
      //               Is Minor: {PassportFollowing && PassportFollowing[6]}
      //               </div>
      //               <div>
      //                   Passport Creation: {PassportFollowing && PassportFollowing[5]}
      //               </div>
      //           </div>
      //       </div>
      //   </div>
      //     </div>





















      //     <div className='my-7'>
      //       <h1  className='my-3 font-bold text-lg'>
      //         Followers
      //       </h1>
      //       <div className='flex flex-row'>
      //       <div className='flex flex-col'>
      //           <div className='flex flex-col'>
      //               <Input
      //                   type="string"
      //                   color="white"
      //                   label="Search Followers"
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
      //                   Is Minor: {PassportFollower && PassportFollower[6]}
      //               </div>
      //               <div>
      //                   Passport Creation: {PassportFollower && PassportFollower[5]}
      //               </div>
      //           </div>
      //       </div>
      //   </div>
      //     </div>


      //   </div>
      // </div>
    )

  }



export default UserOthers
