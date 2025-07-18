// import { NextResponse } from 'next/server';
// import boats from '../../../../data/boats.json';
// import { getAllBoats } from '../../../../lib/boats';

// /**
//  * @method GET
//  * @description Mengambil semua data perahu.
//  */
// export async function GET() {
//   const allBoats = getAllBoats();
//   return NextResponse.json({
//     statusCode: 200,
//     message: 'Success',
//     data: allBoats,
//   });
// }

// /**
//  * @method POST
//  * @description Menambahkan data perahu baru (operasi in-memory).
//  */
// export async function POST(request: Request) {
//   const newBoatData = await request.json();

//   if (!newBoatData.name || !newBoatData.type || !newBoatData.price) {
//     return NextResponse.json(
//       {
//         statusCode: 400,
//         message: 'Nama, tipe, dan harga perahu wajib diisi',
//         data: null,
//       },
//       { status: 400 }
//     );
//   }

//   // Generate a new ID for the boat
//   const newId = boats.length > 0 ? Math.max(...boats.map((b) => b.id)) + 1 : 1;

//   const newBoat = { id: newId, ...newBoatData };

//   // Add the new boat to the in-memory array
//   boats.push(newBoat);

//   return NextResponse.json(
//     {
//       statusCode: 201, // Created
//       message: 'Perahu baru berhasil dibuat',
//       data: newBoat,
//     },
//     { status: 201 }
//   );
// }

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Boat } from '@/types';

// Path ke file JSON
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'boats.json');

// Fungsi untuk membaca data dari file JSON
function readBoatsData() {
  try {
    // Cek apakah file ada
    if (!fs.existsSync(dataFilePath)) {
      console.log('File boats.json tidak ditemukan, membuat file baru...');
      // Buat direktori jika belum ada
      const dataDir = path.dirname(dataFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      // Buat file dengan array kosong
      fs.writeFileSync(dataFilePath, '[]', 'utf8');
      return [];
    }

    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading boats data:', error);
    // Jika terjadi error parsing JSON, return array kosong
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

// GET - Ambil semua data kapal
export async function GET() {
  try {
    const boats = readBoatsData();

    return NextResponse.json({
      statusCode: 200,
      message: 'Data kapal berhasil diambil',
      data: boats,
    });
  } catch (error) {
    console.error('Error in GET /api/v1/boats:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: 'Terjadi kesalahan saat mengambil data kapal',
        data: null,
      },
      { status: 500 }
    );
  }
}

// POST - Tambah kapal baru
export async function POST(request: NextRequest) {
  try {
    const newBoatData = await request.json();

    // Validasi data yang wajib ada
    if (!newBoatData.name || !newBoatData.type || !newBoatData.description) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: 'Nama kapal, tipe, dan deskripsi wajib diisi',
          data: null,
        },
        { status: 400 }
      );
    }

    // Baca data yang sudah ada
    const boats = readBoatsData();

    // Generate ID baru (ambil ID tertinggi + 1)
    const newId =
      boats.length > 0
        ? Math.max(...boats.map((boat: Boat) => boat.id)) + 1
        : 1;

    // Buat objek kapal baru dengan ID
    const newBoat = {
      id: newId,
      ...newBoatData,
      // Pastikan priceNum ada
      priceNum: newBoatData.priceNum || 0,
      // Set default values jika tidak ada
      rating: newBoatData.rating || 4.0,
      reviews: newBoatData.reviews || 0,
      category: newBoatData.category || 'wisata',
    };

    // Tambahkan kapal baru ke array
    boats.push(newBoat);

    // Simpan ke file JSON
    const saveSuccess = writeBoatsData(boats);

    if (!saveSuccess) {
      return NextResponse.json(
        {
          statusCode: 500,
          message: 'Gagal menyimpan data kapal ke database',
          data: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      statusCode: 201,
      message: 'Kapal baru berhasil ditambahkan',
      data: newBoat,
    });
  } catch (error) {
    console.error('Error in POST /api/v1/boats:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: 'Terjadi kesalahan saat menambah kapal baru',
        data: null,
      },
      { status: 500 }
    );
  }
}
