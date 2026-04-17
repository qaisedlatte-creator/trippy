import Link from "next/link";
import { MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/blocks/social-icons";
import { destinations } from "@/lib/destinations";

export default function Footer() {
  return (
    <footer className="bg-[#003060] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="inline-block bg-white/10 px-4 py-2 rounded-lg">
              <span className="font-playfair text-2xl font-bold text-white">
                Tr<span className="text-[#FFB03A]">i</span>ppy
              </span>
            </div>
            <p className="font-playfair text-lg text-white/80 italic leading-snug">
              Kerala&apos;s Gateway<br />to the World
            </p>
            <p className="font-dm text-sm text-white/60 leading-relaxed">
              A Kerala-born travel agency crafting unforgettable journeys — domestic and international — for wanderers from all over India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFB03A] hover:text-[#003060] transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFB03A] hover:text-[#003060] transition-all duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://wa.me/919876543210" // REPLACE WITH REAL NUMBER
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-400 hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5 text-white">Destinations</h4>
            <ul className="space-y-2">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="font-dm text-sm text-white/60 hover:text-[#BECAE6] transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2571BC] group-hover:bg-[#FFB03A] transition-colors" />
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/destinations", label: "All Destinations" },
                { href: "/packages", label: "Packages" },
                { href: "/about", label: "About Trippy" },
                { href: "/contact", label: "Contact Us" },
                { href: "/contact", label: "Privacy Policy" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-dm text-sm text-white/60 hover:text-[#BECAE6] transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2571BC] group-hover:bg-[#FFB03A] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5 text-white">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/919876543210" // REPLACE WITH REAL NUMBER
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <Phone size={16} className="text-[#2571BC] mt-0.5 shrink-0" />
                  <span className="font-dm text-sm text-white/60 group-hover:text-white transition-colors">
                    +91 98765 43210{/* REPLACE WITH REAL NUMBER */}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@trippy.in" // REPLACE WITH REAL EMAIL
                  className="flex items-start gap-3 group"
                >
                  <Mail size={16} className="text-[#2571BC] mt-0.5 shrink-0" />
                  <span className="font-dm text-sm text-white/60 group-hover:text-white transition-colors">
                    hello@trippy.in{/* REPLACE WITH REAL EMAIL */}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#2571BC] mt-0.5 shrink-0" />
                <span className="font-dm text-sm text-white/60">
                  Kochi, Kerala, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#002050]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-dm text-xs text-white/50">
            © 2025 Trippy Travel. All rights reserved.
          </p>
          <p className="font-dm text-xs text-white/50">
            Made in Kerala 🌴
          </p>
        </div>
      </div>
    </footer>
  );
}
