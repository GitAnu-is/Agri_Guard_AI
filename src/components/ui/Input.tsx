import React, { useId } from 'react';
import { AlertCircleIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const controlBase =
'w-full rounded-lg border bg-white text-sm text-leaf-900 placeholder:text-earth-400 transition-[border-color,box-shadow] duration-150 ease-out disabled:bg-earth-50 disabled:text-earth-500';

/** Shared label / hint / error wrapper for every form control. */
export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  suffix,
  children,
  className









}: {label: string;htmlFor?: string;hint?: string;error?: string;required?: boolean;suffix?: React.ReactNode;children: React.ReactNode;className?: string;}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-[13px] font-medium text-leaf-900">
          {label}
          {required &&
          <span className="ml-0.5 text-risk-600" aria-hidden="true">
              *
            </span>
          }
        </label>
        {suffix}
      </div>
      {children}
      {error ?
      <p className="flex items-start gap-1.5 text-xs font-medium text-risk-700">
          <AlertCircleIcon className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p> :
      hint ?
      <p className="text-xs text-earth-600">{hint}</p> :
      null}
    </div>);

}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  unit?: string;
  icon?: React.ReactNode;
  /** Applied to the label + control wrapper (use for grid spans). */
  wrapperClassName?: string;
}

export function Input({ label, hint, error, unit, icon, className, id, required, wrapperClassName, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const control =
  <div className="relative">
      {icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-earth-500">{icon}</span>}
      <input
      id={inputId}
      required={required}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${inputId}-error` : undefined}
      className={cn(
        controlBase,
        'h-10 px-3',
        icon && 'pl-9',
        unit && 'pr-14',
        error ? 'border-risk-400 focus:border-risk-500' : 'border-earth-200 focus:border-leaf-500',
        className
      )}
      {...rest} />
    
      {unit &&
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-earth-500">{unit}</span>
    }
    </div>;


  if (!label) return control;
  return (
    <FormField label={label} htmlFor={inputId} hint={hint} error={error} required={required} className={wrapperClassName}>
      {control}
    </FormField>);

}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: {value: string;label: string;}[];
  /** Applied to the label + control wrapper (use for grid spans). */
  wrapperClassName?: string;
}

export function Select({ label, hint, error, options, className, id, required, wrapperClassName, ...rest }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const control =
  <div className="relative">
      <select
      id={selectId}
      required={required}
      aria-invalid={Boolean(error)}
      className={cn(
        controlBase,
        'h-10 appearance-none pl-3 pr-9',
        error ? 'border-risk-400 focus:border-risk-500' : 'border-earth-200 focus:border-leaf-500',
        className
      )}
      {...rest}>
      
        {options.map((o) =>
      <option key={o.value} value={o.value}>
            {o.label}
          </option>
      )}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-500" aria-hidden="true" />
    </div>;


  if (!label) return control;
  return (
    <FormField label={label} htmlFor={selectId} hint={hint} error={error} required={required} className={wrapperClassName}>
      {control}
    </FormField>);

}

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  error?: string;
}

export function DatePicker({ label, hint, error, className, id, required, ...rest }: DatePickerProps) {
  const autoId = useId();
  const dateId = id ?? autoId;
  const control =
  <input
    id={dateId}
    type="date"
    required={required}
    aria-invalid={Boolean(error)}
    className={cn(
      controlBase,
      'h-10 px-3',
      error ? 'border-risk-400 focus:border-risk-500' : 'border-earth-200 focus:border-leaf-500',
      className
    )}
    {...rest} />;


  if (!label) return control;
  return (
    <FormField label={label} htmlFor={dateId} hint={hint} error={error} required={required}>
      {control}
    </FormField>);

}

export function Checkbox({ label, id, ...rest }: {label: string;} & React.InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId();
  const boxId = id ?? autoId;
  return (
    <div className="flex items-center gap-2">
      <input
        id={boxId}
        type="checkbox"
        className="h-4 w-4 rounded border-earth-300 text-leaf-700 transition-colors duration-150 ease-out focus:ring-leaf-500"
        {...rest} />
      
      <label htmlFor={boxId} className="text-sm text-earth-700">
        {label}
      </label>
    </div>);

}