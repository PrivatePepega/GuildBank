import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { NextResponse } from 'next/server';
import { prepareContractCall, sendTransaction } from 'thirdweb';
import { contractPassport } from '@/utils/functionDump/getContracts'; // Adjust import path to match your setup
import { privateKeyToAccount } from 'thirdweb/wallets';

const secretsManager = new SecretsManagerClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getSecrets() {
  try {
    const command = new GetSecretValueCommand({ SecretId: process.env.AWS_SECRET_ID });
    const data = await secretsManager.send(command);
    if ('SecretString' in data) return JSON.parse(data.SecretString);
    throw new Error('Secrets not found');
  } catch (err) {
    console.error('SecretsManager error:', { error: err.message });
    throw err;
  }
}

export async function POST(req) {
  try {
    console.log('Received POST request to /api/create-passport');

    // Parse JSON body
    const body = await req.json();
    const { userAddress, pfpCID, userNameCID, alias, statusMSG, checkTOS, minor, hash } = body;

    if (!userAddress || !pfpCID || !userNameCID || !alias || !statusMSG || checkTOS === undefined || minor === undefined || !hash) {
      console.error('Missing required params');
      return NextResponse.json({ error: 'Missing required params' }, { status: 400 });
    }
    console.log('Params parsed:', { userAddress, pfpCID, userNameCID, alias, statusMSG, checkTOS, minor, hash });

    // Fetch secrets
    const { SUPABASE_URL, SUPABASE_KEY, APP_SECRET, SERVER_WALLET_PASSWORD, RSA_PUBLIC, RSA_PRIVATE } = await getSecrets();

    if (!SERVER_WALLET_PASSWORD) {
      console.error('Missing server wallet private key');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    console.log('Wallet secret loaded');

    // Initialize server wallet account
    console.log('Initializing server wallet');
    const serverAccount = privateKeyToAccount({
      client: { clientId: process.env.THIRDWEB_CLIENT_ID },
      privateKey: SERVER_WALLET_PASSWORD,
    });
    console.log('Server wallet initialized:', serverAccount);

    // Prepare and send transaction
    console.log('Preparing createPassport transaction');
    const transaction = prepareContractCall({
      contract: contractPassport,
      method: 'function serverCreatePassport(address _user, string memory _profilePic, string memory _userName, string memory _handle, string memory _statusMSG, bool _TOS, bool _minor, string memory _password)',
      params: [userAddress, pfpCID, userNameCID, alias, statusMSG, checkTOS, minor, hash],
    });

    console.log('Sending transaction');
    const { transactionHash } = await sendTransaction({
      account: serverAccount,
      transaction,
    });
    console.log('Transaction successful:', transactionHash);

    return NextResponse.json({ success: true, transactionHash }, { status: 200 });
  } catch (err) {
    console.error('Create passport error:', err);
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}