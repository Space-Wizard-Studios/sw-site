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
    hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

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

export function darkenColor(hexColor: string, amount: number = 20): string {
    if (!hexColor) return '#000000'; // Cor padrão / fallback

    let color = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
    // Expande cores hex de 3 caracteres para 6 caracteres
    if (color.length === 3) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }

    if (color.length !== 6) {
        console.warn(`Formato de cor hexadecimal inválido: ${hexColor}`);
        return '#000000'; // Retorna uma cor padrão para formatos inválidos
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) - amount;
    let g = ((num >> 8) & 0x00ff) - amount;
    let b = (num & 0x0000ff) - amount;

    // Garante que os valores não sejam menores que 0
    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);

    // Converte de volta para string hexadecimal
    const newColor = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    return newColor;
}
