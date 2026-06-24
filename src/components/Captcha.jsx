// components/Turnstile.jsx
'use client';
import { useEffect, useRef } from 'react';

export default function Turnstile({ onVerify }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.turnstile) return;
    window.turnstile.render(ref.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      callback: (token) => onVerify(token),
    });
  }, []);

  return (
    <>
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div ref={ref} />
    </>
  );
}