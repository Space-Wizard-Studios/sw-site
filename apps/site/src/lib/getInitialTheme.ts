/**
 * Gets the initial theme based on localStorage or system preference
 */
export function getInitialTheme(): string {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
        // First check localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // If no saved preference, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    // Default to light if not in browser
    return 'light';
}

/**
 * Applies the theme to the document
 */
export function applyTheme(theme: string): void {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
