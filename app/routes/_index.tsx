import type { MetaFunction } from "@vercel/remix";
import { sydney, glitchCatRed, glitchCatBlue, glitchCatText, sydneyHome } from "~/utils/images.js";
import SkillCarousel from "~/components/SkillCarousel.js";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/utils/db.server.js";
import SectionTitle from "~/components/typography/SectionTitle.js";
import skillsData from "~/data/skills.json" with { type: "json" };
import type { Skill } from "../types/skills.js";
import { GlitchImage } from "~/components/GlitchImage.js";
import CaseStudyCard from "~/components/case-study/Card.js";
import { FaArrowRight } from "react-icons/fa";

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
        <div className="max-w-screen-md mx-auto">
          <GlitchImage
            srcTop={glitchCatRed}
            srcBottom={glitchCatBlue}
            // srcDecorator={glitchCatText}
            alt="The Black Cat"
          />
          <h1 className="text-cream-100 font-semibold text-2xl leading-tight mt-4">
            Playful, strategic, and just a little rebellious.
          </h1>
          <p className="text-cream-200 text-xl py-6">
            I distill complex ideas into functional, aesthetic systems-- the medium varies. Here's a
            collection of my professional work. Thanks for looking.
          </p>
        </div>
      </section>

      <section className="mt-24 text-center max-w-screen-lg mx-auto">
        <div className="flex flex-row items-center gap-8 px-4 mb-4">
          <div className="flex">
            <h4 className="text-2xl font-bold text-cream-100 tracking-wide w-full">Case Studies</h4>
          </div>
          <div className="bg-gradient-to-r from-bubblegum-500 to-pink-300 h-0.5 flex-1"></div>
        </div>
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

      <section className="px-4 pt-24 pb-8 text-center max-w-screen-lg mx-auto">
        <div className="flex flex-row items-center gap-8 px-4 mb-4">
          <div className="flex">
            <h4 className="text-2xl font-bold text-cream-100 tracking-wide w-full">Arsenal</h4>
          </div>
          <SkillCarousel skills={skills} />
        </div>
      </section>
    </div>
  );
}
