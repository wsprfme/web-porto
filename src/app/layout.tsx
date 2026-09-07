import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://usman.seadrama.net";
const SITE_NAME = "Usman Ramadhan";
const SITE_TITLE = "Usman Ramadhan - Fullstack Web Developer Palembang";
const SITE_DESC =
  "Usman Ramadhan adalah Fullstack Web Developer dari Palembang, Indonesia. Siswa kelas 3 TKJ SMKN 1 Belitang Madang Raya, Founder Jolink layanan hosting game dan bot, Juara 3 LKS Web Technologies Provinsi Sumatera Selatan 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    "Usman Ramadhan",
    "siapa Usman Ramadhan",
    "Usman Ramadhan Palembang",
    "Usman Ramadhan Jolink",
    "Usman Ramadhan SMKN 1 Belitang Madang Raya",
    "Fullstack Developer Palembang",
    "Web Developer Palembang",
    "Fullstack Web Developer Indonesia",
    "Jolink",
    "Portfolio Usman Ramadhan",
  ],
  authors: [{ name: "Usman Ramadhan", url: SITE_URL }],
  creator: "Usman Ramadhan",
  publisher: "Usman Ramadhan",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Usman Ramadhan - Fullstack Web Developer Palembang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Usman Ramadhan",
      url: SITE_URL,
      image: `${SITE_URL}/profile.png`,
      description: SITE_DESC,
      jobTitle: "Fullstack Web Developer",
      email: "mailto:usman@jolink.co.id",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Palembang",
        addressCountry: "ID",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "SMKN 1 Belitang Madang Raya",
      },
      worksFor: {
        "@type": "Organization",
        name: "Jolink",
        url: "https://jolink.co.id",
      },
      award: "Juara 3 LKS Web Technologies Tingkat Provinsi Sumatera Selatan 2026",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "PHP",
        "Node.js",
        "Go",
        "Python",
        "REST API",
        "MySQL",
        "Docker",
        "Linux",
      ],
      sameAs: [
        "https://github.com/wsprfme",
        "https://jolink.co.id",
        "https://smkn1bmr.sch.id",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
      inLanguage: ["id", "en"],
      author: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-white text-zinc-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div id="site-root">{children}</div>
        {/* Printable CV sheet */}
        <div id="print-cv">
          <h1>Usman Ramadhan - Fullstack Web Developer</h1>
          <p>Palembang, Indonesia - usman@jolink.co.id - 0819-1684-8478 - github.com/wsprfme</p>
          <hr />
          <p>
            Fullstack developer dari Palembang. Membangun sistem SPMB SMKN 1 Belitang Madang Raya,
            Juara 3 LKS Web Technologies Provinsi Sumatera Selatan 2026, dan menjalankan Jolink layanan hosting game dan bot.
          </p>
          <h2>Pendidikan</h2>
          <p>SMKN 1 Belitang Madang Raya — TKJ, kelas 3 (aktif). Target: Universitas Lampung / Amikom Yogyakarta.</p>
          <h2>Pengalaman</h2>
          <ul>
            <li>Founder dan Developer - Jolink (2025 - Sekarang)</li>
            <li>Freelance Developer custom tools dan web via Telegram/Discord (2024 - Sekarang)</li>
            <li>Fullstack Developer - SPMB SMKN 1 Belitang Madang Raya (2025 - Saat ini)</li>
            <li>Juara 3 LKS Web Technologies Provinsi Sumatera Selatan (2026)</li>
          </ul>
          <h2>Keahlian</h2>
          <p>Frontend: React, Next.js, TypeScript, Tailwind CSS, PHP. Backend: Node.js, Go, Python, REST API, MySQL. Ops: Git, Docker, Coolify, Linux VPS, Nginx.</p>
          <h2>Proyek</h2>
          <ul>
            <li>jolink.co.id - layanan hosting game dan bot</li>
            <li>smkn1bmr.sch.id - sistem penerimaan murid baru</li>
          </ul>
        </div>
      </body>
    </html>
  );
}
