import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './views/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Pdf viewer
import { PdfViewerModule } from 'ng2-pdf-viewer';

// Angular Material imports
import { AngularMaterialModule } from './module/angular-material/angular-material.module';

// components
import { CandidateProfileComponent } from './views/candidate-profile/candidate-profile.component';
import { CandidateFeedbackComponent } from './views/candidate-feedback/candidate-feedback.component';
import { CandidateProfileFormComponent } from './views/candidate-profile-form/candidate-profile-form.component';
import { CandidateFeedbackFormComponent } from './views/candidate-feedback-form/candidate-feedback-form.component';
import { PdfViewerComponent } from './views/pdf-viewer/pdf-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CandidateProfileComponent,
    CandidateFeedbackComponent,
    CandidateProfileFormComponent,
    CandidateFeedbackFormComponent,
    PdfViewerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    MatExpansionModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    PdfViewerModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomePageComponent,
        children: [
          {
            path: 'candidate-profile/new',
            component: CandidateProfileFormComponent,
          },
          {
            path: 'candidate-profile/:id',
            component: CandidateProfileFormComponent,
          },
          {
            path: 'candidate-profile',
            component: CandidateProfileComponent,
          },
          {
            path: 'candidate-feedback/new',
            component: CandidateFeedbackFormComponent,
          },
          {
            path: 'candidate-feedback/:id',
            component: CandidateFeedbackFormComponent,
          },
          { path: 'candidate-feedback', component: CandidateFeedbackComponent },
        ],
      },
    ]),
  ],
  providers: [],
  entryComponents: [PdfViewerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
