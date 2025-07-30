"use client";

import { useState, useMemo } from 'react';
import type { Question } from '@/lib/questions';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ChevronRight } from 'lucide-react';

interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({ questions }: QuestionListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = useMemo(() => {
    if (!searchQuery) return questions;
    return questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, questions]);

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search 300+ questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 text-base h-12 rounded-lg"
          aria-label="Search questions"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredQuestions.map(q => (
          <Link href={`/questions/${q.slug}`} key={q.id} className="group block">
            <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-base font-medium">{q.question}</CardTitle>
                <ChevronRight className="h-5 w-5 text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      {filteredQuestions.length === 0 && (
         <div className="text-center py-16 text-muted-foreground bg-card rounded-lg">
            <p className="text-lg font-medium">No questions found</p>
            <p>Try adjusting your search query.</p>
         </div>
      )}
    </div>
  );
}
