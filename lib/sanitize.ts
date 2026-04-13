/**
 * Strips HTML tags and dangerous characters from user input
 * to prevent XSS injection in emails.
 */
export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/** Strips ALL HTML tags entirely — for plain-text fields */
export function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}
