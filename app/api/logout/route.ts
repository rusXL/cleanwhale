import { clearTokenCookie } from '@/lib/auth';
import { error, success } from '@/lib/api-responses';

export async function POST() {
  try {
    // clear the auth token cookie server-side
    await clearTokenCookie();

    return success({ message: 'Logged out successfully' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return error(err.message);
  }
}
