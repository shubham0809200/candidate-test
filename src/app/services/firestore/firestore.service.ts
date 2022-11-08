import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Candidate } from 'src/app/module/candidate/candidate.module';
import { FeedbackForm } from 'src/app/module/feedback/feedback.module';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  // declase stogare angularstorage
  constructor(
    public afs: AngularFirestore,
    public storage: AngularFireStorage
  ) {}

  // feedback form data

  // get single feedback form data
  getFeedbackForm(collectionName: string, urlId: string) {
    return this.afs.collection(collectionName).doc(urlId).valueChanges();
  }

  // create feedback form data
  createNewFeedback(collectionName: string, feedback: FeedbackForm) {
    return this.afs.collection(collectionName).add(feedback);
  }

  // update feedback form data
  updateFeedback(arg0: string, urlId: string, feedback: FeedbackForm) {
    return this.afs.collection(arg0).doc(urlId).update(feedback);
  }

  // get All feedback form data
  getAllFeedbackForm(collectionName: string) {
    return this.afs.collection(collectionName).valueChanges({ idField: 'id' });
  }

  // delete feedback form data
  deleteFeedbackForm(collectionName: string, id: string) {
    return this.afs.collection(collectionName).doc(id).delete();
  }

  //  *************************------------------------------*****************************

  // Candidate  form data

  // get single candidate form data
  getCandidate(collectionName: string, urlId: string) {
    return this.afs.collection(collectionName).doc(urlId).valueChanges();
  }

  // create candidate form data
  createNewCandidate(collectionName: string, candidate: any) {
    return this.afs.collection(collectionName).add(candidate);
  }

  // update candidate form data
  updateCandidate(arg0: string, urlId: string, candidate: any) {
    return this.afs.collection(arg0).doc(urlId).update(candidate);
  }

  // get All candidate form data
  getAllCandidate(collectionName: string) {
    return this.afs.collection(collectionName).valueChanges({ idField: 'id' });
  }

  // delete candidate form data
  deleteCandidate(collectionName: string, id: string) {
    return this.afs.collection(collectionName).doc(id).delete();
  }

  uploadPdf(file: any, path: string) {
    // upload pdf to firebase storage
    return this.storage.upload(path, file);
  }
}
