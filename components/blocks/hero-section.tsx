"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SearchBar from "./search-bar";

const Globe3D = dynamic(() => import("./globe-3d"), { ssr: false });

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,30,60,0.92) 0%, rgba(0,30,60,0.6) 50%, rgba(0,20,50,0.3) 100%)",
          zIndex: 1,
        }}
      />

      {/* Giant background word */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <span
          className="font-playfair font-black text-white uppercase tracking-tight"
          style={{
            fontSize: "clamp(100px, 22vw, 280px)",
            opacity: 0.07,
            letterSpacing: "-0.05em",
          }}
        >
          TRIPPY
        </span>
      </div>

      {/* 3D Globe — right side */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[560px] md:h-[560px] lg:w-[680px] lg:h-[680px] pointer-events-none"
        style={{ zIndex: 3, opacity: 0.45 }}
      >
        <Globe3D className="w-full h-full" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start">
        {loaded && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-label text-[#BECAE6] mb-3"
            >
              Kerala&apos;s Premier Travel Agency
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-3xl"
            >
              Kerala&apos;s Gateway
              <br />
              <span className="italic text-[#BECAE6]">to the World</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-dm text-lg md:text-xl text-white/70 mt-5 max-w-lg leading-relaxed"
            >
              From the backwaters of Kerala to the beaches of Bali.
              Curated journeys, transparent pricing, local expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <Link
                href="/destinations"
                className="bg-[#003060] hover:bg-[#002050] text-white font-dm font-medium px-7 py-3 rounded-xl transition-colors duration-200 border border-white/20"
              >
                Explore Destinations
              </Link>
              <Link
                href="/packages"
                className="text-white border border-white/40 hover:border-white/80 hover:bg-white/10 font-dm font-medium px-7 py-3 rounded-xl transition-all duration-200"
              >
                View Packages
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* Search bar floating at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute bottom-8 left-0 right-0 z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full"
      >
        <SearchBar />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-24 right-6 md:right-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-dm text-xs text-white/40 rotate-90 mb-2">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
