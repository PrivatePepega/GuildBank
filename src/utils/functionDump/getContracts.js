
import {  client  } from "@/utils/thirdweb/client";
import {  chainById } from "@/utils/thirdweb/chains";
import { getContract } from "thirdweb";
import {contractAddresses, contractAddressesGame} from "@/utils/contractAddressHardhat"





export const contractPassport = getContract({
  client,
  address: contractAddresses.Passport,
  chain: chainById,
});

export const contractPassportFollow = getContract({
  client,
  address: contractAddresses.PassportFollowList,
  chain: chainById,
});

export const contractPassportFrens = getContract({
  client,
  address: contractAddresses.PassportFrenList,
  chain: chainById,
});
  
export const contractSourceDAO = getContract({
  client,
  address: contractAddresses.Source,
  chain: chainById,
});

export const contractMoneyDAO = getContract({
  client,
  address: contractAddresses.Money,
  chain: chainById,
});

export const contractGovernorElection = getContract({
  client,
  address: contractAddresses.GovernorElection,
  chain: chainById,
});

export const contractGovernorTreasury = getContract({
  client,
  address: contractAddresses.GovernorTreasury,
  chain: chainById,
});

export const contractBoD = getContract({
  client,
  address: contractAddresses.BoD,
  chain: chainById,
});

export const contractBoDTreasury = getContract({
  client,
  address: contractAddresses.BoDTreasury,
  chain: chainById,
});

export const contractDAOBurner = getContract({
  client,
  address: contractAddresses.Burner,
  chain: chainById,
});

export const contractBallot = getContract({
  client,
  address: contractAddresses.Ballot,
  chain: chainById,
});









export const gameContractSourceDAO = getContract({
  client,
  address: contractAddressesGame.Source,
  chain: chainById,
});

export const gameContractMoneyDAO = getContract({
  client,
  address: contractAddressesGame.Money,
  chain: chainById,
});

export const gameContractGovernorElection = getContract({
  client,
  address: contractAddressesGame.GovernorElection,
  chain: chainById,
});

export const gameContractGovernorTreasury = getContract({
  client,
  address: contractAddressesGame.GovernorTreasury,
  chain: chainById,
});

export const gameContractBoD = getContract({
  client,
  address: contractAddressesGame.BoD,
  chain: chainById,
});

export const gameContractBoDTreasury = getContract({
  client,
  address: contractAddressesGame.BoDTreasury,
  chain: chainById,
});

export const gameContractDAOBurner = getContract({
  client,
  address: contractAddressesGame.Burner,
  chain: chainById,
});

export const gameContractBallot = getContract({
  client,
  address: contractAddressesGame.Ballot,
  chain: chainById,
});