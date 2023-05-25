import createClient from 'src/lib/supabase-server';
import Link from 'next/link';

import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between sm:px-6 lg:px-8">
        {user ? (
          <Link className="text-xl font-bold hover:text-gray-500" href="/dashboard">
            Todoist
          </Link>
        ) : (
          <Link className="text-xl font-bold hover:text-gray-500" href="/">
            Todoist
          </Link>
        )}
        <div className="flex items-center space-x-8">
          {user && (
            <Link href="/profile" className="font-semibold text-gray-600">
              Settings
            </Link>
          )}
          {user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
}
