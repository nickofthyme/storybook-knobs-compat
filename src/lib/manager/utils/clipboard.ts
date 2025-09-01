export async function copyToClipboard(text: string): Promise<boolean> {
  // Try Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopyToClipboard(text);
    }
  }
  // Fallback if Clipboard API is not available
  return fallbackCopyToClipboard(text);
}

function fallbackCopyToClipboard(text: string): boolean {
  try {
    // Create a temporary textarea element
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Prevent scrolling
    textarea.style.opacity = '0'; // Make it invisible
    document.body.appendChild(textarea);

    // Select the text
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length); // For mobile devices

    // Execute copy command
    const success: boolean = document.execCommand('copy');

    // Clean up
    document.body.removeChild(textarea);

    if (success) {
      return true;
    } else {
      console.error('Fallback copy failed');
      return false;
    }
  } catch (err: unknown) {
    console.error('Fallback copy failed:', err);
    return false;
  }
}
