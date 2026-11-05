export interface QuizModel {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  questionsFile: string;
}

export interface QuizTest {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  questionsFile: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}