import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const rawPathnames = location.pathname.split('/').filter((x) => x);

  // Detect patient history page
  const isPatientHistory =
    rawPathnames[0] === 'doctor' &&
    rawPathnames.includes('history');

  const pathnames = rawPathnames.filter((segment) => {
    // On patient history page, only keep doctor and history
    if (isPatientHistory) {
      return segment === 'doctor' || segment === 'history';
    }
    return true;
  });

  const formatLabel = (path: string) => {
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link to="/" className="hover:text-secondary transition-colors">
        <Home className="h-4 w-4" />
      </Link>

      {pathnames.map((path, index) => {
        let to = `/${pathnames.slice(0, index + 1).join('/')}`;

        if (path === 'doctor') {
          to = '/doctor/dashboard';
        }

        const isLast = index === pathnames.length - 1;

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-secondary font-medium">
                {formatLabel(path)}
              </span>
            ) : (
              <Link to={to} className="hover:text-secondary transition-colors">
                {formatLabel(path)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
