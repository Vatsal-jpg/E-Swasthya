import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { mockNotifications } from '@/data/mockData';
import { cn } from '@/lib/utils';

const NotificationBell = () => {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-info/10 text-info';
      case 'medicine':
        return 'bg-warning/10 text-warning';
      case 'report':
        return 'bg-success/10 text-success';
      case 'alert':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                'p-4 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer',
                !notification.read && 'bg-primary/30'
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'px-2 py-1 rounded-md text-xs font-medium capitalize',
                    getTypeColor(notification.type)
                  )}
                >
                  {notification.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t">
          <Button variant="ghost" className="w-full" size="sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
