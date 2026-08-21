import React from 'react';

export function GlassButton({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  ...props
}) {
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2.5 px-4',
    lg: 'text-base py-3.5 px-6 font-bold'
  }[size] || 'text-sm py-2.5 px-4';

  let variantClass = 'glass-btn-primary';
  if (variant === 'secondary') variantClass = 'glass-btn-secondary';
  if (variant === 'whatsapp') variantClass = 'glass-btn-whatsapp';
  if (variant === 'danger') variantClass = 'glass-btn-danger';
  if (variant === 'ghost') variantClass = 'glass-btn-ghost';

  return (
    <button
      type={type}
      className={`glass-btn ${variantClass} ${sizeClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
    </button>
  );
}
