"use client";

import { useState } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useCheckPassport } from "@/utils/functionDump/checkPassport";
import { useReadContract } from "thirdweb/react";

import { MediaRenderer } from "thirdweb/react";

import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport,   contractPassportFollow, contractPassportFrens  } from "@/utils/functionDump/getContracts"
import IPFSFileViewer from "@/components/IPFSFileViewer";
import {uploadData} from "@/utils/functionDump/Passport.js"




const UserSocialFrens = () => {
  const activeAccount = useActiveAccount();





  const { mutate: sendFrenRequest, data: sendFrenRequestData } = useSendTransaction();
  const sendFrenRequestFunc = (to) => {
    const sendFrenRequestTransaction = prepareContractCall({
      contract: contractPassportFrens,
      method: "function sendFrenRequest(address _to) public",
      params: [to],
    });
    sendFrenRequest(sendFrenRequestTransaction);
  };

  const [indexFren, setIndexFren] = useState();
  const [viewFren, setViewFren] = useState(null);
  const [searchFren, setSearchFren] = useState(null);
  const [toFren, setToFren] = useState();

  const { data: viewFrensArray, isLoading: viewFrensLoad } = useReadContract({
      contract: contractPassportFrens,
      method: "viewFrenList(address _user) returns (address[] memory)",
      params: [activeAccount ? activeAccount.address : null],
    });

    const { data: frenListStatus, isLoading: frenListStatusLoad } = useReadContract({
      contract: contractPassportFrens,
      method: "FrenList(address _user) returns (bool exists, bool openRequests)",
      params: [activeAccount ? activeAccount.address : null],
    });


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












const [frenRequest, setFrenRequest] = useState();
const { mutate: acceptFrenRequest, data: acceptFrenRequestData } = useSendTransaction();
const acceptFrenRequestFunc = (from) => {
  const acceptFrenRequestTransaction = prepareContractCall({
    contract: contractPassportFrens,
    method: "function acceptFrenRequest(address _from) public",
    params: [from],
  });
  acceptFrenRequest(acceptFrenRequestTransaction);
};
const { mutate: declineFrenRequest, data: declineFrenRequestData } = useSendTransaction();
const declineFrenRequestFunc = (from) => {
  const declineFrenRequestTransaction = prepareContractCall({
    contract: contractPassportFrens,
    method: "function declineFrenRequest(address _from) public",
    params: [from],
  });
  declineFrenRequest(declineFrenRequestTransaction);
};


















const [indexRequest, setIndexRequest] = useState();
const [viewRequest, setViewRequest] = useState();
const [searchRequest, setSearchRequest] = useState();


const { data: viewFrenRequestList, isLoading: viewFrenRequestListLoad } = useReadContract({
  contract: contractPassportFrens,
  method: "function viewFrenRequestList(address _user) returns (address[] memory)",
  params: [activeAccount ? activeAccount.address : null],
});
const { data: PassportRequest, PassportRequestLoading } = useReadContract({
  contract: contractPassport,
  method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
  params: [viewRequest ? viewRequest : null],
});








function findObjectIndexRequest(Candidate) {
  const index = viewFrenRequestList?.findIndex(
    (item) => item === Candidate
);
  if (index === -1) {
      console.log("Object not found");
      return null;
  }
  setIndexRequest(index);
  console.log(index);
  setViewRequest(viewFrenRequestList[index])
}
const handleSearchRequest = (Candidate) => {
  findObjectIndexRequest(Candidate);
}; 
const handleNextRequest = () => {
  if (indexRequest < viewFrenRequestList.length - 1) {
    const newIndex = indexRequest + 1;
    setIndexRequest(newIndex);
    setViewRequest(viewFrenRequestList[newIndex]);
  } else {
    console.log("No more candidates");
  }
}; 
const handleBackRequest = () => {
  if (indexRequest > 0) {
    const newIndex = indexRequest - 1;
    setIndexRequest(newIndex);
    setViewRequest(viewFrenRequestList[newIndex]);
  } else {
    console.log("No previous candidates");
  }  
};



const [removeThisFren, setRemoveThisFren] = useState();
const [removeTrue, setRemoveTrue] = useState();
const { mutate: removeFren, data: removeFrenData } = useSendTransaction();
const removeFrenFunc = (user) => {
  const removeFrenTransaction = prepareContractCall({
    contract: contractPassportFrens,
    method: "function removeFren(address _user) public",
    params: [user],
  });
  removeFren(removeFrenTransaction);
};
const { mutate: openCloseFrenList, data: openCloseFrenListData } = useSendTransaction();
const openCloseFrenListFunc = () => {
  const openCloseFrenListTransaction = prepareContractCall({
    contract: contractPassportFrens,
    method: "function openCloseFrenList() public",
  });
  openCloseFrenList(openCloseFrenListTransaction);
};






    return (

      <div>

        <h1>On da workshop bench, free dlc</h1>


      </div>
      // <div className='flex flex-col justify-center items-center'>
      //   <h1 className='my-3 font-bold text-lg mt-7'>
      //     Frens
      //   </h1>
      //   <div className='flex flex-row'>
      //     <div className='w-52'>
      //       <Input
      //         type="text"
      //         label="Fren Address"
      //         color="white"
      //         onChange={(e) => setToFren(e.target.value)}
      //       />
      //     </div>
      //       <Button onClick={()=>{sendFrenRequestFunc(toFren)}}>Send</Button>
      //   </div>
      //   <div className='flex flex-row gap-3 items-center'>
      //     <Button onClick={()=>{openCloseFrenListFunc()}}>Open or Close FrenList</Button>
      //     <p>{frenListStatus ? frenListStatus : <p>NA</p>}</p>
      //   </div>

        





      //   <h1 className='my-3 font-bold text-lg mt-7'>Fren List</h1>
      //   <div className='flex flex-col'>
      //     <Button onClick={()=>{setRemoveTrue(!removeTrue)}}>Remove Fren</Button>
      //     {removeTrue && 
      //       <div className='flex flex-row'>
      //         <div className='w-52'>
      //           <Input
      //             type="string"
      //             color="white"
      //             label="Remove Address"
      //             onChange={(e) => setRemoveThisFren(e.target.value)}
      //           />
      //         </div>
      //         <Button onClick={()=>{removeFrenFunc(removeThisFren)}}>Remove</Button>
      //       </div>
      //     }
      //   </div>


      //   <div className='flex flex-row'>
      //       <div className='flex flex-col'>
      //           <div className='flex flex-col'>
      //               <Input
      //                   type="string"
      //                   color="white"
      //                   label="Search Fren Address"
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
      //                   Alias: {PassportFren && PassportFren[3]}
      //               </div>
      //               <div>
      //                   Status MSG: <IPFSFileViewer ipfsUrl={PassportFren && PassportFren[4]} />
      //               </div>
      //               <div>
      //                   Is Minor: {PassportFren && PassportFren[6]}
      //               </div>
      //               <div>
      //                   Passport Creation: {PassportFren && PassportFren[5]}
      //               </div>
      //           </div>
      //       </div>
      //   </div>













      //   <h1 className='my-3 font-bold text-lg mt-7'>Fren Request List</h1>
      //   <div className='flex flex-row'>
      //     <div className='w-52'>
      //       <Input
      //         type="text"
      //         label="Fren Request Address"
      //         color="white"
      //         onChange={(e) => setFrenRequest(e.target.value)}
      //       />
      //     </div>

      //       <Button onClick={()=>{acceptFrenRequestFunc(frenRequest)}}>Accept</Button>
      //       <Button onClick={()=>{declineFrenRequestFunc(frenRequest)}}>Decline</Button>
      //   </div>
      //   <div className='flex flex-row mb-8'>
      //       <div className='flex flex-col'>
      //           <div className='flex flex-col'>
      //             <Input
      //               type="string"
      //               color="white"
      //               label="Look at Request Address"
      //               onChange={(e) => setSearchRequest(e.target.value)}
      //             />
      //               <div className='flex flex-row'>
      //                   <Button onClick={()=>{handleBackRequest()}}>Left</Button>
      //                   <Button onClick={()=>{handleSearchRequest(searchRequest)}}>Search</Button>
      //                   <Button onClick={()=>{handleNextRequest()}}>Right</Button>
      //               </div>
      //           </div>
      //           <div className='max-h-52 overflow-y-auto border w-72'>
      //               <h1>fren request list:</h1>
      //               [{viewFrenRequestList?.map((user) => user.toString()).join(", ")}]
      //           </div>
      //       </div>
      //       <div className="flex flex-row items-center">
      //           <div>
      //               <MediaRenderer src={PassportRequest && PassportRequest[0]}/>
      //           </div>
      //           <div>
      //             <div>
      //                 UserName: <IPFSFileViewer ipfsUrl={PassportRequest && PassportRequest[2]} />
      //             </div>
      //             <div>
      //                 Address: {PassportRequest && PassportRequest[1]}
      //             </div>
      //             <div>
      //                 Alias: {PassportRequest && PassportRequest[3]}
      //             </div>
      //             <div>
      //                 Status MSG: <IPFSFileViewer ipfsUrl={PassportRequest && PassportRequest[4]} />
      //             </div>
      //             <div>
      //                 Is Minor: {PassportRequest && PassportRequest[6]}
      //             </div>
      //             <div>
      //                 Passport Creation: {PassportRequest && PassportRequest[5]}
      //             </div>
      //           </div>
      //       </div>
      //   </div>
      // </div>
    )

  }



export default UserSocialFrens
