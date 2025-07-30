import { notFound } from 'next/navigation';
import { questions as generalQuestions } from '@/lib/questions';
import { questions as migrationQuestions } from '@/lib/migration-questions';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RelatedQuestions } from '@/components/related-questions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  params: { slug: string };
};

const allQuestions = [...generalQuestions, ...migrationQuestions].sort((a,b) => a.id - b.id);

const getQuestionBySlug = (slug: string) => {
  return allQuestions.find(q => q.slug === slug);
};

export async function generateStaticParams() {
  return allQuestions.map(q => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const question = getQuestionBySlug(params.slug);
  if (!question) {
    return { title: 'Question not found' };
  }
  return {
    title: `${question.question} | DSS QuickStart Guides`,
    description: `Answer to the question: ${question.question}`,
  };
}

export default function QuestionPage({ params }: Props) {
  const question = getQuestionBySlug(params.slug);

  if (!question) {
    notFound();
  }
  
  const currentIndex = allQuestions.findIndex(q => q.id === question.id);
  const prevQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null;

  const pageContent = `Question: ${question.question}\n\nAnswer: ${question.answer}`;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-blue max-w-none text-foreground text-lg" dangerouslySetInnerHTML={{ __html: question.answer.replace(/\n/g, '<br />') }} />
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        {prevQuestion ? (
          <Button asChild variant="outline">
            <Link href={`/questions/${prevQuestion.slug}`} className="flex items-center gap-2">
              <ArrowLeft />
              Previous
            </Link>
          </Button>
        ) : <div />}
        {nextQuestion ? (
          <Button asChild variant="outline">
            <Link href={`/questions/${nextQuestion.slug}`} className="flex items-center gap-2">
              Next
              <ArrowRight />
            </Link>
          </Button>
        ) : <div />}
      </div>

      <Separator />

      <RelatedQuestions pageContent={pageContent} allQuestions={allQuestions} />
    </div>
  );
}
