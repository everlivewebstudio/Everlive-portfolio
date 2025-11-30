import React, { useState, useEffect } from 'react';
import { formatTime } from '@/utils/timeUtils';

export default function Navbar() {
    const [date, setDate] = useState(new Date());
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 h-7 z-50 select-none text-white">
            <div className="h-full backdrop-blur-xl bg-white/15 border-b border-white/10 shadow-2xl flex items-center justify-between px-4">
                {/* Left: Apple Logo & Title */}
                <div className="flex items-center space-x-3">
                    <button
                        className="text-[15px] hover:text-gray-200 transition-colors w-4 h-4 flex items-center justify-center"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <img src="/icons/apple.svg" alt="Apple" className="w-4 h-4 invert brightness-0" />
                    </button>
                    <span className="text-[13px] font-medium tracking-wide">
                        Everline <span className="portfolio-text">Portfolio</span>
                    </span>
                </div>

                {/* Right: System Icons */}
                <div className="flex items-center space-x-4">
                    {/* WiFi */}
                    <img src="/icons/wifi.svg" alt="WiFi" className="w-[15px] h-[15px] invert opacity-90" />

                    {/* Battery */}
                    <div className="flex items-center opacity-90">
                        <div className="text-[11px] mr-1.5">100%</div>
                        <div className="w-[22px] h-[11px] border border-white/40 rounded-[3px] flex items-center p-[1px] relative">
                            <div className="h-full bg-white rounded-[1px] w-full"></div>
                            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-white/40 rounded-r-[1px]"></div>
                        </div>
                    </div>

                    {/* Search */}
                    <img src="/icons/search.svg" alt="Search" className="w-[14px] h-[14px] invert opacity-90" />

                    {/* Profile */}
                    <img src="/icons/user.svg" alt="Profile" className="w-[14px] h-[14px] invert opacity-90" />

                    {/* Time */}
                    <div className="text-[11px] font-medium min-w-[60px] text-right">
                        {formatTime(date, true)}
                    </div>
                </div>
            </div>

            {/* Apple Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-7 left-2 bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 py-1 z-50 w-56">
                    <div className="px-4 py-1.5 text-xs hover:bg-white/10 cursor-default">About This Mac</div>
                    <div className="px-4 py-1.5 text-xs hover:bg-white/10 cursor-default">System Settings...</div>
                    <div className="px-4 py-1.5 text-xs hover:bg-white/10 cursor-default">App Store...</div>
                    <div className="border-t border-white/10 my-1"></div>
                    <div className="px-4 py-1.5 text-xs hover:bg-white/10 cursor-default">Sleep</div>
                    <div className="px-4 py-1.5 text-xs hover:bg-white/10 cursor-default">Restart...</div>
                    <div className="px-4 py-1.5 text-xs hover:bg-white/10 cursor-default">Shut Down...</div>
                    <div className="border-t border-white/10 my-1"></div>
                    <div className="px-4 py-1.5 text-xs hover:bg-white/10 cursor-default">Lock Screen</div>
                    <div className="px-4 py-1.5 text-xs hover:bg-white/10 cursor-default">Log Out Everline...</div>
                </div>
            )}
        </header>
    );
};
