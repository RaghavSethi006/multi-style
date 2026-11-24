import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-md space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">
          The route <code className="px-1.5 py-0.5 rounded bg-muted text-sm">{location.pathname}</code> does not exist.
        </p>
        <Button asChild className="gap-2 mt-2">
          <Link to="/">
            <ArrowLeft size={16} />
            Return to Catalog
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
