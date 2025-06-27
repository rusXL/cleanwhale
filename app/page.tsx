import { redirect } from 'next/navigation';
import { getTokenFromCookies, verifyToken } from '@/lib/auth';

export default async function HomePage() {
  // check authentication server-side
  const token = await getTokenFromCookies();

  if (token && verifyToken(token)) {
    // user is authenticated, redirect to dashboard
    redirect('/dashboard');
  } else {
    // user is not authenticated, redirect to login
    redirect('/login');
  }
}
