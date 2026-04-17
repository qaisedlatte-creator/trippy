"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#003060]/90 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <span className="font-playfair text-xl font-bold text-white tracking-wide">
              Trippy
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-dm text-sm font-medium transition-colors duration-200 relative ${
                  pathname === l.href ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFB03A] rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919876543210" // REPLACE WITH REAL NUMBER
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white border border-white/50 hover:border-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <Link
              href="/packages"
              className="bg-white hover:bg-white/90 text-[#003060] px-4 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#003060] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-playfair text-2xl font-bold text-white">Trippy</span>
              <button onClick={() => setOpen(false)} className="text-white">
                <X size={26} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    href={l.href}
                    className={`font-playfair text-4xl font-semibold transition-colors ${
                      pathname === l.href ? "text-[#FFB03A]" : "text-white hover:text-white/70"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <a
                  href="https://wa.me/919876543210" // REPLACE WITH REAL NUMBER
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white border border-white/40 px-5 py-2.5 rounded-lg text-base min-h-[44px]"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
