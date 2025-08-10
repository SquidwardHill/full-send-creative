import type { SkillArea, Tool } from "@prisma/client";

export interface CaseStudySkill {
  area: SkillArea;
  tool: Tool;
}

interface Props {
  skills: CaseStudySkill[];
}

const skillAreaLabels: Record<SkillArea, string> = {
  PLANNING: "Planning",
  DESIGN: "Design",
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  BUILD: "Build Tools",
  TESTING: "Testing",
  WORKFLOW: "Workflow",
};

function groupSkillsByArea(skills: CaseStudySkill[]) {
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.area]) acc[skill.area] = [];
      acc[skill.area].push(skill.tool);
      return acc;
    },
    {} as Record<SkillArea, Tool[]>
  );
}

export default function SkillStackSection({ skills }: Props) {
  const grouped = groupSkillsByArea(skills);

  return (
    <section className="my-10">
      <h3 className="text-md font-light text-cream-200 mb-4">Tools & Tech Stack</h3>
      {Object.entries(grouped).map(([area, tools]) => (
        <div key={area} className="mb-6">
          <h4 className="text-cream-100 font-semibold text-sm uppercase mb-2 tracking-wide">
            {skillAreaLabels[area as SkillArea]}
          </h4>
          <ul className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <li
                key={tool.id}
                className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-white flex items-center"
              >
                {tool.icon && (
                  <span
                    className="mr-1 inline-block"
                    dangerouslySetInnerHTML={{
                      __html: `<iconify-icon icon="${tool.icon}" width="16" height="16"></iconify-icon>`,
                    }}
                  />
                )}
                {tool.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
