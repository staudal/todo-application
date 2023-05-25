import { AuthProvider } from 'src/components/AuthProvider';
import createClient from 'src/lib/supabase-server';

import Navbar from '../components/Navbar/Navbar.js';

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider accessToken={accessToken}>
          <Navbar />
          <main>
            <div className="mx-auto max-w-7xl sm:p-6 lg:p-8">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
