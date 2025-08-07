'use client';

import type React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/header';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from "@/components/theme-provider";
import Script from 'next/script';





const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '700'],
});

const minecraft = localFont({
  src: '../public/fonts/MinecraftRegular-Bmg3.otf',
  variable: '--font-minecraft',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    
      <html lang="en" className={`${jetbrainsMono.variable} ${minecraft.variable} font-minecraft`} suppressHydrationWarning>

        <body
          className={`min-h-screen antialiased font-minecraft`}
        >
          {/* Google Analytics Script (disabled if no ID provided) */}
          {process.env.NEXT_PUBLIC_GA_ID ? (
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
          ) : null}
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID ?? ''}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />


          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>

        </body>
      </html>
    
  );
}

import './globals.css';
