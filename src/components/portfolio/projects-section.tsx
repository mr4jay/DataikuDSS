import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, Cpu } from 'lucide-react';

const projects = [
  {
    title: 'Dataiku DSS Workflow Migration & Optimization',
    icon: Briefcase,
    description: 'Led a successful migration of complex data workflows from Alteryx to Dataiku DSS, resulting in a 70% improvement in workflow efficiency and maintainability.',
    tags: ['Dataiku DSS', 'Alteryx', 'ETL', 'Workflow Automation']
  },
  {
    title: 'Production ML Model Deployment',
    icon: Cpu,
    description: 'Implemented and deployed multiple machine learning models into production environments using Dataiku DSS, enabling predictive analytics for customer retention and business insights.',
    tags: ['Dataiku DSS', 'Machine Learning', 'MLOps', 'Predictive Modeling']
  },
  {
    title: 'Dataiku DSS Administration',
    icon: Building,
    description: 'Managed the installation and administration of a standalone Dataiku DSS application within a virtual machine, handling all aspects of system maintenance, user management, and security.',
    tags: ['Dataiku DSS', 'System Administration', 'VM', 'DataOps']
  }
];

export function ProjectsSection() {
  return (
    <section id="projects">
      <Card>
        <CardHeader>
          <CardTitle>Dataiku DSS Projects</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <project.icon className="h-6 w-6 text-primary" />
                  <span>{project.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant={tag === 'Dataiku DSS' ? 'default' : 'secondary'} className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
