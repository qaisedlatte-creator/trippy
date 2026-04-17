"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const scrub = (progress: number) => {
      if (video.readyState >= 1 && video.duration) {
        video.currentTime = progress * video.duration;
      }
    };

    // Re-scrub once metadata is available (duration was NaN before this)
    const onMetadata = () => scrub(scrollYProgress.get());
    video.addEventListener("loadedmetadata", onMetadata);

    const unsub = scrollYProgress.on("change", scrub);

    return () => {
      unsub();
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[300vh]"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video background */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Light overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.2)", zIndex: 1 }}
        />

        {/* Centered content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ zIndex: 10 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22 }}
            className="font-playfair font-bold text-white leading-[1.05] mb-5"
            style={{ fontSize: "clamp(42px, 8vw, 88px)" }}
          >
            Explore Everywhere
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="font-dm text-white/80 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            From the backwaters of Kerala to the peaks of Kashmir
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
          >
            <Link
              href="/destinations"
              className="bg-white hover:bg-white/90 text-[#003060] font-dm font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-h-[44px] flex items-center"
            >
              Plan Your Trip →
            </Link>
          </motion.div>
        </div>

        {/* Scroll chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} className="text-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
