import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function shouldSeed(): Promise<boolean> {
  // Check if we should seed based on environment variables
  const forceSeed = process.env.FORCE_SEED === "true";
  const skipSeed = process.env.SKIP_SEED === "true";
  
  if (skipSeed) {
    console.log("🚫 Skipping seed - SKIP_SEED environment variable set");
    return false;
  }
  
  if (forceSeed) {
    console.log("🌱 Force seeding - FORCE_SEED environment variable set");
    return true;
  }
  
  // Check if database has any case studies
  const caseStudyCount = await prisma.caseStudy.count();
  
  if (caseStudyCount === 0) {
    console.log("🌱 No case studies found - seeding database");
    return true;
  }
  
  console.log(`✅ Database already has ${caseStudyCount} case studies - skipping seed`);
  return false;
}

async function runConditionalSeed() {
  try {
    const shouldRun = await shouldSeed();
    
    if (shouldRun) {
      console.log("🚀 Running seed script...");
      // Import and run the main seed script
      const { default: seedScript } = await import("./importCaseStudies.js");
      // The importCaseStudies script runs automatically when imported
    } else {
      console.log("⏭️  Skipping seed - database already populated");
    }
  } catch (error) {
    console.error("❌ Error during conditional seed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

runConditionalSeed().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
