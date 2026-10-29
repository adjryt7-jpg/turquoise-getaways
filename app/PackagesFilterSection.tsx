'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import ImageSlider from './ImageSlider';

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

export default function PackagesFilterSection({ packages }: { packages: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Domestic' | 'International'>('All');
  const [selectedTheme, setSelectedTheme] = useState<string>('All Experiences');
  const [sortBy, setSortBy] = useState<string>('featured');

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
    <div id="packages" className="max-w-[1360px] mx-auto py-10 px-4 md:px-10">
      
      {/* --- EXACT FILTER BAR CONTAINER FROM SCREENSHOT --- */}
      <div className="bg-white rounded-3xl border border-gray-200/90 p-6 mb-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
        
        {/* Top Row: Category Tabs (Left) & Sort Dropdown (Right) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Pill Switcher */}
          <div className="inline-flex items-center bg-[#f1f5f9]/80 p-1.5 rounded-full w-fit gap-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === 'All'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalCount})
            </button>

            <button
              onClick={() => setSelectedCategory('Domestic')}
              className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                selectedCategory === 'Domestic'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Domestic ({domesticCount})
            </button>

            <button
              onClick={() => setSelectedCategory('International')}
              className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                selectedCategory === 'International'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              International ({internationalCount})
            </button>
          </div>

          {/* Sort Dropdown matching screenshot */}
          <div className="flex items-center gap-2.5 self-end lg:self-auto">
            <span className="text-xs text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#f8fafc] border border-gray-200 text-slate-900 text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer shadow-sm"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated First</option>
            </select>
          </div>

        </div>

        {/* Bottom Row: Experience / Theme Pills (Dark Teal when active) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar pt-1">
          {EXPERIENCE_THEMES.map((theme) => {
            const isActive = selectedTheme === theme;
            return (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#063832] text-white border-[#063832] shadow-sm'
                    : 'bg-[#f8fafc] text-slate-700 border-gray-200 hover:border-teal-500 hover:text-slate-900'
                }`}
              >
                {theme}
              </button>
            );
          })}
        </div>

      </div>

      {/* --- PACKAGES GRID --- */}
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
            <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200/80 hover:border-teal-500/60 hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-60 bg-gray-200">
                <ImageSlider images={pkg.images} />
                {pkg.badge && <span className="absolute top-3.5 left-3.5 bg-[#00b4a2] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10 pointer-events-none">{pkg.badge}</span>}
                <Link href={`/package/${pkg.slug}`} className="absolute top-3.5 right-3.5 bg-black/45 hover:bg-black/70 backdrop-blur-md text-white w-7 h-7 rounded-full flex items-center justify-center z-10 transition" title="View Full Trip">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </Link>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#0d9488]">{isInternational ? 'International' : 'India Domestic'}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 font-medium">{getShortTheme(pkg.theme)}</span>
                  </div>
                  {pkg.duration && (
                    <div className="flex items-center gap-1 text-gray-500 font-medium">
                      <svg className="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{pkg.duration}</span>
                    </div>
                  )}
                </div>

                <Link href={`/package/${pkg.slug}`}>
                  <h3 className="text-[19px] font-extrabold text-slate-900 group-hover:text-[#0d9488] transition-colors line-clamp-1 mb-1.5">{pkg.title}</h3>
                </Link>

                <p className="text-xs text-gray-500 flex items-center gap-1.5 line-clamp-1 mb-3">
                  <svg className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="truncate">{pkg.location || pkg.country}</span>
                </p>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-4">
                  <span className="bg-amber-50 border border-amber-200/60 text-amber-600 font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">★ {rating}</span>
                  <span className="text-gray-400">({reviewsCount} reviews)</span>
                  {pkg.hotel_rating && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-slate-600 font-medium truncate">{pkg.hotel_rating}</span>
                    </>
                  )}
                </div>

                <div className="mt-auto pt-3.5 border-t border-gray-100">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl font-black text-slate-900">₹{price.toLocaleString('en-IN')}</span>
                    {originalPrice > price && <span className="text-xs text-gray-400 line-through font-semibold">₹{originalPrice.toLocaleString('en-IN')}</span>}
                    {discountPercent && <span className="bg-[#e6f8f5] text-[#0d9488] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">{discountPercent}% OFF</span>}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5 mb-4">{pkg.price_subtext || 'per person on twin sharing'}</p>

                  <div className="grid grid-cols-2 gap-2.5">
                    <a href="tel:+919769907200" className="bg-gradient-to-r from-[#0ca69a] to-[#0284a8] hover:from-[#098f84] hover:to-[#0369a1] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <span>Call To Book</span>
                    </a>
                    <Link href={`/package/${pkg.slug}`} className="bg-[#f1f5f9] hover:bg-[#e2e8f0] text-slate-700 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 transition">
                      <span>{photoCount} Photos &amp; Plan</span>
                      <span className="text-sm leading-none">›</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredPackages.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-200/80">
            <p className="text-gray-500 font-bold text-base">No packages match this filter yet.</p>
            <button onClick={() => { setSelectedCategory('All'); setSelectedTheme('All Experiences'); }} className="mt-3 text-xs font-bold text-teal-600 underline hover:text-teal-800">Reset all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}