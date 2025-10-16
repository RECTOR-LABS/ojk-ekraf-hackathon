/**
 * IPFS Upload utilities using Pinata
 */

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT!;
const PIN_FILE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PIN_JSON_URL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

export interface IPFSUploadResult {
  cid: string;
  size: number;
}

/**
 * Upload a file to IPFS via Pinata
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

    const response = await fetch(PIN_FILE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Pinata upload failed: ${error}`);
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
 * Upload JSON metadata to IPFS via Pinata
 */
export async function uploadJSONToIPFS(metadata: object): Promise<IPFSUploadResult> {
  try {
    const response = await fetch(PIN_JSON_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
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
      throw new Error(`Pinata JSON upload failed: ${error}`);
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
