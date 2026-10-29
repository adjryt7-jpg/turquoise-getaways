'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export default function VideoLoopSection() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [driveId, setDriveId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchVideo() {
      const { data, error } = await supabase
        .from('site_settings')
        .select('youtube_url')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Error fetching video:', error);
        return;
      }

      if (data?.youtube_url) {
        const url = data.youtube_url.trim();
        setVideoUrl(url);

        // Check if YouTube link
        const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*shorts\/|.*embed\/|.*v\/))([^&?#]{11})/);
        if (ytMatch && ytMatch[1]) {
          setVideoId(ytMatch[1]);
        }
        // Check if Google Drive link
        else if (url.includes('drive.google.com')) {
          const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
          if (driveMatch && driveMatch[1]) {
            setDriveId(driveMatch[1]);
          }
        }
      }
    }

    fetchVideo();
  }, []);

  if (!videoUrl) return null;

  const isMp4 = videoUrl.toLowerCase().includes('.mp4') && !videoUrl.includes('drive.google.com');

  return (
    <section className="bg-[#050812] py-20 px-4 md:px-10 border-t border-slate-900/50">
      <div className="max-w-[1360px] mx-auto">

        {/* HEADERS */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-[44px] font-black text-white mb-5 tracking-tight leading-tight">
            Experience The Magic Of Travel With Turquoise Getaways
          </h2>

          <p className="text-slate-400 text-sm md:text-[15px] max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in breathtaking landscapes, handcrafted itineraries,
            and unforgettable luxury experiences. Watch our journey highlights
            on continuous loop.
          </p>
        </div>

        {/* VIDEO CONTAINER */}
        <div className="relative rounded-[24px] overflow-hidden aspect-video bg-black shadow-[0_0_50px_rgba(0,0,0,0.4)] ring-1 ring-white/10">

          {isMp4 ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play().catch(() => {});
                }
              }}
              className="absolute inset-0 w-full h-full object-cover"
              src={videoUrl}
            />
          ) : videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              allow="autoplay; encrypted-media"
              className="absolute inset-0 w-full h-full object-cover scale-[1.3] pointer-events-none"
            />
          ) : driveId ? (
            <iframe
              src={`https://drive.google.com/file/d/${driveId}/preview?autoplay=1`}
              allow="autoplay"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={videoUrl}
            />
          )}

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* BOTTOM LEFT TEXT */}
          <div className="absolute bottom-5 left-5 md:bottom-6 md:left-8 flex items-center gap-2 z-10 max-w-lg pointer-events-none">
            <svg
              className="w-4 h-4 text-[#fbbf24] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <p className="text-white text-xs md:text-[13px] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Love this destination? Let our travel designers craft your bespoke holiday.
            </p>
          </div>

          {/* CALLBACK BUTTON */}
          <div className="absolute bottom-5 right-5 md:bottom-6 md:right-8 flex items-center gap-2.5 z-10">
            <a
              href="tel:+919769907200"
              className="bg-[#00b4a2] hover:bg-[#009e8e] text-white px-5 py-2.5 rounded-full font-extrabold text-xs md:text-[13px] flex items-center gap-1.5 transition shadow-[0_4px_12px_rgba(0,180,162,0.6)] cursor-pointer pointer-events-auto"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Request Free Callback
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}