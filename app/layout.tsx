import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: "Ayyappan M — Computer Science Student & Full-Stack Developer",
  description:
    "Portfolio of Ayyappan M, a BSc Computer Science final year student passionate about AI, full-stack development, and data science. Built AI chatbots, billing systems, and more.",
  keywords: [
    "Ayyappan M",
    "Computer Science",
    "AI Enthusiast",
    "Python",
    "FastAPI",
    "Data Science",
    "Portfolio",
    "Full Stack",
  ],
  authors: [{ name: "Ayyappan M" }],
  creator: "Ayyappan M",
  openGraph: {
    title: "Ayyappan M — CS Student & AI Enthusiast",
    description:
      "BSc Computer Science final year student with expertise in AI, Python, FastAPI, and data analysis. View my projects and get in touch.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayyappan M — CS Student & AI Enthusiast",
    description:
      "BSc Computer Science final year student with expertise in AI, Python, FastAPI, and data analysis.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
