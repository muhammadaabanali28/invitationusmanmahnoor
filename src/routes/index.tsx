import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ExternalLink, Heart, Sparkles as SparkIcon, Clock, Utensils, Crown } from "lucide-react";

import floralBg from "@/assets/engagement-florals.jpg";
import { invitation, celebrationColors } from "@/lib/invitation";
import { Button } from "@/components/ui/button";

import { Loader } from "@/components/wedding/Loader";
import { PetalsBackground } from "@/components/wedding/PetalsBackground";
import { Sparkles } from "@/components/wedding/Sparkles";
import { OpeningEnvelope } from "@/components/wedding/OpeningEnvelope";
import { FadeUp, Divider } from "@/components/wedding/SectionTitle";
import { ScratchHeart } from "@/components/wedding/ScratchHeart";
import { Countdown } from "@/components/wedding/Countdown";
import { MusicToggle, type MusicToggleHandle } from "@/components/wedding/MusicToggle";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Noor ul Ain & Khaliq — Engagement Invitation" },
      { name: "description", content: "Celebrate the engagement of Noor ul Ain and Khaliq, 18 October 2026, after Maghrib at 6:30 PM, P&T Society, Korangi, Karachi." },
      { property: "og:title", content: "Noor ul Ain & Khaliq — Engagement Invitation" },
      { property: "og:description", content: "Join Noor ul Ain and Khaliq for their engagement on Sunday, 18 October 2026, at 6:30 PM in Karachi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<MusicToggleHandle>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Handle envelope open — play music immediately (inside user gesture chain)
  const handleOpen = () => {
    setOpened(true);
    musicRef.current?.play();
  };

  /* ── GSAP ScrollTrigger animations (after open) ── */
  useLayoutEffect(() => {
    if (!opened) return;

    // Small delay so elements are rendered before GSAP reads them
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // Parallax on rose bg
        gsap.to(".rose-parallax", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".scene-couple",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Couple names slide in from sides
        gsap.from(".groom-name", {
          opacity: 0,
          x: -100,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: ".couple-names", start: "top 78%" },
        });
        gsap.from(".bride-name", {
          opacity: 0,
          x: 100,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: ".couple-names", start: "top 78%" },
        });
        gsap.from(".and-circle", {
          scale: 0,
          opacity: 0,
          duration: 1.1,
          delay: 0.4,
          ease: "elastic.out(1.2, 0.5)",
          scrollTrigger: { trigger: ".couple-names", start: "top 78%" },
        });

        // Event cards stagger
        gsap.from(".event-card", {
          y: 70,
          opacity: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: ".event-cards-row", start: "top 82%" },
        });

        // Final ornament spin
        gsap.from(".final-ornament", {
          rotate: -30,
          opacity: 0,
          scale: 0.5,
          duration: 1.5,
          ease: "elastic.out(1, 0.55)",
          scrollTrigger: { trigger: ".final-ornament", start: "top 88%" },
        });

      }, mainRef);

      return () => ctx.revert();
    }, 300);

    return () => clearTimeout(timer);
  }, [opened]);

  const burst = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: celebrationColors(),
    });
  };

  return (
    <div ref={mainRef} className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Fixed bg */}
      <div className="fixed inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${floralBg})` }} />
      <div className="fixed inset-0 z-[1] bg-background/20" />
      <Sparkles count={50} />
      <PetalsBackground count={26} />

      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {/* Music toggle — always rendered so audioRef is ready */}
      <MusicToggle ref={musicRef} />

      <main className="relative z-10">
        {!opened ? (
          <OpeningEnvelope onOpen={handleOpen} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>

            {/* ── SCENE 2 — BISMILLAH ── */}
            <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
              <div className="max-w-3xl text-center">
                <FadeUp>
                  <p className="font-script text-3xl sm:text-5xl text-gold-gradient glow-text leading-relaxed tracking-wide">
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <p className="mt-5 font-display italic text-lg sm:text-2xl text-cream/90 leading-loose">
                    In The Name Of Allah,<br />
                    The Most Beneficent &amp; The Most Merciful
                  </p>
                </FadeUp>
                <Divider />
                <FadeUp delay={0.2}>
                  <p className="font-script text-5xl sm:text-7xl shimmer-text leading-tight">Alhamdulillah</p>
                </FadeUp>
                <FadeUp delay={0.45}>
                  <p className="mt-8 font-serif-l italic text-lg text-foreground/80 leading-relaxed">
                    Cordially Invited To Celebrate<br />Our Engagement
                  </p>
                </FadeUp>
              </div>
            </section>

            {/* ── SCENE 3 — BRIDE & GROOM ── */}
            <section className="scene-couple relative flex min-h-screen items-center justify-center px-6 py-24">
              <div
                className="rose-parallax absolute inset-0 -z-10 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${floralBg})` }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/65 to-background" />

              <div className="couple-names grid w-full max-w-5xl items-center gap-14 sm:grid-cols-[1fr_auto_1fr]">
                {/* Groom */}
                <div className="groom-name text-center sm:text-right">
                  <p className="font-serif-l uppercase tracking-[0.45em] text-xs text-gold/65 mb-3">The Groom</p>
                  <h2 className="font-display text-4xl sm:text-5xl text-gold-gradient glow-text leading-snug">
                    {invitation.groom}
                  </h2>
                  
                </div>

                {/* & circle */}
                <div className="flex justify-center">
                  <div className="and-circle relative flex h-32 w-32 items-center justify-center rounded-full glass animate-glow-pulse">
                    <span className="font-script text-7xl text-gold-gradient leading-none">&amp;</span>
                    <motion.span
                      className="absolute inset-0 rounded-full border border-gold/30"
                      animate={{ scale: [1, 1.25], opacity: [0.5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Bride */}
                <div className="bride-name text-center sm:text-left">
                  <p className="font-serif-l uppercase tracking-[0.45em] text-xs text-gold/65 mb-3">The Bride</p>
                  <h2 className="font-display text-4xl sm:text-5xl text-gold-gradient glow-text leading-snug">
                    Noor ul Ain
                  </h2>
                  <p className="mt-4 font-serif-l italic text-cream/75 text-sm">{invitation.brideParent}</p>
                </div>
              </div>
            </section>

            {/* ── SCENE 4 — SAVE THE DATE / SCRATCH ── */}
            <section className="relative px-6 py-24">
              <div className="mx-auto max-w-5xl text-center">
                <FadeUp>
                  <p className="font-script text-6xl sm:text-7xl text-gold-gradient glow-text leading-tight">
                    Save The Date
                  </p>
                </FadeUp>
                <FadeUp delay={0.25}>
                  <p className="mt-3 font-serif-l italic text-cream/75 text-lg tracking-wide">
                    Reveal Our Big Day
                  </p>
                </FadeUp>
                <Divider />
                <FadeUp delay={0.35}>
                  <p className="font-display tracking-[0.3em] uppercase text-sm text-gold/75">
                    Our Engagement
                  </p>
                </FadeUp>

                <FadeUp delay={0.5}>
                  <div className="mt-10 grid grid-cols-1 justify-items-center gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-8 lg:gap-12">
                    <ScratchHeart reveal={invitation.day} label="Day" />
                    <ScratchHeart reveal={invitation.weekday} label="Day of the Week" />
                    <ScratchHeart reveal={invitation.monthYear} label="Month & Year" />
                  </div>
                </FadeUp>

                <FadeUp delay={0.65}>
                  <p className="mt-16 font-script text-4xl sm:text-6xl shimmer-text leading-tight">
                    The Start Of A Beautiful Journey
                  </p>
                </FadeUp>

                <FadeUp delay={0.85}>
                  <div className="mt-12">
                    <Countdown />
                  </div>
                </FadeUp>
              </div>
            </section>

            {/* ── SCENE 5 — VENUE ── */}
            <section className="relative px-6 py-24">
              <div className="mx-auto max-w-4xl text-center">
                <FadeUp>
                  <h2 className="font-display text-4xl sm:text-5xl text-gold-gradient">Venue</h2>
                </FadeUp>
                <Divider />
                <FadeUp delay={0.2}>
                  <div className="venue-details py-8 sm:py-10">
                    <MapPin className="mx-auto mb-4 text-gold" size={28} />
                    <p className="font-display text-2xl sm:text-3xl text-cream">P&amp;T Society</p>
                    <p className="mt-4 font-serif-l text-cream/75 leading-relaxed text-base sm:text-lg">
                      LD 128, P&amp;T Society<br />
                      Korangi, Karachi
                    </p>
                    <div className="mt-7 overflow-hidden rounded-xl border border-gold/30">
                      <iframe
                        title="P&T Society, Korangi Map"
                        src="https://maps.google.com/maps?q=LD%20128%20P%26T%20Society%20Korangi%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="h-72 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                    <Button asChild className="mt-7 h-12 rounded-full px-8 font-display"><a
                      href="https://www.google.com/maps/search/?api=1&query=LD+128+P%26T+Society+Korangi+Karachi"
                      target="_blank"
                      rel="noreferrer"
                      onClick={burst}
                    >
                      Open Location <ExternalLink size={16} />
                    </a></Button>
                  </div>
                </FadeUp>
              </div>
            </section>

            {/* ── SCENE 6 — EVENT TIMINGS ── */}
            <section className="relative px-6 py-24">
              <div className="mx-auto max-w-5xl text-center">
                <FadeUp>
                  <h2 className="font-display text-4xl sm:text-5xl text-gold-gradient">Event Timings</h2>
                </FadeUp>
                <Divider />
                <div className="event-cards-row flex flex-col items-center">
                  <Clock className="text-primary" size={32} />
                  <p className="mt-5 font-display text-4xl sm:text-5xl text-primary">{invitation.time}</p>
                  <p className="mt-3 font-serif-l italic text-xl text-accent-foreground">{invitation.timeNote}</p>
                  <p className="mt-5 text-foreground/75">Sunday, 18 October 2026</p>
                </div>
              </div>
            </section>

            {/* ── FINAL ── */}
            <section className="relative flex min-h-[80vh] items-center justify-center px-6 py-24">
              <div className="text-center max-w-3xl">
                <Heart className="final-ornament mx-auto text-accent-foreground" size={48} strokeWidth={1} />
                <FadeUp delay={0.3}>
                  <p className="mt-6 font-script text-4xl sm:text-6xl text-gold-gradient glow-text leading-snug">
                    Your Presence Will Make<br /> Our Day More Special
                  </p>
                </FadeUp>
                <FadeUp delay={0.6}>
                  <div className="mt-10 flex items-center justify-center gap-3 text-gold/65">
                    <SparkIcon size={16} />
                    <span className="font-serif-l italic tracking-[0.12em] text-xs uppercase">
                      Noor ul Ain &amp; Khaliq — 18.10.2026
                    </span>
                    <SparkIcon size={16} />
                  </div>
                </FadeUp>
                <FadeUp delay={0.9}>
                  <div className="mt-8 inline-flex items-center gap-2 text-cream/55 text-sm font-serif-l">
                    <Clock size={14} /> Karachi, Pakistan
                  </div>
                </FadeUp>
                <FadeUp delay={1.1}>
                  <p className="mt-10 text-xs uppercase tracking-[0.3em] text-cream/45 font-serif-l">
                    Made by Muhammad Aaban Ali
                  </p>
                </FadeUp>
              </div>
            </section>

          </motion.div>
        )}
      </main>
    </div>
  );
}
