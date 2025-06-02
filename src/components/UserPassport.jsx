"use client";

import { useState, useEffect } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useCheckPassport } from "@/utils/functionDump/checkPassport";
import { useReadContract } from "thirdweb/react";


import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport,   contractPassportFollow, contractPassportFrens  } from "@/utils/functionDump/getContracts"

import { MediaRenderer } from "thirdweb/react";
import IPFSFileViewer from "@/components/IPFSFileViewer";
import {uploadData} from "@/utils/functionDump/Passport.js"
import PGPGenerator from './PGPGenerator';










const UserPassport = () => {
  const activeAccount = useActiveAccount();
  const { passportBalance, isLoading } = useCheckPassport(contractPassport, activeAccount);

  const { data: Passport, PassportLoad } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, bool, string)",
    params: [activeAccount ? activeAccount.address : null],
  });





  const [userName, setUserName] = useState(null);
  const [pfpCID, setPfpCID] = useState(null);
  const [userNameCID, setUserNameCID] = useState(null);
  const [MSG, setMSG] = useState(null);
  const [userAlias, setUserAlias] = useState("");
  const [minor, setMinor] = useState();











  
const uploadPFP = (_file) => {
  const url = uploadData(_file);
  if (url) {
    url.then(res => {setPfpCID(res)});
    changePFPFunc(pfpCID);
  }
};
const { mutate: changePFP, data: changePFPData } = useSendTransaction();
const changePFPFunc = (_ipfs) => {
  const changePFPTransaction = prepareContractCall({
    contract: contractPassport,
    method: "function changePFP(string memory _profilePic) public",
    params: [_ipfs],
  });
  changePFP(changePFPTransaction);
};













const uploadUserName = (_data) => {
  const blob = new Blob([_data], { type: 'text/plain' });
  const renamedFile = new File([blob], `userName.txt`, { type: 'text/plain' });
  const url = uploadData(renamedFile); 
  if (url) {
    url.then(res => {setUserNameCID(res)});
    changeUserNameFunc(userNameCID);
  }
  setUserName(userNameCID);
};
const { mutate: changeUserName, data: changeUserNameData } = useSendTransaction();
const changeUserNameFunc = (_userName) => {
  const changeUserNameTransaction = prepareContractCall({
    contract: contractPassport,
    method: "function changeUserName(string memory _userName) public",
    params: [_userName],
  });
  changeUserName(changeUserNameTransaction);
};













const { mutate: changeAlias, data: changeAliasData } = useSendTransaction();
const changeAliasFunc = (_userAlias) => {
  const changeAliasTransaction = prepareContractCall({
    contract: contractPassport,
    method: "function changeHandle(string memory _userAlias) public",
    params: [_userAlias],
  });
  changeAlias(changeAliasTransaction);
};












const { mutate: changeMSG, data: changeMSGData } = useSendTransaction();
const changeMSGFunc = (msg) => {
  const changeMSGTransaction = prepareContractCall({
    contract: contractPassport,
    method: "function changeMSG(string memory _msg) public",
    params: [msg],
  });
  changeMSG(changeMSGTransaction);
};
const uploadMSG = (_msg) =>{
  const url = uploadData(_msg);
  if (url) {
    url.then(res => {setMSG(res)});
    changeMSGFunc(MSG);
  }
}




const [accountCreation, setAccountCreation] = useState(false);

useEffect(() => {
  if (Passport && Passport[5]) {
    const unixTimestamp = Number(Passport[5]);
    const date = new Date(unixTimestamp * 1000);
    const readableDate = date.toLocaleString();
    console.log("Human readable auto delete:", readableDate);
    setAccountCreation(readableDate);
    setMinor(Passport[6]);
  } else {
    console.log("No timestamp available:", { Passport });
    setAccountCreation("");
  }
}, [Passport]);















const [PFPTrue, setPFPTrue] = useState(false);
const [UserTrue, setUserTrue] = useState(false);
const [AliasTrue, setAliasTrue] = useState(false);
const [MSGTrue, setMSGTrue] = useState(false);
const [passwordTrue, setPasswordTrue] = useState(false);






    return (
      <div className='mb-8'>
        <div className='flex justify-center items-center'>
          <h1 className='my-3 font-bold text-lg'>
            Passport
          </h1>
        </div>






        <div className='flex flex-row'>
          <div>
            <MediaRenderer src={Passport ? Passport[0] : null}/>
          </div>
          <div>
            <Button onClick={()=>{(setPFPTrue(!PFPTrue))}}>PFP</Button>
            {PFPTrue && 
              <div className='flex'>
                <Input
                  type="file"
                  size="lg"
                  placeholder="Metaverse Profile Picture"
                  onChange={(e) =>{
                    setPfp(e.target.files[0]);
                  }
                  }
                />
                <Button onClick={() => uploadPFP(userName)} >
                  Upload
                </Button>
                <p>{userNameCID}</p>
              </div>
            }
          </div>
        </div>






        <div>
          <Button onClick={() => {setUserTrue(!UserTrue)}}>UserName</Button>
          <IPFSFileViewer ipfsUrl={Passport && Passport[2]} />
          {UserTrue &&
            <div className='flex flex-row'>
              <div className='w-52'>
                <Input
                    type="text"
                    size="lg"
                    color="white"
                    label="Metaverse Username"
                    onChange={(e) =>{
                      setUserName(e.target.value);
                      }
                    }
                  />
              </div>
                <Button onClick={() => uploadUserName(userName)}>
                  Upload
                </Button>
            </div>
          }
        </div>











        <div>
          <Button onClick={()=>{setAliasTrue(!AliasTrue)}}>Handle</Button><span>{Passport && Passport[3]}</span>
          {AliasTrue && 
            <div className='flex flex-row'>
              <div className='w-52'>
                <Input
                  type="text"
                  size="lg"
                  color="white"
                  label="Metaverse Handle"
                  onChange={(e) =>{
                    setUserAlias(e.target.value);
                    }
                  }
                />
              </div>
              <Button onClick={() => changeAliasFunc(userAlias)} >
                Upload
              </Button>
            </div>
          }
        </div>






        <div>
          <Button onClick={() => {setMSGTrue(!MSGTrue)}}>Status Msg</Button><span>{Passport && Passport[4]}</span>
          {MSGTrue && 
            <div className='flex flex-row'>
              <div className='w-52'>
                <Input
                  type="text"
                  size="lg"
                  color="white"
                  label="MSG Status"
                  onChange={(e) =>{
                    setMSG(e.target.value);
                    }
                  }
                />
              </div>
              <Button onClick={() => uploadMSG(MSG)}>
                Upload
              </Button>
            </div>
          }      
        </div>




        <div>
          <Button>Account Creation</Button><span>{Passport && accountCreation} </span>
        </div>



        <div>
          <Button>Minor</Button><span>{minor ? "true" : "false"}</span>
        </div>

        <div>
          <Button onClick={() => {setPasswordTrue(!passwordTrue)}}>Password</Button><span>{Passport && Passport[7]}</span>
          {passwordTrue && 
            <div className='flex flex-col'>
              <PGPGenerator />
            </div>
          }  
        </div>






      </div>
    )

  }



export default UserPassport
