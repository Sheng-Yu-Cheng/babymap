"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const autoplayDelay = 5500;

const heroSlides = [
  {
    title: "BabyMap brand",
    image: "/hero/babymap-brand.png",
    href: "/resources",
    alt: "BabyMap 育兒支持平台首頁",
  },
  {
    title: "即時保母預約",
    image: "/hero/booking.png",
    href: "/booking",
    alt: "即時保母預約功能介紹",
  },
  {
    title: "我是保姆",
    image: "/hero/sitter-registration.png",
    href: "/sitter",
    alt: "保姆註冊功能介紹",
  },
  {
    title: "育兒資源地圖",
    image: "/hero/resources-map.png",
    href: "/resources",
    alt: "育兒資源地圖功能介紹",
  },
];

export function PortalHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [paused]);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  }

  return (
    <section
      className="bg-background px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="BabyMap homepage hero carousel"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
          <Link
            href={activeSlide.href}
            className="relative block aspect-video w-full bg-[#fffaf6] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            aria-label={`${activeSlide.alt}，前往${activeSlide.title}`}
          >
            {failedImages[activeSlide.image] ? (
              <div className="flex h-full w-full items-center justify-center p-8 text-center">
                <div className="rounded-[1.5rem] border border-border bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-primary">BabyMap</p>
                  <p className="mt-2 text-xl font-bold">{activeSlide.alt}</p>
                </div>
              </div>
            ) : (
              <Image
                src={activeSlide.image}
                alt={activeSlide.alt}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-contain"
                onError={() =>
                  setFailedImages((current) => ({
                    ...current,
                    [activeSlide.image]: true,
                  }))
                }
              />
            )}
          </Link>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/86 text-foreground shadow-sm backdrop-blur transition hover:border-primary sm:left-5 sm:h-12 sm:w-12"
            aria-label="上一張首頁圖片"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/86 text-foreground shadow-sm backdrop-blur transition hover:border-primary sm:right-5 sm:h-12 sm:w-12"
            aria-label="下一張首頁圖片"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/70 bg-white/86 px-3 py-2 shadow-sm backdrop-blur">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === activeIndex ? "w-9 bg-primary" : "w-2.5 bg-muted-foreground/35 hover:bg-primary/60",
                )}
                aria-label={`切換到${slide.alt}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
