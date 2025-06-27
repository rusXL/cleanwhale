import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { generateToken, setTokenCookie, verifyPassword } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { error, success } from '@/lib/api-responses';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // validate request
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return error('Validation failed', 400);
    }
    const { email, password } = validationResult.data;

    // connect to db
    await dbConnect();

    // find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return error('Invalid email or password', 401);
    }

    // verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return error('Invalid email or password', 401);
    }

    // generate JWT token
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    };
    const token = generateToken(tokenPayload);

    // set HTTP-only cookie
    await setTokenCookie(token);

    // return success response (without password)
    return success({
      message: 'Login successful',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return error(err.message);
  }
}
