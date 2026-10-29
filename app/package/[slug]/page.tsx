import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function PackageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: pkg, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Trip Not Found</h1>
        <p className="text-gray-500 mb-4">Looking for: {slug}</p>
        <Link href="/" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-bold">← Back to Packages</Link>
      </div>
    );
  }

  async function submitInquiry(formData: FormData) {
    'use server';
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const dates = formData.get('dates');

    await supabase.from('leads').insert([{
       package_title: pkg.title,
       customer_name: name,
       customer_phone: phone,
       customer_email: email,
       travel_dates: dates
    }]);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      
      {/* 1. HERO IMAGE BANNER (Still shows the first photo as the huge cover) */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-900">
        {pkg.images && pkg.images.length > 0 ? (
          <img src={pkg.images[0]} alt={pkg.title} className="w-full h-full object-cover opacity-80" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No Image Available</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <Link href="/" className="text-white/80 hover:text-white font-semibold text-sm mb-4 inline-block hover:underline">← Back to all trips</Link>
          <div className="flex gap-2 mb-3">
            <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{pkg.category}</span>
            {pkg.badge && <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{pkg.badge}</span>}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 leading-tight">{pkg.title}</h1>
          <p className="text-xl text-gray-200 font-medium">{pkg.location || pkg.country} • {pkg.duration}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: Details, Itinerary & GALLERY */}
        <div className="lg:col-span-2 space-y-12">
          
          {pkg.overview && (
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Trip Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{pkg.overview}</p>
            </section>
          )}

          {pkg.highlights && pkg.highlights.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Key Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.highlights.map((hl: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-teal-500 font-bold text-xl leading-none">✓</span>
                    <span className="text-gray-700 font-medium">{hl}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Day-by-Day Itinerary</h2>
              <div className="space-y-6">
                {pkg.itinerary.map((day: any, index: number) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center font-extrabold text-lg flex-shrink-0 z-10">
                        {day.day}
                      </div>
                      {index !== pkg.itinerary.length - 1 && <div className="w-1 bg-gray-200 h-full mt-2"></div>}
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex-grow mb-4">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{day.title || `Day ${day.day}`}</h3>
                      <p className="text-gray-600 mb-4 whitespace-pre-line">{day.description}</p>
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-50">
                        {day.meals && <div className="flex items-center gap-2 text-sm text-gray-500 font-medium"><span>🍽️</span> {day.meals}</div>}
                        {day.stay && <div className="flex items-center gap-2 text-sm text-gray-500 font-medium"><span>🏨</span> {day.stay}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- NEW: PHOTO GALLERY GRID --- */}
          {pkg.images && pkg.images.length > 1 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Trip Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pkg.images.map((img: string, i: number) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                    <img 
                      src={img} 
                      alt={`Gallery photo ${i + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* RIGHT COLUMN: Booking Form (Unchanged) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl sticky top-8">
            <p className="text-gray-500 font-bold uppercase tracking-wide text-sm mb-1">Starting From</p>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-extrabold text-gray-900">₹{pkg.price_inr?.toLocaleString()}</span>
              {pkg.original_price_inr && (
                <span className="text-lg text-gray-400 line-through font-bold mb-1">₹{pkg.original_price_inr.toLocaleString()}</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-6">{pkg.price_subtext}</p>

            <div className="space-y-4 mb-8">
              {pkg.best_time_to_visit && (
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500 font-medium">Best Time</span>
                  <span className="font-bold text-gray-900">{pkg.best_time_to_visit}</span>
                </div>
              )}
              {pkg.hotel_rating && (
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500 font-medium">Hotel Category</span>
                  <span className="font-bold text-gray-900">{pkg.hotel_rating}</span>
                </div>
              )}
              {pkg.pickup_drop && (
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500 font-medium">Transfers</span>
                  <span className="font-bold text-gray-900">{pkg.pickup_drop}</span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <h3 className="font-extrabold text-lg mb-4 text-gray-900">Interested? Get a Free Quote</h3>
              <form action={submitInquiry} className="space-y-3">
                <input type="text" name="name" placeholder="Your Name *" required className="w-full border border-gray-300 p-3 rounded-xl bg-white text-sm" />
                <input type="tel" name="phone" placeholder="Phone Number *" required className="w-full border border-gray-300 p-3 rounded-xl bg-white text-sm" />
                <input type="email" name="email" placeholder="Email Address" className="w-full border border-gray-300 p-3 rounded-xl bg-white text-sm" />
                <input type="text" name="dates" placeholder="Preferred Travel Month" className="w-full border border-gray-300 p-3 rounded-xl bg-white text-sm" />
                
                <button type="submit" className="w-full bg-teal-600 text-white py-4 rounded-xl font-extrabold text-lg hover:bg-teal-700 transition shadow-lg mt-2">
                  Send Inquiry
                </button>
              </form>
              <p className="text-center text-xs text-gray-400 mt-4">No payment required to inquire.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}