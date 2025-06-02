








const [stateBoD, setstateBoD] = useState(0);
const [StateLocalGuild, setStateLocalGuild] = useState(0);

const [burnDonationToken, setBurnDonationToken] = useState("");
const [burnDonationAmount, setBurnDonationAmount] = useState(0);

const [burnAmount, setBurnAmount] = useState(0);

const [DAODonationToken, setDAODonationToken] = useState("");
const [DAODonationAmount, setDAODonationAmount] = useState(0);

const [DonationBoDName, setDonationBoDName] = useState(0);
const [DonationBoDAmount, setDonationBoDAmount] = useState(0);

const [ChairAddress, setChairAddress] = useState(0);
const [ChallengeIndex, setChallengeIndex] = useState("");

const [forfeit, setForfeit] = useState(false);



const activeAccount = useActiveAccount();
const { passportBalance, isLoading } = useCheckPassport(contractPassport, activeAccount);



const [TransactionABI, setTransactionABI] = useState("");
const [TransactionValues, setTransactionValues] = useState([]);







//   // Source Stats   // Source Stats  // Source Stats
//   // Source Stats   // Source Stats  // Source Stats
//   // Source Stats  // Source Stats  // Source Stats


const [delegateAccount, setDelegateAccount] = useState("");


const { mutate: delegateTx, data: delegateTxData } = useSendTransaction();
const delegatePerson = () => {
  const delegateTransaction = prepareContractCall({
      contract: contractSourceDAO,
      method: "function delegate(address delegatee)",
      params: [delegateAccount],
    })
    delegateTx(delegateTransaction);
  };

const { mutate: noMintPunishmentTX, data: noMintPunishmentTXData } = useSendTransaction();
const noMintPunishment = () => {
  const noMintPunishment = prepareContractCall({
      contract: contractSourceDAO,
      method: "function NoMintPunishment()",
    })
    noMintPunishmentTX(noMintPunishment);
  };

  const { data: amountPerMintSource, isLoading: amountLoadSource } = useReadContract({
    contract: contractSourceDAO,
    method: "function amountPerMint() returns (uint256)",
  });

  const { data: balanceOfSource, isLoading: sourceLoadSoure } = useReadContract({
    contract: contractSourceDAO,
    method: "function balanceOf (address account) returns (uint256)",
    params: [activeAccount ? activeAccount.address : null],
  });
  const { data: balanceOfTreasury, isLoading: balanceOfTreasuryLoad } = useReadContract({
    contract: contractSourceDAO,
    method: "function balanceOf (address account) returns (uint256)",
    params: [contractGovernorTreasury],
  });

  const { data: capTotalSource, isLoading: capLoadSource } = useReadContract({
    contract: contractSourceDAO,
    method: "function cap() returns (uint256)",
  });

  const { data: delegates, isLoading: delLoad } = useReadContract({
    contract: contractSourceDAO,
    method: "function delegates(address account) returns (address)",
    params: [activeAccount ? activeAccount.address : null],
  });

  const { data: showVotingPower, isLoading: votingLoad } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits(address account) returns (uint256)",
    params: [activeAccount ? activeAccount.address : null],
  });

  const { data: showDelegateVotingPower, isLoading: delegateLoad } = useReadContract({
    contract: contractSourceDAO,
    method: "function showVotingUnits(address account) returns (uint256)",
    params: [delegates ? delegates : null],
  });

  const { data: nameSource, isLoading: nameLoadSource } = useReadContract({
    contract: contractSourceDAO,
    method: "function name() returns (string memory)",
  });
  const { data: symbolSource, isLoading: symbolSourceLoad } = useReadContract({
    contract: contractSourceDAO,
    method: "function symbol() returns (string memory)",
  });

  const { data: totalSupplySource, isLoading: supplyLoadSource } = useReadContract({
    contract: contractSourceDAO,
    method: "function totalSupply() returns (uint256)",
  });


//   // Source Stats   // Source Stats  // Source Stats
//   // Source Stats   // Source Stats  // Source Stats
//   // Source Stats  // Source Stats  // Source Stats











// // money stats  // money stats  // money stats
// // money stats  // money stats  // money stats
// // money stats  // money stats  // money stats

// get money address to display

const { mutate: noMintPunishMoney, data: noMintPunishMoneyData } = useSendTransaction();
const noMintPunishMoneyFunc = () => {
  const noMintPunishMoneyTx = prepareContractCall({
      contract: contractMoneyDAO,
      method: "function NoMintPunishment()",
    })
    noMintPunishMoney(noMintPunishMoneyTx);
  };

  const { data: amountPerMintMoney, isLoading: amountLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function amountPerMint() returns (uint256)",
  });

  const { data: balanceOfMoney, isLoading: sourceLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function balanceOf (address account) returns (uint256)",
    params: [activeAccount ? activeAccount.address : null],
  });

  const { data: balanceOfDAOMoney, isLoading: DaoMoneyLoad } = useReadContract({
    contract: contractMoneyDAO,
    method: "function balanceOf (address account) returns (uint256)",
    params: [contractGovernorTreasury],
  });

  

  const { data: capTotalMoney, isLoading: capLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function cap() returns (uint256)",
  });

  const { data: lastMintMoney, isLoading: lastMintMoneyLoad } = useReadContract({
    contract: contractMoneyDAO,
    method: "function lastMinted() returns (uint256)",
  });

  const { data: nameMoney, isLoading: nameLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function name() returns (string memory)",
  });

  const { data: symbolMoney, isLoading: symbolMoneyLoad } = useReadContract({
    contract: contractMoneyDAO,
    method: "function symbol() returns (string memory)",
  });

  const { data: totalSupplyMoney, isLoading: supplyLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function totalSupply() returns (uint256)",
  });


// // money stats  // money stats  // money stats
// // money stats  // money stats  // money stats
// // money stats  // money stats  // money stats










// BoD Stats  // BoD Stats  // BoD Stats
// BoD Stats  // BoD Stats  // BoD Stats
// BoD Stats  // BoD Stats  // BoD Stats


const { mutate: challengeTx, data: challengeTxData } = useSendTransaction();
const onChallengeBoD = () => {
  const ChallengeTransaction = prepareContractCall({
      contract: contractBoD,
      method: "function challengeSenatorChair(uint8 index) returns (bool)",
      params: [ChallengeIndex],
    })
    challengeTx(ChallengeTransaction);
  };


const { mutate: forfeitTX, data: forfeitTXData } = useSendTransaction();
const forfeitChairTX = () => {
  const forfeitChairTXTransaction = prepareContractCall({
      contract: contractBoD,
      method: "function ForfeitChair(bool _Forfeit) public",
      params: [forfeit],
    })
    forfeitTX(forfeitChairTXTransaction);
  };


const { data: BoDArray, isLoading: BoDArrayLoad } = useReadContract({
  contract: contractBoD,
  method: "function returnBoD() returns(address[16] memory)",
});


// BoD Stats  // BoD Stats  // BoD Stats
// BoD Stats  // BoD Stats  // BoD Stats
// BoD Stats  // BoD Stats  // BoD Stats













// BoD Treasury // BoD Treasury // BoD Treasury
// BoD Treasury // BoD Treasury // BoD Treasury
// BoD Treasury // BoD Treasury // BoD Treasury







// const { mutate: sumbitTx, data: sumbitTxData } = useSendTransaction();
// const SumbitTX = () => {
//   const SubmitTXTransaction = prepareContractCall({
//       contract: contractBoDTreasury,
//       method: "function submitTransaction(string memory _ipfsLink, address _to, string[] memory _tokenName, uint256[] memory _amount)",
//       params: [ipftLinkTX, toTX, tokenNameTx, tokenAmountTx],
//     })
//     sumbitTx(SubmitTXTransaction);
//   };

// const { mutate: approveTx, data: approveTxData } = useSendTransaction();
// const ApproveTx = () => {
//   const ApproveTxTransaction = prepareContractCall({
//       contract: contractBoDTreasury,
//       method: "function approveTransaction(uint256 TxId) txActive(TxId)",
//       params: [TxId],
//     })
//     approveTx(ApproveTxTransaction);
//   };

// const { mutate: denyTx, data: denyTxData } = useSendTransaction();
// const DenyTx = () => {
//   const DenyTxTransaction = prepareContractCall({
//       contract: contractBoDTreasury,
//       method: "function denyTransaction(uint256 TxId) txActive(TxId)",
//       params: [TxId],
//     })
//     denyTx(DenyTxTransaction);
//   };

// const { mutate: executeTx, data: executeTxData } = useSendTransaction();
// const ExecuteTx = () => {
//   const ExecuteTxTransaction = prepareContractCall({
//       contract: contractBoDTreasury,
//       method: "function executeTransaction(uint256 TxId, bytes calldata _data) txActive(TxId)",
//       params: [TxId, "0x"],
//     })
//     executeTx(ExecuteTxTransaction);
//   };



const { data: showTreasuryArray, isLoading: BoDTreasuryLoad } = useReadContract({
  contract: contractBoDTreasury,
  method: "function showTreasuryArray() returns(string[] memory)",
});

const { data: showTxOnQueueArray, isLoading: showTxOnQueueArrayLoad } = useReadContract({
  contract: contractBoDTreasury,
  method: "function showTxOnQueueArray() returns(uint[] memory)",
});

const { data: showActionOnQueueArray, isLoading: showActionOnQueueArrayLoad } = useReadContract({
  contract: contractBoDTreasury,
  method: "function showActionOnQueueArray() returns(uint[] memory)",
});


const { mutate: DepositToBoDTreasury, data: DepositToBoDTreasuryData } = useSendTransaction();

const DepositToBoDTreasuryTx = () => {
  const DepositToBoDTreasuryTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function DepositToBoDTreasury(uint256 _amount, string memory _tokenName, bytes calldata _data)",
      params: [DonationBoDAmount, DonationBoDName, "0x"],
    })
    DepositToBoDTreasury(DepositToBoDTreasuryTransaction);
  };

const { data: showAddressVotingPower, isLoading: votingAddressLoad } = useReadContract({
  contract: contractSourceDAO,
  method: "function showVotingUnits(address account) returns (uint256)",
  params: [ChairAddress ? ChairAddress : null],
});





//   const { mutate: submitAction, data: sumbitActionData } = useSendTransaction();
//   const SubmitAction = () => {
//     const SubmitActionTransaction = prepareContractCall({
//         contract: contractBoDTreasury,
//         method: "function submitAction(address _target, bytes memory _data, string memory _ipfsLink, bool _Tx, string[] memory _tokenName, uint256[] memory _tokenAmount)",
//         params: [targetAction, "0x", ipfsAction, txActionBool, tokenNameAction, tokenAmountAction],
//       })
//       submitAction(SubmitActionTransaction);
//     };



// const { mutate: approveAction, data: approveActionData } = useSendTransaction();
// const ApproveAction = () => {
//   const ApproveActionTransaction = prepareContractCall({
//       contract: contractBoDTreasury,
//       method: "function approveAction(uint _ActionId) actionActive(_ActionId)",
//       params: [_ActionId],
//     })
//     approveAction(ApproveActionTransaction);
//   };



// const { mutate: denyActionTx, data: denyActionTxData } = useSendTransaction();
// const DenyActionTx = () => {
//   const DenyActionTransaction = prepareContractCall({
//       contract: contractBoDTreasury,
//       method: "function denyAction(uint _ActionId) actionActive(_ActionId)",
//       params: [_ActionId],
//     })
//     denyActionTx(DenyActionTransaction);
//   };

//   const { mutate: executeActionTx, data: executeActionTxData } = useSendTransaction();
//   const ExecuteActionTx = () => {
//     const ExecuteActionTxTransaction = prepareContractCall({
//         contract: contractBoDTreasury,
//         method: "function executeAction(uint _ActionId) actionActive(_ActionId)",
//         params: [_Actionid],
//       })
//       executeActionTx(ExecuteTxTransaction);
//     };



// BoD Treasury // BoD Treasury // BoD Treasury
// BoD Treasury // BoD Treasury // BoD Treasury
// BoD Treasury // BoD Treasury // BoD Treasury















//Governor Treasury //Governor Treasury //Governor Treasury
//Governor Treasury //Governor Treasury //Governor Treasury
//Governor Treasury //Governor Treasury //Governor Treasury


const { data: showGovernorTreasuryArray, isLoading: GovernorTreasuryLoad } = useReadContract({
  contract: contractGovernorTreasury,
  method: "function showTreasuryArray() returns(string[] memory)",
});


const { data: showGovernorBurnArray, isLoading: GovernorBurnLoad } = useReadContract({
  contract: contractGovernorTreasury,
  method: "function showBurnArray() returns(string[] memory)",
});

const { mutate: BurnDaoToken, data: BurnDaoTokenData } = useSendTransaction();
const BurnDaoTokenTx = () => {
  const BurnDaoTokenTransaction = prepareContractCall({
      contract: contractGovernorTreasury,
      method: "function BurnDAOTokenToLocal (uint256 _amount, bytes calldata _data) returns(bool)",
      params: [burnAmount, "0x"],
    })
    BurnDaoToken(ExecuteTxTransaction);
  };



const { mutate: DepoBurnReward, data: DepoBurnRewardData } = useSendTransaction();
const DepoBurnRewardTx = () => {
  const DepoBurnRewardTransaction = prepareContractCall({
      contract: contractGovernorTreasury,
      method: "function DepositRewardBurnVault (uint256 _amount, string memory _tokenName, bytes memory _data)",
      params: [burnDonationAmount, burnDonationToken, "0x"],
    })
    DepoBurnReward(DepoBurnRewardTransaction);
  };



  const { mutate: DepoDaoTreasury, data: DepoDaoTreasuryData } = useSendTransaction();
  const DepoDaoTreasuryTransactionTx = () => {
    const DepoDaoTreasuryTransaction = prepareContractCall({
        contract: contractGovernorTreasury,
        method: "function DepositToDaoTreasury(uint256 _amount, string memory _tokenName, bytes calldata _data)",
        params: [DAODonationAmount, DAODonationToken, "0x"],
      })
      DepoDaoTreasury(DepoDaoTreasuryTransaction);
    };



  const { data: showDcoinBurnCount, isLoading: showDcoinBurnCountLoad } = useReadContract({
    contract: contractGovernorTreasury,
    method: "function DcoinBurningCounter() returns(uint56)",
  });
    


//Governor Treasury //Governor Treasury //Governor Treasury
//Governor Treasury //Governor Treasury //Governor Treasury
//Governor Treasury //Governor Treasury //Governor Treasury






// GuildBank Election // GuildBank Election // GuildBank Election
// GuildBank Election // GuildBank Election // GuildBank Election
// GuildBank Election // GuildBank Election // GuildBank Election



// const { mutate: activationCCO, data: activationCCOData } = useSendTransaction();
// const activationCCOTx = () => {
//   const activationCCOTransaction = prepareContractCall({
//       contract: contractGovernorElection,
//       method: "function activationCCO()",
//     })
//     activationCCO(activationCCOTransaction);
//   };

// const { mutate: activationCEO, data: activationCEOData } = useSendTransaction();
// const activationCEOTx = () => {
//   const activationCEOTransaction = prepareContractCall({
//       contract: contractGovernorElection,
//       method: "function activationCEO()",
//     })
//     activationCEO(activationCEOTransaction);
//   };

// const { mutate: activationCFO, data: activationCFOData } = useSendTransaction();
// const activationCFOTx = () => {
//   const activationCFOTransaction = prepareContractCall({
//       contract: contractGovernorElection,
//       method: "function activationCFO()",
//     })
//     activationCFO(activationCFOTransaction);
//   };


// const { mutate: activationCOO, data: activationCOOData } = useSendTransaction();
// const activationCOOTx = () => {
//   const activationCCOTransaction = prepareContractCall({
//       contract: contractGovernorElection,
//       method: "function activationCOO()",
//     })
//     activationCOO(activationCCOTransaction);
//   };


// const { mutate: activationCTO, data: activationCTOData } = useSendTransaction();
// const activationCTOTx = () => {
//   const activationCTOTransaction = prepareContractCall({
//       contract: contractGovernorElection,
//       method: "function activationCTO()",
//     })
//     activationCTO(activationCTOTransaction);
//   };

// const { mutate: endElection, data: endElectionData } = useSendTransaction();
// const endElectionTx = () => {
//   const endElectionTransaction = prepareContractCall({
//       contract: contractGovernorElection,
//       method: "function endElection()",
//     })
//     endElection(endElectionTransaction);
//   };
  
// const { mutate: joinAsCandidate, data: joinAsCandidateData } = useSendTransaction();
// const joinAsCandidateTx = () => {
//   const joinAsCandidateTransaction = prepareContractCall({
//       contract: contractGovernorElection,
//       method: "function joinAsCandidate(string memory _ipfsLink, roleStatus _role)",
//       params: [CandidateIPFS, roleStatus],

//     })
//     joinAsCandidate(joinAsCandidateTransaction);
//   };

//   const { mutate: startElection, data: startElectionData } = useSendTransaction();
//   const startElectionTx = () => {
//     const startElectionTxTransaction = prepareContractCall({
//         contract: contractGovernorElection,
//         method: "function startElection()",
//       })
//       startElection(startElectionTxTransaction);
//     };

//   const { mutate: voteCEO, data: voteCEOData } = useSendTransaction();
//   const voteCEOTx = () => {
//     const voteCEOTransaction = prepareContractCall({
//         contract: contractGovernorElection,
//         method: "function voteCEO (address _candidate)",
//         params: [CandidateCEOAddress],
//       })
//       voteCEO(voteCEOTransaction);
//     };


//   const { mutate: voteCTO, data: voteCTOData } = useSendTransaction();
//   const voteCTOTx = () => {
//     const voteCTOTransaction = prepareContractCall({
//         contract: contractGovernorElection,
//         method: "function voteCTO (address _candidate)",
//         params: [CandidateCTOAddress],
//       })
//       voteCTO(voteCTOTransaction);
//     };


//   const { mutate: voteCFO, data: voteCFOData } = useSendTransaction();
//   const voteCFOTx = () => {
//     const voteCFOTransaction = prepareContractCall({
//         contract: contractGovernorElection,
//         method: "function voteCFO (address _candidate)",
//         params: [CandidateCFOAddress],
//       })
//       voteCFO(voteCFOTransaction);
//     };




//   const { mutate: voteCCO, data: voteCCOData } = useSendTransaction();
//   const voteCCOTx = () => {
//     const voteCCOTransaction = prepareContractCall({
//         contract: contractGovernorElection,
//         method: "function voteCCO (address _candidate)",
//         params: [CandidateCCOAddress],
//       })
//       voteCCO(voteCCOTransaction);
//     };
  

//   const { mutate: voteCOO, data: voteCOOData } = useSendTransaction();
//   const voteCOOTx = () => {
//     const voteCOOTransaction = prepareContractCall({
//         contract: contractGovernorElection,
//         method: "function voteCOO (address _candidate)",
//         params: [CandidateCCOAddress],
//       })
//       voteCOO(voteCOOTransaction);
//     };




//   const { data: viewCandidatesCEOArray, isLoading: viewCandidatesCEOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewCandidatesCEOArray() view public returns(address[5] memory)",
//   });

//   const { data: viewtopCandidatesCTOArray, isLoading: viewtopCandidatesCTOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewtopCandidatesCTOArray() view public returns(address[5] memory)",
//   });

//   const { data: viewCandidatesCFOArray, isLoading: viewCandidatesCFOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewCandidatesCFOArray() view public returns(address[5] memory)",
//   });

//   const { data: viewCandidatesCCOArray, isLoading: viewCandidatesCCOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewCandidatesCCOArray() view public returns(address[5] memory)",
//   });

//   const { data: viewCandidatesCOOArray, isLoading: viewCandidatesCOOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewCandidatesCOOArray() view public returns(address[5] memory)",
//   });

//   const { data: viewTopCandidatesCEOArray, isLoading: viewTopCandidatesCEOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewTopCandidatesCEOArray() view public returns(address[5] memory)",
//   });
//   const { data: viewTopCandidatesCTOArray, isLoading: viewTopCandidatesCTOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewTopCandidatesCTOArray() view public returns(address[5] memory)",
//   });
//   const { data: viewTopCandidatesCFOArray, isLoading: viewTopCandidatesCFOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewTopCandidatesCFOArray() view public returns(address[5] memory)",
//   });
//   const { data: viewTopCandidatesCCOArray, isLoading: viewTopCandidatesCCOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewTopCandidatesCCOArray() view public returns(address[5] memory)",
//   });
//   const { data: viewTopCandidatesCOOArray, isLoading: viewTopCandidatesCOOArrayLoad } = useReadContract({
//     contract: contractGovernorElection,
//     method: "function viewTopCandidatesCOOArray() view public returns(address[5] memory)",
//   });
// GuildBank Election // GuildBank Election // GuildBank Election
// GuildBank Election // GuildBank Election // GuildBank Election
// GuildBank Election // GuildBank Election // GuildBank Election





