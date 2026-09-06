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
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <header className="fixed top-[2px] left-0 right-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white">
              {profile.initials}
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight">{profile.name}</span>
              <span className="block text-xs text-zinc-500">{profile.role[lang]}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:border-zinc-950"
              aria-label="Toggle language"
              title="ID / EN"
            >
              {lang === "id" ? "ID | EN" : "EN | ID"}
            </button>
            <button
              onClick={() => window.print()}
              className="hidden rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold transition hover:border-zinc-950 sm:block"
            >
              {t.nav.cv}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 md:block"
            >
              {t.nav.contactCta}
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 lg:hidden"
              aria-label="Menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-zinc-200 bg-white px-6 py-3 lg:hidden">
            <div className="grid gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs text-zinc-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-950 opacity-30" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-zinc-950" />
              </span>
              <span className="font-medium">{t.hero.badge}</span>
              <span className="text-zinc-300">/</span>
              <span>{profile.location}</span>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
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
              <Reveal delay={240}>
                <dl className="mt-10 grid max-w-xl grid-cols-3">
                  {t.hero.stats.map((s, i) => (
                    <div
                      key={s.label}
                      className={i === 0 ? "pr-6" : "border-l border-zinc-200 px-6"}
                    >
                      <dd className="text-2xl font-bold tracking-tight">{s.value}</dd>
                      <dt className="mt-1 text-xs leading-5 text-zinc-500">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Kartu profil, minimal */}
            <Reveal delay={200} className="lg:justify-self-end lg:sticky lg:top-24">
              <aside className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white">
                <div className="flex items-center gap-4 border-b border-zinc-100 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white">
                    {profile.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{profile.name}</p>
                    <p className="text-xs text-zinc-500">{profile.role[lang]}</p>
                  </div>
                </div>
                <div className="divide-y divide-zinc-100 text-sm">
                  <a href={`mailto:${profile.email}`} className="flex items-center justify-between px-5 py-3.5 transition hover:bg-zinc-50">
                    <span className="text-xs uppercase tracking-wide text-zinc-400">Email</span>
                    <span className="font-medium">{profile.email}</span>
                  </a>
                  <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-between px-5 py-3.5 transition hover:bg-zinc-50">
                    <span className="text-xs uppercase tracking-wide text-zinc-400">WhatsApp</span>
                    <span className="font-medium">{profile.whatsappDisplay}</span>
                  </a>
                  <a href={profile.jolink} target="_blank" rel="noreferrer" className="flex items-center justify-between px-5 py-3.5 transition hover:bg-zinc-50">
                    <span className="text-xs uppercase tracking-wide text-zinc-400">Bisnis</span>
                    <span className="font-medium">jolink.co.id</span>
                  </a>
                </div>
                <p className="border-t border-zinc-100 px-5 py-3 text-center text-[11px] text-zinc-400">
                  {t.hero.scroll}
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-zinc-200" />
      </div>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:py-20">
        <SectionHead index={t.about.index} eyebrow={t.about.eyebrow} title={t.about.title} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Reveal delay={80}>
            <div>
              <p className="text-[15px] leading-7 text-zinc-600">{t.about.body1}</p>
              <p className="mt-4 text-[15px] leading-7 text-zinc-600">{t.about.body2}</p>
              <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
                {t.about.points.map((p, i) => (
                  <div key={p.title} className="flex gap-4 py-4">
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
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {t.about.cardTitle}
              </p>
              <dl className="mt-4 divide-y divide-zinc-200">
                {t.about.cardRows.map(([k, v]) => (
                  <div key={k} className="py-3 first:pt-0 last:pb-0">
                    <dt className="text-xs text-zinc-500">{k}</dt>
                    <dd className="mt-1 text-sm font-medium leading-6">{v}</dd>
                  </div>
                ))}
              </dl>
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
