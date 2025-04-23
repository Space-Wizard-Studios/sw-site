/**
 * Converts a string into a URL-friendly slug.
 *
 * @param {string} title - The string to be converted into a slug.
 * @returns {string} The slugified string.
 */
export function slugify(title: string): string {
    const slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/[ -]/g, '_');
    return slug;
}
