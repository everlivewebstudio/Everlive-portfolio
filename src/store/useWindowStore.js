import { create } from 'zustand';

export const useWindowStore = create((set) => ({
    openWindows: [], // Array of window IDs
    activeWindowId: null,
    windowPositions: {}, // Map of window ID to {x, y}

    openWindow: (id) => set((state) => {
        // If already open, bring to front (move to end)
        if (state.openWindows.includes(id)) {
            const newOrder = state.openWindows.filter(w => w !== id).concat(id);
            return {
                openWindows: newOrder,
                activeWindowId: id
            };
        }
        // If new, add to end
        return {
            openWindows: [...state.openWindows, id],
            activeWindowId: id
        };
    }),

    closeWindow: (id) => set((state) => {
        const newWindows = state.openWindows.filter((w) => w !== id);
        // Focus the last window in the new list if available
        const newActiveId = newWindows.length > 0 ? newWindows[newWindows.length - 1] : null;

        return {
            openWindows: newWindows,
            activeWindowId: newActiveId
        };
    }),

    focusWindow: (id) => set((state) => {
        if (state.activeWindowId === id) return {}; // No change needed

        // Move to end of array to ensure highest z-index in DOM
        const newOrder = state.openWindows.filter(w => w !== id).concat(id);
        return {
            openWindows: newOrder,
            activeWindowId: id
        };
    }),

    updateWindowPosition: (id, position) => set((state) => ({
        windowPositions: { ...state.windowPositions, [id]: position }
    })),

    finderPath: 'project1',
    setFinderPath: (path) => set({ finderPath: path }),
}));
