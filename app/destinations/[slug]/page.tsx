"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin, Clock, CalendarDays, CheckCircle2, MessageCircle,
  ChevronRight, Hotel, Car, Utensils, UserCheck, Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentModal from "@/components/blocks/payment-modal";
import { getDestinationBySlug } from "@/lib/destinations";
import { packages } from "@/lib/packages";
import type { Package } from "@/lib/packages";

interface Props {
  params: { slug: string };
}

const includeIcons: Record<string, React.ElementType> = {
  "Hotel Accommodation": Hotel,
  "Houseboat Stay": Hotel,
  "Resort/Overwater Villa": Hotel,
  "Hotel": Hotel,
  "Transfers": Car,
  "Airport Transfers": Car,
  "All Meals": Utensils,
  "Breakfast Daily": Utensils,
  "Breakfast": Utensils,
  "Breakfast & Dinner": Utensils,
  "Full Board": Utensils,
  "Tour Guide": UserCheck,
  "Expert Guide": UserCheck,
  "24/7 Support": Headphones,
};

export default function DestinationPage({ params }: Props) {
  const { slug } = params;
  const destination = getDestinationBySlug(slug);
  const [bookingPkg, setBookingPkg] = useState<Package | null>(null);

  if (!destination) notFound();

  // Find a matching package for this destination
  const matchingPkg = packages.find((p) => p.destinationSlug === slug);

  const bookPkg: Package = matchingPkg || {
    id: destination.id,
    name: destination.name,
    slug: destination.slug,
    destination: destination.name,
    destinationSlug: destination.slug,
    duration: destination.duration,
    nights: 0,
    days: 0,
    price: destination.price,
    priceLabel: destination.priceLabel,
    image: destination.image,
    includes: destination.includes,
    highlights: [],
    description: destination.description,
  };

  return (
    <div className="page-wrapper">
      {/* ─── HERO ─── */}
      <div className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001830]/90 via-[#001830]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/60 text-sm font-dm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
            <ChevronRight size={14} />
            <span className="text-white">{destination.name}</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`text-xs font-dm font-medium px-3 py-1 rounded-full ${
                destination.type === "international" ? "bg-[#2571BC] text-white" : "bg-white/90 text-[#003060]"
              }`}>
                {destination.type === "international" ? "International" : "Domestic"}
              </span>
              <span className="text-xs font-dm text-white/60 flex items-center gap-1">
                <MapPin size={12} />
                {destination.region}
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-3">
              {destination.name}
            </h1>
            <p className="font-playfair text-xl italic text-[#BECAE6]">{destination.tagline}</p>
            <div className="mt-4">
              <span className="price-tag text-sm">Starting {destination.priceLabel} from Kerala*</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Section 1: About */}
              <section>
                <p className="section-label mb-2">About the Destination</p>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#003060] mb-5">
                  Discover {destination.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <p className="font-dm text-gray-600 leading-relaxed text-base">
                      {destination.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: CalendarDays, label: "Best Time", value: destination.bestTime },
                      { icon: Clock, label: "Ideal Duration", value: destination.duration },
                      { icon: MapPin, label: "Type", value: destination.type_label },
                      ...(destination.difficulty ? [{ icon: CheckCircle2, label: "Difficulty", value: destination.difficulty }] : []),
                    ].map((item) => (
                      <div key={item.label} className="bg-[#f7f9fc] rounded-xl p-3 flex items-start gap-3">
                        <item.icon size={16} className="text-[#2571BC] mt-0.5 shrink-0" />
                        <div>
                          <p className="font-dm text-xs text-gray-400">{item.label}</p>
                          <p className="font-dm text-sm font-medium text-[#003060]">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 2: What's Included */}
              <section>
                <p className="section-label mb-2">Package Includes</p>
                <h2 className="font-playfair text-2xl font-bold text-[#003060] mb-5">
                  What&apos;s Included
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {destination.includes.map((item) => {
                    const Icon = includeIcons[item] || CheckCircle2;
                    return (
                      <div key={item} className="flex items-center gap-2.5 bg-[#f7f9fc] rounded-xl p-3.5">
                        <div className="w-8 h-8 rounded-lg bg-[#BECAE6]/40 flex items-center justify-center shrink-0">
                          <Icon size={15} className="text-[#2571BC]" />
                        </div>
                        <span className="font-dm text-sm text-gray-700">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 3: Itinerary */}
              <section>
                <p className="section-label mb-2">Day-by-Day Plan</p>
                <h2 className="font-playfair text-2xl font-bold text-[#003060] mb-6">
                  Sample Itinerary
                </h2>
                <div className="space-y-4">
                  {destination.itinerary.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-4 relative"
                    >
                      {/* Timeline line */}
                      {i < destination.itinerary.length - 1 && (
                        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-[#2571BC]/50 to-transparent" style={{top:'44px'}} />
                      )}
                      {/* Day circle */}
                      <div className="w-10 h-10 rounded-full bg-[#003060] flex items-center justify-center shrink-0 mt-1 shadow-md">
                        <span className="font-space text-xs font-bold text-white">{day.day}</span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="bg-[#f7f9fc] rounded-xl p-4">
                          <p className="font-dm text-xs text-[#2571BC] font-medium uppercase tracking-wide mb-1">
                            Day {day.day}
                          </p>
                          <h4 className="font-playfair text-base font-semibold text-[#003060] mb-2">{day.title}</h4>
                          <p className="font-dm text-sm text-gray-600 leading-relaxed">{day.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: Sticky pricing card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Pricing card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-[#003060] p-6">
                    <p className="font-dm text-xs text-white/60 uppercase tracking-wider mb-1">Starting Price</p>
                    <p className="font-space text-3xl font-bold text-white">
                      {destination.priceLabel}
                      <span className="text-sm text-white/60 font-dm font-normal ml-2">per person</span>
                    </p>
                    <p className="font-dm text-xs text-[#BECAE6] mt-2">
                      *From Kerala. Final price depends on departure city, dates, group size, and inclusions.
                    </p>
                  </div>
                  <div className="p-6 space-y-3">
                    <Button
                      onClick={() => setBookingPkg(bookPkg)}
                      className="w-full bg-[#FFB03A] hover:bg-[#e89c2a] text-[#003060] font-bold text-base h-12"
                    >
                      Book Now
                    </Button>
                    <a
                      href={`https://wa.me/919876543210?text=Hi! I'm interested in the ${destination.name} package. Can you share the exact quote?`} // REPLACE WITH REAL NUMBER
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full border border-green-400 text-green-600 hover:bg-green-50 font-dm font-medium py-3 rounded-xl transition-colors duration-200"
                    >
                      <MessageCircle size={16} />
                      Get Exact Quote on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Quick facts */}
                <div className="bg-[#f7f9fc] rounded-2xl p-5 space-y-3">
                  <h4 className="font-playfair text-sm font-semibold text-[#003060]">Quick Facts</h4>
                  {[
                    { label: "Destination", value: destination.name },
                    { label: "Region", value: destination.region },
                    { label: "Best Time", value: destination.bestTime },
                    { label: "Duration", value: destination.duration },
                    { label: "Type", value: destination.type_label },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between text-sm">
                      <span className="font-dm text-gray-400">{f.label}</span>
                      <span className="font-dm font-medium text-[#003060] text-right max-w-[55%]">{f.value}</span>
                    </div>
                  ))}
                </div>

                <p className="font-dm text-xs text-gray-400 text-center leading-relaxed px-2">
                  *Prices are estimates from Kerala. Actual pricing depends on departure city, travel dates, and group size. Contact us for an exact quote.
                </p>
              </div>
            </div>
          </div>
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
