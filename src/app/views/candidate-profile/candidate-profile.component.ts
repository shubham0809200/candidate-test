import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/module/candidate/candidate.module';
import { FeedbackForm } from 'src/app/module/feedback/feedback.module';
import { FirestoreService } from '../../services/firestore/firestore.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.fetchCandidateData();
    } catch (error) {
      console.log(error);
    }
  }

  // fetch candidate data from firebase

  candidateData: Candidate[] = [];

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
}
