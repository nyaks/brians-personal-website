'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  // Typewriter effect state
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typingFull' | 'backspacingFull' | 'typingShort' | 'backspacingShort'>('typingFull');
  const [charIndex, setCharIndex] = useState(0);

  const baseText = "Hi, I'm ";
  const fullName = 'Brian!';
  const shortName = 'Bri!';

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (phase === 'typingFull') {
      if (charIndex <= fullName.length) {
        setDisplayText(baseText + fullName.slice(0, charIndex));
        timeout = setTimeout(() => setCharIndex(charIndex + 1), 120);
      } else {
        timeout = setTimeout(() => setPhase('backspacingFull'), 1000);
      }
    } else if (phase === 'backspacingFull') {
      if (charIndex > 0) {
        setDisplayText(baseText + fullName.slice(0, charIndex - 1));
        timeout = setTimeout(() => setCharIndex(charIndex - 1), 80);
      } else {
        setPhase('typingShort');
        setCharIndex(0);
      }
    } else if (phase === 'typingShort') {
      if (charIndex <= shortName.length) {
        setDisplayText(baseText + shortName.slice(0, charIndex));
        timeout = setTimeout(() => setCharIndex(charIndex + 1), 120);
      } else {
        timeout = setTimeout(() => setPhase('backspacingShort'), 1000);
      }
    } else if (phase === 'backspacingShort') {
      if (charIndex > 0) {
        setDisplayText(baseText + shortName.slice(0, charIndex - 1));
        timeout = setTimeout(() => setCharIndex(charIndex - 1), 80);
      } else {
        setPhase('typingFull');
        setCharIndex(0);
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, charIndex]);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 overflow-x-hidden md:ml-10 -mt-4">
      {/* Hero Section */}
      <div className="max-w-3xl w-full space-y-4 md:space-y-4 mb-10 md:mb-16 pt-24 md:pt-16 mx-auto md:mx-0 md:ml-16">
        <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 font-minecraft min-h-[3.5rem]">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>
        <div className="list-disc list-inside text-xs dark:text-stone-400 text-black space-y-1">
          <p className="text-sm dark:text-stone-400 text-black">
            based in{' '}
            <a>
              dublin
            </a>
            , and{' '}
            <a>
              nairobi
            </a>
          </p>
          <p className="text-sm dark:text-stone-400 text-black">
            {(() => {
              const text = "building and fixing stuff for 4678 days";
              const dayMatch = text.match(/(\d+)\s*(?:days|天)/i);
              if (dayMatch) {
                const days = parseInt(dayMatch[1]);
                const years = (days / 365.25).toFixed(1);
                const beforeDays = text.substring(0, text.indexOf(dayMatch[0]));
                const afterDays = text.substring(text.indexOf(dayMatch[0]) + dayMatch[0].length);

                return (
                  <>
                    {beforeDays}
                    <span className="relative group">
                      <span className="cursor-pointer underline underline-offset-2">
                        {dayMatch[0]}
                      </span>
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs rounded bg-stone-800 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                        {years} years
                      </span>
                    </span>
                    {afterDays}
                  </>
                );
              }
              return text;
            })()}
          </p>
        </div>

        <div>
          <p className="mb-4 dark:text-stone-300 text-black">currently...</p>
          <ul className="list-disc list-inside text-sm dark:text-stone-400 text-black space-y-1">
            
          </ul>
        </div>

        <div className="h-auto min-h-[150px] md:min-h-[120px]">
          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-2 dark:text-stone-300 text-black">previously...</p>
              <ul className="list-disc list-inside text-sm dark:text-stone-400 text-black space-y-1">
                
              </ul>
            </div>

            <div>
              <p className="mb-2 dark:text-stone-300 text-black">projects...</p>
              <ul className="list-disc list-inside text-sm dark:text-stone-400 text-black space-y-1">
                <li>
                  <a href="https://endless-wiki.vercel.app/" target="_blank" rel="noopener noreferrer" className="dark:text-stone-400 text-black underline hover:dark:text-stone-100 hover:text-black font-minecraft inline-block transform transition-transform duration-200 hover:scale-110">
                    endless wiki:
                  </a>
                  <a> An encyclopedia where every word is a link. Click any word to dive deeper into an endless chain of knowledge.</a>
                </li>
                
              </ul>
            </div>
          </div>
        </div>



        <section className="mt-10 -mb-6 font-minecraft">
          <p className="max-w-2xl text-sm dark:text-stone-400 text-black font-minecraft">
            get in touch via{' '}
            <a
              href="mailto:nyakerib@gmail.com"
              className="dark:text-stone-400 text-black underline hover:dark:text-stone-100 hover:text-black font-minecraft inline-block transform transition-transform duration-200 hover:scale-110"
            >
              email
            </a>{' '}
            or find me on{' '}
            <a
              href="https://www.linkedin.com/in/brian-barongo-a6995b354/"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-stone-400 text-black underline hover:dark:text-stone-100 hover:text-black font-minecraft inline-block transform transition-transform duration-200 hover:scale-110"
            >
              linkedin
            </a>
          </p>
        </section>

        {/* Links to blogs and art */}
        <section className="mt-10 mb-20 font-minecraft mb-10">
          <p className="max-w-2xl text-sm dark:text-stone-400 text-black font-minecraft mb-2">
            read my blog{' '}
            <a
              href="https://briannyakeri.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-stone-400 text-black underline hover:dark:text-stone-100 hover:text-black font-minecraft inline-block transform transition-transform duration-200 hover:scale-110 group"
            >
              <img src="/substack.png" alt="Substack" className="inline w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-200" />
              here
            </a>
          </p>
          
        </section>

        
      </div>
    </main >
  );
}
