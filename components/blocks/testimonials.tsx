"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Trippy made our Kashmir trip absolutely magical. The houseboat experience on Dal Lake was something we'll never forget. Everything was handled — we just showed up and enjoyed.",
    name: "Rahul Menon",
    location: "Dubai, UAE",
    rating: 5,
    trip: "Kashmir Snow Escape",
  },
  {
    text: "Best Wayanad weekend package I've found. The jungle resort was stunning and the price was unbeatable from Kochi. Worth every rupee — already planning our next trip.",
    name: "Priya Krishnan",
    location: "Bangalore",
    rating: 5,
    trip: "Wayanad Weekend",
  },
  {
    text: "Bali was a dream come true. Every detail was handled perfectly — from the villa in Seminyak to the Mt. Batur sunrise trek. Trippy really understands what travelers want.",
    name: "Arjun Suresh",
    location: "Kochi, Kerala",
    rating: 5,
    trip: "Bali Soul Journey",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFB03A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#003060] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label text-[#BECAE6]">What Travelers Say</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mt-2">
            Real Stories, Real Journeys
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl p-7 shadow-lg flex flex-col gap-4 relative overflow-hidden"
            >
              <Quote size={40} className="text-[#BECAE6]/40 absolute top-4 right-4" />
              <StarRating count={t.rating} />
              <p className="font-dm text-gray-700 text-base leading-relaxed relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
                {/* Minimal abstract avatar — no face/letter */}
                <div className="w-10 h-10 rounded-full bg-[#BECAE6] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#003060" strokeWidth="1.5" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#003060" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-dm text-sm font-semibold text-[#003060]">{t.name}</p>
                  <p className="font-dm text-xs text-gray-400">{t.location} · {t.trip}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
