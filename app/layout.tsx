import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // O template vale para paginas futuras: "Sobre" vira "Sobre · gxguinho".
  title: {
    default: "gxguinho",
    template: "%s · gxguinho",
  },
  description:
    "Site pessoal do gxguinho: um terminal em tela cheia com um Gengar desenhado em arte ASCII.",
  openGraph: {
    title: "gxguinho",
    description:
      "Site pessoal do gxguinho: um terminal em tela cheia com um Gengar desenhado em arte ASCII.",
    type: "website",
    locale: "pt_BR",
  },
};

// themeColor vive no export `viewport` nesta versao do Next, nao em `metadata`.
// Pinta a barra do navegador no mobile com o fundo do terminal.
export const viewport: Viewport = {
  themeColor: "#1b1715",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1b1715]">{children}</body>
    </html>
  );
}
