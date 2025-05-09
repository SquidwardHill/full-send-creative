import { PrismaClient } from '@prisma/client';
import caseStudies from "../app/data/case-studies.json" assert { type: "json" };

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

interface ToolingData {
  design: string[];
  frontend: string[];
  backend: string[];
  buildTools?: string[];
  testing: string[];
  workflow: string[];
}

interface CaseStudyData {
  slug: string;
  title: string;
  hook: string;
  resumeSummary: string;
  tldr: string;
  challenge: string;
  task: string;
  contribution: string;
  result: string;
  coverImageUrl?: string;
  processImages?: string[];
  themeColor?: string;
  tooling?: ToolingData;
}

async function run() {
  try {
    for (const cs of caseStudies as CaseStudyData[]) {
      const {
        tooling,
        slug,
        title,
        hook,
        resumeSummary,
        tldr,
        challenge,
        task,
        contribution,
        result,
        coverImageUrl,
        processImages,
        themeColor,
      } = cs;

      const caseStudyData = {
        title,
        hook,
        resumeSummary,
        tldr,
        challenge,
        task,
        contribution,
        result,
        coverImageUrl: coverImageUrl ?? null,
        processImages: processImages ?? [],
        themeColor: themeColor ?? "purple-pizzazz-500",
      };

      const toolingData = tooling
        ? {
            planning: [],
            design: tooling.design,
            frontend: tooling.frontend,
            backend: tooling.backend,
            build: tooling.buildTools ?? [],
            testing: tooling.testing,
            workflow: tooling.workflow,
          }
        : undefined;

      await prisma.caseStudy.upsert({
        where: { slug },
        update: {
          ...caseStudyData,
          tooling: toolingData
            ? {
                upsert: {
                  create: toolingData,
                  update: toolingData,
                },
              }
            : undefined,
        },
        create: {
          slug,
          ...caseStudyData,
          tooling: toolingData
            ? {
                create: toolingData,
              }
            : undefined,
        },
      });

      console.log(`✅ Synced: ${title}`);
    }
  } catch (error) {
    console.error('Error during import:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
