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

export interface QuestionSection {
  title: string;
  questions: Question[];
}

export const allQuestionSections: QuestionSection[] = [
  {
    title: 'MLOps Questions',
    questions: mlopsQuestions.sort((a,b) => a.id - b.id),
  },
  {
    title: 'Migration Questions',
    questions: migrationQuestions.sort((a,b) => a.id - b.id),
  },
  {
    title: 'Fresher Mistakes Questions',
    questions: fresherMistakesQuestions.sort((a,b) => a.id - b.id),
  },
  {
    title: 'SME Questions',
    questions: smeQuestions.sort((a,b) => a.id - b.id),
  }
];

export const allQuestions: Question[] = allQuestionSections.flatMap(section => section.questions);
