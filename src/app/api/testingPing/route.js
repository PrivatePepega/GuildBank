import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export async function GET(req) {
  try {
    // Check env vars first
    const envCheck = {
      upstash_url_present: !!process.env.UPSTASH_REDIS_REST_URL,
      upstash_token_present: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      upstash_url_prefix: process.env.UPSTASH_REDIS_REST_URL?.substring(0, 15) ?? 'MISSING',
    };

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 m'),
    });

    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success, limit, remaining, reset } = await limiter.limit(`test_${ip}`);

    return Response.json({
      success,
      envCheck,
      rateLimitInfo: {
        limit,
        remaining,
        reset: new Date(reset).toISOString(),
      },
      message: success ? 'Rate limit OK' : 'Rate limit exceeded',
    }, { status: success ? 200 : 429 });

  } catch (error) {
    return Response.json({
      error: error.message,
      envCheck: {
        upstash_url_present: !!process.env.UPSTASH_REDIS_REST_URL,
        upstash_token_present: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      }
    }, { status: 500 });
  }
}