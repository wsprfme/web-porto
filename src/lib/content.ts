export type Lang = "id" | "en";

export const profile = {
  name: "Usman Ramadhan",
  initials: "UR",
  location: "Palembang, Indonesia",
  email: "usman@gmail.com",
  github: "https://github.com/wsprfme",
  githubHandle: "wsprfme",
  whatsapp: "https://wa.me/6281916848478",
  whatsappDisplay: "0819-1684-8478",
  jolink: "https://jolink.co.id",
  schoolSite: "https://smkn1bmr.sch.id",
  availability: {
    id: "Terbuka untuk kerja & kolaborasi",
    en: "Open to work & collaboration",
  },
  role: {
    id: "Fullstack Developer & Tech Founder",
    en: "Fullstack Developer & Tech Founder",
  },
  tagline: {
    id: "Bisa ngoding end-to-end, mikirnya bisnis.",
    en: "Ships end-to-end, thinks in business outcomes.",
  },
  summary: {
    id: "Fullstack developer dari Palembang yang menjembatankan kode dan bisnis. Membangun sistem SPMB sekolah yang dipakai pendaftar sungguhan, meraih Juara 3 LKS Web Technologies tingkat Provinsi Sumatera Selatan, dan mendirikan Jolink — layanan game & bot hosting.",
    en: "Fullstack developer from Palembang bridging code and business. Built a school admission (SPMB) system used by real applicants, won 3rd place in Web Technologies at the South Sumatra provincial LKS competition, and founded Jolink — a game & bot hosting service.",
  },
};

export const dict = {
  id: {
    nav: {
      about: "Tentang",
      skills: "Keahlian",
      experience: "Pengalaman",
      projects: "Proyek",
      achievement: "Prestasi",
      contact: "Kontak",
      contactCta: "Hubungi Saya",
      cv: "Unduh CV",
    },
    hero: {
      badge: "Terbuka untuk kerja & kolaborasi",
      greeting: "Halo, saya",
      ctaProjects: "Lihat Proyek",
      ctaContact: "Hubungi Saya",
      stats: [
        { value: "3+", label: "Produk live dipakai user" },
        { value: "Juara 3", label: "LKS Provinsi Sumsel" },
        { value: "Fullstack", label: "Frontend → Backend → Ops" },
      ],
      scroll: "Gulir ke bawah",
    },
    about: {
      eyebrow: "Tentang",
      title: "Engineer yang mikir kayak pemilik bisnis.",
      body1:
        "Saya Usman Ramadhan dari Palembang. Saya fullstack — nyaman di React/Next.js, Node.js, Go, Python, dan PHP — tapi nilai utama saya bukan sekadar stack, melainkan mendorong hasil: pendaftaran naik, biaya turun, produk jalan.",
      body2:
        "Bukti paling nyata: website SPMB untuk sekolah saya sendiri (SMKN 1 Banyuasin), medali LKS Web Technologies tingkat provinsi, dan Jolink.co.id yang saya dirikan dan operasikan sebagai bisnis hosting.",
      points: [
        { title: "Product-minded", desc: "Mulai dari masalah user, bukan dari framework." },
        { title: "Ship & operate", desc: "Terbiasa deploy, monitoring, dan support user." },
        { title: "Komunikasi HR-friendly", desc: "Bisa menjelaskan teknis ke non-teknis." },
      ],
      cardTitle: "Sekilas",
      cardRows: [
        ["Basis", "Palembang, Indonesia (WIB, remote-ready)"],
        ["Fokus", "Fullstack Web + Produk SaaS/Hosting"],
        ["Bahasa", "Indonesia (native), Inggris (profesional)"],
        ["Ketertarikan", "SaaS, automation, bisnis digital"],
      ],
    },
    skills: {
      eyebrow: "Keahlian",
      title: "Stack yang siap produksi.",
      desc: "Padat, relevan, dan terbukti dipakai di proyek nyata — bukan sekadar daftar.",
      groups: [
        {
          title: "Frontend",
          items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PHP"],
        },
        {
          title: "Backend",
          items: ["Node.js", "Go", "Python", "REST API", "MySQL"],
        },
        {
          title: "Tools & Ops",
          items: ["Git & GitHub", "Docker", "Coolify", "Linux VPS", "Nginx"],
        },
      ],
      note: "Tools saya isi dengan standar produksi (Git, Docker, Coolify, Linux) — beri tahu saya kalau mau disesuaikan.",
    },
    experience: {
      eyebrow: "Pengalaman",
      title: "Bukti kerja, bukan janji.",
      items: [
        {
          period: "2024 — Sekarang",
          role: "Founder & Developer",
          org: "Jolink.co.id — Game & Bot Hosting",
          bullets: [
            "Mendirikan dan mengoperasikan layanan hosting game & bot (panel, billing, support).",
            "Mengelola VPS Linux, deployment, dan uptime untuk pelanggan.",
            "Belajar langsung: pricing, churn, dan support user berbayar.",
          ],
          tags: ["Bisnis", "Linux", "Support", "Produk"],
        },
        {
          period: "2023 — 2024",
          role: "Fullstack Developer (Proyek Sekolah)",
          org: "SPMB — smkn1bmr.sch.id",
          bullets: [
            "Membangun website SPMB untuk SMK sendiri, dipakai pendaftar sungguhan.",
            "Fitur: formulir pendaftaran, data pendaftar, halaman informasi.",
            "Fokus: mudah dipakai orang tua/siswa di HP.",
          ],
          tags: ["Next.js", "Fullstack", "Real users"],
          link: "https://smkn1bmr.sch.id",
        },
        {
          period: "2023",
          role: "Peserta Lomba — Juara 3 Provinsi",
          org: "LKS Web Technologies — Sumatera Selatan",
          bullets: [
            "Mewakili kabupaten ke tingkat provinsi, melawan antar-kabupaten/kota se-Sumsel.",
            "Bersaing di bidang Web Technologies (frontend + backend timed-task).",
            "Slot sertifikat sudah disiapkan di bawah — tinggal upload.",
          ],
          tags: ["Kompetisi", "Web Technologies"],
        },
      ],
    },
    projects: {
      eyebrow: "Proyek Unggulan",
      title: "Dipilih yang paling meyakinkan HR.",
      desc: "Satu bisnis jalan + satu sistem dipakai publik. Kualitas di atas kuantitas.",
      items: [
        {
          name: "Jolink.co.id",
          tag: "Featured • Live Business",
          desc: "Layanan game & bot hosting yang saya dirikan. Fokus pada kemudahan order, performa server, dan support cepat untuk komunitas gamer & developer bot.",
          stack: ["Bisnis", "Linux VPS", "Panel Hosting", "Support"],
          link: "https://jolink.co.id",
          cta: "Kunjungi live",
        },
        {
          name: "SPMB SMKN 1",
          tag: "Real-world system",
          desc: "Sistem penerimaan murid baru untuk SMKN 1 Banyuasin. Menggantikan proses manual menjadi online — informatif, cepat di HP, mudah dikelola sekolah.",
          stack: ["Fullstack Web", "Formulir", "Mobile-first"],
          link: "https://smkn1bmr.sch.id",
          cta: "Lihat situs sekolah",
        },
      ],
      more: "Butuh detail teknis / repo privat? Tanya via WhatsApp — saya jelaskan arsitekturnya.",
    },
    achievement: {
      eyebrow: "Prestasi",
      title: "Juara 3 LKS Provinsi Sumsel.",
      desc: "Lomba Kompetensi Siswa bidang Web Technologies — mewakili kabupaten ke provinsi Sumatera Selatan.",
      cardTitle: "Juara 3 — Web Technologies (Provinsi)",
      cardDesc:
        "Kompetisi resmi antar kabupaten/kota. Sertifikat akan ditampilkan di sini — slot sudah siap, tinggal upload file dari kamu.",
      uploadNote: "Slot sertifikat: upload PDF/JPG, otomatis tampil + bisa diunduh HR.",
      cta: "Minta sertifikat via WA",
    },
    contact: {
      eyebrow: "Kontak",
      title: "Mari bangun sesuatu yang dipakai orang.",
      desc: "Paling cepat via WhatsApp. Email untuk formalitas HR. GitHub untuk bukti kode.",
      cards: [
        { label: "Email", value: "usman@gmail.com", href: "mailto:usman@gmail.com" },
        { label: "WhatsApp", value: "0819-1684-8478", href: "https://wa.me/6281916848478" },
        { label: "GitHub", value: "@wsprfme", href: "https://github.com/wsprfme" },
        { label: "Lokasi", value: "Palembang, ID", href: "https://wa.me/6281916848478" },
      ],
      formTitle: "Kirim pesan cepat",
      formDesc: "Tanpa backend — tombol kirim membuka Email/WhatsApp dengan isi sudah terisi.",
      namePh: "Nama kamu",
      msgPh: "Halo Usman, kami tertarik dengan profilmu untuk posisi...",
      sendEmail: "Kirim via Email",
      sendWA: "Kirim via WhatsApp",
    },
    footer: {
      made: "Dibangun dengan Next.js + Tailwind • Deploy via Coolify",
      rights: "© 2026 Usman Ramadhan. Palembang, Indonesia.",
      top: "Kembali ke atas",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      achievement: "Award",
      contact: "Contact",
      contactCta: "Hire Me",
      cv: "Download CV",
    },
    hero: {
      badge: "Open to work & collaboration",
      greeting: "Hi, I'm",
      ctaProjects: "View Projects",
      ctaContact: "Contact Me",
      stats: [
        { value: "3+", label: "Live products with users" },
        { value: "3rd Place", label: "Provincial LKS, S. Sumatra" },
        { value: "Fullstack", label: "Frontend → Backend → Ops" },
      ],
      scroll: "Scroll down",
    },
    about: {
      eyebrow: "About",
      title: "An engineer who thinks like an owner.",
      body1:
        "I'm Usman Ramadhan from Palembang. I'm fullstack — comfortable across React/Next.js, Node.js, Go, Python, and PHP — but my real value isn't the stack, it's outcomes: more signups, lower cost, shipped product.",
      body2:
        "Proof: an admission (SPMB) website for my own school (SMKN 1 Banyuasin), a provincial Web Technologies medal, and Jolink.co.id — a hosting business I founded and operate.",
      points: [
        { title: "Product-minded", desc: "Starts from user problems, not frameworks." },
        { title: "Ship & operate", desc: "Used to deploying, monitoring, supporting users." },
        { title: "HR-friendly comms", desc: "Can explain tech to non-technical folks." },
      ],
      cardTitle: "At a glance",
      cardRows: [
        ["Based in", "Palembang, Indonesia (WIB, remote-ready)"],
        ["Focus", "Fullstack Web + SaaS/Hosting products"],
        ["Languages", "Indonesian (native), English (professional)"],
        ["Interests", "SaaS, automation, digital business"],
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Production-ready stack.",
      desc: "Dense, relevant, and proven in real projects — not just a list.",
      groups: [
        {
          title: "Frontend",
          items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PHP"],
        },
        {
          title: "Backend",
          items: ["Node.js", "Go", "Python", "REST API", "MySQL"],
        },
        {
          title: "Tools & Ops",
          items: ["Git & GitHub", "Docker", "Coolify", "Linux VPS", "Nginx"],
        },
      ],
      note: "Tools filled with production defaults (Git, Docker, Coolify, Linux) — tell me to adjust.",
    },
    experience: {
      eyebrow: "Experience",
      title: "Proof of work, not promises.",
      items: [
        {
          period: "2024 — Present",
          role: "Founder & Developer",
          org: "Jolink.co.id — Game & Bot Hosting",
          bullets: [
            "Founded and operate a game & bot hosting service (panel, billing, support).",
            "Manage Linux VPS, deployments, and uptime for paying customers.",
            "Learned firsthand: pricing, churn, and user support.",
          ],
          tags: ["Business", "Linux", "Support", "Product"],
        },
        {
          period: "2023 — 2024",
          role: "Fullstack Developer (School Project)",
          org: "SPMB — smkn1bmr.sch.id",
          bullets: [
            "Built the admission website for my own vocational school, used by real applicants.",
            "Features: registration forms, applicant data, info pages.",
            "Focus: usable by parents/students on mobile.",
          ],
          tags: ["Next.js", "Fullstack", "Real users"],
          link: "https://smkn1bmr.sch.id",
        },
        {
          period: "2023",
          role: "Competitor — 3rd Place Provincial",
          org: "LKS Web Technologies — South Sumatra",
          bullets: [
            "Represented the regency at provincial level, vs. cities/regencies across S. Sumatra.",
            "Competed in Web Technologies (frontend + backend timed tasks).",
            "Certificate slot ready below — just upload.",
          ],
          tags: ["Competition", "Web Technologies"],
        },
      ],
    },
    projects: {
      eyebrow: "Selected Work",
      title: "Picked to convince HR fast.",
      desc: "One live business + one system used by the public. Quality over quantity.",
      items: [
        {
          name: "Jolink.co.id",
          tag: "Featured • Live Business",
          desc: "Game & bot hosting service I founded. Focused on easy ordering, server performance, and fast support for gamer & bot-developer communities.",
          stack: ["Business", "Linux VPS", "Hosting Panel", "Support"],
          link: "https://jolink.co.id",
          cta: "Visit live",
        },
        {
          name: "SPMB SMKN 1",
          tag: "Real-world system",
          desc: "New-student admission system for SMKN 1 Banyuasin. Moved manual process online — informative, fast on mobile, easy for school staff.",
          stack: ["Fullstack Web", "Forms", "Mobile-first"],
          link: "https://smkn1bmr.sch.id",
          cta: "View school site",
        },
      ],
      more: "Need technical details / private repos? Ping me on WhatsApp — I'll walk through the architecture.",
    },
    achievement: {
      eyebrow: "Award",
      title: "3rd Place, Provincial LKS S. Sumatra.",
      desc: "Student Competency Competition in Web Technologies — represented the regency at South Sumatra provincial level.",
      cardTitle: "3rd Place — Web Technologies (Provincial)",
      cardDesc:
        "Official competition across regencies/cities. Certificate will show here — slot is ready, just upload your file.",
      uploadNote: "Certificate slot: upload PDF/JPG, auto-display + downloadable for HR.",
      cta: "Request certificate via WA",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something people use.",
      desc: "Fastest via WhatsApp. Email for HR formalities. GitHub for code proof.",
      cards: [
        { label: "Email", value: "usman@gmail.com", href: "mailto:usman@gmail.com" },
        { label: "WhatsApp", value: "0819-1684-8478", href: "https://wa.me/6281916848478" },
        { label: "GitHub", value: "@wsprfme", href: "https://github.com/wsprfme" },
        { label: "Location", value: "Palembang, ID", href: "https://wa.me/6281916848478" },
      ],
      formTitle: "Quick message",
      formDesc: "No backend — send opens Email/WhatsApp with prefilled text.",
      namePh: "Your name",
      msgPh: "Hi Usman, we're interested in your profile for...",
      sendEmail: "Send via Email",
      sendWA: "Send via WhatsApp",
    },
    footer: {
      made: "Built with Next.js + Tailwind • Deployed via Coolify",
      rights: "© 2026 Usman Ramadhan. Palembang, Indonesia.",
      top: "Back to top",
    },
  },
} as const;

export type Dict = (typeof dict)["en"];
