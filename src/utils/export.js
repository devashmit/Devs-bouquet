import html2canvas from 'html2canvas';

/**
 * Export a bouquet SVG element as PNG.
 * - 2x resolution for retina clarity
 * - Cream background preserved
 * - Sketch texture maintained
 */
export async function exportBouquetAsPNG(element, filename = 'devsbouquet') {
  if (!element) {
    console.error('Export: No element to capture');
    return false;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#fdf6f0',
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    const link = document.createElement('a');
    link.download = `${filename}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    return true;
  } catch (err) {
    console.error('Export failed with html2canvas, trying fallback:', err);
    return fallbackExport(element, filename);
  }
}

/**
 * Fallback export using SVG serialization
 */
async function fallbackExport(element, filename) {
  try {
    const svgElement = element.querySelector('svg');
    if (!svgElement) throw new Error('No SVG found');

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      const ctx = canvas.getContext('2d');

      // Cream background
      ctx.fillStyle = '#fdf6f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.download = `${filename}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      URL.revokeObjectURL(url);
    };
    img.src = url;
    return true;
  } catch (err) {
    console.error('Fallback export also failed:', err);
    return false;
  }
}
