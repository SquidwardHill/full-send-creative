import { PrismaClient } from "@prisma/client";
import caseStudies from "../app/data/case-studies.json" assert { type: "json" };

const prisma = new PrismaClient();

async function run() {
  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: {
        title: cs.title,
        hook: cs.hook,
        resumeSummary: cs.resumeSummary,
        tldr: cs.tldr,
        challenge: cs.challenge,
        task: cs.task,
        contribution: cs.contribution,
        result: cs.result,
        coverImageUrl: (cs as any).coverImageUrl ?? null,
        processImages: (cs as any).processImages ?? []
      },
      create: {
        slug: cs.slug,
        title: cs.title,
        hook: cs.hook,
        resumeSummary: cs.resumeSummary,
        tldr: cs.tldr,
        challenge: cs.challenge,
        task: cs.task,
        contribution: cs.contribution,
        result: cs.result,
        coverImageUrl: (cs as any).coverImageUrl ?? null,
        processImages: (cs as any).processImages ?? []
      },
    });

    console.log(`✅ Synced: ${cs.title}`);
  }

  await prisma.$disconnect();
}

run().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
