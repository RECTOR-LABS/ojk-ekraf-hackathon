import { NextRequest, NextResponse } from 'next/server';
import { PinataSDK } from 'pinata';

// Initialize Pinata SDK with secure server-side JWT
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT, // Server-side only (no NEXT_PUBLIC prefix)
  pinataGateway: process.env.PINATA_GATEWAY,
});

/**
 * POST /api/upload - Upload files to IPFS via Pinata (Server-side)
 *
 * Security: JWT is kept server-side and never exposed to browser
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const metadata = formData.get('metadata');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Parse metadata if provided
    let parsedMetadata: Record<string, any> = {};
    if (metadata) {
      try {
        parsedMetadata = JSON.parse(metadata as string);
      } catch {
        return NextResponse.json(
          { error: 'Invalid metadata format' },
          { status: 400 }
        );
      }
    }

    // Upload file to Pinata
    const upload = await (pinata.upload as any).file(file, {
      metadata: {
        name: file.name,
        keyvalues: parsedMetadata,
      },
    });

    const ipfsHash = upload.IpfsHash;
    const gatewayUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${ipfsHash}`;

    return NextResponse.json({
      ipfsHash,
      gatewayUrl,
    });
  } catch (error) {
    console.error('IPFS upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file to IPFS' },
      { status: 500 }
    );
  }
}
