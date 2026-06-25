'use client';
import { Turnstile } from '@marsidev/react-turnstile';

export default function TurnstileWidget({ onVerify }) {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      onSuccess={(token) => onVerify(token)}
    />
  );
}