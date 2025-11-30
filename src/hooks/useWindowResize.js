import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useWindowResize = (windowRef, initialWidth = 800, initialHeight = 500) => {
    const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });
    const [isResizing, setIsResizing] = useState(false);
    const resizeStartRef = useRef(null);
    const startDimensionsRef = useRef(null);

    const MIN_WIDTH = 420;
    const MIN_HEIGHT = 300;

    const startResize = (e, corner) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!windowRef.current) return;

        setIsResizing(true);
        const rect = windowRef.current.getBoundingClientRect();
        
        resizeStartRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            corner,
        };

        startDimensionsRef.current = {
            width: rect.width,
            height: rect.height,
            x: rect.left,
            y: rect.top,
        };
    };

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e) => {
            if (!windowRef.current || !resizeStartRef.current || !startDimensionsRef.current) return;

            const deltaX = e.clientX - resizeStartRef.current.startX;
            const deltaY = e.clientY - resizeStartRef.current.startY;
            const corner = resizeStartRef.current.corner;

            const startDim = startDimensionsRef.current;
            let newWidth = startDim.width;
            let newHeight = startDim.height;
            let newX = startDim.x;
            let newY = startDim.y;

            // Calculate new dimensions based on corner/edge
            if (corner === 'nw') {
                newWidth = startDim.width - deltaX;
                newHeight = startDim.height - deltaY;
                newX = startDim.x + deltaX;
                newY = startDim.y + deltaY;
            } else if (corner === 'ne') {
                newWidth = startDim.width + deltaX;
                newHeight = startDim.height - deltaY;
                newY = startDim.y + deltaY;
            } else if (corner === 'sw') {
                newWidth = startDim.width - deltaX;
                newHeight = startDim.height + deltaY;
                newX = startDim.x + deltaX;
            } else if (corner === 'se') {
                newWidth = startDim.width + deltaX;
                newHeight = startDim.height + deltaY;
            } else if (corner === 'n') {
                newHeight = startDim.height - deltaY;
                newY = startDim.y + deltaY;
            } else if (corner === 's') {
                newHeight = startDim.height + deltaY;
            } else if (corner === 'w') {
                newWidth = startDim.width - deltaX;
                newX = startDim.x + deltaX;
            } else if (corner === 'e') {
                newWidth = startDim.width + deltaX;
            }

            // Apply minimum constraints
            if (newWidth < MIN_WIDTH) {
                newWidth = MIN_WIDTH;
                if (corner === 'nw' || corner === 'sw' || corner === 'w') {
                    newX = startDim.x + startDim.width - MIN_WIDTH;
                }
            }

            if (newHeight < MIN_HEIGHT) {
                newHeight = MIN_HEIGHT;
                if (corner === 'nw' || corner === 'ne' || corner === 'n') {
                    newY = startDim.y + startDim.height - MIN_HEIGHT;
                }
            }

            // Update dimensions
            setDimensions({
                width: newWidth,
                height: newHeight,
            });

            // Update window position
            gsap.set(windowRef.current, {
                width: newWidth,
                height: newHeight,
                x: newX - startDim.x, // Convert to relative position
                y: newY - startDim.y,
            });

            // Update blur and shadow
            gsap.to(windowRef.current, {
                filter: 'blur(0.5px)',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            resizeStartRef.current = null;
            startDimensionsRef.current = null;

            // Smooth out the blur after resize
            if (windowRef.current) {
                gsap.to(windowRef.current, {
                    filter: 'blur(0px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.32)',
                    duration: 0.2,
                    ease: 'power2.out',
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return {
        dimensions,
        isResizing,
        startResize,
    };
};
