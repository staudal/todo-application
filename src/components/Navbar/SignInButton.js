'use client';

import Link from 'next/link';

export default function SignInButton() {
  return (
    <Link
      className="rounded bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
      href="/auth/signin"
    >
      Sign in
    </Link>
  );
}
