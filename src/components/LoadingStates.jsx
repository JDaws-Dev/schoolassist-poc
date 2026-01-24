import React from 'react';

// Simple spinning loader
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        className="animate-spin"
        style={{ color: 'var(--color-accent, #7cb342)' }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

// Skeleton loading placeholder
export const Skeleton = ({ className = '', variant = 'text' }) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  const variantClasses = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full rounded-xl',
    button: 'h-10 w-24 rounded-lg',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
};

// Card skeleton for loading lists
export const CardSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton variant="avatar" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="title" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </div>
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-4/5 mt-2" />
        </div>
      ))}
    </div>
  );
};

// Chat message skeleton
export const ChatSkeleton = () => {
  return (
    <div className="space-y-3 p-4">
      <div className="flex gap-3">
        <Skeleton variant="avatar" className="w-8 h-8" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <div className="flex-1 space-y-2 max-w-[70%]">
          <Skeleton variant="text" />
        </div>
      </div>
    </div>
  );
};

// Full page loading state
export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Spinner size="xl" />
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
};

// Inline loading indicator
export const InlineLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <Spinner size="sm" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default {
  Spinner,
  Skeleton,
  CardSkeleton,
  ChatSkeleton,
  PageLoader,
  InlineLoader,
};
