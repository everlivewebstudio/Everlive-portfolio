import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";
import Dock from "./Dock";
import { useWindowStore } from "@/store/useWindowStore";
import { useThemeStore } from "@/store/useThemeStore";

// Windows
import FinderWindow from "@/windows/FinderWindow";
import BlogWindow from "@/windows/BlogWindow";
import PhotosWindow from "@/windows/PhotosWindow";
import TerminalWindow from "@/windows/TerminalWindow";
import ResumeWindow from "@/windows/ResumeWindow";
import ContactWindow from "@/windows/ContactWindow";

// Desktop Icons Data
const desktopIcons = [
  {
    id: 'projects',
    title: 'Projects',
    icon: '/images/folder.png',
    windowId: 'finder'
  },
  {
    id: 'resume',
    title: 'Resume',
    icon: '/images/pdf.png',
    windowId: 'resume'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    icon: '/images/folder.png',
    windowId: 'finder'
  }
];

const Desktop = () => {
  const welcomeRef = useRef(null);
  const bgRef = useRef(null);
  const { openWindows, openWindow } = useWindowStore();
  const desktopIconsRef = useRef([]);

  // Window Component Map
  const WINDOW_COMPONENTS = useMemo(() => ({
    finder: FinderWindow,
    safari: BlogWindow,
    photos: PhotosWindow,
    terminal: TerminalWindow,
    resume: ResumeWindow,
    contact: ContactWindow,
  }), []);

  useEffect(() => {
    // Wallpaper fade in
    gsap.to(bgRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    });

    // Initial fade in animation for welcome text
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    // Initial animation for desktop icons
    gsap.from(desktopIconsRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.8,
      ease: "back.out(1.2)"
    });
  }, []);

  const handleHover = (e) => {
    gsap.to(e.target, {
      scale: 1.1,
      fontWeight: "bold",
      color: "#ffffff",
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleDesktopIconClick = (icon) => {
    if (icon.windowId) {
      openWindow(icon.windowId);
    }

    // Bounce animation for the clicked icon
    const iconElement = desktopIconsRef.current[icon.id];
    if (iconElement) {
      gsap.to(iconElement, {
        y: -10,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleLeave = (e) => {
    gsap.to(e.target, {
      scale: 1,
      fontWeight: "normal",
      color: "#e5e5e5",
      duration: 0.3,
      ease: "power1.out",
    });
  };

  // New welcome text with two parts
  const welcomeLine1 = "Hi, we are Everline";
  const welcomeLine2 = "portfolio";

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-black">
      {/* Background with smooth fade */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center opacity-0"
        style={{
          backgroundImage: "url('/images/wallpaper.png')",
        }}
      />

      {/* Slight dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <Navbar />

      {/* Desktop Icons */}
      <div className="absolute top-20 left-0 right-0 bottom-24 p-4 grid grid-cols-1 content-start gap-6 grid-flow-col auto-cols-max z-0">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            ref={el => desktopIconsRef.current[icon.id] = el}
            onClick={() => handleDesktopIconClick(icon)}
            className="flex flex-col items-center w-20 p-2 rounded-md transition-colors duration-200 cursor-pointer hover:bg-white/10 group"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <img
                src={icon.icon}
                alt={icon.title}
                className="w-10 h-10 object-contain drop-shadow-lg"
                draggable="false"
              />
            </div>
            <span className="text-white text-xs text-center text-shadow-md px-1 rounded bg-black/0 group-hover:bg-black/20 transition-colors">
              {icon.title}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop Welcome Text */}
      <div className="relative z-0 flex flex-col items-center justify-center h-full text-white pb-20 pointer-events-none">
        <div ref={welcomeRef} className="text-center pointer-events-auto drop-shadow-2xl">
          {/* First line: Hi, we are Everline */}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-2 drop-shadow-lg">
            {welcomeLine1.split("").map((char, i) => (
              <span
                key={`line1-${i}`}
                className="inline-block cursor-default transition-all duration-300 text-white/90 hover:text-white hover:scale-110"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Second line: portfolio (in Pacifico font) */}
          <div className="mt-2">
            <span className="text-6xl md:text-8xl font-normal handwritten text-white/90 hover:text-white transition-colors duration-300 drop-shadow-lg">
              {welcomeLine2.split("").map((char, i) => (
                <span
                  key={`line2-${i}`}
                  className="inline-block cursor-default transition-all duration-300 hover:scale-110"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Window Handling - Rendered in order of openWindows for correct z-index stacking */}
      {openWindows.map(id => {
        const Component = WINDOW_COMPONENTS[id];
        return Component ? <Component key={id} /> : null;
      })}

      <Dock />

      {/* Mobile Notice */}
      <div className="md:hidden fixed inset-0 bg-black/90 flex items-center justify-center p-8 text-center z-50">
        <div className="text-white text-lg">
          This portfolio is best experienced on a desktop or tablet.
          <br />
          <br />
          Please switch to a larger screen or rotate your device.
        </div>
      </div>
    </div>
  );
};

export default Desktop;
