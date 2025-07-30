import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const education = [
  {
    degree: 'Bachelor of Technology - Information Technology',
    institution: 'Gurunanak Institute of Technology',
    year: '2018',
  },
  {
    degree: 'Intermediate (+12)',
    institution: 'Sri Chaitanya Jr College',
    year: '2014',
  },
  {
    degree: 'High School',
    institution: 'Loyola High School',
    year: '2012',
  },
];

export function EducationSection() {
  return (
    <section id="education">
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row justify-between items-baseline">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.year}</p>
              </div>
              <p className="text-muted-foreground">{edu.institution}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
