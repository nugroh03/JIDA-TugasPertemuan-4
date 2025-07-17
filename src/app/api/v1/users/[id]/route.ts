import { NextResponse } from 'next/server';
import users from '../../../../../data/users.json';

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * @method GET
 * @description Mengambil data pengguna berdasarkan ID.
 */
export async function GET(request: Request, { params }: RouteParams) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      { statusCode: 400, message: 'Format ID tidak valid', data: null },
      { status: 400 }
    );
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json(
      {
        statusCode: 404,
        message: `Pengguna dengan id ${id} tidak ditemukan`,
        data: null,
      },
      { status: 404 }
    );
  }

  const { ...userWithoutPassword } = user;
  return NextResponse.json({
    statusCode: 200,
    message: 'Success',
    data: userWithoutPassword,
  });
}

/**
 * @method PUT
 * @description Memperbarui data pengguna berdasarkan ID (operasi in-memory).
 */
export async function PUT(request: Request, { params }: RouteParams) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      { statusCode: 400, message: 'Format ID tidak valid', data: null },
      { status: 400 }
    );
  }

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return NextResponse.json(
      {
        statusCode: 404,
        message: `Pengguna dengan id ${id} tidak ditemukan`,
        data: null,
      },
      { status: 404 }
    );
  }

  const updatedData = await request.json();
  users[userIndex] = { ...users[userIndex], ...updatedData };

  const { ...userWithoutPassword } = users[userIndex];
  return NextResponse.json({
    statusCode: 200,
    message: `Pengguna dengan id ${id} berhasil diperbarui`,
    data: userWithoutPassword,
  });
}

/**
 * @method DELETE
 * @description Menghapus data pengguna berdasarkan ID (operasi in-memory).
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      { statusCode: 400, message: 'Format ID tidak valid', data: null },
      { status: 400 }
    );
  }

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return NextResponse.json(
      {
        statusCode: 404,
        message: `Pengguna dengan id ${id} tidak ditemukan`,
        data: null,
      },
      { status: 404 }
    );
  }

  const [deletedUser] = users.splice(userIndex, 1);
  const { ...userWithoutPassword } = deletedUser;

  return NextResponse.json({
    statusCode: 200,
    message: `Pengguna dengan id ${id} berhasil dihapus`,
    data: userWithoutPassword,
  });
}
