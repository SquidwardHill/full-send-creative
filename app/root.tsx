import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import "~/assets/styles/index.css";
import Navbar from "~/components/Navbar.js";
import Footer from "~/components/Footer.js";
import PageTransition from "~/components/PageTransition.js";
import { heroBgGradient } from "~/utils/images.js";

export default function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Mobile performance optimizations */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/SpaceGrotesk.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/STARBOY.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />

        <Meta />
        <Links />
      </head>
      <body>
        <main className="bg-galaxy font-serif text-cream-200 dark:bg-galaxy dark:text-cream-200 relative overflow-x-hidden">
          {/* <img
            src={heroBgGradient}
            alt="gradient background"
            className="w-full h-screen-1/2 absolute top-0 mx-auto bg-cover z-0"
          /> */}

          {/* Loading indicator */}
          {isLoading && (
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-bubblegum-300 to-bubblegum-500 z-50 animate-pulse">
              <div className="h-full bg-gradient-to-r from-bubblegum-300 to-bubblegum-500 animate-loading-bar"></div>
            </div>
          )}

          <Navbar />
          <div className="p-4 max-w-screen-xl mx-auto">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </div>
          <Footer />
        </main>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
