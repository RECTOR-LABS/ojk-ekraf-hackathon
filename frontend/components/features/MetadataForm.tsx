'use client';

import { useState, useEffect } from 'react';
import { Input, Card } from '@/components/ui';

// Asset types matching the smart contract enum
export enum AssetType {
  DigitalArt = 0,
  Music = 1,
  Photography = 2,
  Writing = 3,
  Design = 4,
}

const assetTypes = [
  {
    value: AssetType.DigitalArt,
    label: 'Digital Art',
    labelId: 'Seni Digital',
    description: 'Illustrations, paintings, 3D art, NFT art',
    icon: '🎨',
  },
  {
    value: AssetType.Music,
    label: 'Music',
    labelId: 'Musik',
    description: 'Songs, albums, beats, audio tracks',
    icon: '🎵',
  },
  {
    value: AssetType.Photography,
    label: 'Photography',
    labelId: 'Fotografi',
    description: 'Photos, portraits, landscapes',
    icon: '📸',
  },
  {
    value: AssetType.Writing,
    label: 'Writing',
    labelId: 'Tulisan',
    description: 'Articles, books, poetry, scripts',
    icon: '✍️',
  },
  {
    value: AssetType.Design,
    label: 'Design',
    labelId: 'Desain',
    description: 'UI/UX, graphics, logos, branding',
    icon: '✨',
  },
];

export interface CopyrightMetadata {
  title: string;
  description: string;
  assetType: AssetType;
  creatorName?: string;
  tags?: string[];
}

interface MetadataFormProps {
  onSubmit: (metadata: CopyrightMetadata) => void;
  onBack: () => void;
  initialData?: Partial<CopyrightMetadata>;
  walletAddress?: string;
}

export function MetadataForm({
  onSubmit,
  onBack,
  initialData,
  walletAddress,
}: MetadataFormProps) {
  const [formData, setFormData] = useState<CopyrightMetadata>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    assetType: initialData?.assetType ?? AssetType.DigitalArt,
    creatorName: initialData?.creatorName || '',
    tags: initialData?.tags || [],
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Handle tag input
  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags?.includes(tag) && (formData.tags?.length ?? 0) < 10) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tag],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove) || [],
    });
  };

  // Handle tag input key press
  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-neutral-900 mb-2">
          Title <span className="text-error-600">*</span>
        </label>
        <p className="text-sm text-neutral-600 mb-3">
          Give your work a clear, descriptive title
        </p>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Sunset Over Bali Beach"
          error={errors.title}
          maxLength={100}
        />
        <p className="text-xs text-neutral-500 mt-1">
          {formData.title.length}/100 characters
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-neutral-900 mb-2">
          Description <span className="text-error-600">*</span>
        </label>
        <p className="text-sm text-neutral-600 mb-3">
          Describe your creative work in detail
        </p>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe what makes your work unique, the inspiration behind it, and any relevant context..."
          className={`
            w-full px-4 py-3 border rounded-lg font-sans text-neutral-900 placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-all resize-none
            ${errors.description ? 'border-error-500' : 'border-neutral-300'}
          `}
          rows={5}
          maxLength={1000}
        />
        {errors.description && (
          <p className="text-sm text-error-600 mt-1">{errors.description}</p>
        )}
        <p className="text-xs text-neutral-500 mt-1">
          {formData.description.length}/1000 characters
        </p>
      </div>

      {/* Asset Type */}
      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-2">
          Asset Type <span className="text-error-600">*</span>
        </label>
        <p className="text-sm text-neutral-600 mb-3">
          Select the category that best describes your work
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {assetTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData({ ...formData, assetType: type.value })}
              className={`
                p-4 border-2 rounded-xl text-left transition-all hover:scale-105
                ${
                  formData.assetType === type.value
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-neutral-200 hover:border-primary-300'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{type.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-900 mb-0.5">{type.label}</h4>
                  <p className="text-xs text-neutral-600 mb-1">{type.labelId}</p>
                  <p className="text-xs text-neutral-500">{type.description}</p>
                </div>
                {formData.assetType === type.value && (
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Creator Name (Optional) */}
      <div>
        <label htmlFor="creatorName" className="block text-sm font-semibold text-neutral-900 mb-2">
          Creator Name <span className="text-neutral-500 font-normal">(Optional)</span>
        </label>
        <p className="text-sm text-neutral-600 mb-3">
          Your professional or artist name. Leave blank to use wallet address.
        </p>
        <Input
          id="creatorName"
          type="text"
          value={formData.creatorName}
          onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
          placeholder={walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Your name or alias'}
          maxLength={50}
        />
      </div>

      {/* Tags (Optional) */}
      <div>
        <label htmlFor="tags" className="block text-sm font-semibold text-neutral-900 mb-2">
          Tags <span className="text-neutral-500 font-normal">(Optional)</span>
        </label>
        <p className="text-sm text-neutral-600 mb-3">
          Add keywords to help others discover your work (max 10 tags)
        </p>
        <div className="flex gap-2">
          <Input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="e.g., nature, landscape, sunset"
            disabled={(formData.tags?.length ?? 0) >= 10}
          />
          <button
            type="button"
            onClick={handleAddTag}
            disabled={!tagInput.trim() || (formData.tags?.length ?? 0) >= 10}
            className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Add
          </button>
        </div>

        {/* Display Tags */}
        {formData.tags && formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-primary-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-300 transition-all"
        >
          ← Back
        </button>

        <button
          type="submit"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-500 shadow-lg hover:shadow-xl transition-all"
        >
          Continue to Review →
        </button>
      </div>
    </form>
  );
}
