"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { dict, profile, type Lang } from "@/lib/content";
import { Reveal, useRevealRoot } from "./Reveal";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "id";
  try {
    return window.localStorage.getItem("porto-lang") === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

function SectionHead({
  index,
  eyebrow,
  title,
  desc,
}: {
  index: string;
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400">{index}</span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {eyebrow}
          </span>
          <span className="h-px flex-1 bg-zinc-200" />
        </div>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          {title}
        </h2>
        {desc ? (
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-zinc-600">{desc}</p>
        ) : null}
      </Reveal>
    </div>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict[lang];
  const rootRef = useRevealRoot<HTMLDivElement>(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem("porto-lang", lang);
    } catch {
      // abaikan, bukan fatal
    }
  }, [lang]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setScrolled(h.scrollTop > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", "about", "skills", "experience", "projects", "achievement", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const toggleLang = () => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  };

  const mailHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio inquiry from ${name || "HR / Recruiter"}`
  )}&body=${encodeURIComponent(msg || (lang === "id" ? "Halo Usman, kami tertarik dengan profilmu." : "Hi Usman, we're interested in your profile."))}`;

  const waHref = `${profile.whatsapp}?text=${encodeURIComponent(
    `${lang === "id" ? "Halo Usman, saya" : "Hi Usman, I'm"} ${name || "-"}: ${msg || (lang === "id" ? "tertarik dengan profilmu." : "interested in your profile.")}`
  )}`;

  const sections = [
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "experience", label: t.nav.experience },
    { id: "projects", label: t.nav.projects },
    { id: "achievement", label: t.nav.achievement },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <div ref={rootRef} className="bg-white text-zinc-950">
      {/* scroll progress, hitam tipis */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-zinc-100">
        <div className="h-full bg-zinc-950" style={{ width: `${progress}%` }} />
      </div>

      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-zinc-200/80 bg-white/85 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-6xl items-center gap-4 px-4 sm:px-6">
          <div className="flex flex-1 items-center lg:hidden">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-zinc-100"
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-0.5 rounded-full border border-zinc-200/70 bg-white/70 p-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
                    active === s.id
                      ? "bg-zinc-950 text-white"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-1">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-950"
              aria-label="Toggle language"
              title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" /></svg>
              {lang === "id" ? "EN" : "ID"}
            </button>
            <span className="hidden h-4 w-px bg-zinc-200 sm:block" />
            <button
              onClick={() => window.print()}
              className="hidden items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-950 sm:inline-flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
              CV
            </button>
            <a
              href="#contact"
              className="ml-1 rounded-full bg-zinc-950 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-zinc-800"
            >
              {t.nav.contactCta}
            </a>
          </div>
        </div>
        {menuOpen && (
          <div className="px-4 pb-4 lg:hidden">
            <nav className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)]">
              <div className="grid gap-0.5">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition ${
                      active === s.id
                        ? "bg-zinc-950 font-semibold text-white"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    {s.label}
                    <span className="text-zinc-300">→</span>
                  </a>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-zinc-100 p-2">
                <button
                  onClick={() => window.print()}
                  className="rounded-full border border-zinc-200 px-4 py-2.5 text-xs font-semibold transition hover:border-zinc-950"
                >
                  {t.nav.cv}
                </button>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-zinc-950 px-4 py-2.5 text-center text-xs font-semibold text-white"
                >
                  {t.nav.contactCta}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div>
              <Reveal delay={60}>
                <p className="text-sm font-medium text-zinc-500">{t.hero.greeting},</p>
                <h1 className="mt-2 text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl">
                  {profile.name}
                </h1>
                <p className="mt-4 text-lg font-semibold tracking-tight text-zinc-950">
                  {profile.role[lang]}
                </p>
                <p className="mt-1 text-[15px] text-zinc-600">{profile.tagline[lang]}</p>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-zinc-600">
                  {profile.summary[lang]}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  >
                    {t.hero.ctaProjects}
                  </a>
                  <a
                    href="#contact"
                    className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold transition hover:border-zinc-950"
                  >
                    {t.hero.ctaContact}
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950"
                  >
                    <Image src="/icons/github.svg" alt="GitHub" width={16} height={16} unoptimized className="h-4 w-4" />
                    {profile.githubHandle}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Kartu kontak */}
            <Reveal delay={200} className="lg:justify-self-end lg:sticky lg:top-24">
              <aside className="w-full max-w-sm overflow-hidden rounded-[24px] border border-zinc-200/90 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
                <div className="p-6 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl bg-zinc-100">
                        <Image
                          src="/profile.png"
                          alt={profile.name}
                          width={112}
                          height={112}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-zinc-950" title="Available" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold tracking-tight">{profile.name}</p>
                      <p className="mt-0.5 text-[13px] text-zinc-500">{profile.role[lang]}</p>
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-zinc-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        {profile.location}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-[11px] font-medium text-zinc-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
                    {profile.availability[lang]}
                  </p>
                </div>

                <div className="border-t border-zinc-100 p-2">
                  <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-zinc-50">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition group-hover:bg-zinc-950 group-hover:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-medium tracking-wide text-zinc-400 uppercase">Email</span>
                      <span className="block truncate text-[13px] font-semibold">{profile.email}</span>
                    </span>
                    <span className="text-zinc-300 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                  </a>
                  <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-zinc-50">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition group-hover:bg-zinc-950 group-hover:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5z" /></svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-medium tracking-wide text-zinc-400 uppercase">WhatsApp</span>
                      <span className="block text-[13px] font-semibold">{profile.whatsappDisplay}</span>
                    </span>
                    <span className="text-zinc-300 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                  </a>
                  <a href={profile.jolink} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-zinc-50">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition group-hover:bg-zinc-950 group-hover:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" /></svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-medium tracking-wide text-zinc-400 uppercase">Bisnis</span>
                      <span className="block text-[13px] font-semibold">jolink.co.id</span>
                    </span>
                    <span className="text-zinc-300 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-zinc-100 p-3">
                  <a
                    href="#contact"
                    className="rounded-full bg-zinc-950 px-4 py-2.5 text-center text-[13px] font-semibold text-white transition hover:bg-zinc-800"
                  >
                    {t.hero.ctaContact}
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="rounded-full border border-zinc-200 px-4 py-2.5 text-[13px] font-semibold transition hover:border-zinc-950"
                  >
                    {t.nav.cv}
                  </button>
                </div>
              </aside>
            </Reveal>
          </div>
          <div className="mt-14 flex justify-center">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
              {t.hero.scroll}
              <span className="inline-block animate-bounce">↓</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-zinc-200" />
      </div>

      {/* ABOUT: tentang + pendidikan digabung */}
      <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:py-20">
        <SectionHead index={t.about.index} eyebrow={t.about.eyebrow} title={t.about.title} desc={t.about.desc} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
          <Reveal delay={80}>
            <figure className="overflow-hidden rounded-3xl border border-zinc-200 bg-white lg:sticky lg:top-24">
              <div className="bg-zinc-100 px-8 pt-8">
                <Image
                  src="/profile.png"
                  alt={`${profile.name} — ${t.about.photoCaption}`}
                  width={600}
                  height={660}
                  className="mx-auto h-auto w-full object-cover object-top"
                />
              </div>
              <figcaption className="border-t border-zinc-100 px-5 py-4 text-center">
                <p className="text-sm font-semibold">{profile.name}</p>
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <div>
                <p className="text-[17px] leading-8 text-zinc-800">{t.about.intro[0]}</p>
                <p className="mt-4 text-[15px] leading-7 text-zinc-600">{t.about.intro[1]}</p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {t.about.factsTitle}
                </p>
                <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2">
                  {t.about.rows.map(([k, v]) => (
                    <div key={k} className="bg-white p-5">
                      <dt className="text-xs text-zinc-500">{k}</dt>
                      <dd className="mt-1 text-sm font-medium leading-6">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <Reveal delay={80}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {t.about.pointsTitle}
              </p>
              <div className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
                {t.about.points.map((p, i) => (
                  <div key={p.title} className="flex gap-4 py-5">
                    <span className="font-mono text-xs text-zinc-400">0{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold">{p.title}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-600">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="h-full rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Image
                  src={t.about.storyIcon}
                  alt="Growtopia"
                  width={32}
                  height={32}
                  unoptimized
                  className="h-8 w-8 rounded-lg"
                />
                <p className="text-base font-bold tracking-tight">{t.about.storyTitle}</p>
              </div>
              <div className="mt-5 space-y-4 border-l-2 border-zinc-300 pl-5">
                {t.about.story.map((p) => (
                  <p key={p.slice(0, 24)} className="text-sm leading-7 text-zinc-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-t border-zinc-200 bg-zinc-50/60">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <SectionHead index={t.skills.index} eyebrow={t.skills.eyebrow} title={t.skills.title} desc={t.skills.desc} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {t.skills.groups.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6">
                  <p className="text-sm font-bold tracking-tight">{g.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{g.desc}</p>
                  <ul className="mt-5 flex-1 divide-y divide-zinc-100 border-t border-zinc-100">
                    {g.items.map((s) => (
                      <li key={s.name} className="flex items-center gap-3 py-2.5">
                        <Image
                          src={s.icon}
                          alt={s.name}
                          width={20}
                          height={20}
                          unoptimized
                          className="h-5 w-5 shrink-0"
                        />
                        <span className="text-sm font-medium">{s.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-6 border-l-2 border-zinc-950 pl-4 text-sm leading-6 text-zinc-600">
              {t.skills.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:py-20">
        <SectionHead index={t.experience.index} eyebrow={t.experience.eyebrow} title={t.experience.title} />
        <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
          {t.experience.items.map((e, i) => (
            <Reveal key={e.org} delay={i * 60}>
              <article className="grid gap-4 py-8 lg:grid-cols-[160px_1fr] lg:gap-8">
                <div>
                  <p className="font-mono text-xs text-zinc-500">{e.period}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight">{e.role}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{e.org}</p>
                  <ul className="mt-4 space-y-2.5">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-6 text-zinc-600">
                        <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {e.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {"link" in e && typeof e.link === "string" ? (
                    <a
                      href={e.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-sm font-semibold underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
                    >
                      {e.link.replace("https://", "")}
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-t border-zinc-200 bg-zinc-50/60">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <SectionHead index={t.projects.index} eyebrow={t.projects.eyebrow} title={t.projects.title} desc={t.projects.desc} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {t.projects.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <article className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-7 transition hover:border-zinc-950">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      {p.tag}
                    </p>
                    <span className="font-mono text-xs text-zinc-300">0{i + 1}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">{p.name}</h3>
                  <p className="mt-1 font-mono text-xs text-zinc-400">{p.meta}</p>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600">{p.desc}</p>
                  <p className="mt-4 border-t border-zinc-100 pt-4 font-mono text-xs leading-5 text-zinc-500">
                    {p.stack.join(" / ")}
                  </p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-black"
                  >
                    {p.cta} <span className="ml-2">→</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-6 text-center text-sm text-zinc-500">{t.projects.more}</p>
          </Reveal>
        </div>
      </section>

      {/* ACHIEVEMENT */}
      <section id="achievement" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:py-20">
        <SectionHead index={t.achievement.index} eyebrow={t.achievement.eyebrow} title={t.achievement.title} desc={t.achievement.desc} />
        <Reveal delay={80}>
          <div className="mt-8 grid gap-0 overflow-hidden rounded-2xl border border-zinc-200 lg:grid-cols-[1.3fr_1fr]">
            <div className="bg-zinc-950 p-7 text-white sm:p-8">
              <p className="text-sm font-bold">{t.achievement.cardTitle}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{t.achievement.cardDesc}</p>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                {t.achievement.cta}
              </a>
            </div>
            <div className="border-t border-zinc-200 bg-white p-7 sm:p-8 lg:border-t-0 lg:border-l">
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400"><circle cx="12" cy="8" r="5" /><path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" /></svg>
                <p className="mt-3 text-sm font-semibold">Sertifikat LKS</p>
                <p className="mx-auto mt-1 max-w-[30ch] text-[13px] leading-5 text-zinc-500">
                  {t.achievement.uploadNote}
                </p>
                <p className="mt-3 font-mono text-[11px] text-zinc-400">public/sertifikat-lks.jpg</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <SectionHead index={t.contact.index} eyebrow={t.contact.eyebrow} title={t.contact.title} desc={t.contact.desc} />
          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="grid content-start gap-3 sm:grid-cols-2">
              {t.contact.cards.map((c, i) => (
                <Reveal key={c.label} delay={i * 60}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-950"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{c.label}</p>
                    <p className="mt-1.5 text-sm font-semibold break-all">{c.value}</p>
                  </a>
                </Reveal>
              ))}
              <Reveal delay={200} className="sm:col-span-2">
                <div className="rounded-2xl bg-zinc-950 p-5 text-sm leading-6 text-zinc-300">
                  Senin - Sabtu, jam kerja WIB. Di luar itu tetap dibaca, dibalas berikutnya.
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7">
                <p className="text-base font-bold tracking-tight">{t.contact.formTitle}</p>
                <p className="mt-1 text-sm text-zinc-500">{t.contact.formDesc}</p>
                <label className="mt-5 block text-xs font-semibold">{lang === "id" ? "Nama" : "Name"}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contact.namePh}
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
                />
                <label className="mt-4 block text-xs font-semibold">{lang === "id" ? "Pesan" : "Message"}</label>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder={t.contact.msgPh}
                  rows={4}
                  className="mt-1.5 w-full resize-none rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
                />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a href={mailHref} className="rounded-full border border-zinc-300 px-4 py-2.5 text-center text-sm font-semibold transition hover:border-zinc-950">
                    {t.contact.sendEmail}
                  </a>
                  <a href={waHref} target="_blank" rel="noreferrer" className="rounded-full bg-zinc-950 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-zinc-800">
                    {t.contact.sendWA}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-6 text-[13px] text-zinc-500 sm:flex-row">
          <p>{t.footer.made}</p>
          <p>{t.footer.rights}</p>
          <a href="#top" className="font-semibold text-zinc-950 hover:underline">↑ {t.footer.top}</a>
        </div>
      </footer>
    </div>
  );
}
