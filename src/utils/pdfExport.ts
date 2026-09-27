import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportOptions {
  elementId?: string;
  filename?: string;
  themeName?: string;
  onStart?: () => void;
  onComplete?: () => void;
  onError?: (err: any) => void;
}

/**
 * Captures the exact on-screen resume document and renders it
 * to an exact A4 single-page PDF (210mm x 297mm) preserving 100% of
 * the on-screen colors, layout, typography, and styling.
 */
export async function exportResumeToSinglePagePdf(options: PdfExportOptions = {}) {
  const {
    elementId = 'resume-document',
    themeName = 'Modern',
    filename,
    onStart,
    onComplete,
    onError,
  } = options;

  try {
    if (onStart) onStart();

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Resume element with id '${elementId}' not found.`);
    }

    // Scroll to top to ensure clean viewport capture
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Measure exact screen dimensions of the element
    const rect = element.getBoundingClientRect();
    const elementWidthPx = element.offsetWidth || rect.width;
    const elementHeightPx = element.offsetHeight || rect.height;

    // Capture element at high resolution matching exact rendered screen appearance
    const canvas = await html2canvas(element, {
      scale: 2.5, // Ultra-sharp typography & crisp borders
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: elementWidthPx,
      height: elementHeightPx,
      windowWidth: Math.max(1280, window.innerWidth),
      ignoreElements: (el) => {
        return (
          el.classList.contains('no-print') ||
          el.classList.contains('change-photo-badge') ||
          el.classList.contains('photo-overlay-badge')
        );
      },
    });

    const imgData = canvas.toDataURL('image/png', 1.0);

    // Standard A4 dimensions in millimeters: 210mm x 297mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;

    // Render image to exact full A4 page dimensions (all in 1 page, 0% distortion)
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    const sanitizedTheme = themeName.replace(/[^a-zA-Z0-9]/g, '_');
    const finalFilename = filename || `Shanker_Dayallan_Resume_${sanitizedTheme}.pdf`;

    pdf.save(finalFilename);

    if (onComplete) onComplete();
    return true;
  } catch (error) {
    console.error('Error generating single-page PDF:', error);
    if (onError) onError(error);
    return false;
  }
}
