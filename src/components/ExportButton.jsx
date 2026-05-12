import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExportButton({ reportRef, address }) {
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const el = reportRef.current;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 24;
      const availW = pageW - margin * 2;
      const ratio = canvas.height / canvas.width;
      const imgH = availW * ratio;

      let yPos = margin;
      let remaining = imgH;
      let srcY = 0;

      while (remaining > 0) {
        const sliceH = Math.min(remaining, pageH - margin * 2);
        const srcSliceH = (sliceH / imgH) * canvas.height;

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = srcSliceH;
        const ctx = sliceCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, srcY, canvas.width, srcSliceH, 0, 0, canvas.width, srcSliceH);

        const sliceData = sliceCanvas.toDataURL('image/png');
        if (yPos > margin) {
          pdf.addPage();
          yPos = margin;
        }
        pdf.addImage(sliceData, 'PNG', margin, yPos, availW, sliceH);

        srcY += srcSliceH;
        remaining -= sliceH;
        yPos = margin;
      }

      const filename = `Feasibility Study – ${address.replace(/[^a-zA-Z0-9\s,]/g, '').slice(0, 60)}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: exporting ? 'var(--gray-400)' : 'var(--terra)',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: 8,
        fontSize: '0.9rem',
        fontWeight: 700,
        letterSpacing: '0.03em',
        boxShadow: '0 2px 8px rgba(193,122,74,0.3)',
        cursor: exporting ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s, transform 0.1s',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      {exporting ? 'Generating PDF…' : 'Export PDF'}
    </button>
  );
}
