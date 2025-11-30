import React, { useEffect, useRef, useState } from 'react';
import { useDraggableWindow } from '@/hooks/useDraggableWindow';
import { useWindowResize } from '@/hooks/useWindowResize';
import { useWindowStore } from '@/store/useWindowStore';
import { getCenteredPosition } from '@/utils/getCenteredPosition';
import gsap from 'gsap';

const WindowFrame = ({ id, title, icon, children, initialPosition, width = 800, height = 500 }) => {
  const { closeWindow, focusWindow, activeWindowId, updateWindowPosition, windowPositions, openWindows } = useWindowStore();
  const windowRef = useRef(null);
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  const isActive = activeWindowId === id;

  const defaultPosition = getCenteredPosition(width, height, openWindows.length - 1);
  const startPos = windowPositions[id] || initialPosition || defaultPosition;

  const { position, handleMouseDown, isDragging } = useDraggableWindow(startPos, id, updateWindowPosition, windowRef);
  const { dimensions, isResizing, startResize } = useWindowResize(windowRef, width, height);

  // REAL MAC OS OPEN ANIMATION
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    el.style.display = 'flex';

    gsap.fromTo(
      el,
      { scale: 0.6, opacity: 0, y: 40, filter: 'blur(8px)' },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.45,
        ease: "back.out(1.9)",
        onStart: () => focusWindow(id),
      }
    );

    return () => gsap.killTweensOf(el);
  }, [id, focusWindow]);

  // REAL MAC OS CLOSE ANIMATION
  const handleClose = (e) => {
    e.stopPropagation();
    const el = windowRef.current;

    gsap.to(el, {
      scale: 0.65,
      opacity: 0,
      y: 10,
      duration: 0.22,
      ease: "back.in(1.7)",
      onComplete: () => {
        closeWindow(id);
        el.style.display = 'none';
      },
    });
  };

  // MAC OS MINIMIZE (GENIE STYLE)
  const handleMinimize = (e) => {
    e.stopPropagation();
    const el = windowRef.current;
    if (!el) return;

    // Get dock position (approximate center bottom)
    const dockCenterX = window.innerWidth / 2;
    const dockCenterY = window.innerHeight - 40;

    // Get current window position
    const rect = el.getBoundingClientRect();
    const windowCenterX = rect.left + rect.width / 2;
    const windowCenterY = rect.top + rect.height / 2;

    // Calculate translate to dock
    const translateX = dockCenterX - windowCenterX;
    const translateY = dockCenterY - windowCenterY;

    gsap.to(el, {
      opacity: 0,
      scaleX: 0.3,
      scaleY: 0.15,
      x: position.x + translateX,
      y: position.y + translateY,
      transformOrigin: "center center",
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => {
        closeWindow(id);
      },
    });
  };

  // MAXIMIZE / RESTORE
  const handleMaximize = (e) => {
    e.stopPropagation();
    const el = windowRef.current;
    const isMax = el.classList.contains('maximized');

    if (isMax) {
      el.classList.remove('maximized');
      gsap.to(el, {
        width,
        height,
        x: startPos.x,
        y: startPos.y,
        duration: 0.3,
        ease: "power2.inOut"
      });
    } else {
      el.classList.add('maximized');
      gsap.to(el, {
        width: window.innerWidth - 40,
        height: window.innerHeight - 100,
        x: 20,
        y: 50,
        duration: 0.35,
        ease: "power2.inOut"
      });
    }
  };

  // Update current dimensions when resize completes
  useEffect(() => {
    setCurrentWidth(dimensions.width);
    setCurrentHeight(dimensions.height);
  }, [dimensions]);

  // DRAG VISUAL FEEDBACK
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    gsap.to(el, {
      scale: isDragging || isResizing ? 0.985 : 1,
      boxShadow: isDragging || isResizing
        ? "0 20px 60px rgba(0,0,0,0.45)"
        : isActive
          ? "0 16px 40px rgba(0,0,0,0.32)"
          : "0 14px 28px rgba(0,0,0,0.18)",
      duration: 0.25,
      ease: "power2.out",
    });
  }, [isDragging, isResizing, isActive]);

  return (
    <div
      ref={windowRef}
      className="absolute rounded-2xl overflow-hidden flex flex-col group"
      style={{
        left: position.x,
        top: position.y,
        width: currentWidth,
        height: currentHeight,
        minWidth: 420,
        minHeight: 300,
        background: 'rgba(255, 255, 255, 0.63)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.22)',
        transformOrigin: "center center",
        display: "none",
        zIndex: isActive ? 60 : 15
      }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* HEADER */}
      <div
        className="h-11 flex items-center px-4 select-none border-b border-white/20 bg-white/20"
      >
        {/* Traffic lights */}
        <div className="flex space-x-2 mr-4">
          <button onClick={handleClose} className="w-3 h-3 bg-[#ff605c] rounded-full hover:brightness-110"></button>
          <button onClick={handleMinimize} className="w-3 h-3 bg-[#febc2e] rounded-full hover:brightness-110"></button>
          <button onClick={handleMaximize} className="w-3 h-3 bg-[#28c840] rounded-full hover:brightness-110"></button>
        </div>

        {/* Title */}
        <div className="flex-1 text-center text-sm font-medium text-gray-800/90 flex items-center justify-center space-x-2 truncate">
          {icon && <img src={icon} className="w-4 h-4 opacity-80" />}
          <span className="truncate">{title}</span>
        </div>

        {/* Balance spacing right side */}
        <div className="w-16"></div>
      </div>

      {/* WINDOW BODY */}
      <div className="flex-1 overflow-hidden" onClick={() => focusWindow(id)}>
        {children}
      </div>

      {/* RESIZE HANDLES - CORNERS */}
      <div
        className="absolute -top-1 -left-1 w-4 h-4 cursor-nwse-resize hover:bg-blue-400/10 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => startResize(e, 'nw')}
      ></div>
      <div
        className="absolute -top-1 -right-1 w-4 h-4 cursor-nesw-resize hover:bg-blue-400/10 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => startResize(e, 'ne')}
      ></div>
      <div
        className="absolute -bottom-1 -left-1 w-4 h-4 cursor-nesw-resize hover:bg-blue-400/10 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => startResize(e, 'sw')}
      ></div>
      <div
        className="absolute -bottom-1 -right-1 w-4 h-4 cursor-nwse-resize hover:bg-blue-400/10 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => startResize(e, 'se')}
      ></div>

      {/* RESIZE HANDLES - EDGES */}
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-12 cursor-ns-resize hover:bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => startResize(e, 'n')}
      ></div>
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-12 cursor-ns-resize hover:bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => startResize(e, 's')}
      ></div>
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-1 h-12 w-2 cursor-ew-resize hover:bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => startResize(e, 'w')}
      ></div>
      <div
        className="absolute top-1/2 -translate-y-1/2 -right-1 h-12 w-2 cursor-ew-resize hover:bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => startResize(e, 'e')}
      ></div>
    </div>
  );
};


export default WindowFrame;
