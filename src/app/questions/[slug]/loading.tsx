import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function QuestionLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4 rounded-md" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </CardContent>
      </Card>
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}
