import React from 'react';
import WindowFrame from '@/components/WindowFrame';
import { resumeConfig } from '@/constants/resumeConfig';

const ResumeWindow = () => {
    return (
        <WindowFrame
            id="resume"
            title="Resume"
            icon="/icons/file.svg"
            width={650}
            height={480}
        >
            <div className="h-full bg-gradient-to-b from-white/95 to-gray-50 text-gray-800 flex flex-col font-sans">

                {/* Toolbar */}
                <div className="h-10 border-b border-gray-200 flex items-center px-4 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="text-xs font-medium text-gray-500">Resume.pdf</div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-100">

                        {/* Header */}
                        <div className="border-b border-gray-100 pb-5 mb-5 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Everline Team</h1>
                            <div className="text-sm text-blue-600 font-medium mt-1">Web Digital Agency</div>
                            <p className="text-[11px] text-gray-400 mt-2">Started by two friends 🤝</p>
                        </div>

                        {/* Experience */}
                        <div className="mb-6">
                            <h2 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-4 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Experience
                            </h2>

                            <div className="space-y-6">

                                {/* Freelancer */}
                                <div className="relative pl-3 border-l-2 border-gray-100 hover:border-blue-500 transition duration-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-sm font-semibold text-gray-800">Freelancer</h3>
                                        <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">2025 – Present</span>
                                    </div>
                                    <p className="text-[11px] text-gray-600 leading-relaxed">
                                        Helping brands grow online through modern websites and digital solutions.
                                    </p>
                                </div>

                                {/* Learner */}
                                <div className="relative pl-3 border-l-2 border-gray-100 hover:border-blue-500 transition duration-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-sm font-semibold text-gray-800">Learner</h3>
                                        <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">2023 – 2024</span>
                                    </div>
                                    <p className="text-[11px] text-gray-600 leading-relaxed">
                                        Studied web technologies, UI/UX, and JavaScript ecosystem while building projects.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <h2 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-4 flex items-center">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                Skills
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {resumeConfig.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md text-[10px] font-medium border border-gray-100 cursor-default transition"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </WindowFrame>
    );
};

export default ResumeWindow;
