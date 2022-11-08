import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackForm } from 'src/app/module/feedback/feedback.module';
import { FirestoreService } from '../../services/firestore/firestore.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-candidate-feedback',
  templateUrl: './candidate-feedback.component.html',
  styleUrls: ['./candidate-feedback.component.css'],
})
export class CandidateFeedbackComponent implements OnInit {
  panelOpenState = false;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.fetchFeedbackData();
    } catch (error) {
      console.log(error);
    }
  }

  feedbackData: FeedbackForm[] = [];

  // fetch feedback data from firebase
  async fetchFeedbackData() {
    try {
      this.firestoreService.getAllFeedbackForm('feedback').subscribe((data) => {
        this.feedbackData = data as FeedbackForm[];
        console.log('feedback data', this.feedbackData);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // delete feedback data from firebase
  async deleteFeedbackData(id: string) {
    try {
      this.firestoreService.deleteFeedbackForm('feedback', id);
    } catch (error) {
      console.log(error);
    }
  }

  // Expory to excel
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.feedbackData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Candidate Data');
    XLSX.writeFile(wb, 'Candidate Data.xlsx');
  }
}
