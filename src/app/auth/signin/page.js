'use client';

import { useRouter } from 'next/navigation';
import supabase from 'src/lib/supabase-browser';

import { useAuth } from 'src/components/AuthProvider';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn(evt) {
    evt.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={signIn}>
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
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                  required
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Sign in
              </button>
              <p className="text-center text-sm text-gray-500">
                Don’t have an account yet?{' '}
                <Link
                  href="/auth/signup"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
    </>
  );
}
