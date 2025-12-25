import { format } from 'date-fns';

/**
 * Formats a date into a readable string including time and full date.
 * Example: "Oct 24, 2024 at 4:30 PM"
 */
export function formatMessageDate(date: Date): string {
    try {
        return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (error) {
        // Fallback if date-fns fails or date is invalid
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).format(date);
    }
}
