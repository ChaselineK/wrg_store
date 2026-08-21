import React from 'react';

export function Badge({
  children,
  variant = 'default', // 'default' | 'emerald' | 'amber' | 'cyan' | 'ruby'
  icon: Icon,
  className = '',
  size = 'sm'
}) {
  const variantClass = {
    default: '',
    emerald: 'glass-badge-emerald',
    amber: 'glass-badge-amber',
    cyan: 'glass-badge-cyan',
    ruby: ''
  }[variant] || '';

  return (
    <span
      className={`glass-badge ${variantClass} ${className}`}
      style={{
        fontSize: size === 'xs' ? '0.7rem' : size === 'md' ? '0.85rem' : '0.75rem',
        padding: size === 'xs' ? '0.15rem 0.5rem' : size === 'md' ? '0.35rem 0.8rem' : '0.25rem 0.65rem'
      }}
    >
      {Icon && <Icon size={size === 'xs' ? 10 : 12} />}
      {children}
    </span>
  );
}
