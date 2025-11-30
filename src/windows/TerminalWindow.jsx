import React from 'react';
import WindowFrame from '@/components/WindowFrame';

const TerminalWindow = () => {
    return (
        <WindowFrame id="terminal" title="Terminal - Skills" icon="/src/assets/images/icon-terminal.png">
            <div className="h-full bg-[#1e1e1e] p-6 font-mono text-sm text-gray-300 overflow-auto selection:bg-gray-700">
                <div className="mb-6">
                    <span className="text-green-400 font-bold">everline@macbook</span>:<span className="text-blue-400 font-bold">~</span>$ neofetch
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* ASCII Art - Apple Logo */}
                    <div className="hidden md:block font-bold whitespace-pre leading-tight select-none" style={{ color: '#F8F8F8' }}>
                        {`
                    c.'
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.
`}
                    </div>

                    {/* Info */}
                    <div className="space-y-2 pt-2">
                        <div><span className="text-green-400 font-bold">everline@macbook</span></div>
                        <div>----------------</div>
                        <div><span className="text-yellow-400 font-bold">OS</span>: macOS Big Sur x86_64</div>
                        <div><span className="text-yellow-400 font-bold">Host</span>: MacBook Pro (16-inch, 2023)</div>
                        <div><span className="text-yellow-400 font-bold">Kernel</span>: 21.6.0</div>
                        <div><span className="text-yellow-400 font-bold">Uptime</span>: 1 year, 24 days</div>
                        <div><span className="text-yellow-400 font-bold">Shell</span>: zsh 5.8</div>
                        <div><span className="text-yellow-400 font-bold">Resolution</span>: 3072x1920</div>
                        <div><span className="text-yellow-400 font-bold">DE</span>: Aqua</div>
                        <div><span className="text-yellow-400 font-bold">WM</span>: Quartz Compositor</div>
                        <br />
                        <div><span className="text-cyan-400 font-bold">Languages</span>: JavaScript, TypeScript, Python, Rust</div>
                        <div><span className="text-cyan-400 font-bold">Frameworks</span>: React, Next.js, Vue, Node.js</div>
                        <div><span className="text-cyan-400 font-bold">Tools</span>: Git, Docker, AWS, Figma, VS Code</div>

                        <div className="flex gap-3 mt-4">
                            <div className="w-8 h-3 bg-black rounded-sm"></div>
                            <div className="w-8 h-3 bg-red-500 rounded-sm"></div>
                            <div className="w-8 h-3 bg-green-500 rounded-sm"></div>
                            <div className="w-8 h-3 bg-yellow-500 rounded-sm"></div>
                            <div className="w-8 h-3 bg-blue-500 rounded-sm"></div>
                            <div className="w-8 h-3 bg-purple-500 rounded-sm"></div>
                            <div className="w-8 h-3 bg-cyan-500 rounded-sm"></div>
                            <div className="w-8 h-3 bg-white rounded-sm"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <span className="text-green-400 font-bold">everline@macbook</span>:<span className="text-blue-400 font-bold">~</span>$ <span className="animate-pulse">_</span>
                </div>
            </div>
        </WindowFrame>
    );
};

export default TerminalWindow;
