import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Boat } from '@/types';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// Path ke file JSON
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'boats.json');

// Fungsi untuk membaca data dari file JSON
function readBoatsData() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading boats data:', error);
    return [];
  }
}

// Fungsi untuk menyimpan data ke file JSON
function writeBoatsData(data: Boat[]) {
  try {
    // Pastikan direktori data ada
    const dataDir = path.dirname(dataFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing boats data:', error);
    return false;
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const params = await context.params;
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

  const boats = readBoatsData();
  const boat = boats.find((b: Boat) => b.id === id);

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

  return NextResponse.json({
    statusCode: 200,
    message: `Perahu dengan id ${id} berhasil ditemukan`,
    data: boat,
  });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const params = await context.params;
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

  // Baca data terbaru dari file
  const boats = readBoatsData();
  const boatIndex = boats.findIndex((b: Boat) => b.id === id);

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

  try {
    const updatedData = await request.json();

    // Update data di array
    boats[boatIndex] = { ...boats[boatIndex], ...updatedData };

    // Simpan perubahan ke file JSON
    const saveSuccess = writeBoatsData(boats);

    if (!saveSuccess) {
      return NextResponse.json(
        {
          statusCode: 500,
          message: 'Gagal menyimpan perubahan ke database',
          data: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      statusCode: 200,
      message: `Perahu dengan id ${id} berhasil diperbarui`,
      data: boats[boatIndex],
    });
  } catch (error) {
    console.error('Error updating boat:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: 'Terjadi kesalahan saat memperbarui data',
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const params = await context.params;
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

  // Baca data terbaru dari file
  const boats = readBoatsData();
  const boatIndex = boats.findIndex((b: Boat) => b.id === id);

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

  try {
    // Hapus data dari array
    const deletedBoat = boats.splice(boatIndex, 1)[0];

    // Simpan perubahan ke file JSON
    const saveSuccess = writeBoatsData(boats);

    if (!saveSuccess) {
      return NextResponse.json(
        {
          statusCode: 500,
          message: 'Gagal menyimpan perubahan ke database',
          data: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      statusCode: 200,
      message: `Perahu dengan id ${id} berhasil dihapus`,
      data: deletedBoat,
    });
  } catch (error) {
    console.error('Error deleting boat:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: 'Terjadi kesalahan saat menghapus data',
        data: null,
      },
      { status: 500 }
    );
  }
}
