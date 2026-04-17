"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { destinations } from "@/lib/destinations";

type Filter = "all" | "domestic" | "international";

export default function DestinationsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = destinations.filter((d) => {
    if (filter === "all") return true;
    return d.type === filter;
  });

  return (
    <div className="page-wrapper">
      {/* ─── HERO BANNER ─── */}
      <div className="relative bg-[#003060] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#2571BC] blur-3xl" />
          <div className="absolute bottom-0 left-20 w-60 h-60 rounded-full bg-[#BECAE6] blur-2xl" />
        </div>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label text-[#BECAE6] mb-3"
          >
            13 Handpicked Destinations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-white"
          >
            Explore Our Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-dm text-white/70 text-lg mt-4 max-w-xl mx-auto"
          >
            From Kerala&apos;s misty hills to Bali&apos;s temple cliffs — 7 domestic, 6 international.
          </motion.p>
        </div>
      </div>

      {/* ─── FILTER TABS ─── */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-3">
          {(["all", "domestic", "international"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-dm text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 capitalize ${
                filter === f
                  ? "bg-[#2571BC] text-white shadow-md"
                  : "text-gray-500 hover:text-[#2571BC] hover:bg-[#BECAE6]/20"
              }`}
            >
              {f === "all" ? "All Destinations" : f === "domestic" ? "Domestic" : "International"}
              <span className={`ml-2 text-xs font-space font-bold ${filter === f ? "text-[#FFB03A]" : "text-gray-400"}`}>
                {f === "all" ? destinations.length : destinations.filter(d => d.type === f).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── DESTINATION GRID ─── */}
      <div className="bg-[#f7f9fc] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <Link href={`/destinations/${d.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={d.image}
                          alt={d.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {/* Type badge */}
                        <div className={`absolute top-3 left-3 text-xs font-dm font-medium px-2.5 py-1 rounded-full ${
                          d.type === "international" ? "bg-[#2571BC] text-white" : "bg-white/90 text-[#003060]"
                        }`}>
                          {d.type === "international" ? "International" : "Domestic"}
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ArrowUpRight size={14} className="text-white" />
                        </div>
                      </div>
                      {/* Card content */}
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin size={12} className="text-[#2571BC]" />
                          <span className="font-dm text-xs text-gray-400">{d.region}</span>
                        </div>
                        <h3 className="font-playfair text-lg font-semibold text-[#003060]">{d.name}</h3>
                        <p className="font-dm text-xs text-gray-500 mt-0.5 line-clamp-2">{d.tagline}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="price-tag">Starting {d.priceLabel}</span>
                          <span className="font-dm text-xs text-[#2571BC] font-medium group-hover:underline">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Price disclaimer */}
          <p className="font-dm text-xs text-gray-400 text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            *Prices shown are starting estimates from Kerala. Final pricing depends on departure city,
            travel dates, and group size. Contact us for an exact quote.
          </p>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div className="bg-white py-16 text-center">
        <p className="section-label mb-2">Can&apos;t Decide?</p>
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#003060] mb-4">
          Let Our Experts Help You Choose
        </h2>
        <p className="font-dm text-gray-500 mb-6 max-w-md mx-auto">
          Tell us your budget, dates, and what kind of trip you want — we&apos;ll recommend the perfect destination.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/918592803525" // REPLACE WITH REAL NUMBER
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#003060] hover:bg-[#2571BC] text-white font-dm font-medium px-7 py-3 rounded-xl transition-colors duration-200"
          >
            WhatsApp Us
          </a>
          <Link
            href="/contact"
            className="border border-[#003060] text-[#003060] hover:bg-[#003060] hover:text-white font-dm font-medium px-7 py-3 rounded-xl transition-all duration-200"
          >
            Send Enquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
