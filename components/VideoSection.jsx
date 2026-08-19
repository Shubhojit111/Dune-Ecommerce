"use client";

import Link from "next/link";

export default function VideoSection({
  youtubeVideoId = "dQw4w9WgXcQ", // replace with your actual video ID
  heading = "MADE IN CANADA",
  buttonText = "OUR STORY",
  buttonHref = "/our-story",
}) {
  return (
    <section className="relative w-full h-[40vh] sm:h-[80vh] min-h-[500px] overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3`}
          title="Background video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
        />
      </div>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-dune text-[40px] sm:text-[56px] md:text-[64px] text-white font-normal tracking-wide mb-6">
          {heading}
        </h1>
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center rounded-full px-8 py-3.5 border border-white text-white text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors duration-300"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}