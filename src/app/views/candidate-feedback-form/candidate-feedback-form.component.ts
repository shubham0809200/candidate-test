import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackForm } from 'src/app/module/feedback/feedback.module';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-candidate-feedback-form',
  templateUrl: './candidate-feedback-form.component.html',
  styleUrls: ['./candidate-feedback-form.component.css'],
})
export class CandidateFeedbackFormComponent implements OnInit {
  // use feedback module to store form data

  // loading state
  loading = false;

  urlId: string = '';

  feedback: FeedbackForm = {
    candidateEmail: '',
    interviewLevel: '',
    panelName: '',
    interviewDate: '',
    interviewTime: '',
    interviewerName: '',
    interviewMode: '',
    additionalDetails: '',
    detailedFeedback: '',
    finalCall: '',
    nextAction: '',
  };

  // send form data to firebase

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUrl().then(() => {
      this.checkData();
    });
  }

  async fetchUrl() {
    try {
      this.urlId = this.route.snapshot.paramMap.get('id')!;
    } catch (error) {
      console.log(error);
    }
  }

  cancle() {
    this.router.navigate(['/candidate-feedback']);
  }

  async checkData() {
    this.loading = true;
    try {
      if (this.urlId) {
        this.firestoreService
          .getFeedbackForm('feedback', this.urlId)
          .subscribe((data: any) => {
            this.feedback = data;
          });
        console.log(this.feedback);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  async submitForm() {
    this.loading = true;
    try {
      if (!this.urlId) {
        //check form for empty fields
        if (
          this.feedback.candidateEmail &&
          this.feedback.interviewLevel &&
          this.feedback.interviewDate &&
          this.feedback.interviewTime &&
          this.feedback.interviewerName &&
          this.feedback.interviewMode &&
          this.feedback.finalCall &&
          this.feedback.nextAction
        ) {
          await this.firestoreService.createNewFeedback(
            'feedback',
            this.feedback
          );
          this.resetForm();
          this.router.navigate(['/candidate-feedback']);
        } else {
          alert('Please fill all the fields');
        }
      } else {
        //check form for empty fields
        if (
          this.feedback.candidateEmail &&
          this.feedback.interviewLevel &&
          this.feedback.interviewDate &&
          this.feedback.interviewTime &&
          this.feedback.interviewerName &&
          this.feedback.interviewMode &&
          this.feedback.finalCall &&
          this.feedback.nextAction
        ) {
          await this.firestoreService.updateFeedback(
            'feedback',
            this.urlId,
            this.feedback
          );
          this.resetForm();
          this.router.navigate(['/candidate-feedback']);
        } else {
          alert('Please fill all the fields');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.resetForm();
    }
  }

  async deleteFeedbackData() {
    try {
      this.firestoreService.deleteFeedbackForm('feedback', this.urlId);
      this.router.navigate(['/candidate-feedback']);
    } catch (error) {
      console.log(error);
    }
  }

  //reset form
  resetForm() {
    this.feedback = {
      candidateEmail: '',
      interviewLevel: '',
      panelName: '',
      interviewDate: '',
      interviewTime: '',
      interviewerName: '',
      interviewMode: '',
      additionalDetails: '',
      detailedFeedback: '',
      finalCall: '',
      nextAction: '',
    };
    this.loading = false;
  }
}
