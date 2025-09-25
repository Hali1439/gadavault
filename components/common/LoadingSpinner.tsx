import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'white' | 'gradient';
  className?: string;
  text?: string;
  textPosition?: 'left' | 'right' | 'top' | 'bottom';
  overlay?: boolean;
  overlayBackground?: 'blur' | 'dark' | 'light' | 'transparent';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  text,
  textPosition = 'bottom',
  overlay = false,
  overlayBackground = 'blur',
}) => {
  // Size configurations
  const sizeConfig = {
    xs: { spinner: 'w-4 h-4', text: 'text-xs' },
    sm: { spinner: 'w-6 h-6', text: 'text-sm' },
    md: { spinner: 'w-8 h-8', text: 'text-base' },
    lg: { spinner: 'w-12 h-12', text: 'text-lg' },
    xl: { spinner: 'w-16 h-16', text: 'text-xl' },
  };

  // Variant configurations
  const variantConfig = {
    default: 'text-gray-400',
    primary: 'text-purple-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    gradient: 'text-gradient-to-r from-purple-600 to-pink-600',
  };

  // Overlay background configurations
  const overlayConfig = {
    blur: 'backdrop-blur-sm bg-white/10',
    dark: 'bg-black/50',
    light: 'bg-white/80',
    transparent: 'bg-transparent',
  };

  // Text position configurations
  const textPositionConfig = {
    left: 'flex-row-reverse',
    right: 'flex-row',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };

  const spinnerContent = (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeConfig[size].spinner,
        variant === 'gradient' 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
          : variantConfig[variant],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  const content = text ? (
    <div
      className={cn(
        'flex items-center justify-center gap-3',
        textPositionConfig[textPosition]
      )}
    >
      {spinnerContent}
      <span
        className={cn(
          'text-gray-600 font-medium',
          sizeConfig[size].text
        )}
      >
        {text}
      </span>
    </div>
  ) : (
    spinnerContent
  );

  if (overlay) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          overlayConfig[overlayBackground]
        )}
      >
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

// Dot spinner variant for inline loading
export const DotSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'white';
  className?: string;
}> = ({ size = 'md', color = 'default', className }) => {
  const dotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  const dotColor = {
    default: 'bg-gray-400',
    primary: 'bg-purple-600',
    white: 'bg-white',
  };

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-bounce',
            dotSize[size],
            dotColor[color]
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
};

// Skeleton loader for content placeholders
export const SkeletonLoader: React.FC<{
  type?: 'text' | 'image' | 'card' | 'circle';
  className?: string;
  lines?: number;
}> = ({ type = 'text', className, lines = 3 }) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  if (type === 'circle') {
    return (
      <div
        className={cn(
          baseClasses,
          'w-12 h-12 rounded-full',
          className
        )}
      />
    );
  }

  if (type === 'image') {
    return (
      <div
        className={cn(
          baseClasses,
          'w-full aspect-video',
          className
        )}
      />
    );
  }

  if (type === 'card') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className={cn(baseClasses, 'w-full h-48')} />
        <div className="space-y-2">
          <div className={cn(baseClasses, 'h-4 w-3/4')} />
          <div className={cn(baseClasses, 'h-4 w-1/2')} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={cn(
            baseClasses,
            'h-4',
            i === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  );
};

// Page loader for full-page loading states
export const PageLoader: React.FC<{
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}> = ({ title = "Loading", subtitle = "Please wait...", showLogo = true }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      {showLogo && (
        <div className="mb-8 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GadaVault
          </span>
        </div>
      )}
      
      <LoadingSpinner 
        size="xl" 
        variant="gradient" 
        text={title}
        textPosition="bottom"
      />
      
      {subtitle && (
        <p className="mt-4 text-gray-600 text-lg">{subtitle}</p>
      )}
      
      <div className="mt-8 flex space-x-2">
        <DotSpinner color="primary" size="md" />
      </div>
    </div>
  );
};

export default LoadingSpinner;