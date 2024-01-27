import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pdf-generation',
  standalone: true,
  imports: [],
  templateUrl: './pdf-generation.component.html',
  styleUrl: './pdf-generation.component.css'
})
export class PdfGenerationComponent {
  generatePdf(reservationId: number): void {
    // Implement PDF generation logic using pdfMake
    const documentDefinition = {
      content: [
        { text: 'Reservation PDF', style: 'header' },
        // Add reservation details based on reservationId
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download(`reservation_${reservationId}.pdf`);
  }
}
