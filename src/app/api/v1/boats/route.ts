import { NextResponse } from 'next/server';
import boats from '../../../../data/boats.json';
import { getAllBoats } from '../../../../lib/boats';

/**
 * @method GET
 * @description Mengambil semua data perahu.
 */
export async function GET() {
  const allBoats = getAllBoats();
  return NextResponse.json({
    statusCode: 200,
    message: 'Success',
    data: allBoats,
  });
}

/**
 * @method POST
 * @description Menambahkan data perahu baru (operasi in-memory).
 */
export async function POST(request: Request) {
  const newBoatData = await request.json();

  if (!newBoatData.name || !newBoatData.type || !newBoatData.price) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: 'Nama, tipe, dan harga perahu wajib diisi',
        data: null,
      },
      { status: 400 }
    );
  }

  // Generate a new ID for the boat
  const newId = boats.length > 0 ? Math.max(...boats.map((b) => b.id)) + 1 : 1;

  const newBoat = { id: newId, ...newBoatData };

  // Add the new boat to the in-memory array
  boats.push(newBoat);

  return NextResponse.json(
    {
      statusCode: 201, // Created
      message: 'Perahu baru berhasil dibuat',
      data: newBoat,
    },
    { status: 201 }
  );
}
