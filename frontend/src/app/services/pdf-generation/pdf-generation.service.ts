import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable, Subject } from 'rxjs';
import {Reservation} from "../../models/reservation";
import { TDocumentDefinitions, Content, ContentText } from 'pdfmake/interfaces';
import {DatePipe} from "@angular/common";

pdfMake.vfs = pdfFonts.pdfMake.vfs;




@Injectable({
  providedIn: 'root'
})
export class PdfGenerationService {
  private pdfGeneratedSource = new Subject<Blob>();

  pdfGenerated$: Observable<Blob> = this.pdfGeneratedSource.asObservable();

  constructor(private datePipe: DatePipe) {}
  getBase64ImageFromURL(url: string, width: number, height: number) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0, width, height);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
  async generatePdf(data: Reservation) {
    const ticketWidth = 700;
    const ticketHeight = 200;
    const imageWidth = 100;
    const imageHeight = 100;
    // const customTicketSize = [200, 400]; // Width and height in PDF points
    const customTicketSize = {width: 500, height: 200};
    const formattedDate = this.datePipe.transform(data.date, 'dd-MM-yyyy');
    const documentDefinition: TDocumentDefinitions = {
      pageSize: customTicketSize,
      pageMargins: [10, 10, 10, 10],
      /*background: {
        canvas: [
          { type: 'rect', x: 0, y: 0, w: 330, h: ticketHeight, color: '#64d564' },  // Green background for the entire page
        ],
      },*/
      content: [
        {
          table: {
            widths: ['70%', '50%'],
            body: [
              [
                {
                  stack: [
                    { text: 'Football Field Reservation Ticket', style: 'header' },
                    { text: `Date: ${formattedDate}`, margin: [0, 0, 0, 10], style: 'secondHeader' },
                    { text: `Time Slot: ${data.heure}`, margin: [0, 0, 0, 10], style: 'secondHeader' },
                    { text: `Reserved by: ${data.user?.prenom}`, margin: [0, 0, 0, 10], style: 'secondHeader'},
                    { text: `Football Field: ${data.terrain?.nom}`, margin: [0, 0, 0, 10],style: 'secondHeader' },
                    { text: `Reservation ID: ${data.uuid}`, color: '#001f3f', fontSize:10, margin: [0, 15, 0, 0] },
                  ],
                   // Green background color for the text cell
                  color: '#ffffff',
                  border: [0, 0, 2, 0], // White text color
                },
                {
                  image: await this.getBase64ImageFromURL(
                    "../../assets/images/stadium_1.jpg",
                    imageWidth,
                    imageHeight
                  ),
                  fit: [150, 200],
                  alignment: 'left',
                  margin: [0, 0,0, 0],
                  objectFit: 'cover',

                  border: [0, 0, 0, 0],
                },
              ],
            ],

          },
        },
        // Add other details as needed
      ] as Content[],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
          color: '#001f3f',      // Couleur du texte (bleu foncé)
        },
        subheader: {
          fontSize: 14,
          alignment: 'center',
          bold: true,
          margin: [0, 0, 0, 10],
          color: '#001f3f',  // Bleu foncé
        },
        secondHeader: {
          alignment: 'center',
          margin: [0, 0, 0, 10],
          color: '#001f3f',  // Bleu foncé
        }
      }
    };

    // const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

    /*pdfDocGenerator.getBlob((blob: Blob) => {
      this.pdfGeneratedSource.next(blob);
    });*/
    let id: number = 1;
    pdfMake.createPdf(documentDefinition).download(`reservation_${data.user?.nom}.pdf`);
  }
}
