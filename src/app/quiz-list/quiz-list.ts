import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizData } from '../core/data/quiz-data.service';
import { QuizModel } from '../core/data/models/quiz-data.model'

@Component({
  imports: [RouterLink],
  selector: 'app-quiz-list',
  styleUrl: './quiz-list.css',
  templateUrl: './quiz-list.html',
})
export class QuizList {
  private readonly quizDataService = inject(QuizData);

  readonly tests = signal<QuizModel[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.quizDataService.getTests().subscribe({
      next: (tests) => {
        this.tests.set(tests);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Unable to load tests. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }
}