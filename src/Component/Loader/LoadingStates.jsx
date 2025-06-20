import React from 'react';
import Loader from './Loader';

// Content loading skeleton
export const ContentSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-white/10 rounded w-3/4"></div>
    <div className="h-4 bg-white/10 rounded w-1/2"></div>
    <div className="h-4 bg-white/10 rounded w-5/6"></div>
  </div>
);

// Memory card skeleton
export const MemoryCardSkeleton = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 animate-pulse">
    <div className="aspect-square bg-white/10"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-white/10 rounded w-3/4"></div>
      <div className="h-3 bg-white/10 rounded w-1/2"></div>
      <div className="flex space-x-4">
        <div className="h-3 bg-white/10 rounded w-12"></div>
        <div className="h-3 bg-white/10 rounded w-12"></div>
      </div>
    </div>
  </div>
);

// Vault card skeleton
export const VaultCardSkeleton = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 animate-pulse">
    <div className="h-48 bg-white/10"></div>
    <div className="p-6 space-y-4">
      <div className="h-5 bg-white/10 rounded w-3/4"></div>
      <div className="flex justify-between">
        <div className="h-3 bg-white/10 rounded w-20"></div>
        <div className="h-3 bg-white/10 rounded w-16"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-1 bg-white/10 rounded w-16"></div>
        <div className="h-3 bg-white/10 rounded w-20"></div>
      </div>
    </div>
  </div>
);

// Loading overlay for existing content
export const LoadingOverlay = ({ 
  isLoading, 
  children 
}) => (
  <div className="relative">
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
        <Loader variant="processing" text="Processing..." />
      </div>
    )}
  </div>
);

// Grid loading state
export const GridLoadingState = ({ 
  count = 6, 
  type = 'memory' 
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }, (_, i) => (
      <div key={i}>
        {type === 'memory' ? <MemoryCardSkeleton /> : <VaultCardSkeleton />}
      </div>
    ))}
  </div>
);

// List loading state
export const ListLoadingState = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white/10 rounded-lg"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
            <div className="flex space-x-4">
              <div className="h-3 bg-white/10 rounded w-12"></div>
              <div className="h-3 bg-white/10 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Button loading state
export const ButtonLoader = ({ 
  isLoading, 
  children, 
  className = '' 
}) => (
  <button className={`relative ${className} ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`} disabled={isLoading}>
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader size="small" variant="minimal" />
      </div>
    )}
    <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
      {children}
    </span>
  </button>
);