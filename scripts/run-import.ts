import { execSync } from "child_process";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// First, ensure Prisma client is generated
console.log("Generating Prisma client...");
execSync("npx prisma generate", { stdio: "inherit" });

// Then run the import script
console.log("Running import script...");
execSync("npx tsx scripts/importCaseStudies.ts", { stdio: "inherit" });
