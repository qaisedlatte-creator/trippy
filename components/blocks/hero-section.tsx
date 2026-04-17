"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* Background image with parallax zoom */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.ibb.co/Gfzvxnk2/manali.png"
          alt="Manali mountains"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=85";
          }}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%", filter: "brightness(1.15)" }}
        />
      </motion.div>

      {/* White gradient at top — washes out baked-in "MANALI 2021" text */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "25%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Light dark overlay — bright and airy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(0,0,0,0.2)",
          zIndex: 1,
        }}
      />

      {/* Centered content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        style={{ y: contentY, opacity: contentOpacity, zIndex: 2 }}
      >
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22 }}
          className="font-playfair font-bold text-white leading-[1.05] mb-5"
          style={{ fontSize: "clamp(42px, 8vw, 88px)" }}
        >
          Explore Everywhere
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="font-dm text-white/80 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          From the backwaters of Kerala to the peaks of Kashmir
        </motion.p>

        {/* Single CTA */}
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
      </motion.div>

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
    </section>
  );
}
