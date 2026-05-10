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
import { MusicToggle } from "@/components/wedding/MusicToggle";

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

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  /* ── Smooth scroll with GSAP ── */
  useEffect(() => {
    // Native smooth scroll enhancement via GSAP ticker
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let raf: number;

    const ease = 0.085;

    const smoothScroll = () => {
      targetY = window.scrollY;
      currentY += (targetY - currentY) * ease;
      if (Math.abs(targetY - currentY) < 0.5) currentY = targetY;
      raf = requestAnimationFrame(smoothScroll);
    };
    raf = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── GSAP ScrollTrigger animations (after open) ── */
  useLayoutEffect(() => {
    if (!opened) return;
    const ctx = gsap.context(() => {
      // Parallax on rose bg
      gsap.to(".rose-parallax", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".rose-parallax",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Stagger reveal for event cards
      gsap.from(".event-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".event-cards-row",
          start: "top 80%",
        },
      });

      // Ornament spin on enter
      gsap.from(".final-ornament", {
        rotate: -25,
        opacity: 0,
        scale: 0.6,
        duration: 1.4,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".final-ornament",
          start: "top 85%",
        },
      });

      // Name glow on scroll into view
      gsap.from(".couple-names h2", {
        opacity: 0,
        x: (i) => (i === 0 ? -80 : 80),
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".couple-names",
          start: "top 75%",
        },
      });

      // And-circle scale in
      gsap.from(".and-circle", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1.2, 0.5)",
        scrollTrigger: {
          trigger: ".and-circle",
          start: "top 75%",
        },
      });
    }, mainRef);

    return () => ctx.revert();
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
      {/* Fixed luxurious bg */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${floralBg})` }}
      />
      <div className="fixed inset-0 z-[1] bg-background/80" />
      <Sparkles count={50} />
      <PetalsBackground count={26} />

      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <MusicToggle start={opened} />

      <main className="relative z-10">
        {!opened ? (
          <OpeningEnvelope onOpen={() => setOpened(true)} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>

            {/* ── SCENE 2 — BISMILLAH ── */}
            <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
              <div className="max-w-3xl text-center">
                <FadeUp>
                  <p className="font-script text-3xl sm:text-4xl text-gold-gradient glow-text leading-relaxed">
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <p className="mt-4 font-display italic text-lg sm:text-2xl text-cream/90">
                    In The Name Of Allah,
                    <br />
                    The Most Beneficent &amp; The Most Merciful
                  </p>
                </FadeUp>

                <Divider />

                <FadeUp delay={0.2}>
                  <p className="font-script text-5xl sm:text-6xl shimmer-text">Alhamdulillah</p>
                </FadeUp>
                <FadeUp delay={0.4}>
                  <p className="mt-4 font-display text-xl sm:text-2xl text-cream">
                    Mr. Shabir Ahmed Tagala{" "}
                    <span className="text-gold/80 italic">(Late)</span>
                  </p>
                </FadeUp>

                <FadeUp delay={0.6}>
                  <p className="mt-10 font-serif-l italic text-base sm:text-lg text-cream/80 leading-relaxed">
                    Cordially Invite You To Attend
                    <br />
                    The Wedding Ceremony
                  </p>
                </FadeUp>

                <FadeUp delay={0.8}>
                  <p className="mt-8 font-display text-2xl sm:text-3xl text-gold-gradient">
                    N. Shabir Ahmed Tagala
                  </p>
                </FadeUp>

                <FadeUp delay={1}>
                  <p className="mt-6 font-serif-l italic text-cream/80">Of Their Beloved Grandson</p>
                </FadeUp>
              </div>
            </section>

            {/* ── SCENE 3 — BRIDE & GROOM ── */}
            <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
              <motion.div
                className="rose-parallax absolute inset-0 -z-10 bg-cover bg-center opacity-25"
                style={{ backgroundImage: `url(${roses})` }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />

              <div className="couple-names grid w-full max-w-5xl items-center gap-12 sm:grid-cols-[1fr_auto_1fr]">
                {/* Groom */}
                <div className="text-center sm:text-right">
                  <p className="font-serif-l uppercase tracking-[0.4em] text-xs text-gold/70">The Groom</p>
                  <h2 className="mt-3 font-display text-4xl sm:text-5xl text-gold-gradient glow-text leading-tight">
                    Usman<br />Ahmed Tagala
                  </h2>
                  <p className="mt-3 font-serif-l italic text-cream/80">S/O Ramzan Ahmed Tagala</p>
                </div>

                {/* & circle */}
                <div className="flex justify-center">
                  <div className="and-circle relative flex h-32 w-32 items-center justify-center rounded-full glass animate-glow-pulse">
                    <span className="font-script text-7xl text-gold-gradient">&amp;</span>
                  </div>
                </div>

                {/* Bride */}
                <div className="text-center sm:text-left">
                  <p className="font-serif-l uppercase tracking-[0.4em] text-xs text-gold/70">The Bride</p>
                  <h2 className="mt-3 font-display text-4xl sm:text-5xl text-gold-gradient glow-text leading-tight">
                    Mahnoor<br />Tagala
                  </h2>
                  <p className="mt-3 font-serif-l italic text-cream/80">D/O Siddique Ahmed Tagala</p>
                </div>
              </div>
            </section>

            {/* ── SCENE 4 — SAVE THE DATE / SCRATCH ── */}
            <section className="relative px-6 py-24">
              <div className="mx-auto max-w-5xl text-center">
                <FadeUp>
                  <p className="font-script text-5xl sm:text-6xl text-gold-gradient glow-text">Save The Date</p>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="mt-2 font-serif-l italic text-cream/80 text-lg">Reveal Our Big Day</p>
                </FadeUp>
                <Divider />
                <FadeUp delay={0.3}>
                  <p className="font-display tracking-[0.3em] uppercase text-sm text-gold/80">
                    Scratch The Hearts To Reveal
                  </p>
                </FadeUp>

                <FadeUp delay={0.5}>
                  <div className="mt-12 flex flex-wrap justify-center gap-10">
                    <ScratchHeart reveal="15" label="Day" />
                    <ScratchHeart reveal="Friday" label="Of" />
                    <ScratchHeart reveal="May 2026" label="Month & Year" />
                  </div>
                </FadeUp>

                <FadeUp delay={0.6}>
                  <p className="mt-16 font-script text-4xl sm:text-5xl shimmer-text">
                    The Start Of A Beautiful Journey
                  </p>
                </FadeUp>

                <FadeUp delay={0.8}>
                  <div className="mt-10">
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
                  <div className="glass rounded-2xl p-8 animate-glow-pulse">
                    <MapPin className="mx-auto mb-3 text-gold" />
                    <p className="font-display text-2xl sm:text-3xl text-cream">Hassan Banquet</p>
                    <p className="mt-3 font-serif-l text-cream/80 leading-relaxed">
                      Gate No 1, Coast Guard Chowrangi
                      <br />
                      Near Byco Petrol Pump
                      <br />
                      Korangi 2 1/2, Karachi
                    </p>

                    <div className="mt-6 overflow-hidden rounded-xl border-gold border">
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
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold/90 to-gold-soft/90 px-8 py-3 font-display text-ink shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
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
                  ].map((c, i) => (
                    <motion.div
                      key={c.name}
                      className="event-card glass rounded-2xl p-8 cursor-pointer"
                      whileHover={{ y: -10, scale: 1.04, boxShadow: "0 20px 40px rgba(212,175,55,0.2)" }}
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
                  <p className="mt-6 font-script text-4xl sm:text-6xl text-gold-gradient glow-text">
                    Your Presence Will Make
                    <br /> Our Day More Special
                  </p>
                </FadeUp>
                <FadeUp delay={0.6}>
                  <div className="mt-10 flex items-center justify-center gap-3 text-gold/70">
                    <SparkIcon size={16} />
                    <span className="font-serif-l italic tracking-[0.4em] text-xs uppercase">
                      Usman &amp; Mahnoor — 15.05.2026
                    </span>
                    <SparkIcon size={16} />
                  </div>
                </FadeUp>
                <FadeUp delay={0.9}>
                  <div className="mt-10 inline-flex items-center gap-2 text-cream/60 text-sm">
                    <Clock size={14} /> Karachi, Pakistan
                  </div>
                </FadeUp>
                <FadeUp delay={1.1}>
                  <p className="mt-12 text-xs uppercase tracking-[0.3em] text-cream/50 font-serif-l">
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
