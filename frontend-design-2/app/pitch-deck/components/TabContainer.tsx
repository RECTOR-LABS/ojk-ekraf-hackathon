'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Presentation, Video, FileText } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: 'slides', label: 'Slides', icon: Presentation },
  { id: 'video', label: 'Demo Video', icon: Video },
  { id: 'documents', label: 'Documents', icon: FileText },
];

interface TabContainerProps {
  slidesContent: ReactNode;
  videoContent: ReactNode;
  documentsContent: ReactNode;
}

export function TabContainer({ slidesContent, videoContent, documentsContent }: TabContainerProps) {
  const [activeTab, setActiveTab] = useState('slides');

  const getContent = () => {
    switch (activeTab) {
      case 'slides':
        return slidesContent;
      case 'video':
        return videoContent;
      case 'documents':
        return documentsContent;
      default:
        return slidesContent;
    }
  };

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-xl border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-6 py-4 transition-colors whitespace-nowrap min-h-[56px] ${
                    isActive
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground/80'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{tab.label}</span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {getContent()}
      </motion.div>
    </div>
  );
}
