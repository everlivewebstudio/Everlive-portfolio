import React, { useState } from 'react';
import WindowFrame from '@/components/WindowFrame';
import { projects } from '@/constants/projects';
import { useWindowStore } from '@/store/useWindowStore';
import CaseStudyPopup from '@/components/CaseStudyPopup';

const FinderWindow = () => {
  const { finderPath, setFinderPath } = useWindowStore();
  const selectedItem = finderPath;
  const setSelectedItem = setFinderPath;

  const [showCaseStudy, setShowCaseStudy] = useState(false);

  const favorites = [
    { id: 'work', name: 'Work', icon: '/icons/work.svg' },
    { id: 'about', name: 'About me', icon: '/icons/info.svg' },
    { id: 'trash', name: 'Trash', icon: '/icons/trash.svg' }
  ];

  const projectItems = [
    { id: 'project1', name: 'Project 1', icon: '/icons/file.svg' },
    { id: 'project2', name: 'Project 2', icon: '/icons/file.svg' },
    { id: 'project3', name: 'Project 3', icon: '/icons/file.svg' },
    { id: 'project4', name: 'Project 4', icon: '/icons/file.svg' }
  ];

  const getCurrentContent = () => {
    const project = projects.find(p => p.id === selectedItem);
    if (project) {
      return (
        <div className="flex flex-col items-center text-center max-w-xl mx-auto py-6">
          <div className="w-24 h-24 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
            <img src="/icons/file.svg" alt="" className="w-12 h-12 opacity-50" />
          </div>

          <h2 className="text-[26px] font-semibold text-gray-800 mb-3">
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            {project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noreferrer"
                className="px-5 py-2 bg-white hover:bg-white-700 text-white rounded-lg text-sm font-semibold shadow transition">
                🔗 Live Demo
              </a>
            )}
            <button
              onClick={() => setShowCaseStudy(true)}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium border shadow transition">
              📄 Case Study
            </button>
          </div>

          {/* Case Study Popup */}
          {showCaseStudy && (
            <CaseStudyPopup
              text={project.case || "No case study available."}
              onClose={() => setShowCaseStudy(false)}
            />
          )}
        </div>
      );
    }

    switch (selectedItem) {
      case 'about':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-gray-600 leading-relaxed">
              With over 1 year of experience in web development, I specialize in creating performant, animated interfaces that engage users while maintaining accessibility and SEO best practices.

              My approach combines technical expertise with an eye for design, resulting in digital products that are both functional and delightful.

              Outside of coding, I experiment with animation techniques, contribute to open-source projects, and share knowledge through tech talks and workshops.                        </p>
          </div>
        );

      case 'trash':
        return (
          <div className="p-6 grid grid-cols-4 gap-4">
            {['why Me', 'I will do it later', 'I can\'t', 'Someday'].map((n, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src="/icons/file.svg" className="w-14 h-14 opacity-50" />
                <span className="text-xs text-gray-500 mt-1">{n}</span>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select an item to view details
          </div>
        );
    }
  };

  return (
    <WindowFrame id="finder" title="Finder" icon="/icons/apple.svg" width={750} height={520}>
      <div className="flex h-full bg-white text-gray-900">
        <div className="w-48 bg-[#F5F5F7]/90 border-r border-gray-200/60 flex flex-col py-4">
          <div className="mb-4">
            <div className="text-[11px] font-semibold text-gray-400 mb-1 px-4">Favorites</div>
            <div className="px-2 space-y-0.5">
              {favorites.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`w-full flex items-center space-x-2 px-2 py-1 rounded-[4px] text-sm ${selectedItem === item.id ? 'bg-[#E5E5E5]' : 'hover:bg-gray-200/50'}`}>
                  <img src={item.icon} className="w-4 h-4 opacity-70" />
                  <span className="text-[13px]">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-gray-400 mb-1 px-4">Work</div>
            <div className="px-2 space-y-0.5">
              {projectItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`w-full flex items-center space-x-2 px-2 py-1 rounded-[4px] text-sm ${selectedItem === item.id ? 'bg-[#E5E5E5]' : 'hover:bg-gray-200/50'}`}>
                  <img src={item.icon} className="w-4 h-4 opacity-70" />
                  <span className="text-[13px]">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6">
          {getCurrentContent()}
        </div>
      </div>
    </WindowFrame>
  );
};

export default FinderWindow;
