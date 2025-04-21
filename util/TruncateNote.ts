export const truncateText = (text: string, width: number, maxHeight: number) => {
    // Approximate characters per line based on width
    const avgCharWidth = 10;
    const charsPerLine = Math.floor((width - 32) / avgCharWidth); // 32px accounts for padding
    const titleHeight = 24;
    const lineHeight = 20;
    const availableHeight = maxHeight - titleHeight - 24; // 24px for padding (top+bottom)
    const maxLines = Math.floor(availableHeight / lineHeight);

    // Calculate total characters that would fit
    const maxChars = charsPerLine * maxLines;

    // Apply a simple maximum character limit as a secondary constraint
    const absoluteMaxChars = 130;
    const effectiveMaxChars = Math.min(maxChars, absoluteMaxChars);

    if (text.length > effectiveMaxChars) {
        return text.substring(0, effectiveMaxChars - 3) + "...";
    }
    return text;
};

export default truncateText;
