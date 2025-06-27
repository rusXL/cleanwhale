import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getTokenFromCookies, verifyToken } from '@/lib/auth';
import { error, success } from '@/lib/api-responses';

export async function GET() {
  try {
    // get token from cookies of request
    const token = await getTokenFromCookies();

    if (!token) {
      return error('No token provided', 401);
    }

    // verify token
    const payload = verifyToken(token);
    if (!payload) {
      return error('Invalid or expired token', 401);
    }

    // connect to db
    await dbConnect();

    // find user (can be found by email as well)
    const user = await User.findById(payload.userId).select('-password');
    if (!user) {
      return error('User not found', 404);
    }

    // return user data
    return success({
      user: {
        name: user.name,
        email: user.email,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return error(err.message);
  }
}
