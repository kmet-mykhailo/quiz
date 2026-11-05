import { TestBed } from '@angular/core/testing';
import { QuizData } from './quiz-data.service';

describe('QuizData', () => {
  let service: QuizData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
