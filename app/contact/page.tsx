"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/blocks/social-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { destinations } from "@/lib/destinations";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDates: "",
    travelers: "2",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in your name, email, and phone number.");
      return;
    }
    setSubmitting(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll get back to you within 24 hours.", {
      description: "Our team in Kochi will reach out via WhatsApp or email.",
    });
    setForm({ name: "", email: "", phone: "", destination: "", travelDates: "", travelers: "2", message: "" });
    setSubmitting(false);
  };

  return (
    <div className="page-wrapper">
      {/* ─── HERO ─── */}
      <div className="relative bg-[#003060] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#2571BC] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label text-[#BECAE6] mb-3"
          >
            Let&apos;s Plan Your Trip
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-white"
          >
            Contact Us
          </motion.h1>
        </div>
      </div>

      {/* ─── SPLIT LAYOUT ─── */}
      <div className="bg-[#f7f9fc] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Form (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 bg-white rounded-2xl shadow-md p-8"
            >
              <h2 className="font-playfair text-2xl font-bold text-[#003060] mb-2">Send an Enquiry</h2>
              <p className="font-dm text-sm text-gray-500 mb-7">
                Fill in your details and we&apos;ll get back to you with an exact quote within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm text-sm font-medium text-gray-700 block mb-1.5">Full Name *</label>
                    <Input
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="font-dm border-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-dm text-sm font-medium text-gray-700 block mb-1.5">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="font-dm border-gray-200"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm text-sm font-medium text-gray-700 block mb-1.5">Phone *</label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+91 8592803525"
                      value={form.phone}
                      onChange={handleChange}
                      className="font-dm border-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-dm text-sm font-medium text-gray-700 block mb-1.5">Destination of Interest</label>
                    <select
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      className="w-full font-dm text-sm text-gray-700 border border-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#2571BC] focus:border-transparent bg-white"
                    >
                      <option value="">Select destination</option>
                      {destinations.map((d) => (
                        <option key={d.slug} value={d.slug}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm text-sm font-medium text-gray-700 block mb-1.5">Travel Dates</label>
                    <Input
                      type="date"
                      name="travelDates"
                      value={form.travelDates}
                      onChange={handleChange}
                      className="font-dm border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="font-dm text-sm font-medium text-gray-700 block mb-1.5">Number of Travelers</label>
                    <select
                      name="travelers"
                      value={form.travelers}
                      onChange={handleChange}
                      className="w-full font-dm text-sm text-gray-700 border border-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#2571BC] focus:border-transparent bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>
                      ))}
                      <option value="10+">10+ People</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-dm text-sm font-medium text-gray-700 block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your trip — budget range, special requests, any questions..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full font-dm text-sm text-gray-700 border border-gray-200 rounded-md px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#2571BC] focus:border-transparent resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#003060] hover:bg-[#2571BC] text-white font-dm font-medium h-12 text-base transition-colors duration-200"
                >
                  {submitting ? "Sending..." : (
                    <span className="flex items-center gap-2 justify-center">
                      <Send size={18} />
                      Send Enquiry
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Right: Contact info (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* WhatsApp card */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                    <MessageCircle size={22} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-base font-semibold text-[#003060]">Chat on WhatsApp</h3>
                    <p className="font-dm text-xs text-gray-400">Fastest response — usually within 1 hour</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/918592803525?text=Hi! I'd like to enquire about a trip." // REPLACE WITH REAL NUMBER
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-white font-dm font-medium py-2.5 rounded-xl transition-colors duration-200 text-sm"
                >
                  <MessageCircle size={16} />
                  +91 85928 03525{/* REPLACE WITH REAL NUMBER */}
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#BECAE6]/40 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#2571BC]" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-base font-semibold text-[#003060] mb-1">Email Us</h3>
                    <a
                      href="mailto:hello@trippy.in" // REPLACE WITH REAL EMAIL
                      className="font-dm text-sm text-[#2571BC] hover:underline"
                    >
                      hello@trippy.in{/* REPLACE WITH REAL EMAIL */}
                    </a>
                    <p className="font-dm text-xs text-gray-400 mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#BECAE6]/40 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-[#2571BC]" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-base font-semibold text-[#003060] mb-1">Call Us</h3>
                    <a
                      href="tel:+918592803525" // REPLACE WITH REAL NUMBER
                      className="font-dm text-sm text-[#2571BC] hover:underline"
                    >
                      +91 85928 03525{/* REPLACE WITH REAL NUMBER */}
                    </a>
                    <p className="font-dm text-xs text-gray-400 mt-1">Mon–Sat, 9am–8pm IST</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#BECAE6]/40 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#2571BC]" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-base font-semibold text-[#003060] mb-1">Visit Us</h3>
                    <p className="font-dm text-sm text-gray-600 leading-relaxed">
                      Trippy Travel<br />
                      Kochi, Kerala, India — 682 001
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-playfair text-base font-semibold text-[#003060] mb-4">Follow Our Journeys</h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 hover:bg-[#003060] hover:text-white hover:border-[#003060] transition-all duration-200 text-gray-600 text-sm font-dm"
                  >
                    <InstagramIcon size={16} />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 hover:bg-[#003060] hover:text-white hover:border-[#003060] transition-all duration-200 text-gray-600 text-sm font-dm"
                  >
                    <FacebookIcon size={16} />
                    Facebook
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
