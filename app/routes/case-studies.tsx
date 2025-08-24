import type { MetaFunction } from "@vercel/remix";
import { handRed, handBlue } from "~/utils/images.js";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/utils/db.server.js";
import skillsData from "~/data/skills.json" with { type: "json" };
import type { Skill } from "../types/skills.js";
import { GlitchImage } from "~/components/GlitchImage.js";
import CaseStudyCard from "~/components/case-study/Card.js";

export const meta: MetaFunction = () => {
  return [
    { title: "Black Cat Creative" },
    { name: "description", content: "Welcome to Sydney Hill's MySpace" },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        where: { type: "COVER" },
        take: 1,
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
      <section className="p-4 text-center max-w-screen-lg mx-auto bg-center mt-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-0">
            <div className="flex">
              <GlitchImage
                srcTop={handRed}
                srcBottom={handBlue}
                alt="Hand Divider"
                className="w-42 h-68"
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

      <section className="mt-8 md:mt-12 text-center max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-2">
          {caseStudies.map(
            (cs: {
              id: string;
              images: Array<{ url: string; alt?: string | null }>;
              title: string;
              hook: string;
              slug: string;
            }) => {
              const cover = cs.images[0];
              if (!cover) return null;

              return (
                <Link
                  key={cs.id}
                  to={`/case-study/${cs.slug}`}
                  className="group relative w-full overflow-hidden cursor-pointer"
                >
                  <CaseStudyCard cover={cover} title={cs.title} hook={cs.hook} />
                </Link>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
}
