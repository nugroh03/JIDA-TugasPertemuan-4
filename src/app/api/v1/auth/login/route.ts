import { NextResponse } from 'next/server';
import users from '../../../../../data/users.json';

/**
 * A real app would use a library like 'jsonwebtoken' and a proper secret key.
 * This is a dummy implementation for demonstration purposes.
 * The "token" is just a base64 encoded user object.
 */
const createDummyToken = (user: {
  id: number;
  name: string;
  email: string;
  role: string;
}) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

/**
 * @method POST
 * @description.
 */
export async function POST(request: Request) {
  try {
    console.log('start ');
    const body = await request.json();
    const { email, password } = body;

    console.log('start 1');
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }
    console.log('start 2');
    const user = users.find((u) => u.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Email atau password salah' },
        { status: 401 }
      );
    }
    console.log('start 3');
    const { ...userWithoutPassword } = user;
    const token = createDummyToken(userWithoutPassword);

    return NextResponse.json({
      message: 'Login berhasil',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
