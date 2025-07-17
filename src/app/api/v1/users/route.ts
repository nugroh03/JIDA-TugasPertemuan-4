import { NextResponse } from 'next/server';
import users from '../../../../data/users.json';

/**
 * @method GET
 * @description Mengambil semua data pengguna.
 */
export async function GET() {
  // Dalam aplikasi nyata, jangan pernah mengirim password ke client.
  const usersWithoutPassword = users.map(({ ...user }) => user);
  return NextResponse.json({
    statusCode: 200,
    message: 'Success',
    data: usersWithoutPassword,
  });
}

/**
 * @method POST
 * @description Menambahkan data pengguna baru (operasi in-memory).
 */
export async function POST(request: Request) {
  const newUserData = await request.json();

  if (!newUserData.name || !newUserData.email || !newUserData.password) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: 'Nama, email, dan password wajib diisi',
        data: null,
      },
      { status: 400 }
    );
  }

  const newId = Math.max(...users.map((u) => u.id)) + 1;
  const newUser = { id: newId, role: 'user', ...newUserData };

  users.push(newUser);

  const { ...userWithoutPassword } = newUser;

  return NextResponse.json(
    {
      statusCode: 201,
      message: 'Pengguna baru berhasil dibuat',
      data: userWithoutPassword,
    },
    { status: 201 }
  );
}
