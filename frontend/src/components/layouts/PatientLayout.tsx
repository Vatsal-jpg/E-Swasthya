import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Brain,
  FileText,
  Video,
  MapPin,
  QrCode,
  Pill,
  Clock,
  BookOpen,
  HelpCircle,
  User,
  Menu,
  X,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import Logo from '@/components/shared/Logo';
import NotificationBell from '@/components/shared/NotificationBell';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const patientNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/patient/dashboard' },
  { icon: Brain, label: 'AI Prediction', path: '/patient/ai-prediction' },
  { icon: FileText, label: 'Reports', path: '/patient/reports' },
  { icon: Video, label: 'Video Call', path: '/patient/video-call/dashboard' },
  { icon: MapPin, label: 'Nearby Clinics', path: '/patient/nearby-clinics' },
  // { icon: QrCode, label: 'Health Passport', path: '/patient/health-passport' },
  { icon: Clock, label: 'Follow-ups', path: '/patient/follow-ups' },
  { icon: Pill, label: 'Medicine Reminder', path: '/patient/medicine-reminder' },
  { icon: BookOpen, label: 'Health Library', path: '/patient/health-library' },
  { icon: HelpCircle, label: 'Support', path: '/patient/support' },
  { icon: User, label: 'Profile', path: '/patient/profile' },
];

interface PatientLayoutProps {
  children: React.ReactNode;
}

const PatientLayout = ({ children }: PatientLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/30 flex w-full">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-secondary/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen bg-card border-r transition-all duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Logo showText={!sidebarCollapsed} size="sm" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex"
          >
            <ChevronLeft className={cn('h-4 w-4 transition-transform', sidebarCollapsed && 'rotate-180')} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {patientNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                isActive(item.path)
                  ? 'bg-secondary text-secondary-foreground shadow-button'
                  : 'text-muted-foreground hover:bg-accent hover:text-secondary'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t">
          <Link
            to="/"
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200'
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-secondary hidden sm:block">
                Patient Portal
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <NotificationBell />
              <Link to="/patient/profile">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-5 w-5 text-secondary" />
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
