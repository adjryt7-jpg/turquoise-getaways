'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  // Video Settings State
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoStatus, setVideoStatus] = useState('');

  const [packagesList, setPackagesList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Package Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Domestic (India)');
  const [theme, setTheme] = useState('Beach & Coastal');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('India');
  const [duration, setDuration] = useState('5 Nights / 6 Days');
  const [badge, setBadge] = useState('BEST SELLER');
  const [featured, setFeatured] = useState(true);
  const [rating, setRating] = useState('4.9');
  const [reviewsCount, setReviewsCount] = useState('240');
  const [priceInr, setPriceInr] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [priceSubtext, setPriceSubtext] = useState('per person on twin sharing');
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [overview, setOverview] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [currentHighlight, setCurrentHighlight] = useState('');
  const [itinerary, setItinerary] = useState([{ day: 1, title: '', description: '', meals: '', stay: '' }]);
  const [hotelRating, setHotelRating] = useState('4 star luxe');
  const [bestTime, setBestTime] = useState('');
  const [pickupDrop, setPickupDrop] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchPackages();
        fetchVideoSettings();
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchPackages();
        fetchVideoSettings();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Checking...');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setStatus('Error: ' + error.message);
    else setStatus('');
  }

  // --- FETCHING DATA ---
  async function fetchPackages() {
    const { data } = await supabase.from('packages').select('*').order('created_at', { ascending: false });
    if (data) setPackagesList(data);
  }

  async function fetchVideoSettings() {
    const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
    if (data && data.youtube_url) setYoutubeUrl(data.youtube_url);
  }

  // --- SAVING VIDEO URL ---
  async function handleSaveVideoUrl(e: React.FormEvent) {
    e.preventDefault();
    setVideoStatus('Saving...');
    const { error } = await supabase.from('site_settings').update({ youtube_url: youtubeUrl }).eq('id', 1);
    if (error) setVideoStatus('Error: ' + error.message);
    else setVideoStatus('✅ YouTube Video Updated on Live Site!');
    setTimeout(() => setVideoStatus(''), 3000);
  }

  // --- PACKAGE FUNCTIONS ---
  async function handleDeletePackage(id: string) {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    const { error } = await supabase.from('packages').delete().eq('id', id);
    if (error) alert('Error deleting package: ' + error.message);
    else setPackagesList(packagesList.filter(pkg => pkg.id !== id));
  }

  function handleStartEdit(pkg: any) {
    setEditingId(pkg.id);
    setTitle(pkg.title || '');
    setCategory(pkg.category || 'Domestic (India)');
    setTheme(pkg.theme || 'Beach & Coastal');
    setLocation(pkg.location || '');
    setCountry(pkg.country || 'India');
    setDuration(pkg.duration || '');
    setBadge(pkg.badge || '');
    setFeatured(pkg.featured ?? true);
    setRating(pkg.rating?.toString() || '4.9');
    setReviewsCount(pkg.reviews_count?.toString() || '240');
    setPriceInr(pkg.price_inr?.toString() || '');
    setOriginalPrice(pkg.original_price_inr?.toString() || '');
    setPriceSubtext(pkg.price_subtext || 'per person on twin sharing');
    setImages(pkg.images || []);
    setOverview(pkg.overview || '');
    setHighlights(pkg.highlights || []);
    setItinerary(pkg.itinerary && pkg.itinerary.length > 0 ? pkg.itinerary : [{ day: 1, title: '', description: '', meals: '', stay: '' }]);
    setHotelRating(pkg.hotel_rating || '4 star luxe');
    setBestTime(pkg.best_time_to_visit || '');
    setPickupDrop(pkg.pickup_drop || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setTitle(''); setLocation(''); setDuration('5 Nights / 6 Days'); setBadge('BEST SELLER');
    setFeatured(true); setRating('4.9'); setReviewsCount('240');
    setPriceInr(''); setOriginalPrice('');
    setOverview(''); setHighlights([]); setItinerary([{ day: 1, title: '', description: '', meals: '', stay: '' }]);
    setHotelRating('4 star luxe'); setBestTime(''); setPickupDrop(''); setImages([]);
    setStatus('');
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setIsUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const files = Array.from(e.target.files);
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('package-images').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = await supabase.storage.from('package-images').getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
      }
      setImages(prev => [...prev, ...uploadedUrls]);
    } catch (error: any) {
      alert('Error uploading images: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  }

  const removeImage = (index: number) => setImages(images.filter((_, i) => i !== index));
  const addHighlight = (e: React.MouseEvent) => { e.preventDefault(); if (currentHighlight.trim()) { setHighlights([...highlights, currentHighlight.trim()]); setCurrentHighlight(''); } };
  const removeHighlight = (index: number) => setHighlights(highlights.filter((_, i) => i !== index));
  const addItineraryDay = (e: React.MouseEvent) => { e.preventDefault(); setItinerary([...itinerary, { day: itinerary.length + 1, title: '', description: '', meals: '', stay: '' }]); };
  const updateItinerary = (index: number, field: string, value: string) => { const newItinerary = [...itinerary]; newItinerary[index] = { ...newItinerary[index], [field]: value }; setItinerary(newItinerary); };
  const removeItineraryDay = (index: number) => setItinerary(itinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 })));

  async function handleSavePackage(e: React.FormEvent) {
    e.preventDefault();
    setStatus(editingId ? 'Updating package...' : 'Publishing to database...');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const packageData: any = { 
        title, slug, category, theme, location, country, duration, badge,
        price_inr: Number(priceInr), 
        original_price_inr: originalPrice ? Number(originalPrice) : null, 
        price_subtext: priceSubtext,
        overview, highlights, itinerary,
        hotel_rating: hotelRating, best_time_to_visit: bestTime, pickup_drop: pickupDrop,
        images,
        featured,
        rating: rating ? Number(rating) : 4.9,
        reviews_count: reviewsCount ? Number(reviewsCount) : 240
    };

    if (editingId) {
      const { error } = await supabase.from('packages').update(packageData).eq('id', editingId);
      if (error) setStatus('Error: ' + error.message);
      else { setStatus('Success! Package updated.'); handleCancelEdit(); fetchPackages(); }
    } else {
      const { error } = await supabase.from('packages').insert([packageData]);
      if (error) setStatus('Error: ' + error.message);
      else {
        setStatus('Success! Full package published.');
        handleCancelEdit();
        fetchPackages();
      }
    }
  }

  if (!session) {
    return (
      <div className="p-10 max-w-sm mx-auto bg-white text-black mt-20 rounded-xl shadow-lg border">
        <h1 className="text-2xl font-extrabold mb-5 text-gray-800">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 p-3 rounded-lg" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 p-3 rounded-lg" required />
          <button type="submit" className="bg-teal-600 text-white p-3 rounded-lg font-bold hover:bg-teal-700">Login</button>
        </form>
        {status && <p className="mt-4 text-red-500 font-semibold">{status}</p>}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto bg-gray-50 text-gray-800 my-10 rounded-xl shadow-xl border border-gray-200">
      <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-4">
        <div>
          <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-1 rounded tracking-wide">SITE MANAGEMENT</span>
          <h1 className="text-3xl font-extrabold mt-2">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          {editingId && <button onClick={handleCancelEdit} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-300">Cancel Edit</button>}
          <button onClick={() => supabase.auth.signOut()} className="text-gray-500 hover:text-red-500 font-medium">Log out ✕</button>
        </div>
      </div>

      {/* --- HOMEPAGE YOUTUBE VIDEO SETTINGS --- */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm mb-10">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-200 pb-2 mb-4">🎥 Homepage Video Link</h2>
        <form onSubmit={handleSaveVideoUrl} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Paste Any YouTube Link Here</label>
            <input 
              type="text" 
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
              value={youtubeUrl} 
              onChange={(e) => setYoutubeUrl(e.target.value)} 
              className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 text-blue-600 font-medium" 
            />
          </div>
          <button type="submit" className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-6 py-3 rounded-lg font-bold shadow transition self-end">
            Save Video
          </button>
        </form>
        {videoStatus && <p className="mt-3 text-sm font-bold text-teal-600">{videoStatus}</p>}
      </div>

      {/* --- TRAVEL PACKAGE CREATOR FORM --- */}
      <form onSubmit={handleSavePackage} className="space-y-10">
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-800 pb-2 mb-4">{editingId ? '✏️ Edit Travel Package & Filter Info' : '1. Basic Trip & Filter Bar Details'}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Trip Title <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. Exotic Bali & Nusa Penida Island Escape" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Filter Category <span className="text-red-500">*</span></label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white font-semibold">
                  <option value="Domestic (India)">Domestic (India)</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Filter Experience / Theme <span className="text-red-500">*</span></label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white font-semibold">
                  <option value="Honeymoon & Romantic">Honeymoon &amp; Romantic</option>
                  <option value="Beach & Coastal">Beach &amp; Coastal</option>
                  <option value="Mountains & Serenity">Mountains &amp; Serenity</option>
                  <option value="Heritage & Culture">Heritage &amp; Culture</option>
                  <option value="Adventure & Wildlife">Adventure &amp; Wildlife</option>
                  <option value="Family Vacation">Family Vacation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Location / Cities Covered</label>
                <input type="text" placeholder="e.g. Ubud, Kuta, Seminyak & Nusa Penida" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Country</label>
                <input type="text" placeholder="Indonesia" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Duration</label>
                <input type="text" placeholder="6 Nights / 7 Days" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Top-Left Card Badge</label>
                <input type="text" placeholder="TRENDING INTERNATIONAL" value={badge} onChange={(e) => setBadge(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1 uppercase">⭐ Star Rating (e.g. 4.9)</label>
                <input type="number" step="0.1" min="1" max="5" placeholder="4.9" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full border border-teal-300 bg-teal-50/50 p-3 rounded-lg font-bold" required />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1 uppercase">💬 Review Count (e.g. 240)</label>
                <input type="number" placeholder="240" value={reviewsCount} onChange={(e) => setReviewsCount(e.target.value)} className="w-full border border-teal-300 bg-teal-50/50 p-3 rounded-lg font-bold" required />
              </div>
            </div>

            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer bg-teal-50 border border-teal-200 px-4 py-2.5 rounded-lg">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 accent-teal-600" />
                <span className="text-xs font-bold text-teal-900">Mark as Featured Package (Shows first when sorted by &quot;Featured First&quot;)</span>
              </label>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-800 pb-2 mb-4">2. Pricing in INR</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Selling Price (₹ INR) <span className="text-red-500">*</span></label>
              <input type="number" placeholder="48999" value={priceInr} onChange={(e) => setPriceInr(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white font-bold" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Original Strikethrough Price</label>
              <input type="number" placeholder="62000" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white text-gray-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Price Subtext</label>
              <input type="text" placeholder="per person on twin sharing" value={priceSubtext} onChange={(e) => setPriceSubtext(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white" />
            </div>
          </div>
        </section>

        <section>
           <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-800 pb-2 mb-4">3. Media &amp; Images</h2>
           <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={isUploading} className="border border-gray-300 p-2 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-teal-50 file:text-teal-700 cursor-pointer" />
           {isUploading && <span className="text-sm font-bold text-teal-600 animate-pulse ml-3">Uploading...</span>}
           {images.length > 0 && (
             <div className="flex flex-wrap gap-4 p-4 border border-gray-200 rounded-xl bg-white mt-4">
               {images.map((img, index) => (
                 <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 group shadow-sm">
                   <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                   <button onClick={(e) => { e.preventDefault(); removeImage(index); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                 </div>
               ))}
             </div>
           )}
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-800 pb-2 mb-4">4. Overview &amp; Highlights</h2>
          <textarea placeholder="Describe holiday experience..." value={overview} onChange={(e) => setOverview(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-white h-24 mb-4" />
          <div className="flex gap-2 mb-2">
            <input type="text" placeholder="e.g. Private Sunset Houseboat Cruise..." value={currentHighlight} onChange={(e) => setCurrentHighlight(e.target.value)} className="flex-grow border border-gray-300 p-3 rounded-lg bg-white" />
            <button onClick={addHighlight} className="bg-teal-600 text-white px-6 rounded-lg font-bold">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((hl, index) => (
              <span key={index} className="bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {hl} <button onClick={(e) => { e.preventDefault(); removeHighlight(index); }} className="text-teal-600 font-bold">✕</button>
              </span>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-4">
            <h2 className="text-lg font-bold uppercase tracking-wide">5. Day-by-Day Itinerary ({itinerary.length} Days)</h2>
            <button onClick={addItineraryDay} className="bg-teal-600 text-white px-4 py-1 rounded font-bold text-sm">+ Add Day</button>
          </div>
          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={index} className="border border-gray-300 bg-white rounded-xl p-4 relative shadow-sm">
                <div className="flex gap-4 mb-3">
                  <div className="bg-teal-100 text-teal-800 font-bold px-3 py-2 rounded-lg h-fit">Day {item.day}</div>
                  <input type="text" placeholder="Title" value={item.title} onChange={(e) => updateItinerary(index, 'title', e.target.value)} className="flex-grow border border-gray-300 p-2 rounded-lg font-bold" />
                  <button onClick={(e) => { e.preventDefault(); removeItineraryDay(index); }} className="text-red-400">🗑️</button>
                </div>
                <textarea placeholder="Description" value={item.description} onChange={(e) => updateItinerary(index, 'description', e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg mb-3 h-20" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Meals" value={item.meals} onChange={(e) => updateItinerary(index, 'meals', e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg text-sm" />
                  <input type="text" placeholder="Stay" value={item.stay} onChange={(e) => updateItinerary(index, 'stay', e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg text-sm" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-800 pb-2 mb-4">6. Hotel &amp; Season Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="4 star luxe" value={hotelRating} onChange={(e) => setHotelRating(e.target.value)} className="border border-gray-300 p-3 rounded-lg bg-white" />
            <input type="text" placeholder="October to April" value={bestTime} onChange={(e) => setBestTime(e.target.value)} className="border border-gray-300 p-3 rounded-lg bg-white" />
            <input type="text" placeholder="Airport Pickup" value={pickupDrop} onChange={(e) => setPickupDrop(e.target.value)} className="border border-gray-300 p-3 rounded-lg bg-white" />
          </div>
        </section>

        <div className="pt-6 border-t border-gray-300">
          <button type="submit" className={`w-full text-white p-4 rounded-xl font-extrabold text-lg shadow-lg transition-all ${editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-teal-600 hover:bg-teal-700'}`}>
            {editingId ? 'Save Changes to Package' : 'Publish Travel Package to Live Site'}
          </button>
        </div>
        {status && <div className="p-4 mt-4 rounded-lg font-bold text-center bg-green-100 text-green-700">{status}</div>}
      </form>

      <div className="mt-20 border-t border-gray-300 pt-12">
        <h2 className="text-2xl font-extrabold mb-6">Manage Live Packages</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {packagesList.length === 0 ? (
            <p className="p-6 text-gray-500 font-medium">No live packages found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {packagesList.map((pkg) => (
                <li key={pkg.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900 text-lg">{pkg.title}</p>
                      {pkg.badge && <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded uppercase">{pkg.badge}</span>}
                    </div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mt-1">
                      {pkg.category} • ★ {pkg.rating || 4.9} ({pkg.reviews_count || 240} reviews) • ₹{pkg.price_inr?.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleStartEdit(pkg)} className="bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-lg font-bold text-sm hover:bg-amber-600 hover:text-white transition">✏️ Edit</button>
                    <button onClick={() => handleDeletePackage(pkg.id)} className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 hover:text-white transition">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}