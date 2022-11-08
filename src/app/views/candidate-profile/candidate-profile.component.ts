import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/module/candidate/candidate.module';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css'],
})
export class CandidateProfileComponent implements OnInit {
  panelOpenState = false;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    try {
      this.fetchCandidateData();
    } catch (error) {
      console.log(error);
    }
  }

  candidateData: Candidate[] = [];

  // Open PDF
  openDialog(url: string): void {
    this.shared.setPdfUrl(url);
    this.dialog.open(PdfViewerComponent);
  }

  // Get Candidate Data from firebase
  async fetchCandidateData() {
    try {
      this.firestoreService
        .getAllFeedbackForm('candidate')
        .subscribe((data) => {
          this.candidateData = data as Candidate[];
          console.log('candidate data', this.candidateData);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // delete candidate data from firebase
  async deleteCandidateData(id: string) {
    try {
      // check with alert
      this.firestoreService.deleteFeedbackForm('candidate', id);
    } catch (error) {
      console.log(error);
    }
  }

  // Expory to excel
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.candidateData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Candidate Data');
    XLSX.writeFile(wb, 'Candidate Data.xlsx');
  }
}
