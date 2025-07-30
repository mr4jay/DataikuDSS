export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DSS QuickStart Guides. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
