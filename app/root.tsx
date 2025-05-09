import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction } from "@remix-run/node";
import Navbar from "~/components/navbar";

import "./style.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-color-galaxy bg-galaxy font-serif text-cream-200 dark:bg-galaxy dark:text-cream-200">
      <Navbar />
        <main className="p-4 max-w-screen-xl mx-auto bg-color-galaxy">
            {children}
            <ScrollRestoration />
            <Scripts />
            <Analytics />
          </main>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
