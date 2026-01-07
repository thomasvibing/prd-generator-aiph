/**
 * AI Product Heroes logo as base64 SVG data URL
 * Fetched from: https://cdn.prod.website-files.com/6870c88cbdaf724cf72cf76b/689de700a235d6a5514eb10a_navlogo.svg
 */

// Logo icon only (the geometric shape) - simplified for PDF rendering
export const logoIconSvg = `<svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28 4.28453V0.400978H20V4.28453H12V0.400978H8.00762H8H4V4.28453H0V15.9352H4V19.8263H8V23.7099H12V27.601H20V23.7099H24V19.8263H28V15.9352H32V4.28453H28Z" fill="#4855CB"/>
<path d="M8 0.400978H4V4.28453H8V0.400978Z" fill="#4855CB"/>
<path d="M20 23.714V27.6051H12V23.714H8V19.8305H4V15.9393H0V4.28867H4V8.17223H8V15.9469H15.9924V23.714H20Z" fill="#4855CB"/>
<path d="M28 4.28453V0.400978H24H20V4.28453H16H12V0.400978H8V4.28453H4V8.17565H8V15.9428H12V19.8339H16V23.7174H24V19.8339H28V15.9428H31.9924V8.17565H32V4.28453H28Z" fill="#80F3CF"/>
</svg>`

// Convert SVG string to base64 data URL
export function svgToDataUrl(svgString) {
  const encoded = btoa(unescape(encodeURIComponent(svgString)))
  return `data:image/svg+xml;base64,${encoded}`
}

// Get logo icon as data URL
export function getLogoIconDataUrl() {
  return svgToDataUrl(logoIconSvg)
}

// Draw logo icon using jsPDF primitives (for better PDF compatibility)
export function drawLogoIcon(doc, x, y, scale = 1) {
  const s = scale

  // Background shape - primary blue (#4855CB)
  doc.setFillColor(72, 85, 203)

  // Main shape rectangles
  doc.rect(x + 20*s, y + 0*s, 8*s, 4*s, 'F')
  doc.rect(x + 12*s, y + 4*s, 8*s, 4*s, 'F')
  doc.rect(x + 4*s, y + 0*s, 4*s, 4*s, 'F')
  doc.rect(x + 0*s, y + 4*s, 4*s, 12*s, 'F')
  doc.rect(x + 4*s, y + 16*s, 4*s, 4*s, 'F')
  doc.rect(x + 8*s, y + 20*s, 4*s, 4*s, 'F')
  doc.rect(x + 12*s, y + 24*s, 8*s, 4*s, 'F')
  doc.rect(x + 20*s, y + 20*s, 4*s, 4*s, 'F')
  doc.rect(x + 24*s, y + 16*s, 4*s, 4*s, 'F')
  doc.rect(x + 28*s, y + 4*s, 4*s, 12*s, 'F')

  // Accent shape - mint green (#80F3CF)
  doc.setFillColor(128, 243, 207)
  doc.rect(x + 8*s, y + 4*s, 4*s, 4*s, 'F')
  doc.rect(x + 4*s, y + 8*s, 8*s, 8*s, 'F')
  doc.rect(x + 12*s, y + 12*s, 4*s, 8*s, 'F')
  doc.rect(x + 16*s, y + 16*s, 8*s, 8*s, 'F')
  doc.rect(x + 24*s, y + 8*s, 8*s, 8*s, 'F')
  doc.rect(x + 20*s, y + 4*s, 8*s, 4*s, 'F')
}
