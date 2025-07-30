import { fresherMistakesQuestions } from './fresher-mistakes-questions';
import { migrationQuestions } from './migration-questions';
import { mlopsQuestions } from './mlops-questions';
import { smeQuestions } from './sme-questions';

export interface Question {
  id: number;
  slug: string;
  question: string;
  answer: string;
}

export const allQuestions: Question[] = [
  ...fresherMistakesQuestions,
  ...migrationQuestions,
  ...mlopsQuestions,
  ...smeQuestions,
].sort((a, b) => a.id - b.id);
