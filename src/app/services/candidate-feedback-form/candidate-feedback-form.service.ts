import { Injectable } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { FeedbackForm } from 'src/app/module/feedback/feedback.module';

@Injectable({
  providedIn: 'root',
})
export class CandidateFeedbackFormService {
  constructor(
    private firestore: AngularFirestoreModule,
    private db: AngularFirestore
  ) {}

  // createFeedbackForm with firebase firestore
  createFeedbackForm(feedbackForm: FeedbackForm) {
    return this.db.collection('feedbackForm').add(feedbackForm);
  }
}
