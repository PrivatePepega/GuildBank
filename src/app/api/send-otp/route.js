import twilio from 'twilio';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';



export async function POST(req) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!phone.startsWith('+') || phone.length < 8) {
      return Response.json({ error: 'Phone must be in E.164 format e.g. +1234567890' }, { status: 400 });
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

    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID } = await getSecrets();

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_VERIFY_SERVICE_SID) {
      return Response.json({ error: 'Twilio configuration missing' }, { status: 500 });
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Send OTP error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}