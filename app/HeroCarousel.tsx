'use client';
import { useState, useEffect } from 'react';

const heroImages = [
  "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=85"
];

const trendingDestinations = ["Bali", "Bangkok", "Dubai", "Maldives", "Kashmir", "Swiss Alps", "Kerala", "Andaman"];

const tickerDestinations = [
  { name: "Bali", type: "INTERNATIONAL" },
  { name: "Kashmir", type: "DOMESTIC" },
  { name: "Switzerland", type: "EUROPE" },
  { name: "Dubai", type: "MIDDLE EAST" },
  { name: "Kerala", type: "DOMESTIC" },
  { name: "Maldives", type: "ISLANDS" },
  { name: "Vietnam", type: "INTERNATIONAL" },
  { name: "Rajasthan", type: "DOMESTIC" },
  { name: "Andaman", type: "ISLANDS" },
  { name: "Goa", type: "COASTAL" },
  { name: "Ladakh", type: "HIMALAYAS" },
  { name: "Thailand", type: "INTERNATIONAL" },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const scrollToPackages = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('packages');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full min-h-[86vh] overflow-hidden bg-slate-950 text-white flex flex-col justify-between select-none">
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-destination-marquee {
          display: flex;
          width: max-content;
          animation: scrollMarquee 32s linear infinite;
        }
        .animate-destination-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {heroImages.map((imgUrl, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}>
          <img src={imgUrl} alt="Destination background" className="w-full h-full object-cover object-center scale-105 transition-transform duration-[4500ms]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/15 to-slate-950/30"></div>
        </div>
      ))}

      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 800 500" className="w-[750px] max-w-none opacity-25 translate-x-16 -translate-y-4">
          <path d="M460,110 L495,140 L485,185 L540,210 L510,275 L470,310 L445,395 L420,315 L395,250 L435,190 Z" fill="#f59e0b" fillOpacity="0.45" stroke="#fbbf24" strokeWidth="2" />
          <path d="M 150 280 Q 320 160 465 240" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 465 240 Q 590 290 680 350" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="5,5" />
          <circle cx="465" cy="240" r="5" fill="#fbbf24" />
        </svg>
      </div>

      <div className="relative z-20 flex-grow flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center max-w-5xl mx-auto w-full">
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 md:gap-3.5 bg-[#091526]/80 backdrop-blur-md border border-white/15 px-5 py-2 rounded-full shadow-2xl mb-7">
          <div className="flex items-center gap-2">
            <span className="inline-flex flex-col w-5 h-3.5 rounded-[2px] overflow-hidden shadow-sm border border-white/20">
              <span className="bg-[#FF9933] h-1/3 w-full"></span>
              <span className="bg-white h-1/3 w-full flex items-center justify-center"><span className="w-1 h-1 rounded-full bg-blue-900"></span></span>
              <span className="bg-[#138808] h-1/3 w-full"></span>
            </span>
            <span className="text-xs md:text-[13px] font-bold text-[#fbbf24] tracking-wide">Domestic India Holidays</span>
          </div>
          <div className="flex items-center gap-1 text-teal-400/80 text-xs">
            <span className="w-2.5 border-t border-dashed border-teal-400/60"></span>
            <span>✈️</span>
            <span className="w-2.5 border-t border-dashed border-teal-400/60"></span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs md:text-[13px] font-bold text-[#38bdf8] tracking-wide">40+ International Destinations</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-[66px] font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
          India & International Holidays,
        </h1>
        <p style={{ fontFamily: "var(--font-playfair), Georgia, serif" }} className="text-4xl sm:text-6xl md:text-[64px] italic font-normal bg-gradient-to-r from-[#6ee7b7] via-[#5eead4] to-[#67e8f9] bg-clip-text text-transparent leading-[1.15] mt-1 mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          Planned to Perfection
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-7">
          <button 
            onClick={scrollToPackages}
            className="bg-gradient-to-r from-[#00b4a2] to-[#00c9b1] hover:from-[#009e8e] hover:to-[#00b39e] text-white font-extrabold px-8 py-3.5 rounded-full shadow-[0_8px_25px_rgba(0,180,162,0.5)] text-sm md:text-[15px] transition transform hover:scale-105 cursor-pointer"
          >
            Explore Packages
          </button>
          
          <a href="tel:+919769907200" className="bg-[#0b1526]/70 hover:bg-[#0b1526]/90 backdrop-blur-md border border-white/25 text-white font-bold px-7 py-3.5 rounded-full shadow-xl transition flex items-center gap-2 text-sm md:text-[15px]">
            <svg className="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call to Book</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-6">
          <span className="text-white/90 font-semibold mr-1 drop-shadow">Trending:</span>
          {trendingDestinations.map((dest, i) => (
            <button 
              key={i} 
              onClick={scrollToPackages}
              className="bg-[#091526]/70 hover:bg-[#00b4a2] backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-white font-bold transition shadow-md cursor-pointer"
            >
              {dest}
            </button>
          ))}
        </div>

        <div className="w-full max-w-xl border-t border-white/20 mb-6"></div>

        <div className="grid grid-cols-3 gap-6 md:gap-14 max-w-xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-[#2dd4bf] mb-1 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <p className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">12,000+</p>
            <p className="text-[11px] md:text-xs text-white/90 font-medium mt-0.5 drop-shadow">Happy Travelers</p>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-[#2dd4bf] mb-1 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            <p className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">40+</p>
            <p className="text-[11px] md:text-xs text-white/90 font-medium mt-0.5 drop-shadow">Countries Covered</p>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-[#2dd4bf] mb-1 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            <p className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">4.8</p>
            <p className="text-[11px] md:text-xs text-white/90 font-medium mt-0.5 drop-shadow">Average Rating</p>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-slate-950/25 backdrop-blur-[4px] border-t border-white/15 py-3 overflow-hidden">
        <div className="animate-destination-marquee">
          {[...tickerDestinations, ...tickerDestinations].map((item, idx) => (
            <div 
              key={idx} 
              onClick={scrollToPackages}
              className="inline-flex items-center gap-2.5 bg-slate-950/35 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mx-2 shadow-sm hover:bg-slate-950/55 hover:border-teal-400/50 transition cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]"></span>
              <span className="text-xs md:text-[13px] font-bold text-white tracking-wide drop-shadow-sm">{item.name}</span>
              <span className="text-[9px] font-extrabold bg-teal-400/20 text-[#5eead4] border border-teal-400/30 px-2 py-0.5 rounded uppercase tracking-wider">{item.type}</span>
              <span className="w-1 h-1 rounded-full bg-white/30 ml-0.5"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}