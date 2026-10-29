'use client';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation'; // <-- Added this
import Link from 'next/link';
import ImageSlider from './ImageSlider';
import HeroCarousel from './HeroCarousel';
import VideoLoopSection from './VideoLoopSection';

const EXPERIENCE_THEMES = [
  "All Experiences",
  "Honeymoon & Romantic",
  "Beach & Coastal",
  "Mountains & Serenity",
  "Heritage & Culture",
  "Adventure & Wildlife",
  "Family Vacation",
];

function getShortTheme(theme?: string) {
  if (!theme) return 'Holiday';
  if (theme.includes('Beach')) return 'Beach';
  if (theme.includes('Mountain')) return 'Mountains';
  if (theme.includes('Honeymoon')) return 'Romantic';
  if (theme.includes('Heritage')) return 'Heritage';
  if (theme.includes('Adventure')) return 'Adventure';
  if (theme.includes('Family')) return 'Family';
  return theme;
}

export default function HomePage() {
  const router = useRouter(); // <-- Initialized router
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Domestic' | 'International'>('All');
  const [selectedTheme, setSelectedTheme] = useState<string>('All Experiences');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    async function fetchPackages() {
      const { data } = await supabase.from('packages').select('*').order('created_at', { ascending: false });
      if (data) setPackages(data);
      setLoading(false);
    }
    fetchPackages();
  }, []);

  const totalCount = packages.length;
  const domesticCount = packages.filter((p) => p.category?.toLowerCase().includes('domestic')).length;
  const internationalCount = packages.filter((p) => p.category?.toLowerCase().includes('international')).length;

  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        if (selectedCategory === 'Domestic' && !pkg.category?.toLowerCase().includes('domestic')) return false;
        if (selectedCategory === 'International' && !pkg.category?.toLowerCase().includes('international')) return false;

        if (selectedTheme !== 'All Experiences') {
          const pkgTheme = (pkg.theme || '').toLowerCase();
          const target = selectedTheme.toLowerCase();
          const firstWord = target.split(' ')[0];
          if (!pkgTheme.includes(firstWord) && pkgTheme !== target) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (Number(a.price_inr) || 0) - (Number(b.price_inr) || 0);
        if (sortBy === 'price-desc') return (Number(b.price_inr) || 0) - (Number(a.price_inr) || 0);
        if (sortBy === 'rating') return (Number(b.rating) || 4.9) - (Number(a.rating) || 4.9);
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [packages, selectedCategory, selectedTheme, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900">
      
      {/* 1. HERO CAROUSEL */}
      <HeroCarousel />

      {/* 2. BOUTIQUE TOUR OPERATOR RIBBON */}
      <div className="bg-white py-5 px-4 md:px-10 border-b border-gray-100">
        <div className="max-w-[1360px] mx-auto relative overflow-hidden rounded-2xl border border-[#bce3dd] bg-gradient-to-r from-[#ecf9f6] via-[#f6fcfb] to-[#ecf9f6] px-5 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-[0_2px_15px_rgba(13,148,136,0.06)]">
          <svg viewBox="0 0 1200 90" fill="none" className="absolute inset-0 w-full h-full pointer-events-none object-cover">
            <path d="M -20 95 Q 90 10 240 95" stroke="#99f6e4" strokeWidth="1.5" fill="#ccfbf1" fillOpacity="0.25" />
            <path d="M 30 85 Q 95 25 180 12" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="4,4" />
            <g transform="translate(96, 2) rotate(-18) scale(0.85)">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#3b82a6" opacity="0.75" />
            </g>
            <path d="M 880 95 Q 1040 -10 1220 95" stroke="#99f6e4" strokeWidth="1.5" fill="#ccfbf1" fillOpacity="0.25" />
            <path d="M 850 80 Q 980 35 1075 14" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="4,4" />
            <g transform="translate(1055, 2) rotate(18) scale(0.85)">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#3b82a6" opacity="0.75" />
            </g>
          </svg>

          <div className="relative z-10 inline-flex items-center gap-2 bg-white border border-[#bce3dd] rounded-full px-4 py-1.5 shadow-sm">
            <svg className="w-4 h-4 text-[#0d9488] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <polygon points="14.5,9.5 9.5,11.5 7.5,16.5 12.5,14.5" fill="#0d9488" stroke="#0d9488" strokeWidth="1" />
            </svg>
            <span className="text-[11px] md:text-xs font-extrabold tracking-[0.1em] text-[#0f535c] uppercase">INDIA&apos;S</span>
            <span className="inline-flex flex-col w-4 h-3 rounded-[2px] overflow-hidden border border-gray-200 flex-shrink-0">
              <span className="bg-[#FF9933] h-1/3 w-full"></span>
              <span className="bg-white h-1/3 w-full flex items-center justify-center"><span className="w-1 h-1 rounded-full bg-blue-800"></span></span>
              <span className="bg-[#138808] h-1/3 w-full"></span>
            </span>
            <span className="text-[11px] md:text-xs font-extrabold tracking-[0.1em] text-[#0f535c] uppercase">BOUTIQUE TOUR OPERATOR</span>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-xs md:text-[13px] font-bold text-[#334e68]">
            <span className="hidden sm:inline-block w-7 h-[1px] bg-[#7dd3fc]"></span>
            <svg className="w-4 h-4 text-[#0d9488] rotate-90 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <span>Domestic India &amp; 40+ International Holidays</span>
            <span className="hidden sm:inline-block w-7 h-[1px] bg-[#7dd3fc]"></span>
          </div>

          <a href="tel:+919769907200" className="relative z-10 inline-flex items-center gap-2 bg-gradient-to-r from-[#069488] to-[#00a896] hover:from-[#057a70] hover:to-[#008f80] text-white font-bold text-xs md:text-[13px] px-6 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,168,150,0.3)] transition transform hover:scale-105">
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call +91 97699 07200</span>
          </a>
        </div>
      </div>

      {/* 3. WORKING FILTER BAR & PACKAGES SECTION */}
      <div id="packages" className="max-w-[1360px] mx-auto py-10 px-4 md:px-10">
        <div className="bg-white rounded-3xl border border-gray-200/90 p-6 mb-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="inline-flex items-center bg-[#f1f5f9]/80 p-1.5 rounded-full w-fit gap-1">
              <button onClick={() => setSelectedCategory('All')} className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>All ({totalCount})</button>
              <button onClick={() => setSelectedCategory('Domestic')} className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${selectedCategory === 'Domestic' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Domestic ({domesticCount})</button>
              <button onClick={() => setSelectedCategory('International')} className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${selectedCategory === 'International' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>International ({internationalCount})</button>
            </div>
            <div className="flex items-center gap-2.5 self-end lg:self-auto">
              <span className="text-xs text-slate-500 font-medium">Sort:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[#f8fafc] border border-gray-200 text-slate-900 text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer shadow-sm">
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated First</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar pt-1">
            {EXPERIENCE_THEMES.map((theme) => {
              const isActive = selectedTheme === theme;
              return (
                <button key={theme} onClick={() => setSelectedTheme(theme)} className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${isActive ? 'bg-[#063832] text-white border-[#063832] shadow-sm' : 'bg-[#f8fafc] text-slate-700 border-gray-200 hover:border-teal-500 hover:text-slate-900'}`}>{theme}</button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPackages.map((pkg) => {
            const isInternational = pkg.category?.toLowerCase().includes('international');
            const price = Number(pkg.price_inr) || 0;
            const originalPrice = Number(pkg.original_price_inr) || 0;
            const discountPercent = originalPrice > price && originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;
            const photoCount = Array.isArray(pkg.images) && pkg.images.length > 0 ? pkg.images.length : 1;
            const rating = pkg.rating || 4.9;
            const reviewsCount = pkg.reviews_count || 240;

            return (
              <div 
                key={pkg.id} 
                onClick={() => router.push(`/package/${pkg.slug}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_6px_25px_rgba(0,128,128,0.08)] border border-[#00b4a2]/30 hover:border-[#00b4a2] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative h-64 bg-gray-200">
                  <ImageSlider images={pkg.images} />
                  {pkg.badge && <span className="absolute top-4 left-4 bg-[#00b4a2] text-white text-[10px] font-extrabold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-md z-10 pointer-events-none">{pkg.badge}</span>}
                  <span className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 backdrop-blur-md text-white w-8 h-8 rounded-full flex items-center justify-center z-10 transition" title="View Full Trip">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#008f80]">{isInternational ? 'International' : 'India Domestic'}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500 font-medium">{getShortTheme(pkg.theme)}</span>
                    </div>
                    {pkg.duration && (
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-xs">
                        <svg className="w-4 h-4 text-[#00b4a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{pkg.duration}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#008f80] transition-colors line-clamp-1 mb-2">{pkg.title}</h3>

                  <p className="text-xs text-gray-500 flex items-center gap-1.5 line-clamp-1 mb-4">
                    <svg className="w-4 h-4 text-[#00b4a2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="truncate">{pkg.location || pkg.country}</span>
                  </p>

                  <div className="flex items-center gap-2 text-xs mb-5">
                    <span className="bg-amber-50 border border-amber-200 text-amber-800 font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                      <span className="text-amber-500">★</span> {rating}
                    </span>
                    <span className="text-gray-400 font-medium">({reviewsCount} reviews)</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-slate-700 font-bold truncate">{pkg.hotel_rating || '4 star luxe'}</span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-baseline gap-2.5 flex-wrap mb-1">
                      <span className="text-[28px] font-black text-slate-900 tracking-tight">₹{price.toLocaleString('en-IN')}</span>
                      {originalPrice > price && <span className="text-sm text-gray-400 line-through font-bold">₹{originalPrice.toLocaleString('en-IN')}</span>}
                      {discountPercent && <span className="bg-[#e6f8f5] text-[#008f80] text-xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wide">{discountPercent}% OFF</span>}
                    </div>
                    <p className="text-xs text-gray-400 font-medium mb-5">{pkg.price_subtext || 'per person on twin sharing'}</p>

                    <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                      <a href="tel:+919769907200" className="bg-gradient-to-r from-[#00b4a2] to-[#009282] hover:from-[#009e8e] hover:to-[#007d70] text-white text-xs font-bold py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(0,180,162,0.35)] transition">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <span>Call To Book</span>
                      </a>
                      
                      <span className="bg-[#f1f5f9] hover:bg-[#e2e8f0] text-slate-800 text-xs font-extrabold py-3 px-3 rounded-2xl flex items-center justify-center gap-1 transition shadow-xs cursor-pointer">
                        <span>{photoCount} Photos &amp; Plan</span>
                        <span className="text-base font-bold leading-none">&gt;</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPackages.length === 0 && !loading && (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-200/80">
              <p className="text-gray-500 font-bold text-base">No packages match this filter yet.</p>
              <button onClick={() => { setSelectedCategory('All'); setSelectedTheme('All Experiences'); }} className="mt-3 text-xs font-bold text-teal-600 underline hover:text-teal-800">Reset all filters</button>
            </div>
          )}
        </div>
      </div>

      {/* 4. LOOPING TRAVEL HIGHLIGHT VIDEO SECTION */}
      <VideoLoopSection />

    </div>
  );
}