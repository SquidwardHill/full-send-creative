import { PrismaClient, SkillArea } from "@prisma/client";

const prisma = new PrismaClient();

type ToolSummary = {
  name: string;
  skillAreas: Set<SkillArea>;
  caseStudies: Set<string>;
};

async function run() {
  const skills = await prisma.caseStudySkill.findMany({
    include: {
      tool: true,
      caseStudy: { select: { slug: true } },
    },
  });

  const summaryMap = new Map<string, ToolSummary>();

  for (const skill of skills) {
    const toolName = skill.tool.name;
    const slug = skill.caseStudy.slug;

    if (!summaryMap.has(toolName)) {
      summaryMap.set(toolName, {
        name: toolName,
        skillAreas: new Set(),
        caseStudies: new Set(),
      });
    }

    const entry = summaryMap.get(toolName)!;
    entry.skillAreas.add(skill.area);
    entry.caseStudies.add(slug);
  }

  const result = Array.from(summaryMap.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ name, skillAreas, caseStudies }) => ({
      name,
      usedIn: {
        skillAreas: Array.from(skillAreas).sort(),
        caseStudies: Array.from(caseStudies).sort(),
      },
    }));

  console.log(JSON.stringify(result, null, 2));
  await prisma.$disconnect();
}

run().catch((err) => {
  console.error("Error generating summary:", err);
  prisma.$disconnect();
  process.exit(1);
});
