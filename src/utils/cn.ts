import { twMerge } from 'tailwind-merge';

type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Conditional class name joiner with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  const flatten = (value: ClassValue): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value.flatMap(flatten);
    return [String(value)];
  };
  return twMerge(inputs.flatMap(flatten).join(' '));
}