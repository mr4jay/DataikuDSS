import { questions } from '@/lib/questions';
import { QuestionList } from '@/components/question-list';
import { Readme } from '@/components/readme';

export default function Home() {
  return (
    <div className="space-y-8">
      <Readme />
      <QuestionList questions={questions} />
    </div>
  );
}
