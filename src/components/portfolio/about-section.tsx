import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutSection() {
  return (
    <section id="about">
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Marketing science and Data professional with 6 years of experience, specializing in workflow creation for DataOps. Proficient in Datorama and advanced Excel VBA macros to build automated reporting systems and streamline marketing data operations. Skilled at optimizing data pipelines, enhancing campaign performance, and enabling data-driven decisions across cross-functional marketing teams. Known for bridging the gap between data engineering and strategic marketing execution.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
