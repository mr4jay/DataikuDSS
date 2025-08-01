
'use client';
import { useState, useMemo } from 'react';
import { allQuestionSections } from '@/lib/questions';
import { useCompletionState } from '@/hooks/use-completion-state';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import showdown from 'showdown';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

const converter = new showdown.Converter();

export function QuestionList() {
  const [searchTerm, setSearchTerm] = useState('');

  const totalQuestions = useMemo(() => {
    return allQuestionSections.reduce((acc, section) => acc + section.questions.length, 0);
  }, []);

  const { completedQuestions, toggleCompletion, totalCompleted, progressValue } = useCompletionState(totalQuestions);

  const filteredSections = useMemo(() => {
    if (!searchTerm) {
      return allQuestionSections;
    }
    return allQuestionSections
      .map(section => ({
        ...section,
        questions: section.questions.filter(q =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(section => section.questions.length > 0);
  }, [searchTerm]);

  const createMarkup = (markdown: string) => {
    return { __html: converter.makeHtml(markdown) };
  };

  return (
    <div className="space-y-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">DSS QuickStart Guides</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            A searchable collection of guides to common questions and challenges
            in Dataiku DSS. Mark questions as complete to track your progress.
          </p>
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="progress">Your Progress</Label>
              <span className="text-sm font-medium text-muted-foreground">
                {totalCompleted} / {totalQuestions} completed
              </span>
            </div>
            <Progress id="progress" value={progressValue} className="w-full" />
          </div>
        </CardContent>
      </Card>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search all questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      <div className="space-y-12">
        {filteredSections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">{section.title}</h2>
            <div className="space-y-4">
              {section.questions.map((q, index) => (
                <Card id={q.slug} key={q.id} className={completedQuestions.has(q.id) ? 'bg-muted/50' : ''}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                       <div className="flex items-center h-full pt-1">
                        <Checkbox 
                          id={`complete-${q.id}`} 
                          checked={completedQuestions.has(q.id)}
                          onCheckedChange={() => toggleCompletion(q.id)}
                        />
                       </div>
                      <div className="flex-1">
                        <Label htmlFor={`complete-${q.id}`} className="cursor-pointer">
                          <CardTitle className={`text-lg ${completedQuestions.has(q.id) ? 'line-through text-muted-foreground' : ''}`}>
                             {q.id}. {q.question}
                          </CardTitle>
                        </Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-sm max-w-none prose-h3:text-base prose-h3:font-semibold prose-pre:bg-card prose-pre:text-card-foreground prose-code:text-foreground"
                      dangerouslySetInnerHTML={createMarkup(q.answer)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No questions found for your search term.
        </p>
      )}
    </div>
  );
}
