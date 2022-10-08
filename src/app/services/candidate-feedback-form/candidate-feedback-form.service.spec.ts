import { TestBed } from '@angular/core/testing';

import { CandidateFeedbackFormService } from './candidate-feedback-form.service';

describe('CandidateFeedbackFormService', () => {
  let service: CandidateFeedbackFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateFeedbackFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
