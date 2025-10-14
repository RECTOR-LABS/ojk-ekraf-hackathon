'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { useRegistrationStore } from '@/lib/stores/registrationStore';
import { Upload, File, Image, Video, Music, FileText, X, Copy, Check } from 'lucide-react';

const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  document: ['application/pdf', 'text/plain', 'application/msword'],
};

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export function FileUploadStep() {
  const { file, fileHash, filePreviewUrl, setFile, nextStep } = useRegistrationStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isHashing, setIsHashing] = useState(false);
  const [error, setError] = useState('');
  const [hashCopied, setHashCopied] = useState(false);

  // Calculate SHA-256 hash
  const calculateHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  // Handle file selection
  const handleFileSelect = useCallback(
    async (selectedFile: File) => {
      setError('');

      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size must be less than 100MB');
        return;
      }

      // Validate file type
      const allAllowedTypes = Object.values(ALLOWED_FILE_TYPES).flat();
      if (!allAllowedTypes.includes(selectedFile.type)) {
        setError('File type not supported. Please upload an image, video, audio, or document file.');
        return;
      }

      setIsHashing(true);

      try {
        // Generate preview URL for images/videos
        let previewUrl = '';
        if (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/')) {
          previewUrl = URL.createObjectURL(selectedFile);
        }

        // Calculate SHA-256 hash
        const hash = await calculateHash(selectedFile);

        setFile(selectedFile, hash, previewUrl);
      } catch (err) {
        setError('Failed to process file. Please try again.');
        console.error(err);
      } finally {
        setIsHashing(false);
      }
    },
    [setFile]
  );

  // Drag & Drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [handleFileSelect]
  );

  // File input handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  // Copy hash to clipboard
  const copyHash = () => {
    if (fileHash) {
      navigator.clipboard.writeText(fileHash);
      setHashCopied(true);
      setTimeout(() => setHashCopied(false), 2000);
    }
  };

  // Remove file
  const removeFile = () => {
    setFile(null, '', '');
    setError('');
  };

  // Get file icon
  const getFileIcon = () => {
    if (!file) return Upload;
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('audio/')) return Music;
    return FileText;
  };

  const FileIcon = getFileIcon();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Upload Your File</h2>
        <p className="text-foreground/70">
          Select the creative work you want to register. Supported formats: images, videos, audio, and
          documents.
        </p>
      </div>

      {/* Drag & Drop Zone or File Preview */}
      {!file ? (
        <motion.div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
            isDragging
              ? 'border-purple-600 bg-purple-600/10'
              : 'border-foreground/20 hover:border-purple-600/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
          <h3 className="text-xl font-bold mb-2">Drop your file here</h3>
          <p className="text-foreground/60 mb-6">or click to browse</p>

          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={isHashing}
          />

          <GlassButton
            variant="primary"
            size="lg"
            disabled={isHashing}
            onClick={() => document.getElementById('file-upload')?.click()}
            type="button"
          >
            {isHashing ? 'Processing...' : 'Choose File'}
          </GlassButton>

          <p className="text-xs text-foreground/50 mt-4">Max file size: 100MB</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {/* File Preview */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              {/* Preview or Icon */}
              <div className="flex-shrink-0">
                {filePreviewUrl ? (
                  <div className="w-24 h-24 rounded-xl overflow-hidden">
                    {file.type.startsWith('image/') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={filePreviewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video src={filePreviewUrl} className="w-full h-full object-cover" />
                    )}
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <FileIcon className="w-12 h-12 text-purple-400" />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{file.name}</h3>
                <p className="text-sm text-foreground/60">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-xs text-foreground/50 mt-1">{file.type}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={removeFile}
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-600/20 hover:bg-red-600/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>

          {/* SHA-256 Hash */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold mb-2">Content Hash (SHA-256)</h4>
                <code className="text-xs text-purple-400 break-all block bg-black/20 p-3 rounded-lg">
                  {fileHash}
                </code>
                <p className="text-xs text-foreground/50 mt-2">
                  This unique hash proves the authenticity of your file.
                </p>
              </div>

              <button
                onClick={copyHash}
                className="flex-shrink-0 w-10 h-10 rounded-lg glass hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                {hashCopied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-foreground/60" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          className="glass rounded-xl p-4 border-2 border-red-600/50 bg-red-600/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <GlassButton variant="primary" size="lg" onClick={nextStep} disabled={!file || !fileHash}>
          Continue to Metadata
        </GlassButton>
      </div>
    </div>
  );
}
