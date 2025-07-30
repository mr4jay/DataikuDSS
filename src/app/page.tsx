
import { Phone, Mail, Linkedin, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortfolioPage() {
  const experiences = [
    {
      role: 'Senior Analyst',
      company: 'Omnicom Media Group India PVT Ltd',
      location: 'Hyderabad',
      period: 'September 2023 – Present',
      points: [
        'Architected and maintained enterprise-grade reporting ecosystems using Salesforce Datorama, supporting real-time insights for over 800 marketing campaigns.',
        'Led the full implementation cycle of Datorama solutions — from initial data source mapping to final dashboard delivery — significantly reducing report turnaround time by 70%.',
        'Developed and optimized Data Streams to connect with diverse data sources such as Google Ads, Meta, Amazon, and CRM systems using TotalConnect, LiteConnect, and API integrations.',
        'Standardized data with Harmonization Center, building custom mapping logic to unify disparate campaign naming conventions, dimensions, and KPI structures across brands.',
        'Created advanced calculated fields and metrics using the Data Model Editor, enabling granular performance breakdowns by channel, geography, product line, and audience segments.',
        'Designed dynamic dashboards for stakeholders across media planning, client services, and strategy teams, tailoring views to suit each department’s KPIs.',
        'Enabled marketing performance storytelling through custom visualizations, drill-down capabilities, and interactive report flows for executive-level and tactical users.',
        'Trained and mentored junior analysts on best practices for Datorama configuration, data architecture planning, and KPI governance.',
        'Partnered with global teams to scale reporting templates across multiple regions, ensuring global alignment while allowing for local customization.',
      ],
    },
    {
      role: 'Freelance Data Analyst',
      company: 'Various Clients',
      location: 'Hyderabad',
      period: 'October 2022 – July 2023',
      points: [
        'Installed and maintained standalone application of Dataiku DSS in VM, handling various admin responsibilities.',
        'Streamlined Tableau Dashboard refreshing process, reducing data analysis time by 50%.',
        'Executed multiple Machine Learning proof-of-concepts (POCs) resulting in improved business insights.',
        'Implemented machine learning models in production using Dataiku DSS.',
        'Conducted comprehensive data quality assessments and implemented cleansing techniques, improving accuracy and reliability of analysis.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Technvision Ventures Limited',
      location: 'Hyderabad',
      period: 'June 2022 – September 2022',
      points: [
        'Streamlined Tableau Dashboard refreshing process, reducing data analysis time by 50%.',
        'Executed multiple Machine Learning proof-of-concepts (POCs) resulting in improved business insights.',
        'Implemented machine learning models in production using Dataiku DSS.',
        'Collaborated cross-functionally to identify and translate business requirements into visually appealing Tableau Dashboards.',
      ],
    },
    {
      role: 'Data Scientist',
      company: 'Team Lease Pvt. Ltd. (Client: Novartis)',
      location: 'Hyderabad',
      period: 'May 2021 – May 2022',
      points: [
        'Migrated Alteryx workflows to Dataiku DSS, improving workflow efficiency by 70%.',
        'Managed planning and development of metrics reports for three brands.',
        'Explored, developed, deployed, and evaluated customer-centric digital innovation solutions.',
        'Developed and deployed predictive models, resulting in a 20% increase in customer retention rates.',
      ],
    },
    {
      role: 'Data Analyst',
      company: 'Spoors Technologies',
      location: 'Hyderabad',
      period: 'Sept 2018 – Mar 2021',
      points: [
        'Created analytical reports using Alteryx DSS, improving data accuracy by 25%.',
        'Optimized data collection procedures, reducing report generation time by 20%.',
        'Evaluated Customer/products/forecast data for actionable insights.',
        'Delivered customized reports and ad-hoc analyses, enhancing data-driven decision-making.',
      ],
    },
  ];

  const skills = [
    'Datorama', 'Marketing Science', 'Data Analysis', 'Machine Learning', 
    'Dataiku DSS', 'Tableau', 'Alteryx Studio', 'Advanced Excel & VBA', 
    'Google Ads', 'CM360', 'DV360', 'IAS (Brand Safety)', 'Double Verify', 
    'Social Ad Platforms', 'SQL', 'DataOps', 'ETL'
  ];

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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-background text-foreground font-body">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-4xl font-bold text-primary">RAJURE AJAY KUMAR</h1>
          <p className="text-lg text-muted-foreground">Marketing Science & Data Professional</p>
        </div>
        <div className="flex flex-col items-center md:items-end space-y-2 text-sm">
          <a href="mailto:rajaykumar5555@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            <span>rajaykumar5555@gmail.com</span>
          </a>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>+91 7416001503</span>
          </div>
        </div>
      </header>

      <main className="space-y-12">
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

        <section id="experience">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">Work Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-2">
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <p className="text-lg text-primary font-medium">{exp.company} | {exp.location}</p>
                <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                  {exp.points.map((point, pIndex) => (
                    <li key={pIndex}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
            ))}
          </div>
        </section>

        <section id="education">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row justify-between items-baseline">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                </div>
                <p className="text-muted-foreground">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
