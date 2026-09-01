import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'ai' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const variants: Record<Variant, string> = {
  primary: 'bg-leaf-700 text-white hover:bg-leaf-800 active:bg-leaf-900 shadow-sm',
  secondary: 'bg-white text-leaf-800 border border-earth-200 hover:bg-earth-50 active:bg-earth-100 shadow-sm',
  outline: 'bg-transparent text-leaf-800 border border-leaf-300 hover:bg-leaf-50',
  ghost: 'bg-transparent text-earth-700 hover:bg-earth-100 hover:text-leaf-900',
  danger: 'bg-risk-600 text-white hover:bg-risk-700 active:bg-risk-800 shadow-sm',
  ai: 'bg-xai-600 text-white hover:bg-xai-700 active:bg-xai-800 shadow-sm'
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-[15px] gap-2 rounded-xl',
  icon: 'h-9 w-9 rounded-lg'
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {}

const base =
'inline-flex items-center justify-center font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-55 active:translate-y-px whitespace-nowrap';

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      disabled={disabled || loading}
      {...rest}>
      
      {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>);

}

export interface LinkButtonProps extends BaseProps {
  to: string;
  'aria-label'?: string;
}

export function LinkButton({ to, variant = 'primary', size = 'md', fullWidth, className, children, ...rest }: LinkButtonProps) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)} {...rest}>
      {children}
    </Link>);

}