import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfileFormComponent } from './candidate-profile-form.component';

describe('CandidateProfileFormComponent', () => {
  let component: CandidateProfileFormComponent;
  let fixture: ComponentFixture<CandidateProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
