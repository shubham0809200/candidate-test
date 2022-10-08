import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFeedbackFormComponent } from './candidate-feedback-form.component';

describe('CandidateFeedbackFormComponent', () => {
  let component: CandidateFeedbackFormComponent;
  let fixture: ComponentFixture<CandidateFeedbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateFeedbackFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
