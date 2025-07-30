import { questions as generalQuestions } from '@/lib/questions';
import { questions as migrationQuestions } from '@/lib/migration-questions';
import { questions as fresherMistakesQuestions } from '@/lib/fresher-mistakes-questions';
import { questions as smeQuestions } from '@/lib/sme-questions';
import { QuestionList } from '@/components/question-list';
import { Readme } from '@/components/readme';

export default function Home() {
  const allQuestions = [...generalQuestions, ...migrationQuestions, ...fresherMistakesQuestions, ...smeQuestions];
  allQuestions.sort((a, b) => a.id - b.id);

  return (
    <div className="space-y-8">
      <Readme />
      <QuestionList questions={allQuestions} />
    </div>
  );
}
