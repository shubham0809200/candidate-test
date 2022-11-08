import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent implements OnInit {
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.pdfSrc = this.shared.getPdfUrl();
  }

  downloadPdf() {
    window.open(this.pdfSrc);
  }
}
