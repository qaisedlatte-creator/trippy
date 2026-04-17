"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, MapPin, Users, DollarSign, Globe } from "lucide-react";

const teamMembers = [
  { name: "Arjun Nair", role: "Founder & Lead Travel Designer", initials: "AN" },
  { name: "Priya Menon", role: "International Packages & Visa Expert", initials: "PM" },
  { name: "Rahul Krishnan", role: "Domestic Treks & Adventure", initials: "RK" },
];

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description: "No hidden charges, no surprise add-ons. What you see is exactly what you pay — itemized and explained.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "We're Kerala-born and know every route, season, and shortcut in our 13 destination portfolio.",
  },
  {
    icon: Users,
    title: "NRI-Friendly",
    description: "Coordinating family trips from the UAE, UK, US or beyond is our specialty — with seamless logistics.",
  },
  {
    icon: DollarSign,
    title: "Affordable Luxury",
    description: "Premium experience without the luxury agency markup. We pass savings directly to our travelers.",
  },
];

export default function AboutPage() {
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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-white"
          >
            About Trippy
          </motion.h1>
        </div>
      </div>

      {/* ─── STORY ─── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label mb-3">Our Origin</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060] mb-6">
                Born in Kerala,
                <br />
                <span className="italic text-[#2571BC]">Built for Wanderers</span>
              </h2>
              <div className="space-y-4 font-dm text-gray-600 leading-relaxed">
                <p>
                  Trippy was born from a simple frustration: Kerala travelers were paying too much
                  for international trips, or settling for generic domestic packages that felt
                  copy-pasted from a brochure. We started with one goal — build a Kerala-native
                  travel agency that genuinely understood where its customers were coming from,
                  literally and figuratively.
                </p>
                <p>
                  From our base in Kochi, we&apos;ve spent years building relationships with hotels,
                  local guides, and logistics partners across India, Southeast Asia, and the Indian Ocean.
                  Every package we sell is one we&apos;ve personally researched — tested for quality,
                  verified for price, and designed to deliver real value.
                </p>
                <p>
                  Whether you&apos;re booking a Wayanad weekend for two or a 15-person NRI family
                  reunion in Kashmir, we approach every trip with the same care:
                  local expertise, honest pricing, and 24/7 support from people who answer your calls.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80",
                  "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=400&q=80",
                  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
                  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80",
                ].map((src, i) => (
                  <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 0 ? "aspect-square" : i === 1 ? "aspect-[4/3]" : i === 2 ? "aspect-[4/3]" : "aspect-square"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#FFB03A] text-[#003060] rounded-2xl p-4 shadow-xl">
                <p className="font-space text-3xl font-bold">500+</p>
                <p className="font-dm text-xs font-medium">Happy Travelers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="bg-[#f7f9fc] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-2">The People Behind Trippy</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060]">
              Meet the Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 text-center shadow-md border border-gray-100"
              >
                {/* Abstract shape avatar — no face/letter per spec */}
                <div className="w-20 h-20 rounded-full bg-[#BECAE6] mx-auto mb-5 flex items-center justify-center">
                  <Globe size={32} className="text-[#003060]" />
                </div>
                <h3 className="font-playfair text-lg font-semibold text-[#003060] mb-1">{member.name}</h3>
                <p className="font-dm text-sm text-[#2571BC] font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-2">What We Stand For</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060]">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#003060] rounded-2xl p-6 group hover:bg-[#2571BC] transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                  <val.icon size={22} className="text-white" />
                </div>
                <h3 className="font-playfair text-lg font-semibold text-white mb-2">{val.title}</h3>
                <p className="font-dm text-sm text-white/70 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#2571BC] py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Travel?
          </h2>
          <p className="font-dm text-white/80 mb-6 leading-relaxed">
            Let&apos;s plan your perfect trip together. Tell us where you want to go and we&apos;ll handle everything else.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white hover:bg-[#BECAE6] text-[#003060] font-dm font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </div>
  );
}
