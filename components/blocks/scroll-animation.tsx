"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface ScrollAnimationProps {
  totalFrames?: number;
  frameFolder?: string;
}

export default function ScrollAnimation({
  totalFrames = 40,
  frameFolder = "/frames",
}: ScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Easing factor for smooth animation (0.05-0.3 recommended)
  const EASING = 0.15;

  /**
   * Generate frame URL from index
   */
  const getFrameUrl = (index: number): string => {
    const padded = String(index + 1).padStart(3, "0");
    return `${frameFolder}/ezgif-frame-${padded}.jpg`;
  };

  /**
   * Preload all frames
   */
  useEffect(() => {
    let mounted = true;

    const preloadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load frame ${index + 1}`));
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
   * Calculate scroll progress through sticky container
   */
  const getScrollProgress = (): number => {
    const container = containerRef.current;
    if (!container) return 0;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollDistance = containerHeight - viewportHeight;

    if (scrollDistance <= 0) return 0.5;

    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / scrollDistance));
  };

  /**
   * Draw frame to canvas with cover behavior
   */
  const drawFrame = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imgRatio > canvasRatio) {
      // Image is wider - fit by height
      drawHeight = canvasHeight;
      drawWidth = imgRatio * canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Image is taller - fit by width
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  /**
   * Animation loop
   */
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || framesRef.current.length === 0) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    // Get target frame from scroll position
    const progress = getScrollProgress();
    targetFrameRef.current = progress * (totalFrames - 1);

    // Apply easing for smooth transitions
    currentFrameRef.current +=
      (targetFrameRef.current - currentFrameRef.current) * EASING;

    // Draw current frame (rounded to nearest)
    const frameIndex = Math.round(currentFrameRef.current);
    const clampedIndex = Math.max(0, Math.min(totalFrames - 1, frameIndex));
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (ctx) {
      drawFrame(ctx, framesRef.current[clampedIndex]);
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  /**
   * Handle canvas resize for DPI
   */
  const handleResize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  };

  // Initialize and start animation
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
            <p className="text-white/50 font-dm text-sm">Loading...</p>
          </div>
        )}

        {/* Canvas for frame rendering */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ imageRendering: "auto" }}
        />

        {/* Overlay content */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 10 }}
        >
          <h1
            className="font-playfair font-bold text-white leading-[1.05] mb-5"
            style={{ fontSize: "clamp(42px, 8vw, 88px)" }}
          >
            Explore Everywhere
          </h1>

          <p className="font-dm text-white/80 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            From the backwaters of Kerala to the peaks of Kashmir
          </p>

          <a
            href="/destinations"
            className="bg-white hover:bg-white/90 text-[#003060] font-dm font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-h-[44px] flex items-center"
          >
            Plan Your Trip →
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="animate-bounce">
            <ChevronDown size={28} className="text-white/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
