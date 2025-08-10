import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import "~/assets/styles/index.css";
import { Link } from "@remix-run/react";
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
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Link to="~/assets/styles/compiled.css" rel="stylesheet" />
        <Links />
      </head>
      <body>
        <main className="bg-galaxy font-serif text-cream-200 dark:bg-galaxy dark:text-cream-200 relative overflow-x-hidden">
          <div className="absolute top-0 left-0 w-screen h-screen">
            <img src={heroBgGradient} alt="gradient background" className="w-full h-full mx-auto" />
          </div>
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
