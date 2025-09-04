import { ButtonGroup, Button, Input, Textarea  } from "@material-tailwind/react";

import { contractPassport, contractBallot} from "@/utils/functionDump/getContracts"
import { useReadContract } from "thirdweb/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { MediaRenderer } from "thirdweb/react";
import IPFSFileViewer from "./IPFSFileViewer";
import {uploadData} from "@/utils/functionDump/Passport.js"









const BoDVotingCOO = () => {





  const [candidateIPFS, setCandidateIPFS] = useState("");
  const [candidateLink, setCandidateLink] = useState("");
  const [Candidate, setCandidates] = useState("");
  const [index, setIndex] = useState(0);
  const [viewCandidate, setviewCandidates] = useState("");



  
  // const { data: viewCandidateArray, viewCandidateArrayLoading } = useReadContract({
  //   contract: contractBallot,
  //   method: "function viewCandidateCOOArray() returns (address[])",
  // });

  const { data: viewTopCandidatesArray, viewTopCandidatesArrayLoading } = useReadContract({
    contract: contractBallot,
    method: "function viewTopCandidatesCOOArray() returns (address[5])",
  });

  const { mutate: joinAsCandidate, data: joinAsCandidateData } = useSendTransaction();
      const joinAsCandidateTx = () => {
      const joinAsCandidateTransaction = prepareContractCall({
      contract: contractBallot,
      method: "function joinAsCandidate(string memory _ipfsLink, uint8 _role)",
      params: [candidateLink, 4],
      })
      joinAsCandidate(joinAsCandidateTransaction);
  };

  const { mutate: vote, data: voteData } = useSendTransaction();
    const voteTx = () => {
      const voteTransaction = prepareContractCall({
      contract: contractBallot,
      method: "function voteCOO(address _candidate)",
      params: [viewCandidate],
      })
      vote(voteTransaction);
  };



    




  const uploadCandidateIPFS = () => {
    // Create a new Blob with the username content
    const blob = new Blob([candidateIPFS], { type: 'text/plain' });
    // Create a new File with the Blob and the desired filename
    const renamedFile = new File([blob], `candidateIPFS.txt`, { type: 'text/plain' });
    const url = uploadData(renamedFile); 
    if (url) {
      url.then(res => {setCandidateLink(res)});
    }
  };








  const { data: viewCandidatesData, viewCandidatesLoading } = useReadContract({
    contract: contractBallot,
    method: "function Candidates(address) returns (address, string, uint256, uint8, uint256)",
    params: [viewCandidate],
  });
  const { data: Passport, PassportLoading } = useReadContract({
    contract: contractPassport,
    method: "function Passport(address) returns (string, address, string, string, string, uint256, uint256)",
    params: [viewCandidate],
  });

  const { data: electionCounter, electionCounterLoad } = useReadContract({
    contract: contractBallot,
    method: "function ElectionCounter() returns (uint256)",
  });

//   function findObjectIndex(Candidate) {
//     const index = viewCandidateArray?.findIndex(
//       (item) => item === Candidate
//   );
//     if (index === -1) {
//         console.log("Object not found");
//         return null;
//     }
//     setIndex(index);
//     console.log(index);
//     setviewCandidates(viewCandidateArray[index])
// }



//   const handleSearch = () => {
//     findObjectIndex(Candidate);
//   }; 
//   const handleNext = () => {
//     if (index < viewCandidateArray.length - 1) {
//       const newIndex = index + 1;
//       setIndex(newIndex);
//       setviewCandidates(viewCandidateArray[newIndex]);
//     } else {
//       console.log("No more candidates");
//     }
//   }; 

//   const handleBack = () => {
//     if (index > 0) {
//       const newIndex = index - 1;
//       setIndex(newIndex);
//       setviewCandidates(viewCandidateArray[newIndex]);
//     } else {
//       console.log("No previous candidates");
//     }  
//   };




  







  return (
    <div className="mt-7">

      <div className="flex flex-col gap-5">
        <h1 className='my-3 font-bold text-lg'>
          COO Voting Booth
        </h1>
        <div>
          TOP 5 COO Candidates: {viewTopCandidatesArray ? viewTopCandidatesArray?.map((tx) => tx.toString()).join(", ") : null}
        </div>
      </div>





      <div className="flex flex-row items-center">
          <div>
            <MediaRenderer src={Passport && Passport[0]}/>
          </div>

          <div>
            <div>
              Candidate: {viewCandidatesData && viewCandidatesData[0]}
            </div>
            <div>
              IPFS: {
                      viewCandidatesData && viewCandidatesData[1] ? (
                        viewCandidatesData[1].startsWith("ipfs:") ? (
                          <IPFSFileViewer ipfsUrl={viewCandidatesData[1]} />
                        ) : (
                          viewCandidatesData[1]
                        )
                      ) : (
                        "No Speacho..."
                      )
                    }
            </div>
            <div>
              Voting Score: {Number(viewCandidatesData && viewCandidatesData[2])}
            </div>
            <div>
              UserName: <IPFSFileViewer ipfsUrl={Passport && Passport[2]} />
            </div>
            <div>
              Handle: {Passport && Passport[3]}
            </div>
            {viewCandidatesData ? viewCandidatesData[4] === electionCounter && <Button onClick={()=>{voteTx()}}>Vote</Button> : ""}
          </div>
        </div>


        <h2 className='my-3 font-bold text-lg'>
          Voting Booth:
        </h2>




        <Input
        type="string"
        color="white"
        label="Candidate Address"
        onChange={(e) => setCandidates(e.target.value)}
      />
      {/* <Button onClick={()=>{handleBack()}}>Left</Button> */}
      <Button onClick={()=>{setviewCandidates(Candidate)}}>Search</Button>
      {/* <Button onClick={()=>{handleNext()}}>Right</Button> */}

      {/* <div>
          Candidates: {viewCandidateArray ? viewCandidateArray?.map((tx) => tx.toString()).join(", ") : null}
        </div> */}


       








      <div className="mt-10">
        <h2 className='my-3 font-bold text-lg'>
          Apply for COO
        </h2>
        <p>
          Your Application Data,
        </p>
        <Textarea 
          label="Your Candidate's Speacho"
          onChange={(e) => setCandidateIPFS(e.target.value)}
        />
        <div>{candidateLink ? candidateLink : <span>linko</span>}</div>
        <Button onClick={()=>{uploadCandidateIPFS(), setCandidateLink("")}}>IPFS</Button>
        {candidateLink && <Button onClick={()=>{joinAsCandidateTx()}}>Join</Button>}
      </div>





    </div>
  )
}



export default BoDVotingCOO