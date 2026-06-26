import twilio from 'twilio';

export async function POST(req) {
  try {
    const { phone } = await req.json();


    if (!phone) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }


    // TEMPORARY PROD DEBUG — remove after fixing
    const envCheck = {
      sid_present: !!process.env.TW_TWILIO_ACCOUNT_SID,
      sid_prefix: process.env.TW_TWILIO_ACCOUNT_SID?.substring(0, 6) ?? 'MISSING',
      token_present: !!process.env.TW_TWILIO_AUTH_TOKEN,
      service_present: !!process.env.TW_TWILIO_VERIFY_SERVICE_SID,
      service_prefix: process.env.TW_TWILIO_VERIFY_SERVICE_SID?.substring(0, 6) ?? 'MISSING',
      node_env: process.env.NODE_ENV,
    };

    // Return env check directly so we can see it in browser network tab
    if (phone === 'debug-env-check') {
      return Response.json({ envCheck }, { status: 200 });
    }




    if (!phone.startsWith('+') || phone.length < 8) {
      return Response.json({ 
        error: 'Phone must be in E.164 format (e.g. +1234567890)' 
      }, { status: 400 });
    }

 
    const client = twilio(
      process.env.TW_TWILIO_ACCOUNT_SID,
      process.env.TW_TWILIO_AUTH_TOKEN
    );

    console.log('Sending OTP to:', phone);

    await client.verify.v2
      .services(process.env.TW_TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ 
        to: phone, 
        channel: 'sms' 
      });

    console.log('OTP sent successfully');

    return Response.json({ success: true });

  } catch (error) {
    return Response.json({
      error: error.message,
      code: error.code,
      // TEMPORARY — remove after debugging
      envCheck: {
        sid_prefix: process.env.TWILIO_ACCOUNT_SID?.substring(0, 6) ?? 'MISSING',
        service_prefix: process.env.TWILIO_VERIFY_SERVICE_SID?.substring(0, 6) ?? 'MISSING',
        token_present: !!process.env.TWILIO_AUTH_TOKEN,
      }
    }, { status: 500 });
  }
}