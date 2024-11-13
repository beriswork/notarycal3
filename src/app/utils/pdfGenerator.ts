import { FeeData } from '../types';

declare global {
  interface Window {
    jspdf: any;
  }
}

export const generatePDF = (feeData: FeeData) => {
  if (typeof window === 'undefined') {
    console.error('PDF generation is not available server-side');
    return;
  }

  try {
    console.log('Starting PDF generation...', window.jspdf);
    
    // Wait for jsPDF to be available
    if (!window.jspdf) {
      console.error('jsPDF not loaded yet');
      throw new Error('PDF generation library not loaded');
    }

    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      console.error('jsPDF constructor not found');
      throw new Error('PDF generation library not initialized');
    }

    const doc = new jsPDF();

    // Colors
    const primaryColor = [0, 82, 204];
    const secondaryColor = [77, 77, 77];
    const accentColor = [245, 247, 250];

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Notary Fee Calculation', 105, 25, { align: 'center' });

    // Total Fees
    doc.setTextColor(...primaryColor);
    doc.setFontSize(20);
    doc.text(`Total Fees: $${feeData.totalFees.toFixed(2)}`, 20, 60);

    // Fee Breakdown Table
    const tableData = [
      ['Fee Type', 'Amount'],
      ['Stamp Fees', `$${feeData.stampFees.toFixed(2)}`],
      ['Witness Fees', `$${feeData.witnessFees.toFixed(2)}`],
      ['Additional Signer Fees', `$${feeData.addlSignerFees.toFixed(2)}`],
      ['Travel Fees (Total)', `$${feeData.totalTravelFees.toFixed(2)}`],
      ['- Distance Fees', `$${feeData.travelDistanceFees.toFixed(2)}`],
      ['- Time Fees', `$${feeData.travelTimeFees.toFixed(2)}`],
      ['Appointment Time Fees', `$${feeData.apptTimeFees.toFixed(2)}`],
      ['Printing/Scanning Fees', `$${feeData.printingScanningFees.toFixed(2)}`]
    ];

    // @ts-ignore
    doc.autoTable({
      startY: 70,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: accentColor
      },
      styles: {
        fontSize: 10,
        cellPadding: 8,
        lineColor: [200, 200, 200]
      }
    });

    // Footer
    const currentYear = new Date().getFullYear();
    doc.setFontSize(8);
    doc.setTextColor(...secondaryColor);
    doc.text(`© ${currentYear} Generated by Solutions by TJ`, 105, 285, { align: 'center' });

    console.log('PDF generated successfully');
    doc.save('notary_fee_calculation.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}; 