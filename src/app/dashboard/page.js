import createClient from 'src/lib/supabase-server';
import { redirect } from 'next/navigation';

import SignedIn from '../../components/Home/SignedIn.js';

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return <SignedIn />;
}
