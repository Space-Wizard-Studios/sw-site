import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using `clsx` and merges Tailwind CSS classes using `twMerge`.
 *
 * @param {...ClassValue[]} inputs - The class names to combine and merge.
 * @returns {string} The combined and merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
