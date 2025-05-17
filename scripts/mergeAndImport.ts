import { PrismaClient } from "@prisma/client";
import caseStudyContent from "../app/data/case-studies.json" assert { type: "json" };
import imageManifest from "../app/data/image-manifest.json" assert { type: "json" };

const prisma = new PrismaClient();

async function run() {
  const imageMap = Object.fromEntries(
    (
      imageManifest as unknown as Array<{
        slug: string;
        coverImageUrl: string;
        processImages: string[];
      }>
    ).map((item) => [item.slug, item])
  );

  for (const cs of caseStudyContent) {
    const imageData = imageMap[cs.slug] || {};
    const data = {
      ...cs,
      coverImageUrl: imageData.coverImageUrl || null,
      processImages: imageData.processImages || [],
    };

    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: data,
      create: data,
    });

    console.log(`🔄 Synced: ${cs.title}`);
  }

  await prisma.$disconnect();
}

run().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
