'use client';
import { useState, useEffect } from 'react';

export function useCompletionState(totalQuestions: number) {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const storedCompletion = localStorage.getItem('dssQuickStartCompletion');
      if (storedCompletion) {
        const parsed = JSON.parse(storedCompletion);
        if (Array.isArray(parsed)) {
            setCompletedQuestions(new Set(parsed));
        }
      }
    } catch (error) {
      console.error("Failed to parse completion state from localStorage", error);
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
      try {
        localStorage.setItem('dssQuickStartCompletion', JSON.stringify(Array.from(newSet)));
      } catch (error) {
        console.error("Failed to save completion state to localStorage", error);
      }
      return newSet;
    });
  };
  
  const totalCompleted = completedQuestions.size;
  const progressValue = totalQuestions > 0 ? (totalCompleted / totalQuestions) * 100 : 0;

  return { completedQuestions, toggleCompletion, totalCompleted, progressValue };
}
