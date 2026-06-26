import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import crypto from 'crypto';



export async function POST(req) {
  try {
    const { phone, otp, wallet } = await req.json();

    if (!phone || !otp || !wallet) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }


    async function getSecrets() {
      const secretsManager = new SecretsManagerClient({
        region: 'us-east-1',
        credentials: {
          accessKeyId: process.env.GB_ACCESS_KEY_ID,
          secretAccessKey: process.env.GB_SECRET_ACCESS_KEY,
        },
      });
      const command = new GetSecretValueCommand({ SecretId: process.env.GB_SECRET_ID });
      const data = await secretsManager.send(command);
      if ('SecretString' in data) return JSON.parse(data.SecretString);
      throw new Error('Secrets not found');
    }
    

    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_VERIFY_SERVICE_SID,
      SUPABASE_URL,
      SUPABASE_KEY,
    } = await getSecrets();

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const result = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code: otp });

    if (result.status !== 'approved') {
      return Response.json({ error: 'Invalid or expired code' }, { status: 400 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const phoneHash = crypto.createHash('sha256').update(phone).digest('hex');

    // Check phone not already tied to a different wallet
    const { data: existingPhone } = await supabase
      .from('wallets')
      .select('wallet')
      .eq('phone_hash', phoneHash)
      .single();

    if (existingPhone && existingPhone.wallet !== wallet) {
      return Response.json({ error: 'Phone already registered to another wallet' }, { status: 409 });
    }

    const { error } = await supabase
      .from('wallets')
      .upsert({ wallet, phone_hash: phoneHash, phone_verified: true }, { onConflict: 'wallet' });

    if (error) {
      return Response.json({ error: 'Failed to register wallet' }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Verify OTP error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}