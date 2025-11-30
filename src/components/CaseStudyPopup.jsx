import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CaseStudyPopup = ({ text, onClose }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText(""); // Reset on open
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 15); // Slightly faster typing
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[999]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl w-[650px] max-h-[85vh] p-8 overflow-y-auto shadow-2xl relative border border-white/40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-800 transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">📄</div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Case Study</h2>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-[16px] leading-relaxed text-gray-600 whitespace-pre-line font-medium">
            {displayText}
            <span className="inline-block w-0.5 h-5 bg-blue-500 ml-1 animate-pulse align-middle"></span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudyPopup;
