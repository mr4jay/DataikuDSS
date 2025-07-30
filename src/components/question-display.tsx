"use client";

import { useEffect, useState } from 'react';
import showdown from 'showdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Question } from '@/lib/questions';

interface QuestionDisplayProps {
  question: Question;
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (question) {
      const converter = new showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
      });
      setHtmlContent(converter.makeHtml(question.answer));
    }
  }, [question]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-blue max-w-none text-foreground text-lg" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </CardContent>
    </Card>
  );
}
