import { Routes } from '@angular/router';
import { QuizList } from './quiz-list/quiz-list';
import { QuizComponent } from './quiz/quiz';

export const routes: Routes = [
    {
        path: "list",
        component: QuizList
    },
    {
        path: "quiz/:testId",
        component: QuizComponent
    },
    {
        path:'**',
        redirectTo: "list"
    }
];
