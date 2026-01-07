/**
 * PDF styling configuration for jsPDF
 * Based on AI Product Heroes brand guidelines
 */

export const pdfStyles = {
  // Brand colors (RGB format for jsPDF)
  colors: {
    primary: '#4d65ff',
    primaryRGB: [77, 101, 255],
    secondary: '#1a1a2e',
    secondaryRGB: [26, 26, 46],
    accentMint: '#00d9a5',
    accentMintRGB: [0, 217, 165],
    textPrimary: '#1a1a2e',
    textPrimaryRGB: [26, 26, 46],
    textSecondary: '#6c757d',
    textSecondaryRGB: [108, 117, 125],
    textMuted: '#adb5bd',
    textMutedRGB: [173, 181, 189],
    white: '#ffffff',
    whiteRGB: [255, 255, 255],
    bgSecondary: '#f8f9fa',
    bgSecondaryRGB: [248, 249, 250]
  },

  // Font configuration
  fonts: {
    primary: 'helvetica', // jsPDF built-in, closest to Inter
    sizes: {
      h1: 24,
      h2: 18,
      h3: 14,
      body: 11,
      small: 10,
      footer: 9
    },
    weights: {
      normal: 'normal',
      bold: 'bold'
    }
  },

  // Page margins (in mm)
  margins: {
    top: 20,
    right: 20,
    bottom: 25,
    left: 20
  },

  // Section styling
  sections: {
    headerHeight: 8,
    spacing: 12,
    lineHeight: 6
  },

  // Page dimensions (A4)
  page: {
    width: 210,
    height: 297,
    contentWidth: 170 // width - left - right margins
  }
}

/**
 * Get RGB array from hex color
 * @param {string} hex - Hex color code
 * @returns {number[]} RGB array [r, g, b]
 */
export function hexToRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0]
}
