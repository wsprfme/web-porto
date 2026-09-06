"use client";

import { useEffect, useState } from "react";
import { dict, profile, type Lang } from "@/lib/content";
import { Reveal, useRevealRoot } from "./Reveal";

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("id");
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dict[lang];
  const rootRef = useRevealRoot<HTMLDivElement>(lang);

  useEffect(() => {
    const savedTheme = localStorage.getItem("porto-theme");
    const savedLang = localStorage.getItem("porto-lang") as Lang | null;
    if (savedLang === "id" || savedLang === "en") setLang(savedLang);
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("porto-theme", next ? "dark" : "light");
  };

  const toggleLang = () => {
    const next: Lang = lang === "id" ? "en" : "id";
    setLang(next);
    localStorage.setItem("porto-lang", next);
    document.documentElement.lang = next;
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
    <div ref={rootRef}>
      {/* scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-zinc-200/60 dark:bg-zinc-800/60">
        <div id="scroll-progress" className="h-full bg-emerald-600" style={{ width: `${progress}%` }} />
      </div>

      {/* NAVBAR */}
      <header className="fixed top-[3px] left-0 right-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
              {profile.initials}
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight">{profile.name}</span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">{profile.role[lang]}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
              aria-label="Toggle language"
              title="ID / EN"
            >
              {lang === "id" ? "ID → EN" : "EN → ID"}
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 transition hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
              aria-label="Toggle theme"
            >
              <ThemeIcon dark={dark} />
            </button>
            <button
              onClick={() => window.print()}
              className="hidden rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 sm:block dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {t.nav.cv}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 md:block"
            >
              {t.nav.contactCta}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 lg:hidden dark:border-zinc-700"
              aria-label="Menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-zinc-200 px-5 py-3 lg:hidden dark:border-zinc-800">
            <div className="grid gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden pt-28 pb-14 sm:pt-32">
        <div className="bg-grid mask-fade-b absolute inset-0" />
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl dark:bg-emerald-500/10" />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              {t.hero.badge}
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-600 dark:text-zinc-300">{profile.location}</span>
            </div>
          </Reveal>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Reveal delay={60}>
                <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">{t.hero.greeting}</p>
                <h1 className="mt-1 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
                  {profile.name}
                  <span className="text-emerald-600">.</span>
                </h1>
                <p className="mt-3 text-lg font-semibold text-zinc-800 sm:text-xl dark:text-zinc-100">
                  {profile.role[lang]} — {profile.tagline[lang]}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-zinc-600 dark:text-zinc-300">
                  {profile.summary[lang]}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#projects" className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                    {t.hero.ctaProjects} →
                  </a>
                  <a href="#contact" className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-zinc-500 dark:border-zinc-700 dark:hover:border-zinc-400">
                    {t.hero.ctaContact}
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 dark:border-zinc-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.13v3.16c0 .31.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" /></svg>
                    {profile.githubHandle}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                  {t.hero.stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-zinc-200 bg-white/70 p-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
                      <dt className="order-2 mt-1 text-[11px] leading-4 text-zinc-500 dark:text-zinc-400">{s.label}</dt>
                      <dd className="text-lg font-bold tracking-tight">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Profile card */}
            <Reveal delay={200} className="lg:justify-self-end">
              <div className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-xl font-bold text-white">
                    {profile.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{profile.role[lang]}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-zinc-500">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {profile.location}
                    </p>
                  </div>
                </div>
                <div className="mt-5 space-y-2.5 text-sm">
                  <a href={`mailto:${profile.email}`} className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 transition hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800">
                    <span className="text-zinc-500">Email</span><span className="font-medium">{profile.email}</span>
                  </a>
                  <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 transition hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800">
                    <span className="text-zinc-500">WhatsApp</span><span className="font-medium">{profile.whatsappDisplay}</span>
                  </a>
                  <a href={profile.jolink} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2.5 transition hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60">
                    <span className="text-emerald-700 dark:text-emerald-300">Bisnis</span><span className="font-medium">jolink.co.id ↗</span>
                  </a>
                </div>
                <p className="mt-4 text-center text-[11px] text-zinc-400">{t.hero.scroll} ↓</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-600 uppercase">{t.about.eyebrow}</p>
          <h2 className="mt-2 max-w-xl text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.about.title}</h2>
        </Reveal>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal delay={80}>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="leading-7 text-zinc-600 dark:text-zinc-300">{t.about.body1}</p>
              <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">{t.about.body2}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {t.about.points.map((p) => (
                  <div key={p.title} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
                    <p className="text-sm font-semibold">{p.title}</p>
                    <p className="mt-1 text-[13px] leading-5 text-zinc-600 dark:text-zinc-300">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="rounded-3xl border border-zinc-200 bg-zinc-950 p-6 text-white sm:p-7 dark:border-zinc-700 dark:bg-black">
              <p className="text-sm font-semibold text-zinc-300">{t.about.cardTitle}</p>
              <dl className="mt-4 space-y-3">
                {t.about.cardRows.map(([k, v]) => (
                  <div key={k} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <dt className="text-xs text-zinc-400">{k}</dt>
                    <dd className="mt-0.5 text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <a href={profile.jolink} target="_blank" rel="noreferrer" className="mt-5 block rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold transition hover:bg-emerald-500">
                jolink.co.id ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-600 uppercase">{t.skills.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t.skills.title}</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-zinc-600 dark:text-zinc-300">{t.skills.desc}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {t.skills.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-sm font-bold">{g.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-full bg-zinc-100 px-3 py-1.5 text-[13px] font-medium dark:bg-zinc-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-4 rounded-2xl border border-dashed border-zinc-300 p-4 text-[13px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            ⓘ {t.skills.note}
          </p>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-600 uppercase">{t.experience.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t.experience.title}</h2>
        </Reveal>
        <div className="mt-6 space-y-4">
          {t.experience.items.map((e, i) => (
            <Reveal key={e.org} delay={i * 80}>
              <article className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 transition hover:shadow-lg sm:p-7 lg:grid-cols-[200px_1fr] dark:border-zinc-800 dark:bg-zinc-900/60">
                <div>
                  <p className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">{e.period}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">{e.role}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{e.org}</p>
                  <ul className="mt-3 space-y-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[14px] leading-6 text-zinc-600 dark:text-zinc-300">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {"link" in e && e.link ? (
                    <a href={e.link as string} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
                      {(e.link as string).replace("https://", "")} ↗
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-600 uppercase">{t.projects.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t.projects.title}</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-zinc-600 dark:text-zinc-300">{t.projects.desc}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {t.projects.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <article className="group flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-xs font-bold tracking-wide text-emerald-600 uppercase">{p.tag}</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight">{p.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-6 text-zinc-600 dark:text-zinc-300">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium dark:bg-zinc-800">{s}</span>
                  ))}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center justify-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:group-hover:bg-emerald-500 dark:group-hover:text-white">
                  {p.cta} ↗
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">{t.projects.more}</p>
        </Reveal>
      </section>

      {/* ACHIEVEMENT */}
      <section id="achievement" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-white p-6 sm:p-8 dark:border-amber-900/40 dark:from-amber-950/30 dark:via-zinc-900 dark:to-zinc-900">
            <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-amber-600 uppercase">{t.achievement.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.achievement.title}</h2>
                <p className="mt-2 text-[15px] text-zinc-600 dark:text-zinc-300">{t.achievement.desc}</p>
                <div className="mt-4 rounded-2xl bg-white/70 p-4 dark:bg-black/30">
                  <p className="font-semibold">🏆 {t.achievement.cardTitle}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{t.achievement.cardDesc}</p>
                </div>
                <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600">
                  {t.achievement.cta}
                </a>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-white/60 p-6 text-center dark:border-amber-800 dark:bg-black/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl dark:bg-amber-950">🎓</div>
                <p className="mt-3 text-sm font-semibold">Certificate slot</p>
                <p className="mx-auto mt-1 max-w-[26ch] text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">{t.achievement.uploadNote}</p>
                <p className="mt-3 font-mono text-[11px] text-zinc-400">public/sertifikat-lks.jpg</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 pb-20">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-600 uppercase">{t.contact.eyebrow}</p>
          <h2 className="mt-2 max-w-xl text-2xl font-bold tracking-tight text-balance sm:text-3xl">{t.contact.title}</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-zinc-600 dark:text-zinc-300">{t.contact.desc}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {t.contact.cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 70}>
                <a href={c.href} target="_blank" rel="noreferrer" className="block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60">
                  <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">{c.label}</p>
                  <p className="mt-1 font-semibold break-all">{c.value}</p>
                  <p className="mt-2 text-sm font-medium text-emerald-600">↗</p>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/60">
              <p className="font-bold">{t.contact.formTitle}</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t.contact.formDesc}</p>
              <label className="mt-4 block text-xs font-semibold">{lang === "id" ? "Nama" : "Name"}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.namePh}
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-800"
              />
              <label className="mt-3 block text-xs font-semibold">{lang === "id" ? "Pesan" : "Message"}</label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={t.contact.msgPh}
                rows={4}
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-800"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={mailHref} className="rounded-xl bg-zinc-950 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950">
                  {t.contact.sendEmail}
                </a>
                <a href={waHref} target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700">
                  {t.contact.sendWA}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-[13px] text-zinc-500 sm:flex-row dark:text-zinc-400">
          <p>{t.footer.made}</p>
          <p>{t.footer.rights}</p>
          <a href="#top" className="font-semibold hover:underline">↑ {t.footer.top}</a>
        </div>
      </footer>
    </div>
  );
}
