import { PinataSDK } from 'pinata';

// Initialize Pinata SDK
export const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

/**
 * Upload a file to IPFS via Pinata
 * @param file - The file to upload
 * @param metadata - Optional metadata to attach to the upload
 * @returns IPFS hash (CID) and gateway URL
 */
export async function uploadFileToIPFS(
  file: File,
  metadata?: Record<string, any>
): Promise<{
  ipfsHash: string;
  gatewayUrl: string;
}> {
  try {
    // Upload file to Pinata
    const upload = await (pinata.upload as any).file(file, {
      metadata: {
        name: file.name,
        keyvalues: metadata || {},
      }
    });

    const ipfsHash = upload.IpfsHash;
    const gatewayUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${ipfsHash}`;

    return {
      ipfsHash,
      gatewayUrl,
    };
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw new Error('Failed to upload file to IPFS');
  }
}

/**
 * Upload JSON data to IPFS via Pinata
 * @param data - JSON data to upload
 * @param name - Name for the JSON file
 * @returns IPFS hash (CID) and gateway URL
 */
export async function uploadJSONToIPFS(
  data: Record<string, any>,
  name: string = 'metadata.json'
): Promise<{
  ipfsHash: string;
  gatewayUrl: string;
}> {
  try {
    // Upload JSON to Pinata
    const upload = await (pinata.upload as any).json(data, {
      metadata: {
        name,
      }
    });

    const ipfsHash = upload.IpfsHash;
    const gatewayUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${ipfsHash}`;

    return {
      ipfsHash,
      gatewayUrl,
    };
  } catch (error) {
    console.error('IPFS JSON upload error:', error);
    throw new Error('Failed to upload JSON to IPFS');
  }
}

/**
 * Get IPFS gateway URL from hash
 * @param ipfsHash - The IPFS hash (CID)
 * @returns Gateway URL
 */
export function getIPFSGatewayUrl(ipfsHash: string): string {
  // Remove ipfs:// prefix if present
  const hash = ipfsHash.replace('ipfs://', '');
  return `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${hash}`;
}

/**
 * Convert gateway URL to ipfs:// URI
 * @param gatewayUrl - The gateway URL
 * @returns IPFS URI (ipfs://...)
 */
export function gatewayUrlToIPFSUri(gatewayUrl: string): string {
  const match = gatewayUrl.match(/\/ipfs\/([a-zA-Z0-9]+)/);
  if (match && match[1]) {
    return `ipfs://${match[1]}`;
  }
  return gatewayUrl;
}
