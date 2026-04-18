"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

interface ScrollAnimationProps {
  totalFrames?: number;
  frameFolder?: string;
}

export default function ScrollAnimation({
  totalFrames = 40,
  frameFolder = "/frames",
}: ScrollAnimationProps) {
  // Canvas ref for rendering frames
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Outer container ref for scroll progress calculation
  const containerRef = useRef<HTMLDivElement>(null);
  // Preloaded frames stored in ref to avoid re-renders
  const framesRef = useRef<HTMLImageElement[]>([]);
  // Animation frame ID for cleanup
  const rafRef = useRef<number>(0);
  // Current smoothed frame index (mutable, no re-render)
  const currentFrameRef = useRef(0);
  // Target frame from scroll position
  const targetFrameRef = useRef(0);
  // Loading state
  const [isLoaded, setIsLoaded] = useState(false);

  // Easing factor - lower = smoother but more lag, higher = more responsive but potentially jittery
  const EASING = 0.15;

  /**
   * Generate frame URL from index (0-based)
   * Frames named: ezgif-frame-001.jpg to ezgif-frame-040.jpg
   */
  const getFrameUrl = useCallback(
    (index: number): string => {
      const padded = String(index + 1).padStart(3, "0");
      return `${frameFolder}/ezgif-frame-${padded}.jpg`;
    },
    [frameFolder]
  );

  /**
   * Preload all frames before animation starts
   * Returns promise that resolves when all frames loaded
   */
  useEffect(() => {
    let mounted = true;

    const preloadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () =>
          reject(new Error(`Failed to load frame ${index + 1}`));
        img.src = getFrameUrl(index);
      });
    };

    const preloadAll = async () => {
      try {
        const promises = Array.from({ length: totalFrames }, (_, i) =>
          preloadFrame(i)
        );
        const loaded = await Promise.all(promises);

        if (mounted) {
          framesRef.current = loaded;
          setIsLoaded(true);
          console.log(`✓ Loaded ${loaded.length} frames`);
        }
      } catch (error) {
        console.error("Failed to preload frames:", error);
      }
    };

    preloadAll();

    return () => {
      mounted = false;
      framesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, frameFolder]);

  /**
   * Calculate scroll progress (0 to 1) through sticky container
   * 0 = top of container at viewport top
   * 1 = bottom of container at viewport bottom
   */
  const getScrollProgress = useCallback((): number => {
    const container = containerRef.current;
    if (!container) return 0;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollDistance = containerHeight - viewportHeight;

    // Container shorter than viewport (edge case)
    if (scrollDistance <= 0) return 0.5;

    // How far we've scrolled past the container top
    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / scrollDistance));
  }, []);

  /**
   * Draw image to canvas with cover behavior (like CSS object-fit: cover)
   * Maintains aspect ratio while filling entire canvas
   */
  const drawCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number,
      drawHeight: number,
      offsetX: number,
      offsetY: number;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas - fit by height, center horizontally
      drawHeight = canvasHeight;
      drawWidth = imgRatio * canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Image is taller than canvas - fit by width, center vertically
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  /**
   * Render current frame to canvas
   * Called every animation frame
   */
  const renderToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || framesRef.current.length === 0) return;

    const ctx = canvas.getContext("2d", {
      alpha: false, // No transparency = better performance
      desynchronized: true, // Lower latency for scroll-synced rendering
    });

    if (!ctx) return;

    // Get smoothed frame index
    const frameIndex = Math.round(currentFrameRef.current);
    const clampedIndex = Math.max(0, Math.min(totalFrames - 1, frameIndex));

    // Clear and draw
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, width, height);
    drawCover(ctx, framesRef.current[clampedIndex], width, height);
  }, [isLoaded, totalFrames]);

  /**
   * Main animation loop
   * Updates scroll target, applies easing, renders frame
   */
  const animate = useCallback(() => {
    if (!isLoaded) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    // Get target frame from current scroll position
    const progress = getScrollProgress();
    targetFrameRef.current = progress * (totalFrames - 1);

    // Linear interpolation for smooth transitions
    currentFrameRef.current +=
      (targetFrameRef.current - currentFrameRef.current) * EASING;

    // Render the frame
    renderToCanvas();

    rafRef.current = requestAnimationFrame(animate);
  }, [isLoaded, getScrollProgress, totalFrames, renderToCanvas]);

  /**
   * Handle canvas resize - set internal resolution to match display
   * Accounts for device pixel ratio (Retina displays)
   */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    // Set actual canvas buffer size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale context to match
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // Initialize animation loop
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleResize, animate]);

  return (
    <>
      {/*
        Outer scroll container
        Height determines how long the scroll animation lasts
        300vh = 3 viewport heights of scrolling to play all 40 frames
      */}
      <div ref={containerRef} className="relative w-full h-[300vh]">
        {/*
          Sticky viewport container
          Stays fixed while scrolling through outer container
          This is what creates the scroll-scrubbing effect
        */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          {/* Canvas background - renders animation frames */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            style={{ imageRendering: "auto" }}
          />

          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 pointer-events-none"
            style={{ zIndex: 1 }}
          />

          {/* Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black">
              <p className="text-white/50 font-dm text-sm tracking-wide">
                Loading...
              </p>
            </div>
          )}

          {/* Centered overlay content */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-700 z-10 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Main heading */}
            <h1
              className="font-playfair font-bold text-white leading-tight mb-4"
              style={{
                fontSize: "clamp(48px, 10vw, 96px)",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Explore Everywhere
            </h1>

            {/* Subtext */}
            <p
              className="font-dm text-white/90 max-w-xl leading-relaxed mb-8"
              style={{
                fontSize: "clamp(16px, 2.5vw, 20px)",
                textShadow: "0 1px 10px rgba(0,0,0,0.5)",
              }}
            >
              From the backwaters of Kerala to the peaks of Kashmir
            </p>

            {/* CTA Button */}
            <a
              href="/destinations"
              className="bg-white hover:bg-white/95 text-[#003060] font-dm font-semibold px-10 py-4 rounded-full transition-all duration-300 min-h-[52px] flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              style={{
                fontSize: "clamp(14px, 2vw, 16px)",
              }}
            >
              Plan Your Trip
              <ChevronDown size={18} className="-rotate-90" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-white/60 text-xs tracking-widest uppercase font-dm">
              Scroll to explore
            </span>
            <div className="animate-bounce">
              <ChevronDown size={32} className="text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
