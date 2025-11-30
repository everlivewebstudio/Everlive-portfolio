import React, { useRef } from 'react';
import WindowFrame from '@/components/WindowFrame';
import { socialLinks } from '@/constants/socialLinks';
import gsap from 'gsap';

const ContactWindow = () => {
    const refs = {
        schedule: useRef(null),
        email: useRef(null),
        twitter: useRef(null),
        instagram: useRef(null),
        linkedin: useRef(null),
    };

    const handleHoverIn = (ref) => {
        gsap.to(ref.current, {
            scale: 1.03,
            y: -4,
            boxShadow: '0 18px 45px rgba(0,0,0,0.18)',
            duration: 0.25,
            ease: 'power2.out'
        });
    };

    const handleHoverOut = (ref) => {
        gsap.to(ref.current, {
            scale: 1,
            y: 0,
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            duration: 0.25,
            ease: 'power2.out'
        });
    };

    return (
        <WindowFrame
            id="contact"
            title="Contact Me"
            icon="/icons/user.svg"
            width={580}
            height={460} // 🔥 same as Finder style — compact
        >
            <div className="h-full bg-gradient-to-b from-white/95 to-gray-50 flex flex-col items-center pt-8 px-6 relative overflow-hidden">

                {/* Scrollable content container */}
                <div className="flex-1 overflow-y-auto w-full pb-8 custom-scrollbar">
                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_15px_40px_rgba(0,0,0,0.2)] border border-white/40 text-6xl">
                            👨‍💻
                        </div>
                    </div>

                    <h2 className="text-[24px] font-semibold text-gray-900 text-center mb-2">
                        Let's Connect
                    </h2>

                    <p className="text-gray-500 text-center text-[14px] mb-8 max-w-sm mx-auto leading-relaxed">
                        Always open to collaborations, projects, networking or tech talks 🚀
                    </p>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">

                        {/* Schedule */}
                        <button
                            ref={refs.schedule}
                            onMouseEnter={() => handleHoverIn(refs.schedule)}
                            onMouseLeave={() => handleHoverOut(refs.schedule)}
                            onClick={() => window.open('https://cal.com', '_blank')}
                            className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col gap-1 transition group"
                        >
                            <div className="text-2xl bg-red-100 w-10 h-10 rounded-xl flex items-center justify-center text-red-600">📅</div>
                            <span className="text-[15px] font-semibold text-gray-800">Schedule a call</span>
                            <span className="text-[12px] text-gray-400">Pick a time</span>
                        </button>

                        {/* Email */}
                        <button
                            ref={refs.email}
                            onMouseEnter={() => handleHoverIn(refs.email)}
                            onMouseLeave={() => handleHoverOut(refs.email)}
                            onClick={() => window.open(`mailto:${socialLinks.email}`, '_blank')}
                            className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col gap-1 transition group"
                        >
                            <div className="text-2xl bg-green-100 w-10 h-10 rounded-xl flex items-center justify-center text-green-600">📧</div>
                            <span className="text-[15px] font-semibold text-gray-800">Email me</span>
                            <span className="text-[12px] text-gray-400">Get in touch</span>
                        </button>


                        {/* Instagram */}
                        <button
                            ref={refs.instagram}
                            onMouseEnter={() => handleHoverIn(refs.instagram)}
                            onMouseLeave={() => handleHoverOut(refs.instagram)}
                            onClick={() => window.open(socialLinks.instagram, '_blank')}
                            className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col gap-1 transition group"
                        >
                            <div className="text-2xl bg-pink-100 w-10 h-10 rounded-xl flex items-center justify-center text-pink-600">📸</div>
                            <span className="text-[15px] font-semibold text-gray-800">Instagram</span>
                            <span className="text-[12px] text-gray-400">See my updates</span>
                        </button>

                        {/* LinkedIn — full width */}
                        <button
                            ref={refs.linkedin}
                            onMouseEnter={() => handleHoverIn(refs.linkedin)}
                            onMouseLeave={() => handleHoverOut(refs.linkedin)}
                            onClick={() => window.open(socialLinks.linkedin, '_blank')}
                            className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col gap-1 transition group"
                        >
                            <div className="text-2xl bg-blue-100 w-10 h-10 rounded-xl flex items-center justify-center text-blue-600">💼</div>
                            <span className="text-[15px] font-semibold text-gray-800">LinkedIn</span>
                            <span className="text-[12px] text-gray-400">Connect professionally</span>
                        </button>

                    </div>
                </div>
            </div>
        </WindowFrame>
    );
};

export default ContactWindow;
