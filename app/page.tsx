"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import HeroSection from "@/components/blocks/hero-section";
import DestinationCard from "@/components/blocks/destination-card";
import PackageCard from "@/components/blocks/package-card";
import Testimonials from "@/components/blocks/testimonials";
import BookingSteps from "@/components/blocks/booking-steps";
import PaymentModal from "@/components/blocks/payment-modal";
import { featuredDestinations } from "@/lib/destinations";
import { packages } from "@/lib/packages";
import type { Package } from "@/lib/packages";

export default function HomePage() {
  const [bookingPkg, setBookingPkg] = useState<Package | null>(null);

  return (
    <div className="page-wrapper">
      <HeroSection />

      {/* ─── FEATURED DESTINATIONS ─── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label">Our Destinations</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060] mt-2">
                Your Journey Begins Here
              </h2>
            </div>
            <Link
              href="/destinations"
              className="hidden md:flex items-center gap-2 font-dm text-sm text-[#003060] hover:text-[#2571BC] font-medium transition-colors"
            >
              See All Destinations
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Horizontal scroll row */}
          <div className="flex gap-5 overflow-x-auto pb-4 scroll-snap-x -mx-4 px-4 sm:-mx-6 sm:px-6">
            {featuredDestinations.map((d, i) => (
              <DestinationCard key={d.slug} destination={d} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 font-dm text-sm text-[#003060] font-medium"
            >
              See All Destinations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY TRIPPY — simplified ─── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — heading + paragraph */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <p className="section-label">Why Choose Us</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060] leading-snug">
                Why Thousands Choose
                <br />
                <span className="italic text-[#003060]">Trippy</span>
              </h2>
              <p className="font-dm text-gray-600 leading-relaxed text-base max-w-lg">
                We&apos;re a Kerala-born travel agency with deep local expertise and
                a genuine passion for connecting travelers with extraordinary experiences.
                Whether you&apos;re an NRI planning a family visit, a couple seeking a
                Maldives getaway, or a group of friends ready for Sar Pass — we handle
                every detail with transparent pricing and zero hidden charges.
              </p>
            </motion.div>

            {/* Right — 3 stats only */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { value: "150+", label: "Trips Planned" },
                { value: "98%", label: "Satisfaction" },
                { value: "3yrs", label: "Experience" },
              ].map((s) => (
                <div key={s.label} className="text-center py-6 border-r border-gray-100 last:border-0">
                  <p className="font-space text-4xl md:text-5xl font-bold text-[#003060]">{s.value}</p>
                  <p className="font-dm text-sm text-gray-400 mt-2">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PACKAGES ─── */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label">Curated for You</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060] mt-2">
              Curated Packages, Zero Stress
            </h2>
          </div>
          <div className="space-y-6">
            {packages.slice(0, 3).map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={i}
                layout="horizontal"
                onBook={setBookingPkg}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-[#003060] hover:bg-[#002050] text-white font-dm font-medium px-8 py-3 rounded-xl transition-colors duration-200"
            >
              View All Packages
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DESTINATION COLLAGE ─── */}
      <section className="py-20 bg-[#003060] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label text-[#BECAE6]">From Kerala, To the World</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mt-2">
              14 Destinations, Infinite Memories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=400&q=80", name: "Kashmir" },
              { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", name: "Bali" },
              { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80", name: "Maldives" },
              { src: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80", name: "Thailand" },
            ].map((img, i) => (
              <motion.div
                key={img.name}
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-3 font-playfair text-white font-semibold text-lg">{img.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <BookingSteps />

      {/* ─── FINAL CTA — dark ocean blue ─── */}
      <section className="relative overflow-hidden bg-[#003060] py-20">
        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#003060] blur-[80px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#002040] blur-[60px] opacity-30 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="section-label text-white/50 mb-3">Start Today</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-5">
            Ready for Your Next Adventure?
          </h2>
          <p className="font-dm text-white/70 text-base mb-8 leading-relaxed">
            Chat with our travel experts on WhatsApp, browse our packages,
            or drop us a message. Your dream trip is one click away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919876543210" // REPLACE WITH REAL NUMBER
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-dm font-medium px-7 py-3 rounded-xl transition-colors min-h-[44px]"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="text-white border border-white/30 hover:border-white/70 hover:bg-white/5 font-dm font-medium px-7 py-3 rounded-xl transition-all duration-200 min-h-[44px] flex items-center"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      </section>

      <PaymentModal
        pkg={bookingPkg}
        open={!!bookingPkg}
        onClose={() => setBookingPkg(null)}
      />
    </div>
  );
}
