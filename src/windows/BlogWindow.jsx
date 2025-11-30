import React, { useEffect, useRef } from "react";
import WindowFrame from "@/components/WindowFrame";
import { blogPosts } from "@/constants/blogPosts";
import gsap from "gsap";

const BlogWindow = () => {
  const containerRef = useRef(null);

  // Scroll to top + fade in animation
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <WindowFrame
      id="safari"
      title="Safari – Blog"
      icon="/src/assets/images/icon-safari.png"
    >
      <div className="flex flex-col h-full bg-white text-black rounded-b-xl overflow-hidden">

        {/* Safari Toolbar */}
        <div className="h-12 bg-gray-100 border-b border-gray-300 flex items-center px-4 space-x-4">
          <div className="flex space-x-2 text-gray-500 text-lg">
            <button className="hover:text-black">{"<"}</button>
            <button className="hover:text-black">{">"}</button>
          </div>
          <div className="flex-1 bg-white border border-gray-300 rounded text-center text-sm py-1 text-gray-600 shadow-inner select-none">
            everline.dev/blog
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto p-10 max-w-3xl mx-auto w-full"
        >
          <h1 className="text-4xl font-semibold mb-10 tracking-tight">
            Latest Articles
          </h1>

          <div className="space-y-10 pb-16">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="border-b border-gray-200 pb-8 group transition-all duration-300"
              >
                <div className="text-sm text-gray-500 mb-1">{post.date}</div>

                <h2 className="text-2xl font-semibold mb-3 cursor-pointer group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 leading-relaxed mb-3">
                  {post.summary}
                </p>

                {/* Read more button */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-blue-500 font-medium hover:underline"
                >
                  Read more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default BlogWindow;
