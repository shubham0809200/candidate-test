import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackForm } from 'src/app/module/feedback/feedback.module';
import { FirestoreService } from '../../services/firestore/firestore.service';

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

  // fetch feedback data from firebase

  feedbackData: FeedbackForm[] = [];

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
}
