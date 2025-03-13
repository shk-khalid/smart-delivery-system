import React from 'react';

export const LoadingPulse: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 bg-gradient-to-br from-primary-300 to-primary-500 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] shadow-lg shadow-primary-500/30"
          style={{
            animationDelay: `${i * 300}ms`,
            transform: 'scale(0.85)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        >
          <div 
            className="absolute inset-0 rounded-full bg-primary-400/30 animate-ping"
            style={{ animationDelay: `${i * 300}ms` }}
          />
        </div>
      ))}
    </div>
  );
};