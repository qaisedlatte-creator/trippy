"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Globe, Headphones, MessageCircle, ArrowRight } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/blocks/social-icons";
import HeroSection from "@/components/blocks/hero-section";
import StatsBar from "@/components/blocks/stats-counter";
import DestinationCard from "@/components/blocks/destination-card";
import PackageCard from "@/components/blocks/package-card";
import Testimonials from "@/components/blocks/testimonials";
import BookingSteps from "@/components/blocks/booking-steps";
import PaymentModal from "@/components/blocks/payment-modal";
import { featuredDestinations } from "@/lib/destinations";
import { packages } from "@/lib/packages";
import type { Package } from "@/lib/packages";

const whyCards = [
  {
    icon: MapPin,
    title: "Local Experts",
    description: "Born and raised in Kerala, we know every shortcut, hidden gem, and monsoon pitfall across our 13 destinations.",
  },
  {
    icon: Globe,
    title: "NRI-Friendly Service",
    description: "Handling NRI family trips from UAE, UK, US? We coordinate everything — including airport pickups and visa assistance.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Something unexpected on your trip? Our team is reachable around the clock via WhatsApp, call, or email.",
  },
];

export default function HomePage() {
  const [bookingPkg, setBookingPkg] = useState<Package | null>(null);

  return (
    <div className="page-wrapper">
      <HeroSection />
      <StatsBar />

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
              className="hidden md:flex items-center gap-2 font-dm text-sm text-[#2571BC] hover:text-[#003060] font-medium transition-colors"
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
              className="inline-flex items-center gap-2 font-dm text-sm text-[#2571BC] font-medium"
            >
              See All Destinations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY TRIPPY ─── */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="section-label">Why Choose Us</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060] leading-snug">
                Why Thousands Choose
                <br />
                <span className="italic text-[#2571BC]">Trippy</span>
              </h2>
              <p className="font-dm text-gray-600 leading-relaxed text-base">
                We&apos;re a Kerala-born travel agency with deep local expertise and
                a genuine passion for connecting travelers with extraordinary experiences.
                Whether you&apos;re an NRI planning a family visit, a couple seeking a
                Maldives getaway, or a group of friends ready for Sar Pass — we handle
                every detail with transparent pricing and zero hidden charges.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#003060] flex items-center justify-center text-white hover:bg-[#FFB03A] hover:text-[#003060] transition-all duration-200"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#003060] flex items-center justify-center text-white hover:bg-[#FFB03A] hover:text-[#003060] transition-all duration-200"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href="https://wa.me/919876543210" // REPLACE WITH REAL NUMBER
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-400 transition-all duration-200"
                >
                  <MessageCircle size={18} />
                </a>
              </div>

              {/* 3 stat counters */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                {[
                  { value: "500+", label: "Trips" },
                  { value: "98%", label: "Satisfaction" },
                  { value: "3yrs", label: "Experience" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-space text-2xl font-bold text-[#003060]">{s.value}</p>
                    <p className="font-dm text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — feature cards */}
            <div className="space-y-4">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#003060] rounded-2xl p-6 flex items-start gap-4 group hover:bg-[#2571BC] transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                    <card.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-white mb-1">{card.title}</h3>
                    <p className="font-dm text-sm text-white/70 leading-relaxed">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PACKAGES ─── */}
      <section className="py-20 bg-white">
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

      {/* ─── DESTINATION IMAGE COLLAGE ─── */}
      <section className="py-20 bg-[#003060] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label text-[#BECAE6]">From Kerala, To the World</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mt-2">
              13 Destinations, Infinite Memories
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-3 left-3 font-playfair text-white font-semibold text-lg">{img.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <BookingSteps />

      {/* ─── FINAL CTA ─── */}
      <section className="relative overflow-hidden bg-[#2571BC] py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#003060] blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="section-label text-white/70 mb-3">Start Today</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-5">
            Ready for Your Next Adventure?
          </h2>
          <p className="font-dm text-white/80 text-base mb-8 leading-relaxed">
            Chat with our travel experts on WhatsApp, browse our packages,
            or drop us a message. Your dream trip is one click away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919876543210" // REPLACE WITH REAL NUMBER
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-dm font-medium px-7 py-3 rounded-xl transition-colors"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="bg-white hover:bg-[#BECAE6] text-[#003060] font-dm font-medium px-7 py-3 rounded-xl transition-colors duration-200"
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
