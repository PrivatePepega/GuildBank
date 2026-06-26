import twilio from 'twilio';

export async function POST(req) {
  try {
    const { phone } = await req.json();


    if (!phone) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!phone.startsWith('+') || phone.length < 8) {
      return Response.json({ 
        error: 'Phone must be in E.164 format (e.g. +1234567890)' 
      }, { status: 400 });
    }

    // TEMPORARY — remove before committing
    if (phone) {
      return Response.json({
        error:  process.env.TWILIO_ACCOUNT_SID?.substring(0, 6),
        service: process.env.TWILIO_VERIFY_SERVICE_SID?.substring(0, 6),
      });
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    console.log('Sending OTP to:', phone);

    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ 
        to: phone, 
        channel: 'sms' 
      });

    console.log('OTP sent successfully');

    return Response.json({ success: true });

  } catch (error) {
    console.error('=== TWILIO FULL ERROR ===');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Full Error:', error);

    return Response.json({ 
      error: error.message || 'Failed to send OTP' 
    }, { status: 500 });
  }
}