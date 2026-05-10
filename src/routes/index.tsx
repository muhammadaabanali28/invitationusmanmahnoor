import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ExternalLink, Heart, Sparkles as SparkIcon, Clock, Utensils, Crown } from "lucide-react";

import floralBg from "@/assets/floral-bg.jpg";
import roses from "@/assets/roses.jpg";
import ornament from "@/assets/ornament.png";

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
      { title: "Usman & Mahnoor — Wedding Invitation" },
      { name: "description", content: "Cordially invited to the wedding ceremony of Usman Ahmed Tagala & Mahnoor Tagala — 15 May 2026, Karachi." },
      { property: "og:title", content: "Usman & Mahnoor — Wedding Invitation" },
      { property: "og:description", content: "Join us in celebrating our big day. Friday, 15 May 2026 — Hassan Banquet, Karachi." },
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
      colors: ["#d4af37", "#f5e6a8", "#fff8e7"],
    });
  };

  return (
    <div ref={mainRef} className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Fixed bg */}
      <div className="fixed inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${floralBg})` }} />
      <div className="fixed inset-0 z-[1] bg-background/80" />
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
                  <p className="mt-5 font-display text-xl sm:text-2xl text-cream">
                    Mr. Shabir Ahmed Tagala{" "}
                    <span className="text-gold/75 italic">(Late)</span>
                  </p>
                </FadeUp>
                <FadeUp delay={0.65}>
                  <p className="mt-10 font-serif-l italic text-base sm:text-lg text-cream/75 leading-relaxed">
                    Cordially Invite You To Attend<br />
                    The Wedding Ceremony
                  </p>
                </FadeUp>
                <FadeUp delay={0.85}>
                  <p className="mt-8 font-display text-2xl sm:text-3xl text-gold-gradient">
                    N. Shabir Ahmed Tagala
                  </p>
                </FadeUp>
                <FadeUp delay={1.05}>
                  <p className="mt-6 font-serif-l italic text-cream/75">Of Their Beloved Grandson</p>
                </FadeUp>
              </div>
            </section>

            {/* ── SCENE 3 — BRIDE & GROOM ── */}
            <section className="scene-couple relative flex min-h-screen items-center justify-center px-6 py-24">
              <div
                className="rose-parallax absolute inset-0 -z-10 bg-cover bg-center opacity-22"
                style={{ backgroundImage: `url(${roses})` }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/65 to-background" />

              <div className="couple-names grid w-full max-w-5xl items-center gap-14 sm:grid-cols-[1fr_auto_1fr]">
                {/* Groom */}
                <div className="groom-name text-center sm:text-right">
                  <p className="font-serif-l uppercase tracking-[0.45em] text-xs text-gold/65 mb-3">The Groom</p>
                  <h2 className="font-display text-4xl sm:text-5xl text-gold-gradient glow-text leading-snug">
                    Usman<br />Ahmed Tagala
                  </h2>
                  <p className="mt-4 font-serif-l italic text-cream/75 text-sm">S/O Ramzan Ahmed Tagala</p>
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
                    Mahnoor<br />Tagala
                  </h2>
                  <p className="mt-4 font-serif-l italic text-cream/75 text-sm">D/O Siddique Ahmed Tagala</p>
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
                    Scratch The Hearts To Reveal
                  </p>
                </FadeUp>

                <FadeUp delay={0.5}>
                  <div className="mt-12 flex flex-wrap justify-center gap-10 sm:gap-16">
                    <ScratchHeart reveal="15" label="Day" />
                    <ScratchHeart reveal="Friday" label="Of" />
                    <ScratchHeart reveal="May 2026" label="Month & Year" />
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
                  <div className="glass rounded-2xl p-8 sm:p-10 animate-glow-pulse">
                    <MapPin className="mx-auto mb-4 text-gold" size={28} />
                    <p className="font-display text-2xl sm:text-3xl text-cream">Hassan Banquet</p>
                    <p className="mt-4 font-serif-l text-cream/75 leading-relaxed text-base sm:text-lg">
                      Gate No 1, Coast Guard Chowrangi<br />
                      Near Byco Petrol Pump<br />
                      Korangi 2½, Karachi
                    </p>
                    <div className="mt-7 overflow-hidden rounded-xl border border-gold/30">
                      <iframe
                        title="Hassan Banquet Map"
                        src="https://maps.google.com/maps?q=Hassan%20Banquet%20Korangi%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="h-72 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Hassan+Banquet+Korangi+Karachi"
                      target="_blank"
                      rel="noreferrer"
                      onClick={burst}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold/90 to-gold-soft/90 px-8 py-3 font-display text-ink shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:scale-105 transition-transform"
                    >
                      Open Location <ExternalLink size={16} />
                    </a>
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
                <div className="event-cards-row grid gap-6 sm:grid-cols-3">
                  {[
                    { icon: Crown, name: "Barat", time: "07 PM" },
                    { icon: Utensils, name: "Dinner", time: "08 PM" },
                    { icon: Heart, name: "Rukhsati", time: "09 PM" },
                  ].map((c) => (
                    <motion.div
                      key={c.name}
                      className="event-card glass rounded-2xl p-8 cursor-pointer"
                      whileHover={{ y: -10, scale: 1.04, boxShadow: "0 20px 40px rgba(212,175,55,0.25)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 250, damping: 18 }}
                      onClick={burst}
                    >
                      <c.icon className="mx-auto text-gold" size={36} />
                      <p className="mt-4 font-display text-2xl text-cream">{c.name}</p>
                      <Divider />
                      <p className="font-script text-5xl text-gold-gradient glow-text">{c.time}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── FINAL ── */}
            <section className="relative flex min-h-[80vh] items-center justify-center px-6 py-24">
              <div className="text-center max-w-3xl">
                <img
                  src={ornament}
                  alt=""
                  width={1024}
                  height={512}
                  loading="lazy"
                  className="final-ornament mx-auto w-72 opacity-80"
                />
                <FadeUp delay={0.3}>
                  <p className="mt-6 font-script text-4xl sm:text-6xl text-gold-gradient glow-text leading-snug">
                    Your Presence Will Make<br /> Our Day More Special
                  </p>
                </FadeUp>
                <FadeUp delay={0.6}>
                  <div className="mt-10 flex items-center justify-center gap-3 text-gold/65">
                    <SparkIcon size={16} />
                    <span className="font-serif-l italic tracking-[0.4em] text-xs uppercase">
                      Usman &amp; Mahnoor — 15.05.2026
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
