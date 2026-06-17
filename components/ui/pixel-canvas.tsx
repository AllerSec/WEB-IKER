"use client";
import * as React from "react";

/**
 * Pixel-canvas hover effect: when the parent element is hovered, a grid of
 * small pixels fades into existence (staggered by distance from a corner),
 * shimmers, then fades out on mouse-leave. Pure React + Canvas 2D, no web
 * components, no globals.
 */

class Pixel {
  x: number;
  y: number;
  size = 0;
  maxSize: number;
  minSize = 0.5;
  maxBox = 2;
  speed: number;
  delay: number;
  counter = 0;
  counterStep: number;
  sizeStep: number;
  color: string;
  isIdle = false;
  isShimmer = false;
  isReverse = false;

  constructor(x: number, y: number, color: string, speed: number, delay: number, span: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.maxSize = Math.random() * 1.5 + this.minSize;
    this.delay = delay;
    this.counterStep = Math.random() * 4 + span * 0.01;
    this.sizeStep = Math.random() * 0.4;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const offset = (this.maxBox - this.size) / 2;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  appear(ctx: CanvasRenderingContext2D) {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) this.isShimmer = true;
    if (this.isShimmer) {
      if (this.size >= this.maxSize) this.isReverse = true;
      else if (this.size <= this.minSize) this.isReverse = false;
      this.size += this.isReverse ? -this.speed : this.speed;
    } else {
      this.size += this.sizeStep;
    }
    this.draw(ctx);
  }

  disappear(ctx: CanvasRenderingContext2D) {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw(ctx);
  }
}

export interface PixelCanvasProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  gap?: number;
  /** 0..100 — bigger = pixels grow & shimmer faster */
  speed?: number;
  colors?: string[];
  /** "default" = delay grows from the bottom-left corner; "icon" = from the centre */
  variant?: "default" | "icon";
}

export function PixelCanvas({
  gap = 6,
  speed = 35,
  colors = ["#FFFFFF", "#9CDBFF", "#2B95FF"],
  variant = "default",
  className = "",
  style,
  ...rest
}: PixelCanvasProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = wrapper.parentElement;
    if (!parent) return;

    const reducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveSpeed = reducedMotion ? 0 : Math.max(0, Math.min(100, speed)) * 0.001;
    const effectiveGap = Math.max(4, Math.min(50, gap));

    let pixels: Pixel[] = [];
    let raf = 0;
    let mode: "appear" | "disappear" = "disappear";
    let last = performance.now();
    const interval = 1000 / 60;

    const setup = () => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      pixels = [];
      const span = w + h;
      for (let x = 0; x < w; x += effectiveGap) {
        for (let y = 0; y < h; y += effectiveGap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          let delay = 0;
          if (!reducedMotion) {
            if (variant === "icon") {
              const dx = x - w / 2;
              const dy = y - h / 2;
              delay = Math.sqrt(dx * dx + dy * dy);
            } else {
              const dx = x;
              const dy = h - y;
              delay = Math.sqrt(dx * dx + dy * dy);
            }
          }
          pixels.push(new Pixel(x, y, color, effectiveSpeed, delay, span));
        }
      }
    };

    const loop = () => {
      const now = performance.now();
      const elapsed = now - last;
      if (elapsed < interval) {
        raf = requestAnimationFrame(loop);
        return;
      }
      last = now - (elapsed % interval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      for (const p of pixels) {
        if (mode === "appear") p.appear(ctx);
        else p.disappear(ctx);
        if (!p.isIdle) allIdle = false;
      }

      if (allIdle && mode === "disappear") {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = (m: "appear" | "disappear") => {
      mode = m;
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const onEnter = () => start("appear");
    const onLeave = () => start("disappear");

    setup();
    const ro = new ResizeObserver(() => setup());
    ro.observe(wrapper);

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    parent.addEventListener("focusin", onEnter);
    parent.addEventListener("focusout", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
      parent.removeEventListener("focusin", onEnter);
      parent.removeEventListener("focusout", onLeave);
    };
  }, [gap, speed, colors, variant]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1, ...style }}
      {...rest}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
