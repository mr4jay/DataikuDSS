'use client';
import { useState, useEffect, useMemo } from 'react';
import { allQuestions, type Question } from '@/lib/questions';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import showdown from 'showdown';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

// Custom hook to manage completion state with localStorage
function useCompletionState() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Load state from localStorage on initial client-side render
    try {
      const storedCompletion = localStorage.getItem('dssQuickStartCompletion');
      if (storedCompletion) {
        setCompletedQuestions(new Set(JSON.parse(storedCompletion)));
      }
    } catch (error) {
      console.error("Failed to parse completion state from localStorage", error);
      // If parsing fails, start with a fresh state
      setCompletedQuestions(new Set());
    }
  }, []);

  const toggleCompletion = (questionId: number) => {
    setCompletedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      // Save updated state to localStorage
      localStorage.setItem('dssQuickStartCompletion', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  return { completedQuestions, toggleCompletion };
}


export function QuestionList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { completedQuestions, toggleCompletion } = useCompletionState();
  const [converter, setConverter] = useState<showdown.Converter | null>(null);

  useEffect(() => {
    // Initialize showdown converter only on the client side
    setConverter(new showdown.Converter());
  }, []);
  
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const progressValue = useMemo(() => {
    if (allQuestions.length === 0) return 0;
    return (completedQuestions.size / allQuestions.length) * 100;
  }, [completedQuestions.size]);


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
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            A searchable collection of guides to common questions and challenges
            in Dataiku DSS. Mark questions as complete to track your progress.
          </p>
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="progress">Your Progress</Label>
              <span className="text-sm font-medium text-muted-foreground">
                {completedQuestions.size} / {allQuestions.length} completed
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
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      <div className="space-y-4">
        {filteredQuestions.map((q, index) => (
          <Card key={q.id} className={completedQuestions.has(q.id) ? 'bg-muted/50' : ''}>
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
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={createMarkup(q.answer)}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No questions found.
        </p>
      )}
    </div>
  );
}