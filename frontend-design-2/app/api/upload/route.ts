import { NextRequest, NextResponse } from 'next/server';

// Server-side only - PINATA_JWT is hidden from client
const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export async function POST(req: NextRequest) {
  try {
    if (!PINATA_JWT) {
      return NextResponse.json(
        { error: 'IPFS configuration missing' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Prepare Pinata form data
    const pinataFormData = new FormData();
    pinataFormData.append('file', file);

    // Add metadata if provided
    const pinataMetadata = formData.get('pinataMetadata');
    if (pinataMetadata) {
      pinataFormData.append('pinataMetadata', pinataMetadata as string);
    }

    const pinataOptions = formData.get('pinataOptions');
    if (pinataOptions) {
      pinataFormData.append('pinataOptions', pinataOptions as string);
    }

    // Upload to Pinata
    const response = await fetch(PINATA_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: pinataFormData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Pinata upload failed:', errorData);
      return NextResponse.json(
        { error: 'IPFS upload failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Metadata upload endpoint
export async function PUT(req: NextRequest) {
  try {
    if (!PINATA_JWT) {
      return NextResponse.json(
        { error: 'IPFS configuration missing' },
        { status: 500 }
      );
    }

    const body = await req.json();

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Pinata JSON upload failed:', errorData);
      return NextResponse.json(
        { error: 'Metadata upload failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Metadata upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
