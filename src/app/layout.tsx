import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Usman Ramadhan — Fullstack Developer & Tech Founder",
  description:
    "Portfolio Usman Ramadhan (Palembang): Fullstack Developer & Founder Jolink.co.id. Pembangun SPMB SMKN 1, Juara 3 LKS Web Technologies Provinsi Sumsel. | Fullstack developer bridging code and business.",
  keywords: ["Usman Ramadhan", "Fullstack Developer", "Palembang", "Jolink", "Next.js", "Portfolio"],
  authors: [{ name: "Usman Ramadhan" }],
  openGraph: {
    title: "Usman Ramadhan — Fullstack Developer & Tech Founder",
    description: "Bisa ngoding end-to-end, mikirnya bisnis. Founder Jolink.co.id.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full">
        <div id="site-root">{children}</div>
        {/* Printable CV sheet */}
        <div id="print-cv">
          <h1>Usman Ramadhan — Fullstack Developer &amp; Tech Founder</h1>
          <p>Palembang, Indonesia • usman@gmail.com • 0819-1684-8478 • github.com/wsprfme</p>
          <hr />
          <p>
            Fullstack developer yang menjembatankan kode dan bisnis. Membangun SPMB smkn1bmr.sch.id,
            Juara 3 LKS Web Technologies Provinsi Sumsel, Founder jolink.co.id (game &amp; bot hosting).
          </p>
          <h2>Pengalaman</h2>
          <ul>
            <li>Founder &amp; Developer — Jolink.co.id (2024—Sekarang)</li>
            <li>Fullstack Developer — SPMB SMKN 1 (2023—2024)</li>
            <li>Juara 3 LKS Web Technologies Provinsi Sumsel (2023)</li>
          </ul>
          <h2>Skills</h2>
          <p>Frontend: React, Next.js, TypeScript, Tailwind, PHP • Backend: Node.js, Go, Python, REST, MySQL • Ops: Git, Docker, Coolify, Linux VPS</p>
          <h2>Proyek</h2>
          <ul>
            <li>jolink.co.id — game &amp; bot hosting</li>
            <li>smkn1bmr.sch.id — sistem SPMB sekolah</li>
          </ul>
        </div>
      </body>
    </html>
  );
}
