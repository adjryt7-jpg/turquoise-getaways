import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: ["italic", "normal"],
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "Turquoise Getaways | India & International Holidays",
  description: "India & International Holidays, Planned to Perfection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=919769907200&text=Hi+Turquoise+Getaways%21+I+want+to+explore+holiday+packages.&type=phone_number&app_absent=0";
  const facebookUrl = "https://www.facebook.com/turquoisegetaways23/";
  const instagramUrl = "https://www.instagram.com/turquoisegetaways";

  // Replace with your uploaded Supabase logo public URL
  const logoUrl = "https://kvxihuncqwhqugqxmawc.supabase.co/storage/v1/object/public/package-images/Gemini_Generated_Image_%20(1).jpeg"; 

  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} bg-gray-50 text-gray-900 flex flex-col min-h-screen relative`}>
        
        {/* TOP PROMOTIONAL RIBBON */}
        <div className="bg-gradient-to-r from-[#05383b] via-[#074247] to-[#0a2339] text-white text-[11px] md:text-[13px] py-2 px-4 md:px-10 flex items-center justify-between border-b border-teal-800/40 z-50">
          <div className="flex items-center gap-2 mx-auto md:mx-0 overflow-hidden text-ellipsis whitespace-nowrap">
            <svg className="w-4 h-4 text-[#2dd4bf] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p className="text-gray-100 font-normal">
              Special Holiday Offer: Flat <span className="font-bold text-white">₹5,000 Instant Savings</span> on International & Domestic India Packages. Departures from <span className="font-bold text-white">Delhi, Mumbai, Bengaluru</span> & all major airports.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <a href="tel:+919769907200" className="flex items-center gap-1.5 text-gray-200 hover:text-white transition">
              <svg className="w-3.5 h-3.5 text-[#2dd4bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Instant Assistance: <strong className="text-white font-bold">+91 97699 07200</strong></span>
            </a>
            <button className="text-teal-400/80 hover:text-white text-sm font-bold transition pl-1" title="Close">✕</button>
          </div>
        </div>

        {/* GLOBAL NAVBAR */}
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden rounded-full border border-teal-500/30 bg-teal-50 shadow-sm">
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[20px] font-black text-[#0f2942] tracking-[0.08em] leading-none">TURQUOISE</span>
                <span className="text-[9px] font-bold text-[#2c4c6b] tracking-[0.34em] uppercase mt-1.5">GETAWAYS</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2.5 bg-[#f4f7f9] border border-gray-200/80 px-5 py-2 rounded-full shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block"></span>
              <span className="text-xs font-semibold text-slate-600">
                Trusted by <strong className="text-slate-900 font-extrabold">12,000+</strong> travelers worldwide
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a href="tel:+919769907200" className="flex items-center gap-2 bg-gradient-to-r from-[#0ca69a] to-[#0284a8] hover:from-[#098f84] hover:to-[#0369a1] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Now</span>
              </a>
              <button className="p-2 text-slate-800 hover:bg-gray-100 rounded-lg transition" aria-label="Menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-grow">{children}</main>

        {/* DETAILED FOOTER */}
        <footer className="bg-[#070D1B] text-gray-400 pt-16 pb-8 border-t border-gray-900 text-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-gray-800/60">
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-teal-500/40 bg-teal-950">
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold text-white tracking-tight leading-none">TURQUOISE</span>
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase mt-1">GETAWAYS</span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Your Gateway to Extraordinary Journeys &amp; Exotic Escapes</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="tel:+919769907200" className="bg-teal-950/60 border border-teal-800/50 text-teal-300 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-teal-900 transition flex items-center gap-2">
                  <span>📞</span> Call Hotline: +91 97699 07200
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-teal-950/60 border border-teal-800/50 text-teal-300 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-teal-900 transition flex items-center gap-2">
                  <span>💬</span> WhatsApp Us
                </a>
              </div>
              <div className="pt-2">
                <p className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-3">Connect With Us On Social Media</p>
                <div className="flex flex-wrap gap-3">
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-900 border border-gray-800 text-gray-300 px-4 py-2 rounded-xl text-xs font-bold hover:border-teal-500 hover:text-white transition flex items-center gap-2">
                    <span className="text-blue-400 font-black text-sm">f</span> Facebook
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-900 border border-gray-800 text-gray-300 px-4 py-2 rounded-xl text-xs font-bold hover:border-teal-500 hover:text-white transition flex items-center gap-2">
                    <span>💬</span> WhatsApp
                  </a>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-900 border border-gray-800 text-gray-300 px-4 py-2 rounded-xl text-xs font-bold hover:border-teal-500 hover:text-white transition flex items-center gap-2">
                    <span>📸</span> Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs">Domestic Holidays</h3>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Kashmir &amp; Gulmarg Valley</li>
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Kerala Backwaters &amp; Munnar</li>
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Royal Rajasthan &amp; Udaipur</li>
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Andaman Coral Islands</li>
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Ladakh &amp; Pangong Tso</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs">International Escapes</h3>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Bali &amp; Nusa Penida Island</li>
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Maldives Luxury Water Villas</li>
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Dubai &amp; Abu Dhabi City</li>
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Switzerland &amp; Swiss Alps</li>
                <li className="hover:text-teal-400 transition cursor-pointer flex items-center gap-1.5"><span className="text-teal-500">➔</span> Vietnam &amp; Halong Bay Cruise</li>
              </ul>
            </div>

            {/* GET IN TOUCH SECTION WITH UPDATED EMAIL */}
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs">Get In Touch</h3>
              <div className="space-y-3 text-xs text-gray-400 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">📍</span> 402 Turquoise Bay Tower, Marine Drive, Mumbai &amp; Connaught Place, New Delhi, India
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-teal-400">📞</span> 
                  <a href="tel:+919769907200" className="hover:text-teal-300 transition">+91 97699 07200</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-teal-400">✉️</span> 
                  <a href="mailto:TurquoiseGetaways23@gmail.com" className="hover:text-teal-300 transition">
                    TurquoiseGetaways23@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-teal-400">🕒</span> Monday - Sunday: 8:00 AM – 10:00 PM IST
                </p>
              </div>
              <div className="pt-2">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block text-center bg-teal-600 hover:bg-teal-500 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg transition text-xs tracking-wide">
                  Request Custom Quote
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© 2026 Turquoise Getaways. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1 text-teal-400 font-medium">🛡️ IATA &amp; Ministry of Tourism Certified</span>
              <Link href="#" className="hover:text-gray-300 transition">Guest Reviews</Link>
            </div>
            <Link href="/admin" className="hover:text-gray-300 transition">🔒 Admin Login</Link>
          </div>
        </footer>

        {/* FLOATING WHATSAPP BUTTON */}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.5)] border-4 border-white/20 hover:scale-110 transition-all duration-300" title="Chat on WhatsApp">
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full z-10"></span>
          <svg className="w-8 h-8 md:w-9 md:h-9 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>

      </body>
    </html>
  );
}