import type { MetaFunction } from "@vercel/remix";
import { glitchCatRed, glitchCatBlue, sydneyHill } from "~/utils/images.js";
import SkillCarousel from "~/components/SkillCarousel.js";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/utils/db.server.js";
import skillsData from "~/data/skills.json" with { type: "json" };
import type { Skill } from "../types/skills.js";
import { GlitchImage } from "~/components/GlitchImage.js";
import CaseStudyCard from "~/components/case-study/Card.js";
import { FaArrowRight } from "react-icons/fa";
import InlineLink from "~/components/typography/InlineLink.js";
import { link } from "fs";

export const meta: MetaFunction = () => {
  return [
    { title: "Black Cat Creative" },
    { name: "description", content: "Welcome to Sydney Hill's MySpace" },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  const caseStudies = await prisma.caseStudy.findMany({
    where: {
      active: true,
      showcase: true,
    },
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
      <section className="md:p-4 text-left max-w-screen-lg mx-auto bg-center md:mt-6">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col md:flex-row md:gap-12 md:mb-4 mr-8 md:mr-0 items-center">
            <div className="relative md:w-1/2 p-4 md:p-0">
              <img src={sydneyHill} alt="Sydney Hill" className="z-10 w-full p-8 md:p-12" />
              <div className="absolute bottom-0 right-0 md:bottom-[-40px] md:right-[-40px] z-20">
                <GlitchImage
                  srcTop={glitchCatRed}
                  srcBottom={glitchCatBlue}
                  className="w-40 md:w-54 h-40 md:h-54"
                  alt="The Black Cat"
                />
              </div>
            </div>
            <div className="px-4 md:px-0 md:w-1/2">
              <span className="bg-gradient-to-r from-bubblegum-500 to-red-500 bg-clip-text text-transparent font-normal leading-tight md:mt-4 text-sm md:text-base">
                Sydney Hill → Designer & Developer
              </span>
              <h1 className="lg:text-[42px] text-cream-100 font-bold leading-tight mt-4">
                I distill complex ideas into functional, aesthetic systems.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 text-center max-w-screen-lg mx-auto">
        <div className="flex flex-row items-center gap-8  mb-4">
          <div className="flex">
            <h3 className=" text-cream-100 tracking-wide w-full">Case Studies</h3>
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
        <div className="text-right py-8 px-4">
          <InlineLink
            to={"/case-studies"}
            variant="thin"
            className="uppercase text-sm tracking-wider text-bubblegum-300 hover:text-bubblegum-400 transition-colors"
          >
            See All
          </InlineLink>
        </div>
      </section>

      <section className="my-12 text-center max-w-screen-lg mx-auto ">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-4">
          <div className="flex">
            <h2 className=" text-cream-100 tracking-wide w-full">Arsenal</h2>
          </div>
          <SkillCarousel skills={skills} />
        </div>
      </section>
    </div>
  );
}
