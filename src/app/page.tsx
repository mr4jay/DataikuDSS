import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortfolioHeader } from '@/components/portfolio/portfolio-header';
import { AboutSection } from '@/components/portfolio/about-section';
import { ExperienceSection } from '@/components/portfolio/experience-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { EducationSection } from '@/components/portfolio/education-section';
import { QuestionList } from '@/components/questions/question-list';

export default function PortfolioPage() {
  const portfolioContent = (
    <main className="space-y-12 mt-6">
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
    </main>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-background text-foreground font-body">
      <PortfolioHeader />
      
      <Tabs defaultValue="portfolio" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="guides">DSS QuickStart Guides</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio">
          {portfolioContent}
        </TabsContent>
        <TabsContent value="guides">
          <QuestionList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
