import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { QuizModel, QuizQuestion } from './models/quiz-data.model';

@Service()
export class QuizData {
  private readonly http = inject(HttpClient);

  getTests(): Observable<QuizModel[]> {
    return this.http.get<QuizModel[]>('/data/quiz-list.json');
  }

  getTestById(testId: string): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`/data/questions/${testId}.json`);
  }
}