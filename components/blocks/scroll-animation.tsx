"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

interface ScrollAnimationProps {
  totalFrames?: number;
  desktopFrameFolder?: string;
  mobileFrameFolder?: string;
  mobileBreakpoint?: number; // px - screens below this use mobile frames
}

export default function ScrollAnimation({
  totalFrames = 40,
  desktopFrameFolder = "/frames",
  mobileFrameFolder = "/frames-mobile",
  mobileBreakpoint = 768, // md breakpoint - matches Tailwind
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
  // Track if currently on mobile (for frame folder selection)
  const [isMobile, setIsMobile] = useState(false);

  // Easing factor - lower = smoother but more lag, higher = more responsive but potentially jittery
  const EASING = 0.15;

  /**
   * Generate frame URL from index (0-based)
   * Uses mobile or desktop folder based on screen size
   * Frames named: ezgif-frame-001.jpg to ezgif-frame-040.jpg
   */
  const getFrameUrl = useCallback(
    (index: number): string => {
      const padded = String(index + 1).padStart(3, "0");
      const folder = isMobile ? mobileFrameFolder : desktopFrameFolder;
      return `${folder}/ezgif-frame-${padded}.jpg`;
    },
    [isMobile, mobileFrameFolder, desktopFrameFolder]
  );

  /**
   * Detect mobile/desktop on mount and resize
   */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  /**
   * Preload all frames before animation starts
   * Reloads when screen size crosses mobile breakpoint (different frames)
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
          console.log(`✓ Loaded ${loaded.length} frames for ${isMobile ? "mobile" : "desktop"}`);
        }
      } catch (error) {
        console.error("Failed to preload frames:", error);
      }
    };

    preloadAll();

    return () => {
      mounted = false;
      framesRef.current = [];
      setIsLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, isMobile]);

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
   * Draw image to canvas - smart fit based on orientation
   * Portrait images (mobile): use cover to fill vertical screen
   * Landscape images (desktop): use contain to show full frame
   */
  const drawFrame = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number,
    useCover: boolean // true for mobile portrait, false for desktop landscape
  ) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number,
      drawHeight: number,
      offsetX: number,
      offsetY: number;

    if (useCover) {
      // Portrait mode: cover to fill screen (crop edges if needed)
      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = imgRatio * canvasHeight;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      }
    } else {
      // Landscape mode: contain to show full image (letterbox)
      if (imgRatio > canvasRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawHeight = canvasHeight;
        drawWidth = imgRatio * canvasHeight;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      }
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

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const frameIndex = Math.round(currentFrameRef.current);
    const clampedIndex = Math.max(0, Math.min(totalFrames - 1, frameIndex));

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, width, height);
    drawFrame(ctx, framesRef.current[clampedIndex], width, height, true);
  }, [isLoaded, totalFrames, isMobile]);

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

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
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
                fontSize: "clamp(42px, 8vw, 80px)",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Trip Scanner
            </h1>

            {/* Subtext */}
            <p
              className="font-dm text-white/90 max-w-xl leading-relaxed mb-8"
              style={{
                fontSize: "clamp(14px, 2vw, 18px)",
                textShadow: "0 1px 10px rgba(0,0,0,0.5)",
              }}
            >
              Scan the horizon, discover your next adventure
            </p>

            {/* CTA Button */}
            <a
              href="/destinations"
              className="bg-white hover:bg-white/95 text-[#003060] font-dm font-semibold px-8 py-3 rounded-full transition-all duration-300 min-h-[48px] flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              style={{
                fontSize: "clamp(13px, 2vw, 15px)",
              }}
            >
              Start Scanning
              <ChevronDown size={16} className="-rotate-90" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-dm">
              Scroll
            </span>
            <div className="animate-bounce">
              <ChevronDown size={24} className="text-white/50" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
