import { Phone, Mail } from 'lucide-react';

export function PortfolioHeader() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center pb-4 border-b">
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
  );
}
