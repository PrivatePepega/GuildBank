// Contracts
import { useRouter } from 'next/navigation';
import { useReadContract } from "thirdweb/react";

/**
 * Custom hook to check the user's passport balance and redirect if necessary.
 * @param {object} contractPassport - The contract object.
 */
export function useCheckSocial(contractPassport, account) {
  const router = useRouter();
  const { data: passportBalance, isLoading } = useReadContract({
    contract: contractPassport,
    method: "function balanceOf(address account, uint256 id) returns (uint256)",
    params: [account ? account.address : null, 1n],
  });

  // Redirect if no balance or no active account
  // if (!isLoading && (Number(passportBalance) === 0 || !account)) {
  //   router.push("/");
  // }

  return { passportBalance, isLoading };
}