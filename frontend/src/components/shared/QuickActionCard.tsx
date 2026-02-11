import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  to: string;
  variant?: 'default' | 'primary' | 'accent';
}

const QuickActionCard = ({
  icon: Icon,
  title,
  description,
  to,
  variant = 'default',
}: QuickActionCardProps) => {
  const variantStyles = {
    default: 'bg-card hover:bg-accent/50 border shadow-card',
    primary: 'bg-secondary text-secondary-foreground hover:brightness-110 shadow-button',
    accent: 'bg-primary hover:bg-primary/80 border shadow-card',
  };

  return (
    <Link
      to={to}
      className={cn(
        'flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-200 hover:shadow-hover hover:-translate-y-1',
        variantStyles[variant]
      )}
    >
      <div
        className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-3', {
          'bg-primary/50': variant === 'default',
          'bg-secondary-foreground/20': variant === 'primary',
          'bg-secondary/10': variant === 'accent',
        })}
      >
        <Icon
          className={cn('h-7 w-7', {
            'text-secondary': variant === 'default' || variant === 'accent',
            'text-secondary-foreground': variant === 'primary',
          })}
        />
      </div>
      <h3
        className={cn('font-semibold text-center', {
          'text-secondary': variant === 'default' || variant === 'accent',
          'text-secondary-foreground': variant === 'primary',
        })}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn('text-sm text-center mt-1', {
            'text-muted-foreground': variant === 'default' || variant === 'accent',
            'text-secondary-foreground/70': variant === 'primary',
          })}
        >
          {description}
        </p>
      )}
    </Link>
  );
};

export default QuickActionCard;
