"use client";

import { useState } from 'react';

  // Contracts
import { useActiveAccount } from "thirdweb/react";
import { useCheckPassport } from "@/utils/functionDump/checkPassport";
import { useReadContract } from "thirdweb/react";


import { ButtonGroup, Button, Input } from "@material-tailwind/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import {contractPassport} from "@/utils/functionDump/getContracts"
import IPFSFileViewer from "@/components/IPFSFileViewer";
import {uploadData} from "@/utils/functionDump/Passport.js"




const UserSocialSocial = () => {
  const activeAccount = useActiveAccount();






const { data: SocialPassport, isLoading: SocialPassportLoad } = useReadContract({
  contract: contractPassport,
  method: "function SocialPassport(address _address) view returns (string ipfsEmail, string ipfsDiscord, string ipfsReddit, string ipfsTwitter, string ipfsLinkTree, string ipfsStream)",
  params: [activeAccount ? activeAccount.address : null],
});








    const [emailTrue, setEmailTrue] = useState(false);
    const [email, setEmail] = useState("");

    const { mutate: addEmail, data: addEmailData } = useSendTransaction();
    const addEmailFunc = (_email) => {
    const addEmailTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addEmail(string memory _email)",
        params: [_email],
    });
    addEmail(addEmailTransaction);
    };
     async function uploadEmail(_data){
        const blob = new Blob([_data], { type: 'text/plain' });
        const renamedFile = new File([blob], `socialEmail.txt`, { type: 'text/plain' });
        const url = await uploadData(renamedFile); 
        addEmailFunc(url);
      };
      






    const [discordTrue, setDiscoredTrue] = useState(false);
    const [discord, setDiscord] = useState("");
    const { mutate: addDiscordSocialPassport, data: addDiscordSocialPassportData } = useSendTransaction();
    const addDiscordSocialPassportFunc = (_ipfsDiscord) => {
    const addDiscordSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addChat(string memory _ipfsDiscord) public",
        params: [_ipfsDiscord],
    });
    addDiscordSocialPassport(addDiscordSocialPassportTransaction);
    };
    async function uploadDiscord(_data) {
        const blob = new Blob([_data], { type: 'text/plain' });
        const renamedFile = new File([blob], `socialDiscord.txt`, { type: 'text/plain' });
        const url = await uploadData(renamedFile); 
        addDiscordSocialPassportFunc(url);
      };









    const [redditTrue, setRedditTrue] = useState(false);
    const [reddit, setReddit] = useState("");
    const { mutate: addRedditSocialPassport, data: addRedditSocialPassportData } = useSendTransaction();
    const addRedditSocialPassportFunc = (_ipfsReddit) => {
    const addRedditSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addForum(string memory _ipfsReddit) public",
        params: [_ipfsReddit],
    });
    addRedditSocialPassport(addRedditSocialPassportTransaction);
    };
    async function uploadReddit(_data) {
        const blob = new Blob([_data], { type: 'text/plain' });
        const renamedFile = new File([blob], `socialReddit.txt`, { type: 'text/plain' });
        const url = await uploadData(renamedFile); 
        addRedditSocialPassportFunc(url);
      };







    const [twitterTrue, setTwitterTrue] = useState(false);
    const [twitter, setTwitter] = useState("");

    const { mutate: addTwitterSocialPassport, data: addTwitterSocialPassportData } = useSendTransaction();
    const addTwitterSocialPassportFunc = (_ipfsTwitter) => {
    const addTwitterSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addTwitter(string memory _ipfsTwitter) public",
        params: [_ipfsTwitter],
    });
    addTwitterSocialPassport(addTwitterSocialPassportTransaction);
    };
    async function uploadTwitter(_data){
        const blob = new Blob([_data], { type: 'text/plain' });
        const renamedFile = new File([blob], `socialTwitter.txt`, { type: 'text/plain' });
        const url = await uploadData(renamedFile); 
        addTwitterSocialPassportFunc(url);
      };








    const [streamTrue, setStreamTrue] = useState(false);
    const [streamLink, setStreamLink] = useState("");

    const { mutate: addStreamSocialPassport, data: addStreamSocialPassportData } = useSendTransaction();
    const addStreamSocialPassportFunc = (_ipfsStreamLink) => {
    const addStreamSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addStream(string memory _ipfsStreamLink) public",
        params: [_ipfsStreamLink],
    });
    addStreamSocialPassport(addStreamSocialPassportTransaction);
    };
      async function uploadStreamLink(_data){
        const blob = new Blob([_data], { type: 'text/plain' });
        const renamedFile = new File([blob], `socialStreamLink.txt`, { type: 'text/plain' });
        const url = await uploadData(renamedFile); 
        addStreamSocialPassportFunc(url);
      };








      const [linkTrue, setLinkTrue] = useState(false);
      const [linkTree, setLinkTree] = useState("");
      const { mutate: addLinkTreeSocialPassport, data: addLinkTreeSocialPassportData } = useSendTransaction();
      const addLinkTreeSocialPassportFunc = (_ipfsLinkTree) => {
      const addLinkTreeSocialPassportTransaction = prepareContractCall({
          contract: contractPassport,
          method: "function addLinkTree(string memory _ipfsLinkTree) public",
          params: [_ipfsLinkTree],
      });
      addLinkTreeSocialPassport(addLinkTreeSocialPassportTransaction);
      };
      async function uploadLinkTree(_data){
          const blob = new Blob([_data], { type: 'text/plain' });
          const renamedFile = new File([blob], `linkTreeCID.txt`, { type: 'text/plain' });
          const url = await uploadData(renamedFile); 
          addLinkTreeSocialPassportFunc(url);

        };







console.log(SocialPassport)




    return (
      <div className='flex flex-col'>
        <div className='flex justify-center items-center'>
          <h1 className='my-3 font-bold text-lg'>social</h1>
        </div>
        <div>
            <Button onClick={()=> setEmailTrue(!emailTrue)}>Email</Button><IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[0]} />
            {emailTrue &&
                <div className='flex flex-row'>
                  <div className='w-52'>
                    <Input
                      type="text"
                      color="white"
                      label="new Email"
                      onChange={(e) =>{
                          setEmail(e.target.value);
                          }
                      }
                      />
                  </div>
                    <Button onClick={() => uploadEmail(email)}>Upload</Button>
                </div>
            }
        </div>



        <div>
            <Button onClick={()=> setDiscoredTrue(!discordTrue)}>Chat</Button><IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[1]} />
            {discordTrue &&
                <div className='flex flex-row'>
                  <div className='w-52'>
                    <Input
                      type="text"
                      color="white"
                      label="new chat"
                      onChange={(e) =>{
                          setDiscord(e.target.value);
                          }
                      }
                      />
                  </div>  
                    <Button onClick={() => uploadDiscord(discord)}>Upload</Button>
                </div>
            }
        </div>
        



        <div>
            <Button onClick={()=> setRedditTrue(!redditTrue)}>Forum</Button><IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[2]} />
            {redditTrue &&
                <div className='flex flex-row'>
                  <div className='w-52'>
                    <Input
                      type="text"
                      color="white"
                      label="new forum"
                      onChange={(e) =>{
                          setReddit(e.target.value);
                          }
                      }
                      />
                  </div>
                    <Button onClick={() => uploadReddit(reddit)}>Upload</Button>
                </div>
                }
        </div>
       




        <div>
            <Button onClick={()=> setTwitterTrue(!twitterTrue)}>Twitter</Button><IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[3]} />
            {twitterTrue &&
                <div className='flex flex-row'>
                  <div className='w-52'>
                    <Input
                      type="text"
                      color="white"
                      label="new twitter"
                      onChange={(e) =>{
                          setTwitter(e.target.value);
                          }
                      }
                      />  
                  </div>
                    <Button onClick={() => uploadTwitter(twitter)}>Upload</Button>
                </div>
            }
        </div>

        

        <div>
            <Button onClick={()=> setStreamTrue(!streamTrue)}>Stream</Button><IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[4]} />
            {streamTrue &&
                <div className='flex flex-row'>
                  <div className='w-52'>
                    <Input
                      type="text"
                      color="white"
                      label="new stream"
                      onChange={(e) =>{
                          setStreamLink(e.target.value);
                          }
                      }
                      />
                  </div>
                    <Button onClick={() => uploadStreamLink(streamLink)}>Upload</Button>
                </div>
            } 
        </div>




        <div>
            <Button onClick={()=> setLinkTrue(!linkTrue)}>LinkTree</Button><IPFSFileViewer ipfsUrl={SocialPassport && SocialPassport[5]} />
            {linkTrue &&
                <div className='flex flex-row'>
                  <div className='w-52'>
                    <Input
                      type="text"
                      color="white"
                      label="new linkTree"
                      onChange={(e) =>{
                          setLinkTree(e.target.value);
                          }
                      }
                      />
                  </div>
                    <Button onClick={() => uploadLinkTree(linkTree)}>Upload</Button>
                </div>
            }     
        </div>



      </div>
    )

  }



export default UserSocialSocial
