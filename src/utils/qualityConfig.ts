/**
 * Quality Configuration for 3D Rendering
 * Provides preset configurations based on device capabilities
 */

export interface QualitySettings {
  // Canvas settings
  shadows: boolean;
  antialias: boolean;
  dpr: [number, number];

  // Particle systems
  starParticles: number;

  // Animation settings
  animations: 'full' | 'reduced' | 'minimal';
  frameloop: 'always' | 'demand';

  // Texture settings
  textureResolution: 'high' | 'medium' | 'low';

  // Performance settings
  maxLights: number;
  enablePostProcessing: boolean;

  // UI animations
  starBackgroundCount: number;
  geometricShapesEnabled: boolean;
}

/**
 * Low quality settings for mobile devices and low-end hardware
 */
export const LOW_QUALITY: QualitySettings = {
  shadows: false,
  antialias: false,
  dpr: [1, 1],
  starParticles: 500,
  animations: 'minimal',
  frameloop: 'demand',
  textureResolution: 'low',
  maxLights: 2,
  enablePostProcessing: false,
  starBackgroundCount: 5,
  geometricShapesEnabled: false,
};

/**
 * Medium quality settings for mid-range devices
 */
export const MEDIUM_QUALITY: QualitySettings = {
  shadows: false,
  antialias: true,
  dpr: [1, 1.5],
  starParticles: 1500,
  animations: 'reduced',
  frameloop: 'demand',
  textureResolution: 'medium',
  maxLights: 4,
  enablePostProcessing: false,
  starBackgroundCount: 10,
  geometricShapesEnabled: true,
};

/**
 * High quality settings for high-end devices
 */
export const HIGH_QUALITY: QualitySettings = {
  shadows: true,
  antialias: true,
  dpr: [1, 2],
  starParticles: 5001,
  animations: 'full',
  frameloop: 'demand', // Changed from 'always' for battery life
  textureResolution: 'high',
  maxLights: 6,
  enablePostProcessing: true,
  starBackgroundCount: 20, // Reduced from 50
  geometricShapesEnabled: true,
};

/**
 * Get quality settings based on quality level
 */
export const getQualitySettings = (
  quality: 'low' | 'medium' | 'high'
): QualitySettings => {
  switch (quality) {
    case 'low':
      return LOW_QUALITY;
    case 'medium':
      return MEDIUM_QUALITY;
    case 'high':
      return HIGH_QUALITY;
    default:
      return MEDIUM_QUALITY;
  }
};

/**
 * Animation duration multipliers based on quality
 */
export const getAnimationDuration = (
  baseDuration: number,
  quality: 'low' | 'medium' | 'high'
): number => {
  const multipliers = {
    low: 1.5, // Slower animations save CPU
    medium: 1.2,
    high: 1.0,
  };

  return baseDuration * multipliers[quality];
};

/**
 * Get debounce delay for scroll/resize events
 */
export const getDebounceDelay = (
  quality: 'low' | 'medium' | 'high'
): number => {
  const delays = {
    low: 250, // More aggressive debouncing
    medium: 150,
    high: 100,
  };

  return delays[quality];
};

/**
 * Check if feature should be enabled based on quality
 */
export const isFeatureEnabled = (
  feature: keyof QualitySettings,
  quality: 'low' | 'medium' | 'high'
): boolean => {
  const settings = getQualitySettings(quality);
  return Boolean(settings[feature]);
};
