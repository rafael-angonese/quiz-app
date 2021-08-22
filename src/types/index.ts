export interface IQuestions {
  category: number;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
  user_answer: string;
}
