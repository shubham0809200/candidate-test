import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/module/candidate/candidate.module';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-candidate-profile-form',
  templateUrl: './candidate-profile-form.component.html',
  styleUrls: ['./candidate-profile-form.component.css'],
})
export class CandidateProfileFormComponent implements OnInit {
  // loading state
  loading = false;

  urlId: string = '';

  candidate: Candidate = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    birthDate: '',
    permanentAddress: '',
    communicationAddress: '',
    qualification: '',
    skills: '',
    alternatePhone: '',
    experiance: '',
    currentCompany: '',
    currentJobStatus: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    pdfUrl: '',
  };

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
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
    this.router.navigate(['/candidate-profile']);
  }

  async checkData() {
    this.loading = true;
    try {
      this.firestoreService
        .getCandidate('candidate', this.urlId)
        .subscribe((data) => {
          this.candidate = data as Candidate;
          this.loading = false;
        });
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  upoadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `candidate/${this.candidate.firstName}.pdf`;
    this.firestoreService.uploadPdf(filePath, file).then((data) => {
      data.ref.getDownloadURL().then((url) => {
        this.candidate.pdfUrl = url;
      });
    });
  }

  // Open PDF
  openDialog(url: string): void {
    this.dialog.open(PdfViewerComponent);
  }

  async submitForm() {
    this.loading = true;
    try {
      if (this.urlId) {
        try {
          // check empty fields
          if (
            this.candidate.firstName == '' ||
            this.candidate.email == '' ||
            this.candidate.phone == '' ||
            this.candidate.permanentAddress == '' ||
            this.candidate.communicationAddress == '' ||
            this.candidate.experiance == '' ||
            this.candidate.expectedCTC == ''
          ) {
            alert('Please fill all the fields');
          } else {
            await this.firestoreService.updateCandidate(
              'candidate',
              this.urlId,
              this.candidate
            );
            this.router.navigate(['/candidate-profile']);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          if (
            this.candidate.firstName == '' ||
            this.candidate.email == '' ||
            this.candidate.phone == '' ||
            this.candidate.permanentAddress == '' ||
            this.candidate.communicationAddress == '' ||
            this.candidate.experiance == '' ||
            this.candidate.expectedCTC == ''
          ) {
            alert('Please fill all the fields');
          } else {
            await this.firestoreService.createNewCandidate(
              'candidate',
              this.candidate
            );
            this.router.navigate(['/candidate-profile']);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  //delete candidate
  async deleteCandidate() {
    this.loading = true;
    try {
      await this.firestoreService.deleteCandidate('candidate', this.urlId);
      this.router.navigate(['/candidate-profile']);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  // reset form
  resetForm() {
    this.candidate = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedin: '',
      birthDate: '',
      permanentAddress: '',
      communicationAddress: '',
      qualification: '',
      skills: '',
      alternatePhone: '',
      experiance: '',
      currentCompany: '',
      currentJobStatus: '',
      currentCTC: '',
      expectedCTC: '',
      noticePeriod: '',
      pdfUrl: '',
    };
  }
}
