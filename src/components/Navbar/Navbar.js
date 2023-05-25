import createClient from 'src/lib/supabase-server';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import Link from 'next/link';

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="navbar py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between sm:px-6 lg:px-8">
        <Link className="text-xl font-bold hover:text-gray-500" href="/">
          Todoist
        </Link>
        <div className="flex items-center space-x-8">
          <Link className="hover:text-gray-500" href="/">
            Dashboard
          </Link>
          <Link className="hover:text-gray-500" href="/profile">
            Profile
          </Link>
        </div>
        <div className="flex items-center">
          {user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
}
