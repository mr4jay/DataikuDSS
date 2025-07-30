'use client';
import { useState } from 'react';
import { allQuestions, type Question } from '@/lib/questions';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

// As showdown is a CJS module, we need to import it this way
import showdown from 'showdown';
import { useEffect } from 'react';

export function QuestionList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(allQuestions);
  const [converter, setConverter] = useState<showdown.Converter | null>(null);

  useEffect(() => {
    // Initialize showdown converter only on the client side
    setConverter(new showdown.Converter());
  }, []);

  useEffect(() => {
    const results = allQuestions.filter((q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(results);
  }, [searchTerm]);

  const createMarkup = (markdown: string) => {
    if (!converter) {
      return { __html: '' };
    }
    const html = converter.makeHtml(markdown);
    return { __html: html };
  };

  return (
    <div className="space-y-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">DSS QuickStart Guides</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A searchable collection of guides to common questions and challenges
            in Dataiku DSS.
          </p>
        </CardContent>
      </Card>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      <Accordion type="single" collapsible className="w-full">
        {filteredQuestions.map((q) => (
          <AccordionItem value={`item-${q.id}`} key={q.id}>
            <AccordionTrigger>{q.question}</AccordionTrigger>
            <AccordionContent>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={createMarkup(q.answer)}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {filteredQuestions.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No questions found.
        </p>
      )}
    </div>
  );
}
