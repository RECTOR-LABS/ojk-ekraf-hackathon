import { NextRequest, NextResponse } from 'next/server';
import { PinataSDK } from 'pinata';

// Initialize Pinata SDK with secure server-side JWT
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT, // Server-side only (no NEXT_PUBLIC prefix)
  pinataGateway: process.env.PINATA_GATEWAY,
});

/**
 * POST /api/upload-json - Upload JSON data to IPFS via Pinata (Server-side)
 *
 * Security: JWT is kept server-side and never exposed to browser
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, name = 'metadata.json' } = body;

    if (!data) {
      return NextResponse.json(
        { error: 'No data provided' },
        { status: 400 }
      );
    }

    // Upload JSON to Pinata
    const upload = await (pinata.upload as any).json(data, {
      metadata: {
        name,
      },
    });

    const ipfsHash = upload.IpfsHash;
    const gatewayUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${ipfsHash}`;

    return NextResponse.json({
      ipfsHash,
      gatewayUrl,
    });
  } catch (error) {
    console.error('IPFS JSON upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload JSON to IPFS' },
      { status: 500 }
    );
  }
}
