import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { QuizData } from '../core/data/quiz-data.service';
import { QuizQuestion } from '../core/data/models/quiz-data.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly quizData = inject(QuizData);

  readonly questions = signal<QuizQuestion[]>([]);
  readonly currentIndex = signal(0);
  readonly selectedOptionId = signal<string | null>(null);
  readonly correctAnswers = signal(0);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly isFinished = signal(false);

  readonly currentQuestion = computed(
    () => this.questions()[this.currentIndex()] ?? null
  );

  readonly totalQuestions = computed(() => this.questions().length);

  readonly progress = computed(() => {
    const total = this.totalQuestions();

    return total === 0
      ? 0
      : ((this.currentIndex() + 1) / total) * 100;
  });

  readonly scorePercentage = computed(() => {
    const total = this.totalQuestions();

    return total === 0
      ? 0
      : Math.round((this.correctAnswers() / total) * 100);
  });

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('testId');

    if (!testId) {
      this.error.set('Test ID was not provided.');
      this.isLoading.set(false);
      return;
    }

    this.quizData.getTestById(testId).subscribe({
      next: (questions) => {
        if (questions.length === 0) {
          this.error.set('This test has no questions yet.');
        }

        this.questions.set(questions);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Unable to load questions. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  selectAnswer(optionId: string): void {
    if (this.selectedOptionId() !== null || this.isFinished()) {
      return;
    }

    this.selectedOptionId.set(optionId);

    if (optionId === this.currentQuestion()?.correctOptionId) {
      this.correctAnswers.update((score) => score + 1);
    }
  }

  isCorrect(optionId: string): boolean {
    return optionId === this.currentQuestion()?.correctOptionId;
  }

  nextQuestion(): void {
    if (this.selectedOptionId() === null) {
      return;
    }

    if (this.currentIndex() + 1 >= this.totalQuestions()) {
      this.isFinished.set(true);
      return;
    }

    this.currentIndex.update((index) => index + 1);
    this.selectedOptionId.set(null);
  }

  restart(): void {
    this.currentIndex.set(0);
    this.selectedOptionId.set(null);
    this.correctAnswers.set(0);
    this.isFinished.set(false);
  }
}