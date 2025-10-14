'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { GlassInput } from '@/components/ui/glass/GlassInput';
import { useRegistrationStore, AssetType } from '@/lib/stores/registrationStore';
import { Palette, Music, BookOpen, Video, Grid3x3, X } from 'lucide-react';

const assetTypes = [
  { value: 'VISUAL_ART' as AssetType, label: 'Visual Art', icon: Palette, color: 'from-pink-600' },
  { value: 'MUSIC' as AssetType, label: 'Music', icon: Music, color: 'from-purple-600' },
  { value: 'LITERATURE' as AssetType, label: 'Literature', icon: BookOpen, color: 'from-blue-600' },
  { value: 'VIDEO' as AssetType, label: 'Video', icon: Video, color: 'from-green-600' },
  { value: 'OTHER' as AssetType, label: 'Other', icon: Grid3x3, color: 'from-gray-600' },
];

export function MetadataFormStep() {
  const { metadata, setMetadata, nextStep, prevStep } = useRegistrationStore();

  const [title, setTitle] = useState(metadata?.title || '');
  const [description, setDescription] = useState(metadata?.description || '');
  const [assetType, setAssetType] = useState<AssetType | null>(metadata?.assetType || null);
  const [tags, setTags] = useState<string[]>(metadata?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate form
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (!assetType) {
      newErrors.assetType = 'Please select an asset type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validate() && assetType) {
      setMetadata({
        title,
        description,
        assetType,
        tags,
      });
      nextStep();
    }
  };

  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tags.length < 10 && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Add Metadata</h2>
        <p className="text-foreground/70">
          Provide details about your creative work to help others discover it.
        </p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <GlassInput
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            error={errors.title}
          />
          <div className="flex justify-end mt-1">
            <span
              className={`text-xs ${title.length > 100 ? 'text-red-400' : 'text-foreground/50'}`}
            >
              {title.length}/100
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your creative work..."
              rows={5}
              className="w-full glass rounded-xl p-4 border-2 border-transparent focus:border-purple-600/50 outline-none resize-none transition-colors"
            />

            {/* Character count with animated progress ring */}
            <div className="absolute bottom-4 right-4">
              <div className="relative w-12 h-12">
                <svg className="transform -rotate-90 w-12 h-12">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-foreground/10"
                  />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - description.length / 500)}`}
                    className={description.length > 500 ? 'text-red-400' : 'text-purple-400'}
                    initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - description.length / 500) }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-xs font-bold ${description.length > 500 ? 'text-red-400' : 'text-foreground/60'}`}
                  >
                    {description.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {errors.description && (
            <p className="text-red-400 text-sm mt-2">{errors.description}</p>
          )}
        </div>

        {/* Asset Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Asset Type <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {assetTypes.map((type) => (
              <motion.button
                key={type.value}
                type="button"
                onClick={() => setAssetType(type.value)}
                className={`glass rounded-xl p-4 border-2 transition-all ${
                  assetType === type.value
                    ? 'border-purple-600 bg-purple-600/20'
                    : 'border-transparent hover:border-purple-600/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${type.color} to-transparent flex items-center justify-center`}
                >
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-center">{type.label}</p>
              </motion.button>
            ))}
          </div>
          {errors.assetType && <p className="text-red-400 text-sm mt-2">{errors.assetType}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tags <span className="text-foreground/50">(Optional)</span>
          </label>
          <GlassInput
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Press Enter to add tags"
            disabled={tags.length >= 10}
          />
          <p className="text-xs text-foreground/50 mt-1">
            Add up to 10 tags to help others discover your work
          </p>

          {/* Tag chips */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <motion.div
                  key={tag}
                  className="glass rounded-full px-3 py-1 flex items-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="w-4 h-4 rounded-full bg-red-600/20 hover:bg-red-600/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3 text-red-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-4">
        <GlassButton variant="ghost" size="lg" onClick={prevStep}>
          Back
        </GlassButton>
        <GlassButton variant="primary" size="lg" onClick={handleSubmit}>
          Continue to Review
        </GlassButton>
      </div>
    </div>
  );
}
