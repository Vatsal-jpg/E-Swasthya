import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', showText = true, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-secondary/20 blur-lg rounded-full" />
        <div className="relative bg-secondary rounded-xl p-2">
          <Heart className={`${sizeClasses[size]} text-secondary-foreground fill-current`} />
        </div>
      </div>
      {showText && (
        <span className={`font-display font-bold text-secondary ${textSizeClasses[size]}`}>
          eSwasthya
        </span>
      )}
    </Link>
  );
};

export default Logo;
