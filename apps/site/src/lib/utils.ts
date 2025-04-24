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

/**
 * Converts a HEX color string to an RGB object.
 * Supports formats like #RGB, #RRGGBB, RGB, RRGGBB.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

/**
 * Calculates the relative luminance of an RGB color.
 * Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 */
function getLuminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Determines whether black or white text provides better contrast against a given background color.
 * Returns 'black' or 'white'.
 */
export function getContrastColor(hexColor: string): 'black' | 'white' {
    const rgb = hexToRgb(hexColor);
    if (!rgb) {
        return 'black'; // Default to black if color is invalid
    }
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
    // Threshold can be adjusted, 0.5 is common but WCAG suggests ~0.179 for contrast ratio calculations
    return luminance > 0.2 ? 'black' : 'white';
}