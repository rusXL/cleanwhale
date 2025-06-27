import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { signupSchema } from '@/lib/validations';
import { hashPassword } from '@/lib/auth';
import { error, success } from '@/lib/api-responses';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // validate request
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return error('Validation failed', 400);
    }
    const { name, email, password } = validationResult.data;

    // connect to db
    await dbConnect();

    // check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return error('User with this email already exists. Sign in instead', 409);
    }

    // create new user
    await User.create({
      name,
      email: email.toLowerCase(),
      password: await hashPassword(password),
    });

    return success(
      {
        message: 'Signup successful',
      },
      201
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return error(err.message);
  }
}
