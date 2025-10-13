'use client';

import { useState, useCallback, useRef } from 'react';
import { Spinner } from '@/components/ui';

interface FileUploadProps {
  onFileSelected: (file: File, contentHash: string) => void;
  onFileRemoved: () => void;
  acceptedTypes?: string[];
  maxSizeMB?: number;
}

export function FileUpload({
  onFileSelected,
  onFileRemoved,
  acceptedTypes = ['image/*', 'audio/*', 'video/*', 'application/pdf', '.doc', '.docx', '.txt', '.psd', '.ai', '.fig'],
  maxSizeMB = 100,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHashing, setIsHashing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate SHA-256 hash from file
  const generateFileHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `0x${hashHex}`;
  };

  // Validate file
  const validateFile = (file: File): string | null => {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    // Check file type
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    const isAccepted = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileName.endsWith(type);
      }
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        return fileType.startsWith(category);
      }
      return fileType === type;
    });

    if (!isAccepted) {
      return 'File type not supported';
    }

    return null;
  };

  // Handle file selection
  const handleFile = useCallback(async (file: File) => {
    setError(null);

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    // Generate content hash
    setIsHashing(true);
    try {
      const hash = await generateFileHash(file);
      onFileSelected(file, hash);
    } catch (err) {
      setError('Failed to generate content hash');
      console.error('Hash generation error:', err);
    } finally {
      setIsHashing(false);
    }
  }, [onFileSelected]);

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  // Handle remove file
  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemoved();
  }, [onFileRemoved]);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Get file type icon
  const getFileIcon = (file: File): string => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('audio/')) return '🎵';
    if (file.type.startsWith('video/')) return '🎬';
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('document') || file.type.includes('text')) return '📝';
    return '📎';
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        /* Upload Area */
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
            ${isDragging
              ? 'border-primary-500 bg-primary-50 scale-105'
              : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            accept={acceptedTypes.join(',')}
            className="hidden"
          />

          {/* Upload Icon */}
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          {/* Upload Text */}
          <div>
            <p className="text-lg font-semibold text-neutral-900 mb-2">
              {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
            </p>
            <p className="text-neutral-600 mb-4">or click to browse</p>
            <p className="text-sm text-neutral-500">
              Supported: Images, Audio, Video, Documents, Design files
              <br />
              Max size: {maxSizeMB}MB
            </p>
          </div>
        </div>
      ) : (
        /* Selected File Preview */
        <div className="border-2 border-primary-200 rounded-xl p-6 bg-primary-50">
          <div className="flex items-start gap-4">
            {/* File Icon/Preview */}
            <div className="flex-shrink-0">
              {preview ? (
                <img
                  src={preview}
                  alt="File preview"
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-24 h-24 bg-neutral-200 rounded-lg flex items-center justify-center text-4xl">
                  {getFileIcon(selectedFile)}
                </div>
              )}
            </div>

            {/* File Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900 truncate mb-1">
                    {selectedFile.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'}
                  </p>
                  {isHashing && (
                    <div className="flex items-center gap-2 text-sm text-primary-600">
                      <Spinner size="small" color="primary" />
                      <span>Generating content hash...</span>
                    </div>
                  )}
                  {!isHashing && (
                    <div className="flex items-center gap-2 text-sm text-success-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">File ready for upload</span>
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={handleRemoveFile}
                  className="ml-4 p-2 text-neutral-500 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                  title="Remove file"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-error-50 border border-error-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-error-900">Upload Error</p>
            <p className="text-sm text-error-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
