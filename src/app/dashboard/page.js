import SignedIn from '@/components/Home/SignedIn';
import createClient from 'src/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  if (user) {
    return <SignedIn />;
  }
}
