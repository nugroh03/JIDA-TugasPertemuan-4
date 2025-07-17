import { NextResponse } from 'next/server';
import { getBoatById } from '../../../../../lib/boats';
import boats from '../../../../../data/boats.json';
import { NextRequest } from 'next/server';

type RouteContext = {
  params: {
    id: string;
  };
};

/**
 * @method GET
 * @description Mengambil data perahu berdasarkan ID.
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  const params = await context.params; // ✅ Await params dulu
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: 'Format ID tidak valid',
        data: null,
      },
      { status: 400 }
    );
  }

  const boat = getBoatById(id);

  if (!boat) {
    return NextResponse.json(
      {
        statusCode: 404,
        message: `Perahu dengan id ${id} tidak ditemukan`,
        data: null,
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      statusCode: 200,
      message: 'Success',
      data: boat,
    },
    { status: 201 }
  );
}

/**
 * @method PUT
 * @description Memperbarui data perahu berdasarkan ID (operasi in-memory).
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  const params = await context.params; // ✅ Await params dulu
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: 'Format ID tidak valid',
        data: null,
      },
      { status: 400 }
    );
  }

  const boatIndex = boats.findIndex((b) => b.id === id);

  if (boatIndex === -1) {
    return NextResponse.json(
      {
        statusCode: 404,
        message: `Perahu dengan id ${id} tidak ditemukan`,
        data: null,
      },
      { status: 404 }
    );
  }

  const updatedData = await request.json();
  boats[boatIndex] = { ...boats[boatIndex], ...updatedData };

  return NextResponse.json({
    statusCode: 200,
    message: `Perahu dengan id ${id} berhasil diperbarui`,
    data: boats[boatIndex],
  });
}

/**
 * @method DELETE
 * @description Menghapus data perahu berdasarkan ID (operasi in-memory).
 */
export async function DELETE(_request: NextRequest, context: RouteContext) {
  const params = await context.params; // ✅ Await params dulu
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: 'Format ID tidak valid',
        data: null,
      },
      { status: 400 }
    );
  }

  const boatIndex = boats.findIndex((b) => b.id === id);

  if (boatIndex === -1) {
    return NextResponse.json(
      {
        statusCode: 404,
        message: `Perahu dengan id ${id} tidak ditemukan`,
        data: null,
      },
      { status: 404 }
    );
  }

  const deletedBoat = boats.splice(boatIndex, 1);

  return NextResponse.json({
    statusCode: 200,
    message: `Perahu dengan id ${id} berhasil dihapus`,
    data: deletedBoat[0],
  });
}
