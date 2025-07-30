import { fresherMistakesQuestions } from './fresher-mistakes-questions';
import { gettingStartedQuestions } from './getting-started-questions';
import { migrationQuestions } from './migration-questions';
import { mlopsQuestions } from './mlops-questions';
import { smeQuestions } from './sme-questions';
import { dataPrepQuestions } from './data-prep-questions';
import { mlQuestions } from './ml-questions';
import { automationQuestions } from './automation-questions';

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

const allSections: QuestionSection[] = [
  {
    title: 'Getting Started Questions',
    questions: gettingStartedQuestions,
  },
  {
    title: 'Data Preparation & Transformation',
    questions: dataPrepQuestions,
  },
  {
    title: 'Machine Learning in DSS',
    questions: mlQuestions,
  },
  {
    title: 'Automation & MLOps',
    questions: automationQuestions,
  },
  {
    title: 'MLOps Questions',
    questions: mlopsQuestions,
  },
  {
    title: 'Migration Questions',
    questions: migrationQuestions,
  },
  {
    title: 'Fresher Mistakes Questions',
    questions: fresherMistakesQuestions,
  },
  {
    title: 'SME Questions',
    questions: smeQuestions,
  }
];

export const allQuestionSections: QuestionSection[] = allSections
  .map(section => ({
    ...section,
    questions: section.questions.sort((a,b) => a.id - b.id),
  }))
  .filter(section => section.questions.length > 0);

export const allQuestions: Question[] = allQuestionSections.flatMap(section => section.questions);
