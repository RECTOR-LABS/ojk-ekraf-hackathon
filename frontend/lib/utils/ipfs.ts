/**
 * Upload a file to IPFS via Pinata (through secure API route)
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
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload file');
    }

    const result = await response.json();
    return {
      ipfsHash: result.ipfsHash,
      gatewayUrl: result.gatewayUrl,
    };
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw new Error('Failed to upload file to IPFS');
  }
}

/**
 * Upload JSON data to IPFS via Pinata (through secure API route)
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
    const response = await fetch('/api/upload-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload JSON');
    }

    const result = await response.json();
    return {
      ipfsHash: result.ipfsHash,
      gatewayUrl: result.gatewayUrl,
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
