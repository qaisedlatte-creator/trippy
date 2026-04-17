"use client";
import { motion } from "framer-motion";
import { MapPin, Settings, Plane } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Pick Your Destination",
    description: "Browse our curated list of 13 domestic and international destinations. Filter by budget, type, and travel style.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Customize Your Tour",
    description: "Choose your dates, group size, and add-ons. Our Kerala travel experts tailor every detail to your needs.",
  },
  {
    number: "03",
    icon: Plane,
    title: "Confirm & Travel",
    description: "Pay securely via Razorpay or WhatsApp us for bank transfer. We handle everything from there — you just pack and go.",
  },
];

export default function BookingSteps() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label">How It Works</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060] mt-2">
            Booking Made Easy as 1-2-3
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1px)] right-[calc(16.67%+1px)] h-0.5 bg-gradient-to-r from-[#2571BC] via-[#BECAE6] to-[#2571BC]" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center gap-4 relative"
            >
              {/* Step circle */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#003060] flex items-center justify-center shadow-xl">
                  <step.icon size={32} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#FFB03A] flex items-center justify-center">
                  <span className="font-space text-xs font-bold text-[#003060]">{i + 1}</span>
                </div>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-[#003060]">{step.title}</h3>
              <p className="font-dm text-sm text-gray-500 leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
