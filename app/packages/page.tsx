"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { packages } from "@/lib/packages";
import PackageCard from "@/components/blocks/package-card";
import PaymentModal from "@/components/blocks/payment-modal";
import type { Package } from "@/lib/packages";

export default function PackagesPage() {
  const [bookingPkg, setBookingPkg] = useState<Package | null>(null);

  return (
    <div className="page-wrapper">
      {/* ─── HERO ─── */}
      <div className="relative bg-[#003060] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#2571BC] blur-3xl" />
          <div className="absolute bottom-0 left-20 w-60 h-60 rounded-full bg-[#BECAE6] blur-2xl" />
        </div>
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
            Ready-to-Book Packages
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-white"
          >
            Curated Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-dm text-white/70 text-lg mt-4 max-w-xl mx-auto"
          >
            Handcrafted itineraries, transparent pricing, zero-stress booking.
            All packages are from Kerala.
          </motion.p>
        </div>
      </div>

      {/* ─── PACKAGES GRID ─── */}
      <div className="bg-[#f7f9fc] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={i}
                layout="card"
                onBook={setBookingPkg}
              />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="font-dm text-xs text-gray-400 text-center mt-12 max-w-2xl mx-auto leading-relaxed">
            *Prices shown are starting estimates per person from Kerala. Final pricing depends on departure city,
            travel dates, group size, and selected inclusions. Contact us for a customized quote.
          </p>
        </div>
      </div>

      {/* ─── CUSTOM PACKAGE CTA ─── */}
      <div className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-label mb-3">Build Your Own</p>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#003060] mb-4">
            Don&apos;t See Your Dream Trip?
          </h2>
          <p className="font-dm text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
            We build fully customized packages for any budget, group size, or destination.
            Tell us what you have in mind on WhatsApp.
          </p>
          <a
            href="https://wa.me/917025506147?text=Hi! I'd like a custom travel package." // REPLACE WITH REAL NUMBER
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#003060] hover:bg-[#2571BC] text-white font-dm font-medium px-8 py-3 rounded-xl transition-colors duration-200"
          >
            Build a Custom Package
          </a>
        </div>
      </div>

      <PaymentModal
        pkg={bookingPkg}
        open={!!bookingPkg}
        onClose={() => setBookingPkg(null)}
      />
    </div>
  );
}
