import Link from 'next/link';
import { UserCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold group">
            <UserCircle className="w-7 h-7 text-primary transition-transform group-hover:rotate-[-5deg]" />
            <span className="text-foreground">Rajure Ajay Kumar</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
