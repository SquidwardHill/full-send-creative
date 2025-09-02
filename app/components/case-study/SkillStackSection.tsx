import type { SkillArea, Tool } from "@prisma/client";
import { FaLongArrowAltRight } from "react-icons/fa";
import { PiArrowElbowDownRightFill } from "react-icons/pi";

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
      <h4 className="text-2xl font-bold text-cream-100 mb-8 tracking-wide">Tools and Tech Stack</h4>
      <div className="space-y-6">
        {Object.entries(grouped).map(([area, tools]) => (
          <div key={area} className="grid grid-cols-10 gap-2 items-start">
            <h5 className="col-span-10 md:col-span-2 text-cream-200 font-bold">
              {skillAreaLabels[area as SkillArea]}
            </h5>
            <div className="col-span-10 md:col-span-8 items-center flex gap-4">
              <div>
                <PiArrowElbowDownRightFill className="text-bubblegum-400 inline-block md:hidden flex-col" />
                <FaLongArrowAltRight className="text-bubblegum-400 mr-2 hidden md:inline-block" />
              </div>
              <div className="flex flex-wrap gap-2 ">
                {tools.map((tool) => (
                  <span key={tool.id} className="text-cream-200 text-base font-light">
                    {tool.name}
                    {tools.indexOf(tool) < tools.length - 1 && ","}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
