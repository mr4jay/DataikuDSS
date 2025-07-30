
'use client';
import { useEffect, useState } from 'react';
import { suggestRelatedQuestions, SuggestRelatedQuestionsOutput } from '@/ai/flows/suggest-related-questions';
import type { Question } from '@/lib/questions';
import { Skeleton } from '@/components/ui/skeleton';
import { Wand2, AlertTriangle } from 'lucide-react';
import { allQuestions } from '@/lib/questions';

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

const findQuestionByTitle = (title: string) => {
  return allQuestions.find(q => q.question === title);
};

export function RelatedQuestions({ question }: { question: Question }) {
  const [result, setResult] = useState<SuggestRelatedQuestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    async function getSuggestions() {
      try {
        const suggestions = await suggestRelatedQuestions({
          currentQuestion: question.question,
          currentAnswer: question.answer,
        });
        setResult(suggestions);
      } catch (e: any) {
        console.error('Failed to get related questions:', e);
        setError('Could not load suggestions.');
      } finally {
        setIsLoading(false);
      }
    }

    getSuggestions();
  }, [question.id, question.question, question.answer]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      );
    }

    if (result && result.related.length > 0) {
      return (
        <ul className="space-y-2">
          {result.related.map((title) => {
            const relatedQuestion = findQuestionByTitle(title);
            if (!relatedQuestion) return null;
            const href = `#${relatedQuestion.slug}`;
            return (
              <li key={relatedQuestion.id}>
                <a 
                  href={href} 
                  className="text-sm text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(relatedQuestion.slug)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      );
    }
    
    return null;
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h4 className="text-md font-semibold mb-3 flex items-center gap-2 text-accent">
        <Wand2 className="h-5 w-5" />
        AI-Powered Related Questions
      </h4>
      {renderContent()}
    </div>
  );
}

