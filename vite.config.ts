import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { vercelPreset } from "@vercel/remix/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

installGlobals();

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app")
    }
  },
  plugins: [
    remix({
      presets: [vercelPreset()],
      // Enable HMR
      future: {
        //v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
      },
    }),
    // reads from tsconfig.json paths configuration. Order matters-- needs to be declared after `remix()` but before other plugins. 
    tsconfigPaths(),
    tailwindcss(),
  ]
});
