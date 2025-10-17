/**
 * IPFS Upload utilities using Pinata (via secure API route)
 * Security: JWT is hidden on server-side, not exposed to client
 */

export interface IPFSUploadResult {
  cid: string;
  size: number;
}

/**
 * Upload a file to IPFS via Pinata (through Next.js API route)
 */
export async function uploadFileToIPFS(file: File): Promise<IPFSUploadResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    formData.append('pinataOptions', pinataOptions);

    // Use Next.js API route instead of direct Pinata API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`IPFS upload failed: ${error}`);
    }

    const data = await response.json();

    return {
      cid: data.IpfsHash,
      size: data.PinSize,
    };
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
}

/**
 * Upload JSON metadata to IPFS via Pinata (through Next.js API route)
 */
export async function uploadJSONToIPFS(metadata: object): Promise<IPFSUploadResult> {
  try {
    // Use Next.js API route instead of direct Pinata API
    const response = await fetch('/api/upload', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pinataContent: metadata,
        pinataMetadata: {
          name: 'Copyright Metadata',
        },
        pinataOptions: {
          cidVersion: 1,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Metadata upload failed: ${error}`);
    }

    const data = await response.json();

    return {
      cid: data.IpfsHash,
      size: data.PinSize,
    };
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
}
