import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  pdfurl: string = '';

  constructor() {}

  setPdfUrl(url: string) {
    this.pdfurl = url;
  }

  getPdfUrl() {
    return this.pdfurl;
  }
}
