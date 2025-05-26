import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import "~/assets/styles/index.css";
import { Link } from "@remix-run/react";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Link to="~/assets/styles/compiled.css" rel="stylesheet" />
        <Links />
      </head>
      <body>
        <main className="bg-galaxy font-serif text-cream-200 dark:bg-galaxy dark:text-cream-200">
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
