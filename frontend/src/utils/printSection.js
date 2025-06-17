export default function printSection(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(node => node.outerHTML)
    .join('');
  printWindow.document.write(`
    <html>
      <head>
        ${styles}
        <style>
          @page { margin: 1cm; }
        </style>
      </head>
      <body>${element.outerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

