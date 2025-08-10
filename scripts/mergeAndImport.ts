import { PrismaClient, SkillArea, ImageType } from "@prisma/client";
import caseStudyContent from "../app/data/case-studies.json" assert { type: "json" };
import imageManifest from "../app/data/image-manifest.json" assert { type: "json" };

const prisma = new PrismaClient();

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
  themeColor?: string;
  skills?: ToolingData;
}

async function run() {
  const imageMap = Object.fromEntries(
    (
      imageManifest as Array<{
        slug: string;
        coverImage: string;
        processImages: string[];
      }>
    ).map((item) => [item.slug, item])
  );

  for (const cs of caseStudyContent as CaseStudyData[]) {
    const {
      slug,
      title,
      hook,
      resumeSummary,
      tldr,
      challenge,
      task,
      contribution,
      result,
      themeColor,
      skills,
    } = cs;

    const imageData = imageMap[slug] || {};
    const coverImage = imageData.coverImage ?? `/public/images/${slug}/cover.png`;
    const processImages = imageData.processImages ?? [];

    // Upsert the case study
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

    // Upsert cover image
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

    // Delete existing skills
    await prisma.caseStudySkill.deleteMany({
      where: { caseStudyId: caseStudy.id },
    });

    // Recreate skills from tooling
    if (skills) {
      console.log("🔍 Skills data:", skills);
      const skillGroups: [SkillArea, string[]][] = [
        [SkillArea.DESIGN, skills.design],
        [SkillArea.FRONTEND, skills.frontend],
        [SkillArea.BACKEND, skills.backend],
        [SkillArea.BUILD, skills.buildTools ?? []],
        [SkillArea.TESTING, skills.testing],
        [SkillArea.WORKFLOW, skills.workflow],
      ];

      for (const [area, tools] of skillGroups) {
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

  await prisma.$disconnect();
}

run().catch((err) => {
  console.error("Fatal error:", err);
  prisma.$disconnect();
  process.exit(1);
});
