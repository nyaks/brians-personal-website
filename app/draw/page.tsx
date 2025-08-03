'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function DrawPage() {
    // Get stories from translations
    const stories = [
        { text: "They say a picture is worth a thousand words. What story will yours tell?" },
        { text: "Every great artist was once an amateur. Don't be afraid to make a mess." },
        { text: "In the world of art, there are no mistakes, only happy accidents." },
        { text: "Your canvas is a window into your imagination. Let's see what's inside." },
        { text: "The first stroke is the hardest. After that, it's just a conversation with the canvas." },
        { text: "Creativity is intelligence having fun. Time to play!" },
        { text: "Let your creativity flow. There are no rules here, only pixels and possibilities." },
        { text: "From a simple line to a complex world, every masterpiece starts with a single mark." },
        { text: "This isn't just a drawing tool; it's a dream-catcher. What will you create?" }
    ];

    const [currentText, setCurrentText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const charIndex = useRef(0);
    const animationFrame = useRef<number>(null);

    // Drawing state
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [drawing, setDrawing] = useState(false);
    const points = useRef<{ x: number; y: number }[]>([]);

    // Restore canvas from localStorage on mount
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const dataUrl = localStorage.getItem('drawing-canvas');
        if (dataUrl) {
            const img = new window.Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = dataUrl;
        }
    }, []);

    // Save canvas to localStorage
    const saveCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        try {
            const dataUrl = canvas.toDataURL('image/png');
            localStorage.setItem('drawing-canvas', dataUrl);
        } catch (e) {
            // ignore quota errors
        }
    };

    // Resize canvas to fill container
    useEffect(() => {
        function resizeCanvas() {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (canvas && container) {
                const rect = container.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        const typeParagraph = () => {
            const para = stories[currentIdx].text;
            if (charIndex.current < para.length) {
                setCurrentText(para.slice(0, charIndex.current + 1));
                charIndex.current++;
                timeoutId = setTimeout(typeParagraph, 40);
            } else {
                setIsTyping(false);
                setTimeout(() => {
                    charIndex.current = 0;
                    setCurrentIdx((prev) => (prev + 1) % stories.length);
                    setIsTyping(true);
                }, 2500);
            }
        };
        if (isTyping) {
            typeParagraph();
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isTyping, currentIdx]);

    useEffect(() => {
        setIsTyping(true);
    }, []);

    // Drawing handlers
    const getCanvasPos = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top,
            };
        } else {
            return {
                x: (e as React.MouseEvent).clientX - rect.left,
                y: (e as React.MouseEvent).clientY - rect.top,
            };
        }
    };

    const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
        setDrawing(true);
        points.current = [getCanvasPos(e)];
    };

    const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        ctx.strokeStyle = '#a3a3a3';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const pos = getCanvasPos(e);
        points.current.push(pos);
        if (points.current.length < 3) {
            // Draw a dot for the first point
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, ctx.lineWidth / 2, 0, Math.PI * 2, true);
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fill();
            ctx.closePath();
            return;
        }
        // Use the last three points to draw a smooth curve
        const [p1, p2, p3] = points.current.slice(-3);
        const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
        ctx.beginPath();
        ctx.moveTo(mid1.x, mid1.y);
        ctx.quadraticCurveTo(p2.x, p2.y, mid2.x, mid2.y);
        ctx.stroke();
    };

    const handlePointerUp = () => {
        setDrawing(false);
        points.current = [];
        saveCanvas();
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            localStorage.removeItem('drawing-canvas');
        }
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-6 md:p-24 overflow-x-hidden md:ml-10 -mt-4" style={{ marginLeft: '1px' }}>
            <div className="w-full max-w-full md:max-w-3xl mx-auto space-y-4 md:space-y-6 mb-10 md:mb-16 pt-24 md:pt-16">
                {/* Page Title */}
                <div className="mb-3 md:mb-4 ml-4 md:ml-8">
                    <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-white mb-4 font-minecraft">
                        draw something
                    </h1>
                </div>

                <div className="bg-[#1a1a1a] text-white p-3 md:p-8 pb-8 md:pb-16 -mb-6 md:mb-10 -mt-10">
                    <div className="w-full md:max-w-4xl mx-auto">
                        <div className="mb-8 w-full md:max-w-6xl mx-auto">
                            <div className="px-4 py-2 md:p-4 border border-stone-500 rounded-lg h-[6.5rem] md:h-[6.5rem] w-full">
                                <p className="text-sm break-words text-stone-300">
                                    {isTyping ? (
                                        <span className="font-minecraft">{currentText}<span className="animate-pulse">|</span></span>
                                    ) : (
                                        <span className="font-minecraft">{currentText}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div ref={containerRef} className="flex flex-col items-center w-full border border-stone-500 rounded-lg bg-[#1a1a1a] overflow-hidden relative min-h-[350px] md:min-h-[250px]">
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full cursor-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gZmlsbD0iIzMzMyIgcG9pbnRzPSI4LDEgNyw1IDksNSIvPgo8cmVjdCBmaWxsPSIjZDk5IiB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSI4Ii8+CjxyZWN0IGZpbGw9IiM4ODgiIHg9IjciIHk9IjEzIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIi8+CjxjaXJjbGUgZmlsbD0iI2Y2NiIgY3g9IjgiIGN5PSIxNC41IiByPSIxIi8+Cjwvc3ZnPg==),8_1,crosshair]"
                                style={{ touchAction: 'none', display: 'block' }}
                                onMouseDown={handlePointerDown}
                                onMouseMove={handlePointerMove}
                                onMouseUp={handlePointerUp}
                                onMouseLeave={handlePointerUp}
                                onTouchStart={handlePointerDown}
                                onTouchMove={handlePointerMove}
                                onTouchEnd={handlePointerUp}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4 w-full">
                            <p className="text-stone-400 text-sm">a blank canvas</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleClear}
                                    className="h-full px-4 py-4 text-sm bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors transition-all duration-200 transition-transform hover:scale-110 flex items-center gap-2 flex-shrink-0"
                                >
                                    clear
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="h-full px-4 py-4 text-sm bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors transition-all duration-200 transition-transform hover:scale-110 flex items-center gap-2 flex-shrink-0"
                                >
                                    download
                                </button>
                            </div>
                        </div>



                        {/* Portfolio Link */}
                        <div className="mt-6 w-full">
                            <a
                                href="https://brianbarongo.com/art"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-stone-400 text-sm font-minecraft hover:text-white transition-colors underline underline-offset-2 hover:scale-105 transition-transform duration-200"
                            >
                                see my art portfolio
                            </a>
                        </div>

                        {/* Fun Fact */}
                        <div className="mt-6 w-full">
                            <p className="text-stone-500 text-xs font-minecraft mb-2">
                                <span className="text-stone-400">fun fact:</span> this was made for a high school art class!
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
} 