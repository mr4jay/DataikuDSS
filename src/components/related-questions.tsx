"use client";

import { useState } from 'react';
import { suggestRelatedQuestions } from '@/ai/flows/suggest-related-questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { Question } from '@/lib/questions';

interface RelatedQuestionsProps {
  pageContent: string;
  allQuestions: Question[];
}

export function RelatedQuestions({ pageContent, allQuestions }: RelatedQuestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggest = async () => {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const result = await suggestRelatedQuestions({ pageContent });
      setSuggestions(result.relatedQuestions);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  const findQuestionSlug = (questionText: string): string | null => {
    // This is a simple match, a more robust solution could use fuzzy search
    const matchedQuestion = allQuestions.find(q => q.question.toLowerCase().replace(/[‑-]/g, ' ') === questionText.toLowerCase().replace(/[‑-]/g, ' ').replace(/\?$/, ''));
    return matchedQuestion ? matchedQuestion.slug : null;
  }

  return (
    <Card className="bg-accent/10 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-accent" />
          <span>AI-Powered Related Suggestions</span>
        </CardTitle>
        <CardDescription>
          Explore topics related to the current question.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center p-6 space-x-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Generating suggestions...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-destructive p-4 bg-destructive/10 rounded-md">
            <AlertCircle />
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && suggestions.length > 0 && (
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => {
               const slug = findQuestionSlug(suggestion);
               return (
                <li key={index} className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                  {slug ? (
                    <Link href={`/questions/${slug}`} className="font-medium text-primary hover:underline">
                      {suggestion}
                    </Link>
                  ) : (
                    <span className="text-foreground">{suggestion}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-6">
          <Button onClick={handleSuggest} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Suggest Related Questions'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
