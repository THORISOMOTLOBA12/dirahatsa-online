
// ...existing code...

import "./globals.css";

export const metadata = {
  title: "Dirahatsa (Pty) Ltd — Make it happen",
  description: "Digital products & software for small businesses across Africa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}

