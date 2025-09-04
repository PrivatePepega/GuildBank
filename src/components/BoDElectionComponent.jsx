

import { ButtonGroup, Button, Input } from "@material-tailwind/react";

import { contractGovernorElection, contractSourceDAO, contractBallot} from "@/utils/functionDump/getContracts"
import { useReadContract } from "thirdweb/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import BoDVotingCOO from "./BoDVotingCOO";
import BoDVotingCCO from "./BoDVotingCCO";
import BoDVotingCFO from "./BoDVotingCFO";
import BoDVotingCTO from "./BoDVotingCTO";
import BoDVotingCEO from "./BoDVotingCEO";







const BoDElectionComponent = () => {



    const activeAccount = useActiveAccount();



    const { data: showVotingPower, isLoading: votingLoad } = useReadContract({
        contract: contractSourceDAO,
        method: "function showVotingUnits(address account) returns (uint256)",
        params: [activeAccount ? activeAccount.address : null],
      });

    const { data: getElectionSeason, getElectionSeasonLoading } = useReadContract({
        contract: contractGovernorElection,
        method: "function getElectionSeason() returns(bool)",
    });

    const { data: getEndTimer, isLoading: endTimeLoading } = useReadContract({
        contract: contractGovernorElection,
        method: "function electionEndedTimer() returns (uint256)",
    });
    const now = new Date();
    const THREE_DAYS = 3 * 24 * 60 * 60;
    const timestamp = Math.floor(now.getTime() / 1000); // UNIX timestamp in seconds
    const eligibleIndex = (timestamp - Number(getEndTimer)) / THREE_DAYS;




    const { mutate: startElection, data: startElectionData } = useSendTransaction();
        const startElectionTx = () => {
        const startElectionTransaction = prepareContractCall({
        contract: contractGovernorElection,
        method: "function startElection() public",
        })
        startElection(startElectionTransaction);
    };

    const { mutate: endElection, data: endElectionData } = useSendTransaction();
        const endElectionTx = () => {
        const endElectionTransaction = prepareContractCall({
        contract: contractGovernorElection,
        method: "function endElection() public",
        })
        endElection(endElectionTransaction);
    };






    // CEO// CEO// CEO// CEO// CEO// CEO// CEO
    // CEO// CEO// CEO// CEO// CEO// CEO// CEO
    // CEO// CEO// CEO// CEO// CEO// CEO// CEO
    const { data: CEO, CEOLoading } = useReadContract({
        contract: contractGovernorElection,
        method: "function CEO() returns(address)",
    });
    const { data: viewTopCandidatesCEOArray, viewTopCandidatesCEOArrayLoading } = useReadContract({
        contract: contractBallot,
        method: "function viewTopCandidatesCEOArray() returns (address[5])",
    });
    const { mutate: activationCEO, data: activationCEOData } = useSendTransaction();
    const activationCEOTx = () => {
      const activationCEOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCEO()",
      })
      activationCEO(activationCEOTransaction);
    };

    // CEO// CEO// CEO// CEO// CEO// CEO// CEO
    // CEO// CEO// CEO// CEO// CEO// CEO// CEO
    // CEO// CEO// CEO// CEO// CEO// CEO// CEO




    // CTO// CTO// CTO// CTO// CTO// CTO// CTO// CTO
    // CTO// CTO// CTO// CTO// CTO// CTO// CTO// CTO
    // CTO// CTO// CTO// CTO// CTO// CTO// CTO// CTO
    const { data: CTO, CTOLoading } = useReadContract({
        contract: contractGovernorElection,
        method: "function CTO() returns(address)",
    });
    const { data: viewTopCandidatesCTOArray, viewTopCandidatesCTOArrayLoading } = useReadContract({
        contract: contractBallot,
        method: "function viewTopCandidatesCTOArray() returns (address[5])",
    });
    const { mutate: activationCTO, data: activationCTOData } = useSendTransaction();
    const activationCTOTx = () => {
      const activationCTOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCTO()",
      })
      activationCTO(activationCTOTransaction);
    };
    // CTO// CTO// CTO// CTO// CTO// CTO// CTO// CTO
    // CTO// CTO// CTO// CTO// CTO// CTO// CTO// CTO
    // CTO// CTO// CTO// CTO// CTO// CTO// CTO// CTO






    // CFO// CFO// CFO// CFO// CFO// CFO// CFO// CFO
    // CFO// CFO// CFO// CFO// CFO// CFO// CFO// CFO
    // CFO// CFO// CFO// CFO// CFO// CFO// CFO// CFO
    const { data: CFO, CFOLoading } = useReadContract({
        contract: contractGovernorElection,
        method: "function CFO() returns(address)",
    });
    const { data: viewTopCandidatesCFOArray, viewTopCandidatesCFOArrayLoading } = useReadContract({
        contract: contractBallot,
        method: "function viewTopCandidatesCFOArray() returns (address[5])",
    });
    const { mutate: activationCFO, data: activationCFOData } = useSendTransaction();
    const activationCFOTx = () => {
      const activationCFOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCFO()",
      })
      activationCFO(activationCFOTransaction);
    };
    // CFO// CFO// CFO// CFO// CFO// CFO// CFO// CFO
    // CFO// CFO// CFO// CFO// CFO// CFO// CFO// CFO
    // CFO// CFO// CFO// CFO// CFO// CFO// CFO// CFO



// CCO// CCO// CCO// CCO// CCO// CCO// CCO// CCO
// CCO// CCO// CCO// CCO// CCO// CCO// CCO// CCO
// CCO// CCO// CCO// CCO// CCO// CCO// CCO// CCO
    const { data: CCO, CCOLoading } = useReadContract({
        contract: contractGovernorElection,
        method: "function CCO() returns(address)",
    });
    const { data: viewTopCandidatesCCOArray, viewTopCandidatesCCOArrayLoading } = useReadContract({
        contract: contractBallot,
        method: "function viewTopCandidatesCCOArray() returns (address[5])",
    });
    const { mutate: activationCCO, data: activationCCOData } = useSendTransaction();
    const activationCCOTx = () => {
      const activationCCOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCCO()",
      })
      activationCCO(activationCCOTransaction);
    };
// CCO// CCO// CCO// CCO// CCO// CCO// CCO// CCO
// CCO// CCO// CCO// CCO// CCO// CCO// CCO// CCO
// CCO// CCO// CCO// CCO// CCO// CCO// CCO// CCO



// COO// COO// COO// COO// COO// COO// COO// COO
// COO// COO// COO// COO// COO// COO// COO// COO
// COO// COO// COO// COO// COO// COO// COO// COO
    const { data: COO, COOLoading } = useReadContract({
        contract: contractGovernorElection,
        method: "function COO() returns(address)",
    });
    const { data: viewTopCandidatesCOOArray, viewTopCandidatesCOOArrayLoading } = useReadContract({
        contract: contractBallot,
        method: "function viewTopCandidatesCOOArray() returns (address[5])",
    });
    const { mutate: activationCOO, data: activationCOOData } = useSendTransaction();
    const activationCOOTx = () => {
      const activationCOOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCOO()",
      })
      activationCOO(activationCOOTransaction);
    };
// COO// COO// COO// COO// COO// COO// COO// COO
// COO// COO// COO// COO// COO// COO// COO// COO
// COO// COO// COO// COO// COO// COO// COO// COO


    const [VotingState, setVotingState] = useState(0);




  return (
    <div>


        <div className="flex flex-col justify-center items-center">
            <h2 className='font-bold text-lg my-5'>
                Elections
            </h2>
            <ButtonGroup>
                <div>
                    <Button onClick={()=>{startElectionTx()}}>Start Election</Button>
                    <div>
                        Summer: May, Day 20
                    </div>
                    <div>
                        Winter: Nov, Day 20
                    </div>
                </div>
                <div>
                    <Button onClick={()=>{endElectionTx()}}>End Election</Button>
                    <div>
                        Summer: Jun, Day 20
                    </div>
                    <div>
                        Winter: Dec, Day 20
                    </div>
                </div>
            </ButtonGroup>
        </div>


        {getElectionSeason == true && 
        <div className="mt-8">
            <div className="flex flex-row gap-12">
                <ButtonGroup>
                    <Button onClick={()=>{setVotingState(0)}}>CEO</Button>
                    <Button onClick={()=>{setVotingState(1)}}>CTO</Button>
                    <Button onClick={()=>{setVotingState(2)}}>CFO</Button>
                    <Button onClick={()=>{setVotingState(3)}}>CCO</Button>
                    <Button onClick={()=>{setVotingState(4)}}>COO</Button>
                </ButtonGroup>
            </div>
            <div>
                Your Voting Power: {Number(showVotingPower)}
            </div>
            {VotingState === 0 &&
                <div>
                    <BoDVotingCEO />
                </div>
            }
            {VotingState === 1 &&
                <div>
                    <BoDVotingCTO />
                </div>
            }
            {VotingState === 2 &&
                <div>
                    <BoDVotingCFO />
                </div>
            }
            {VotingState === 3 &&
                <div>
                    <BoDVotingCCO />
                </div>
            }
            {VotingState === 4 &&
                <div>
                    <BoDVotingCOO />
                </div>
            }
        </div>
        }


        {getElectionSeason == false && 
            <div className="mt-10">
                <h2 className='my-3 font-bold text-lg'>
                    it is not the season to be jolly, unjolly yourself fren
                </h2>
                <div className="mt-10 gap-10">



                    <div>
                        {viewTopCandidatesCEOArray[0] === "0x0000000000000000000000000000000000000000" && viewTopCandidatesCEOArray[1] === "0x0000000000000000000000000000000000000000" && viewTopCandidatesCEOArray[2] === "0x0000000000000000000000000000000000000000" && viewTopCandidatesCEOArray[3] === "0x0000000000000000000000000000000000000000" && viewTopCandidatesCEOArray[4] === "0x0000000000000000000000000000000000000000"?
                        (
                        <div>
                            <p>
                                Elgibible Index in da Array[]: {Number(eligibleIndex) < 5 ? Number(eligibleIndex) : null}
                            </p>
                        </div>
                        )
                        :
                        (
                        <div>
                        </div>
                        )
                        }
                    </div>




                    <div>
                        {viewTopCandidatesCEOArray[0] === "0x0000000000000000000000000000000000000000" ?
                        (
                        <div>
                            CEO: {CEO}
                        </div>
                        )
                        :
                        (
                        <div>
                            <div>
                                Top 5 CEO: {viewTopCandidatesCEOArray ? viewTopCandidatesCEOArray?.map((tx) => tx.toString()).join(", ") : null}
                            </div>
                            <div>
                                <Button onClick={()=>{activationCEOTx()}}>CEO Activate</Button>
                            </div>
                        </div>
                        )
                        }
                    </div>



                    <div>
                        {viewTopCandidatesCTOArray[0] === "0x0000000000000000000000000000000000000000" ?
                        (
                        <div>
                            CTO: {CTO}
                        </div>
                        )
                        :
                        (
                        <div>
                            <div>
                                Top 5 CTO: {viewTopCandidatesCTOArray ? viewTopCandidatesCTOArray?.map((tx) => tx.toString()).join(", ") : null}
                            </div>
                            <div>
                                <Button onClick={()=>{activationCTOTx()}}>CTO Activate</Button>
                            </div>
                        </div>
                        )
                        }
                    </div>


                    <div>
                        {viewTopCandidatesCFOArray[0] === "0x0000000000000000000000000000000000000000" ?
                        (
                        <div>
                            CFO: {CFO}
                        </div>
                        )
                        :
                        (
                        <div>
                            <div>
                                Top 5 CFO: {viewTopCandidatesCFOArray ? viewTopCandidatesCFOArray?.map((tx) => tx.toString()).join(", ") : null}
                            </div>
                            <div>
                                <Button onClick={()=>{activationCFOTx()}}>CFO Activate</Button>
                            </div>
                        </div>
                        )
                        }
                    </div>


                    <div>
                        {viewTopCandidatesCCOArray[0] === "0x0000000000000000000000000000000000000000" ?
                        (
                        <div>
                            CCO: {CCO}
                        </div>
                        )
                        :
                        (
                        <div>
                            <div>
                                Top 5 CCO: {viewTopCandidatesCCOArray ? viewTopCandidatesCCOArray?.map((tx) => tx.toString()).join(", ") : null}
                            </div>
                            <div>
                                <Button onClick={()=>{activationCCOTx()}}>CCO Activate</Button>
                            </div>
                        </div>
                        )
                        }
                    </div>


                    <div>
                        {viewTopCandidatesCOOArray[0] === "0x0000000000000000000000000000000000000000" ?
                        (
                        <div>
                            COO: {COO}
                        </div>
                        )
                        :
                        (
                        <div>
                            <div>
                                Top 5 COO: {viewTopCandidatesCOOArray ? viewTopCandidatesCOOArray?.map((tx) => tx.toString()).join(", ") : null}
                            </div>
                            <div>
                                <Button onClick={()=>{activationCOOTx()}}>COO Activate</Button>
                            </div>
                        </div>
                        )
                        }
                    </div>

                </div>
            </div>
        }




    </div>
  )
}




export default BoDElectionComponent