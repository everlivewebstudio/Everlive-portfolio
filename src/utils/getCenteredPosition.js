/**
 * Calculate centered position for a window
 * @param {number} windowWidth - Width of the window
 * @param {number} windowHeight - Height of the window
 * @param {number} offsetIndex - Index for stacking offset (0 for first window, 1 for second, etc.)
 * @returns {{x: number, y: number}} - Calculated position
 */
export const getCenteredPosition = (windowWidth = 800, windowHeight = 500, offsetIndex = 0) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Account for navbar height (28px = h-7) and dock height (~95px = 4.7rem + bottom-5)
    const navbarHeight = 28;
    const dockHeight = 95;
    const availableHeight = screenHeight - navbarHeight - dockHeight;

    // Calculate center position in available space
    const centerX = (screenWidth - windowWidth) / 2;
    const centerY = navbarHeight + (availableHeight - windowHeight) / 2;

    // Add offset for multiple windows (30px per window)
    const offset = offsetIndex * 30;

    return {
        x: Math.max(20, centerX + offset),
        y: Math.max(navbarHeight + 20, centerY + offset)
    };
};
