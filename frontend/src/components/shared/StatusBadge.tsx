import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'low' | 'medium' | 'high' | 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'low':
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'medium':
      case 'scheduled':
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'high':
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'low':
        return 'Low Risk';
      case 'medium':
        return 'Medium Risk';
      case 'high':
        return 'High Risk';
      case 'in-progress':
        return 'In Progress';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
        getStatusStyles(),
        className
      )}
    >
      <span
        className={cn('w-2 h-2 rounded-full mr-2', {
          'bg-success': status === 'low' || status === 'completed',
          'bg-warning': status === 'medium' || status === 'scheduled' || status === 'in-progress',
          'bg-destructive': status === 'high' || status === 'cancelled',
        })}
      />
      {getStatusLabel()}
    </span>
  );
};

export default StatusBadge;
