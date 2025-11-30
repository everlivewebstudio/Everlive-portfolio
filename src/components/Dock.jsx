import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { dockApps } from "@/constants/dockApps";
import { useWindowStore } from "@/store/useWindowStore";
import DockContextMenu from "./DockContextMenu";
import { Tooltip } from "react-tooltip";

const Dock = () => {
  const { openWindow, openWindows, setFinderPath } = useWindowStore();
  const dockRef = useRef(null);
  const iconRefs = useRef([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, appId: null, position: { x: 0, y: 0 } });

  // Real MacOS magnification effect
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const handleMagnify = (e) => {
      const mouseX = e.clientX;
      iconRefs.current.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - center);
        const scale = Math.max(1, 1.6 - distance / 140);
        const y = -(scale - 1) * 14; // Rising effect

        gsap.to(icon, {
          scale,
          y,
          duration: 0.15,
          ease: "power2.out",
          overwrite: true,
        });
      });
    };

    const reset = () => {
      iconRefs.current.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: "back.out(1.7)",
        });
      });
    };

    dock.addEventListener("mousemove", handleMagnify);
    dock.addEventListener("mouseleave", reset);

    return () => {
      dock.removeEventListener("mousemove", handleMagnify);
      dock.removeEventListener("mouseleave", reset);
    };
  }, []);

  // Bounce animation
  const bounce = (el) => {
    gsap.fromTo(
      el,
      { y: -18 },
      { y: 0, ease: "bounce.out", duration: 0.55 }
    );
  };

  const handleClick = (app, e) => {
    bounce(e.currentTarget);

    if (app.id === "trash") {
      setFinderPath("trash");
      return openWindow("finder");
    }

    openWindow(app.id);
  };

  const handleContextMenu = (app, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      visible: true,
      appId: app.id,
      position: {
        x: rect.left + rect.width / 2 - 60,
        y: rect.top - 15,
      },
      appTitle: app.title,
    });
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <DockContextMenu
        appId={contextMenu.appId}
        visible={contextMenu.visible}
        position={contextMenu.position}
        appTitle={contextMenu.appTitle}
        onClose={() => setContextMenu({ ...contextMenu, visible: false })}
      />
      <div
        ref={dockRef}
        className="
        flex items-end gap-2 px-5 pb-2 h-[4.7rem]
        bg-white/20 backdrop-blur-2xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.25)]
        border border-white/30
        transition-all duration-300
        "
      >
        {dockApps.map((app, index) => (
          <div key={app.id} className="relative group flex flex-col items-center">
            <Tooltip
              id={`dock-${app.id}`}
              content={app.title}
              place="top"
              noArrow
              offset={12}
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "#000",
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "6px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              }}
            />

            <button
              ref={(el) => (iconRefs.current[index] = el)}
              data-tooltip-id={`dock-${app.id}`}
              onClick={(e) => handleClick(app, e)}
              onContextMenu={(e) => handleContextMenu(app, e)}
              className="w-12 h-12 flex items-center justify-center origin-bottom"
            >
              <img
                src={app.icon}
                alt={app.title}
                className="w-full h-full object-contain drop-shadow-md pointer-events-none"
              />
            </button>

            {openWindows.includes(app.id) && (
              <div className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;
