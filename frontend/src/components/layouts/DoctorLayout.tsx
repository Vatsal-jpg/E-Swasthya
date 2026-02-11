import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Video,
  Users,
  FileText,
  Clock,
  User,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  Stethoscope,
  QrCode, // Added QR Code icon
} from 'lucide-react';
import Logo from '@/components/shared/Logo';
import NotificationBell from '@/components/shared/NotificationBell';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const doctorNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor/dashboard' },
  { icon: Calendar, label: 'Calendar', path: '/doctor/calendar' },
  { icon: Video, label: 'Video Call', path: '/doctor/video-call/dashboard' },
  { icon: Users, label: 'Patient History', path: '/doctor/patient/p1/history' },
  { icon: FileText, label: 'Reports', path: '/doctor/reports' },
  { icon: Clock, label: 'Follow-ups', path: '/doctor/follow-ups' },
  { icon: QrCode, label: 'Scan Patient QR', path: '/doctor/scan-patient' }, // New QR Scanner item
  { icon: User, label: 'Profile', path: '/doctor/profile' },
];

interface DoctorLayoutProps {
  children: React.ReactNode;
}

const DoctorLayout = ({ children }: DoctorLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

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
          {doctorNavItems.map((item) => (
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
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-secondary" />
                <h1 className="text-lg font-semibold text-secondary hidden sm:block">
                  Doctor Portal
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NotificationBell />
              <Link to="/doctor/profile">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-secondary-foreground" />
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

export default DoctorLayout;