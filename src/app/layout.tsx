import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Usman Ramadhan - Fullstack Web Developer",
  description:
    "Portfolio Usman Ramadhan dari Palembang: Fullstack Web Developer. Membangun SPMB SMKN 1 Belitang Madang Raya, Juara 3 LKS Web Technologies Provinsi Sumatera Selatan 2026, dan Jolink layanan hosting game dan bot.",
  keywords: ["Usman Ramadhan", "Fullstack Developer", "Palembang", "Jolink", "Next.js", "Portfolio"],
  authors: [{ name: "Usman Ramadhan" }],
  openGraph: {
    title: "Usman Ramadhan - Fullstack Web Developer",
    description: "Membangun website yang rapi, cepat, dan mudah dipakai. Berbasis Palembang, siap remote.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-white text-zinc-950">
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
