import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useWindowStore } from "@/store/useWindowStore";

const DockContextMenu = ({ appId, visible, position, onClose }) => {
  const menuRef = useRef(null);
  const { openWindow, closeWindow, openWindows } = useWindowStore();

  // Animate menu when it appears
  useEffect(() => {
    if (!menuRef.current || !visible) return;

    gsap.fromTo(
      menuRef.current,
      { opacity: 0, scale: 0.8, transformOrigin: "top center" },
      {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.5)",
      }
    );
  }, [visible]);

  // Close on outside click
  useEffect(() => {
    if (!visible) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [visible, onClose]);

  if (!visible) return null;

  const isOpen = openWindows.includes(appId);

  const handleOpen = (e) => {
    e.stopPropagation();
    openWindow(appId);
    onClose();
  };

  const handleShowInFinder = (e) => {
    e.stopPropagation();
    openWindow("finder");
    onClose();
  };

  const handleQuit = (e) => {
    e.stopPropagation();
    if (isOpen) {
      closeWindow(appId);
    }
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-[200] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden min-w-[150px]"
      style={{
        top: position.y,
        left: position.x,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleOpen}
        className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-50 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-colors"
      >
        {isOpen ? "Bring to Front" : "Open"}
      </button>

      <button
        onClick={handleShowInFinder}
        className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-50 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-colors"
      >
        Show in Finder
      </button>

      <div className="border-t border-gray-200/40 dark:border-white/10 my-1" />

      <button
        onClick={handleQuit}
        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors"
      >
        Quit
      </button>
    </div>
  );
};

export default DockContextMenu;
