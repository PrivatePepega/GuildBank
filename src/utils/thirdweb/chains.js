import { base, baseSepolia, defineChain } from "thirdweb/chains";
 
export const Base = base;
export const BaseSepolia = baseSepolia;

const chain = defineChain({
  id: 31337,
  rpc: "http://127.0.0.1:8545/"
})


export const chainById = chain;