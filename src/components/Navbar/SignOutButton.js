'use client';

import { useAuth } from '../AuthProvider';

export default function SignOutButton() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
    >
      Log out
    </button>
  );
}
