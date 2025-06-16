import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function downloadPdf() {
  const pages = Array.from(document.querySelectorAll('.print-page'));
  if (pages.length === 0) return;

  const pdf = new jsPDF('p', 'mm', 'a4');
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const canvas = await html2canvas(page, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  }
  pdf.save('rapport.pdf');
}
