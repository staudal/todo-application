'use client';

import Link from 'next/link';
import { useState } from 'react';
import supabase from 'src/lib/supabase-browser';

export default function Page() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [email, setEmail] = useState('');

  async function resetPassword(evt) {
    evt.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Password reset instructions sent.');
    }
  }

  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold text-gray-900 md:text-2xl">
              Forgot your password?
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={resetPassword}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                  placeholder="name@company.com"
                  required
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Send instructions
              </button>
              <p className="text-center text-sm text-gray-500">
                Remember your password?{' '}
                <Link
                  href="/auth/signin"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
      {successMsg && <div className="text-center text-black">{successMsg}</div>}
    </>
  );
}
