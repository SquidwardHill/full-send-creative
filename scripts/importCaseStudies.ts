import { PrismaClient, SkillArea, ImageType } from "@prisma/client";
import caseStudies from "../app/data/case-studies.json" assert { type: "json"};

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
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
  coverImage?: string;
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
        coverImage,
        processImages,
        themeColor,
      } = cs;

      // Create or update the case study
      const caseStudy = await prisma.caseStudy.upsert({
        where: { slug },
        update: {
          title,
          hook,
          resumeSummary,
          tldr,
          challenge,
          task,
          contribution,
          result,
          themeColor: themeColor ?? "purple-pizzazz-500",
        },
        create: {
          slug,
          title,
          hook,
          resumeSummary,
          tldr,
          challenge,
          task,
          contribution,
          result,
          themeColor: themeColor ?? "purple-pizzazz-500",
        },
      });

      // Handle cover image
      if (coverImage) {
        await prisma.image.upsert({
          where: {
            caseStudyId_type: {
              caseStudyId: caseStudy.id,
              type: ImageType.COVER,
            },
          },
          update: {
            url: coverImage,
            alt: `${title} Cover Image`,
          },
          create: {
            caseStudyId: caseStudy.id,
            type: ImageType.COVER,
            url: coverImage,
            alt: `${title} Cover Image`,
          },
        });
      }

      // Handle process images
      if (processImages && processImages.length > 0) {
        // Delete existing process images
        await prisma.image.deleteMany({
          where: {
            caseStudyId: caseStudy.id,
            type: ImageType.PROCESS,
          },
        });

        // Create new process images
        await prisma.image.createMany({
          data: processImages.map((url, index) => ({
            caseStudyId: caseStudy.id,
            type: ImageType.PROCESS,
            url,
            alt: `Process ${index + 1}`,
          })),
        });
      }

      // Handle skills and tools
      if (tooling) {
        // Clear old skill associations
        await prisma.caseStudySkill.deleteMany({
          where: {
            caseStudyId: caseStudy.id,
          },
        });

        // Create tools for each skill area
        const skillAreas: [SkillArea, string[]][] = [
          [SkillArea.DESIGN, tooling.design],
          [SkillArea.FRONTEND, tooling.frontend],
          [SkillArea.BACKEND, tooling.backend],
          [SkillArea.BUILD, tooling.buildTools ?? []],
          [SkillArea.TESTING, tooling.testing],
          [SkillArea.WORKFLOW, tooling.workflow],
        ];

        for (const [area, tools] of skillAreas) {
          for (const toolName of tools) {
            const normalizedName = toolName.trim();

            const tool = await prisma.tool.upsert({
              where: { name: normalizedName },
              update: {},
              create: { name: normalizedName },
            });

            await prisma.caseStudySkill.create({
              data: {
                caseStudyId: caseStudy.id,
                toolId: tool.id,
                area,
              },
            });
          }
        }
      }

      console.log(`✅ Synced: ${title}`);
    }
  } catch (error) {
    console.error("Error during import:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
