import {contractPassport, contractPassportFollow, contractPassportFrens, contractSourceDAO, contractMoneyDAO, contractBoD, contractBoDTreasury, contractGovernorTreasury, contractGovernorElection } from "@/utils/functionDump/getContracts"


  // Source Stats   // Source Stats  // Source Stats
  // Source Stats   // Source Stats  // Source Stats
  // Source Stats  // Source Stats  // Source Stats

// get source address to display

const { mutate: delegateTx, data: delegateTxData } = useSendTransaction();
const delegatePerson = () => {
  const delegateTransaction = prepareContractCall({
      contract: contractSourceDAO,
      method: "function delegate(address delegatee)",
      params: delegateAccount,
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
    method: "function amountPerMint() returns(uint256)",
  });

  const { data: balanceOfSource, isLoading: sourceLoadSoure } = useReadContract({
    contract: contractSourceDAO,
    method: "function balanceOf (address account) returns (uint256)",
    params: [activeAccount ? activeAccount.address : null],
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


  // Source Stats   // Source Stats  // Source Stats
  // Source Stats   // Source Stats  // Source Stats
  // Source Stats  // Source Stats  // Source Stats











// money stats  // money stats  // money stats
// money stats  // money stats  // money stats
// money stats  // money stats  // money stats

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
    method: "function amountPerMint() returns(uint256)",
  });

  const { data: balanceOfMoney, isLoading: sourceLoadMoney } = useReadContract({
    contract: contractMoneyDAO,
    method: "function balanceOf (address account) returns (uint256)",
    params: [activeAccount ? activeAccount.address : null],
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
// money stats  // money stats  // money stats
// money stats  // money stats  // money stats
// money stats  // money stats  // money stats










// BoD Stats  // BoD Stats  // BoD Stats
// BoD Stats  // BoD Stats  // BoD Stats
// BoD Stats  // BoD Stats  // BoD Stats


const { mutate: challengeTx, data: challengeTxData } = useSendTransaction();
const onChallengeBoD = () => {
  const ChallengeTransaction = prepareContractCall({
      contract: contractBoD,
      method: "function challengeSenatorChair(uint8 index) returns (bool)",
      params: [ChallengerIndex],
    })
    challengeTx(ChallengeTransaction);
  };


const { mutate: forfeitTX, data: forfeitTXData } = useSendTransaction();
const forfeitChairTX = () => {
  const forfeitChairTXTransaction = prepareContractCall({
      contract: contractBoD,
      method: "function ForfeitChair(bool _Forfeit) public",
      params: [forfeiting],
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





const { mutate: sumbitTx, data: sumbitTxData } = useSendTransaction();
const SumbitTX = () => {
  const SubmitTXTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function submitTransaction(string memory _ipfsLink, address _to, string[] memory _tokenName, uint256[] memory _amount)",
      params: [ipftLinkTX, toTX, tokenNameTx, tokenAmountTx],
    })
    sumbitTx(SubmitTXTransaction);
  };

const { mutate: approveTx, data: approveTxData } = useSendTransaction();
const ApproveTx = () => {
  const ApproveTxTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function approveTransaction(uint256 TxId) txActive(TxId)",
      params: [TxId],
    })
    approveTx(ApproveTxTransaction);
  };


const { mutate: denyTx, data: denyTxData } = useSendTransaction();
const DenyTx = () => {
  const DenyTxTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function denyTransaction(uint256 TxId) txActive(TxId)",
      params: [TxId],
    })
    denyTx(DenyTxTransaction);
  };


const { mutate: executeTx, data: executeTxData } = useSendTransaction();
const ExecuteTx = () => {
  const ExecuteTxTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function executeTransaction(uint256 TxId, bytes calldata _data) txActive(TxId)",
      params: [TxId, "0x"],
    })
    executeTx(ExecuteTxTransaction);
  };

const { data: TxTicketMapping, isLoading: TxTicketMappingLoad } = useReadContract({
  contract: contractBoDTreasury,
  method: "function TxTicketMapping() returns(uint[] memory)",
  params: [TxId],
});

const { data: ActionTicketMapping, isLoading: ActionTicketMappingLoad } = useReadContract({
  contract: contractBoDTreasury,
  method: "function actionsMapping() returns(uint[] memory)",
  params: [TxId],
});




















const { mutate: DepositToBoDTreasury, data: DepositToBoDTreasuryData } = useSendTransaction();

const DepositToBoDTreasuryTx = () => {
  const DepositToBoDTreasuryTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function DepositToBoDTreasury(uint256 _amount, string memory _tokenName, bytes calldata _data)",
      params: [DepoBoDAmount, DepoBoDTokenName, "0x"],
    })
    DepositToBoDTreasury(DepositToBoDTreasuryTransaction);
  };







  const { mutate: submitAction, data: sumbitActionData } = useSendTransaction();
  const SubmitAction = () => {
    const SubmitActionTransaction = prepareContractCall({
        contract: contractBoDTreasury,
        method: "function submitAction(address _target, bytes memory _data, string memory _ipfsLink, bool _Tx, string[] memory _tokenName, uint256[] memory _tokenAmount)",
        params: [targetAction, "0x", ipfsAction, txActionBool, tokenNameAction, tokenAmountAction],
      })
      submitAction(SubmitActionTransaction);
    };



const { mutate: approveAction, data: approveActionData } = useSendTransaction();
const ApproveAction = () => {
  const ApproveActionTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function approveAction(uint _ActionId) actionActive(_ActionId)",
      params: [_ActionId],
    })
    approveAction(ApproveActionTransaction);
  };



const { mutate: denyActionTx, data: denyActionTxData } = useSendTransaction();
const DenyActionTx = () => {
  const DenyActionTransaction = prepareContractCall({
      contract: contractBoDTreasury,
      method: "function denyAction(uint _ActionId) actionActive(_ActionId)",
      params: [_ActionId],
    })
    denyActionTx(DenyActionTransaction);
  };

  const { mutate: executeActionTx, data: executeActionTxData } = useSendTransaction();
  const ExecuteActionTx = () => {
    const ExecuteActionTxTransaction = prepareContractCall({
        contract: contractBoDTreasury,
        method: "function executeAction(uint _ActionId) actionActive(_ActionId)",
        params: [_Actionid],
      })
      executeActionTx(ExecuteTxTransaction);
    };



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
      params: [burnDepoAmount, tokenNameBurnDepo, "0x"],
    })
    DepoBurnReward(DepoBurnRewardTransaction);
  };



  const { mutate: DepoDaoTreasury, data: DepoDaoTreasuryData } = useSendTransaction();
  const DepoDaoTreasuryTransactionTx = () => {
    const DepoDaoTreasuryTransaction = prepareContractCall({
        contract: contractGovernorTreasury,
        method: "function DepositToDaoTreasury(uint256 _amount, string memory _tokenName, bytes calldata _data)",
        params: [burnDepoAmount, tokenNameBurnDepo, "0x"],
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



const { mutate: activationCCO, data: activationCCOData } = useSendTransaction();
const activationCCOTx = () => {
  const activationCCOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCCO()",
    })
    activationCCO(activationCCOTransaction);
  };

const { mutate: activationCEO, data: activationCEOData } = useSendTransaction();
const activationCEOTx = () => {
  const activationCEOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCEO()",
    })
    activationCEO(activationCEOTransaction);
  };

const { mutate: activationCFO, data: activationCFOData } = useSendTransaction();
const activationCFOTx = () => {
  const activationCFOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCFO()",
    })
    activationCFO(activationCFOTransaction);
  };


const { mutate: activationCOO, data: activationCOOData } = useSendTransaction();
const activationCOOTx = () => {
  const activationCCOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCOO()",
    })
    activationCOO(activationCCOTransaction);
  };


const { mutate: activationCTO, data: activationCTOData } = useSendTransaction();
const activationCTOTx = () => {
  const activationCTOTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function activationCTO()",
    })
    activationCTO(activationCTOTransaction);
  };

const { mutate: endElection, data: endElectionData } = useSendTransaction();
const endElectionTx = () => {
  const endElectionTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function endElection()",
    })
    endElection(endElectionTransaction);
  };
  
const { mutate: joinAsCandidate, data: joinAsCandidateData } = useSendTransaction();
const joinAsCandidateTx = () => {
  const joinAsCandidateTransaction = prepareContractCall({
      contract: contractGovernorElection,
      method: "function joinAsCandidate(string memory _ipfsLink, roleStatus _role)",
      params: [CandidateIPFS, roleStatus],

    })
    joinAsCandidate(joinAsCandidateTransaction);
  };

  const { mutate: startElection, data: startElectionData } = useSendTransaction();
  const startElectionTx = () => {
    const startElectionTxTransaction = prepareContractCall({
        contract: contractGovernorElection,
        method: "function startElection()",
      })
      startElection(startElectionTxTransaction);
    };

  const { mutate: voteCEO, data: voteCEOData } = useSendTransaction();
  const voteCEOTx = () => {
    const voteCEOTransaction = prepareContractCall({
        contract: contractGovernorElection,
        method: "function voteCEO (address _candidate)",
        params: [CandidateCEOAddress],
      })
      voteCEO(voteCEOTransaction);
    };


  const { mutate: voteCTO, data: voteCTOData } = useSendTransaction();
  const voteCTOTx = () => {
    const voteCTOTransaction = prepareContractCall({
        contract: contractGovernorElection,
        method: "function voteCTO (address _candidate)",
        params: [CandidateCTOAddress],
      })
      voteCTO(voteCTOTransaction);
    };


  const { mutate: voteCFO, data: voteCFOData } = useSendTransaction();
  const voteCFOTx = () => {
    const voteCFOTransaction = prepareContractCall({
        contract: contractGovernorElection,
        method: "function voteCFO (address _candidate)",
        params: [CandidateCFOAddress],
      })
      voteCFO(voteCFOTransaction);
    };




  const { mutate: voteCCO, data: voteCCOData } = useSendTransaction();
  const voteCCOTx = () => {
    const voteCCOTransaction = prepareContractCall({
        contract: contractGovernorElection,
        method: "function voteCCO (address _candidate)",
        params: [CandidateCCOAddress],
      })
      voteCCO(voteCCOTransaction);
    };
  

  const { mutate: voteCOO, data: voteCOOData } = useSendTransaction();
  const voteCOOTx = () => {
    const voteCOOTransaction = prepareContractCall({
        contract: contractGovernorElection,
        method: "function voteCOO (address _candidate)",
        params: [CandidateCCOAddress],
      })
      voteCOO(voteCOOTransaction);
    };




  const { data: viewCandidatesCEOArray, isLoading: viewCandidatesCEOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewCandidatesCEOArray() view public returns(address[5] memory)",
  });

  const { data: viewtopCandidatesCTOArray, isLoading: viewtopCandidatesCTOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewtopCandidatesCTOArray() view public returns(address[5] memory)",
  });

  const { data: viewCandidatesCFOArray, isLoading: viewCandidatesCFOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewCandidatesCFOArray() view public returns(address[5] memory)",
  });

  const { data: viewCandidatesCCOArray, isLoading: viewCandidatesCCOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewCandidatesCCOArray() view public returns(address[5] memory)",
  });

  const { data: viewCandidatesCOOArray, isLoading: viewCandidatesCOOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewCandidatesCOOArray() view public returns(address[5] memory)",
  });

  const { data: viewTopCandidatesCEOArray, isLoading: viewTopCandidatesCEOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewTopCandidatesCEOArray() view public returns(address[5] memory)",
  });
  const { data: viewTopCandidatesCTOArray, isLoading: viewTopCandidatesCTOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewTopCandidatesCTOArray() view public returns(address[5] memory)",
  });
  const { data: viewTopCandidatesCFOArray, isLoading: viewTopCandidatesCFOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewTopCandidatesCFOArray() view public returns(address[5] memory)",
  });
  const { data: viewTopCandidatesCCOArray, isLoading: viewTopCandidatesCCOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewTopCandidatesCCOArray() view public returns(address[5] memory)",
  });
  const { data: viewTopCandidatesCOOArray, isLoading: viewTopCandidatesCOOArrayLoad } = useReadContract({
    contract: contractGovernorElection,
    method: "function viewTopCandidatesCOOArray() view public returns(address[5] memory)",
  });
// GuildBank Election // GuildBank Election // GuildBank Election
// GuildBank Election // GuildBank Election // GuildBank Election
// GuildBank Election // GuildBank Election // GuildBank Election







// Passport // Passport // Passport
// Passport // Passport // Passport
// Passport // Passport // Passport

const { data: viewPassport, isLoading: viewPassportLoad } = useReadContract({
  contract: contractPassport,
  method: "function viewPassport(address _user) returns(structPassport memory)",
  params: [userViewPassport],
});

const { data: viewSocialPassport, isLoading: viewSocialPassportLoad } = useReadContract({
  contract: contractPassport,
  method: "function viewSocialPassport(address _user) returns (structSocialPassport memory)",
  params: [userViewviewSocialPassport],
});


const { data: returnToS, isLoading: returnToSLoad } = useReadContract({
  contract: contractPassport,
  method: "function returnToS() returns(string memory)",
});

const { mutate: acceptToS, data: acceptToSData } = useSendTransaction();
const acceptTosTransactionTx = () => {
  const AcceptTosTransaction = prepareContractCall({
      contract: contractPassport,
      method: "function acceptToS()",
    })
    acceptToS(AcceptTosTransaction);
  };

const { mutate: deleteTx, data: deleteTxData } = useSendTransaction();
const DeleteTx = () => {
  const DeleteTxTransaction = prepareContractCall({
      contract: contractPassport,
      method: "function deletePassport()",
    })
    deleteTx(DeleteTxTransaction);
  };

const { mutate: changePFP, data: changePFPData } = useSendTransaction();
const changePFPTransactionTx = () => {
  const changePFPTransaction = prepareContractCall({
      contract: contractPassport,
      method: "function changePFP(string memory _profilePic)",
      params: [profilePic],
    })
    changePFP(changePFPTransaction);
  };

const { mutate: changeUserName, data: changeUserNameData } = useSendTransaction();
const changeUserNameTransactionTx = () => {
  const changeUserNameTransaction = prepareContractCall({
      contract: contractPassport,
      method: "function changeUserName(string memory _userName)",
      params: [userName],
    })
    changeUserName(changeUserNameTransaction);
  };

const { mutate: changeAlias, data: changeAliasData } = useSendTransaction();
const changeAliasTransactionTx = () => {
  const changeAliasTransaction = prepareContractCall({
      contract: contractPassport,
      method: "function changeAlias(string memory _userAlias)",
      params: [alias],
    })
    changeAlias(changeAliasTransaction);
  };

const { mutate: changeMSG, data: changeMSGData } = useSendTransaction();
const changeMSGTransactionTx = () => {
  const changeMSGTransaction = prepareContractCall({
      contract: contractPassport,
      method: "function changeMSG(string memory _msg)",
      params: [MSG],
    })
    changeMSG(changeMSGTransaction);
  };

const { mutate: createSocialPassport, data: createSocialPassportData } = useSendTransaction();
const createSocialPassportTransactionTx = () => {
  const createSocialPassportTransaction = prepareContractCall({
      contract: contractPassport,
      method: "function createSocialPassport(bytes memory _data)",
      params: [MSG],
    })
    createSocialPassport(createSocialPassportTransaction);
  };

  const { mutate: deleteSocialPassport, data: deleteSocialPassportData } = useSendTransaction();
  const deleteSocialPassportTransactionTx = () => {
    const deleteSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function deleteSocialPassport()",
      })
      deleteSocialPassport(deleteSocialPassportTransaction);
    };


  const { mutate: addEmail, data: addEmailData } = useSendTransaction();
  const addEmailTransactionTx = () => {
    const addEmailTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addEmail(string memory _email)",
        params: [newEmail],
      })
      addEmail(addEmailTransaction);
    };


  const { mutate: addDiscordSocialPassport, data: addDiscordSocialPassportData } = useSendTransaction();
  const addDiscordSocialPassportTransactionTx = () => {
    const addDiscordSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addDiscordSocialPassport(string memory _ipfsDiscord)",
        params: [newDiscord],
      })
      addDiscordSocialPassport(addDiscordSocialPassportTransaction);
    };
  

  const { mutate: addRedditSocialPassport, data: addRedditSocialPassportData } = useSendTransaction();
  const addRedditSocialPassportTransactionTx = () => {
    const addRedditSocialPassportPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addRedditSocialPassport(string memory _ipfsReddit)",
        params: [newReddit],
      })
      addRedditSocialPassport(addRedditSocialPassportPassportTransaction);
    };


  const { mutate: addTwitterSocialPassport, data: addTwitterSocialPassportData } = useSendTransaction();
  const addTwitterSocialPassportTransactionTx = () => {
    const addTwitterSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addTwitterSocialPassport(string memory _ipfsTwitter)",
        params: [newTwitter],
      })
      addTwitterSocialPassport(addTwitterSocialPassportTransaction);
    };


  const { mutate: addLinkTreeSocialPassport, data: addLinkTreeSocialPassportData } = useSendTransaction();
  const addLinkTreeSocialPassportTransactionTx = () => {
    const addLinkTreeSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addLinkTreeSocialPassport(string memory _ipfsLinkTree)",
        params: [newSocialLink],
      })
      addLinkTreeSocialPassport(addLinkTreeSocialPassportTransaction);
    };


  const { mutate: addStreamSocialPassport, data: addStreamSocialPassportData } = useSendTransaction();
  const addStreamSocialPassportTransactionTx = () => {
    const addStreamSocialPassportTransaction = prepareContractCall({
        contract: contractPassport,
        method: "function addStreamSocialPassport(string memory _ipfsStreamLink)",
        params: [newStreamLink],
      })
      addStreamSocialPassport(addStreamSocialPassportTransaction);
    };





// Passport // Passport // Passport
// Passport // Passport // Passport
// Passport // Passport // Passport







// PassportFollowList // PassportFollowList // PassportFollowList
// PassportFollowList // PassportFollowList // PassportFollowList
// PassportFollowList // PassportFollowList // PassportFollowList




const { data: viewFollowing, isLoading: viewFollowingLoad } = useReadContract({
  contract: contractPassportFollow,
  method: "function viewFollowing(address _user) returns(address[] memory)",
  params: [viewUserFollowing],
});


const { data: viewFollowers, isLoading: viewFollowersLoad } = useReadContract({
  contract: contractPassportFollow,
  method: "function viewFollowers(address _user) returns(address[] memory)",
  params: [viewUserFollowers],
});



const { mutate: followPerson, data: followPersonData } = useSendTransaction();
const followPersonTransactionTx = () => {
  const followPersonTransaction = prepareContractCall({
      contract: contractPassportFollow,
      method: "function followPerson(address _user)",
      params: [newFollowPerson],
    })
    followPerson(followPersonTransaction);
  };


const { mutate: unFollowPerson, data: unFollowPersonData } = useSendTransaction();
const unFollowPersonTransactionTx = () => {
  const unFollowPersonTransaction = prepareContractCall({
      contract: contractPassportFollow,
      method: "function unFollowPerson(address _user)",
      params: [newFollowPerson],
    })
    unFollowPerson(unFollowPersonTransaction);
  };




// PassportFollowList // PassportFollowList // PassportFollowList
// PassportFollowList // PassportFollowList // PassportFollowList
// PassportFollowList // PassportFollowList // PassportFollowList










// Passport FrenList // Passport FrenList // Passport FrenList
// Passport FrenList // Passport FrenList // Passport FrenList
// Passport FrenList // Passport FrenList // Passport FrenList



const { data: viewFrenList, isLoading: viewFrenListLoad } = useReadContract({
  contract: contractPassportFrens,
  method: "function viewFrenList(address _user) returns (address[] memory)",
  params: [viewUserFrenList],
});

const { data: viewFrenRequestList, isLoading: viewFrenRequestListLoad } = useReadContract({
  contract: contractPassportFrens,
  method: "function viewFrenRequestList(address _user) returns (address[] memory)",
  params: [viewUserFrenRequest],
});


const { mutate: openCloseFrenList, data: openCloseFrenListData } = useSendTransaction();
const openCloseFrenListTransactionTx = () => {
  const openCloseFrenListTransaction = prepareContractCall({
      contract: contractPassportFrens,
      method: "function openCloseFrenList()",
    })
    openCloseFrenList(openCloseFrenListTransaction);
  };


const { mutate: sendFrenRequest, data: sendFrenRequestData } = useSendTransaction();
const sendFrenRequestTransactionTx = () => {
  const sendFrenRequestTransaction = prepareContractCall({
      contract: contractPassportFrens,
      method: "function sendFrenRequest(address _to)",
    })
    sendFrenRequest(sendFrenRequestTransaction);
  };


const { mutate: acceptFrenRequest, data: acceptFrenRequestData } = useSendTransaction();
const acceptFrenRequestTransactionTx = () => {
  const acceptFrenRequestTransaction = prepareContractCall({
      contract: contractPassportFrens,
      method: "function acceptFrenRequest(address _from)",
      params: [acceptFrenFrom],
    })
    acceptFrenRequest(acceptFrenRequestTransaction);
  };


const { mutate: declineFrenRequest, data: declineFrenRequestData } = useSendTransaction();
const declineFrenRequestTransactionTx = () => {
  const declineFrenRequestTransaction = prepareContractCall({
      contract: contractPassportFrens,
      method: "function declineFrenRequest(address _from)",
      params: [declineFrenFrom],
    })
    declineFrenRequest(declineFrenRequestTransaction);
  };


const { mutate: removeFren, data: removeFrenData } = useSendTransaction();
const removeFrenTransactionTx = () => {
  const removeFrenTransaction = prepareContractCall({
      contract: contractPassportFrens,
      method: "function removeFren(address _user)",
      params: [removeFrenUser],
    })
    removeFren(removeFrenTransaction);
  };



// Passport FrenList // Passport FrenList // Passport FrenList
// Passport FrenList // Passport FrenList // Passport FrenList
// Passport FrenList // Passport FrenList // Passport FrenList






