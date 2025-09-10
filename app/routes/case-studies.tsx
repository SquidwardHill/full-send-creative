import type { MetaFunction } from "@vercel/remix";
import { handPink, handBlue } from "~/utils/images.js";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server.js";
import skillsData from "~/data/skills.json" with { type: "json" };
import type { Skill } from "../types/skills.js";
import { GlitchImage } from "~/components/GlitchImage.js";
import ShowCaseGrid from "~/components/case-study/ShowCaseGrid.js";
import type { ContributorRole } from "~/utils/roles.js";

export const meta: MetaFunction = () => {
  return [
    { title: "The Black Cat: Case Studies" },
    { name: "description", content: "Selected case studies by Sydney Hill" },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      hook: true,
      slug: true,
      roles: true,
      images: {
        where: { type: "COVER" },
        take: 1,
        select: {
          url: true,
          alt: true,
        },
      },
    },
  });

  return json({ caseStudies });
}

export default function Index() {
  const skills: Skill[] = skillsData as Skill[];
  const { caseStudies } = useLoaderData<typeof loader>();

  return (
    <div>
      <section className="p-4 text-center max-w-screen-lg mx-auto bg-center md:mt-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-0">
            <div className="flex">
              <GlitchImage
                srcTop={handPink}
                srcBottom={handBlue}
                alt="Hand Divider"
                className="w-32 h-42 md:w-42 md:h-62"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-left md:items-end pb-4">
              <h2 className=" text-cream-100 tracking-wide ">Selected Case Studies</h2>
              <p className="text-cream-200 text-md md:text-lg text-left">
                My career has taken me through many roles— designer, developer, and often both at
                once. The case studies here highlight a few projects where I’ve been able to blend
                those perspectives to create meaningful work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ShowCaseGrid caseStudies={caseStudies} />
    </div>
  );
}
