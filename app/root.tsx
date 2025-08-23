import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import "~/assets/styles/index.css";
import Navbar from "~/components/Navbar.js";
import Footer from "~/components/Footer.js";
import { heroBgGradient } from "~/utils/images.js";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
          <Navbar />
          <div className="p-4 max-w-screen-xl mx-auto">
            <Outlet />
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
