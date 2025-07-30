import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export function Readme() {
  return (
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl text-primary">
          <Info className="h-7 w-7" />
          <span>Welcome to the DSS QuickStart Guides</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground">
          This is your one-stop documentation hub for Dataiku DSS 'How to get started with' questions.
          Browse the list of frequently asked questions below or use the search bar to filter them in real-time.
          Click any question to see a detailed answer and discover AI-powered suggestions for related topics.
        </p>
      </CardContent>
    </Card>
  );
}
