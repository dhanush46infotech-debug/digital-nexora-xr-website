/**
 * Device Detection Utilities
 * Detects device capabilities for performance optimization
 */

export interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  cores: number;
  memory: number;
  quality: 'low' | 'medium' | 'high';
}

/**
 * Check if the device is a mobile device (phone/tablet)
 */
export const isMobileDevice = (): boolean => {
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Check if the device is a tablet
 */
export const isTablet = (): boolean => {
  return /iPad|Android/i.test(navigator.userAgent) &&
    !/Mobile/i.test(navigator.userAgent);
};

/**
 * Check if the device has low-end hardware
 */
export const isLowEndDevice = (): boolean => {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;

  // Low-end if:
  // - 4 or fewer CPU cores
  // - 4GB or less RAM
  // - Mobile device (conservative approach)
  return cores <= 4 || memory <= 4 || isMobileDevice();
};

/**
 * Get device quality preset based on capabilities
 */
export const getQualityPreset = (): 'low' | 'medium' | 'high' => {
  if (isMobileDevice()) {
    // All mobile devices get 'low' for battery life
    return 'low';
  }

  if (isLowEndDevice()) {
    return 'medium';
  }

  return 'high';
};

/**
 * Get comprehensive device capabilities
 */
export const getDeviceCapabilities = (): DeviceCapabilities => {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  const mobile = isMobileDevice();
  const lowEnd = isLowEndDevice();

  return {
    isMobile: mobile,
    isLowEnd: lowEnd,
    cores,
    memory,
    quality: getQualityPreset(),
  };
};

/**
 * Check if user prefers reduced motion (accessibility)
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get safe pixel ratio for device
 */
export const getSafePixelRatio = (): [number, number] => {
  const quality = getQualityPreset();

  switch (quality) {
    case 'low':
      return [1, 1]; // Mobile: crisp but not too heavy
    case 'medium':
      return [1, 1.5]; // Low-end desktop: balanced
    case 'high':
      return [1, 2]; // High-end: maximum quality
    default:
      return [1, 1];
  }
};

/**
 * Check if device supports WebGL2
 */
export const supportsWebGL2 = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch (e) {
    return false;
  }
};

/**
 * Estimate device performance score (0-100)
 */
export const getPerformanceScore = (): number => {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  const mobile = isMobileDevice();

  let score = 50; // Base score

  // CPU score (0-30 points)
  score += Math.min(cores * 3, 30);

  // Memory score (0-20 points)
  score += Math.min(memory * 2.5, 20);

  // Mobile penalty (-20 points)
  if (mobile) score -= 20;

  // WebGL2 bonus (+10 points)
  if (supportsWebGL2()) score += 10;

  return Math.max(0, Math.min(100, score));
};
