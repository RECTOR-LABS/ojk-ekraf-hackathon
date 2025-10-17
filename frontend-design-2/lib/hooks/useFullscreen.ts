'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage fullscreen mode
 * @returns Object with isFullscreen state and toggle function
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if fullscreen is supported
  const isSupported = typeof document !== 'undefined' &&
    (document.fullscreenEnabled ||
     // @ts-ignore - Safari webkit prefix
     document.webkitFullscreenEnabled);

  // Update state when fullscreen changes
  useEffect(() => {
    if (!isSupported) return;

    const handleFullscreenChange = () => {
      setIsFullscreen(
        // @ts-ignore - Safari webkit prefix
        !!document.fullscreenElement || !!document.webkitFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isSupported]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
    if (!isSupported) {
      console.warn('Fullscreen API is not supported in this browser');
      return;
    }

    try {
      // @ts-ignore - Safari webkit prefix
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        // Enter fullscreen
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        }
        // @ts-ignore - Safari webkit prefix
        else if (element.webkitRequestFullscreen) {
          // @ts-ignore - Safari webkit prefix
          await element.webkitRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        // @ts-ignore - Safari webkit prefix
        else if (document.webkitExitFullscreen) {
          // @ts-ignore - Safari webkit prefix
          await document.webkitExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  }, [isSupported]);

  return {
    isFullscreen,
    isSupported,
    toggleFullscreen,
  };
}
