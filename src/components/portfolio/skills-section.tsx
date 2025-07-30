import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skills = [
  'Datorama', 'Marketing Science', 'Data Analysis', 'Machine Learning', 
  'Dataiku DSS', 'Tableau', 'Alteryx Studio', 'Advanced Excel & VBA', 
  'Google Ads', 'CM360', 'DV360', 'IAS (Brand Safety)', 'Double Verify', 
  'Social Ad Platforms', 'SQL', 'DataOps', 'ETL'
];

export function SkillsSection() {
  return (
    <section id="skills">
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
