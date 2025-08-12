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
      {/* <section className="p-4 text-center max-w-screen-lg mx-auto bg-center mt-12">
        <div className="max-w-screen-lg mx-auto px-8">
          <GlitchImage
            srcTop={glitchCatRed}
            srcBottom={glitchCatBlue}
            srcDecorator={glitchCatText}
            alt="glitch kitty"
          />

          <h1 className="text-cream-100 mt-4 pb-8 max-w-sceen-md leading-tight">
            I distill complex ideas into functional, aesthetic systems
          </h1>

          <div className="grid grid-cols-4 gap-8 items-center border-1 border-cream-100/50 rounded-lg p-6">
            <div className="col-span-1">
              <img src={sydney} alt="Sydney Hill" className="w-full p-4" />
            </div>
            <div className="col-span-3 text-left flex flex-col">
              <p className="text-cream-200 text-lg pb-6">
                I’m Sydney, a designer and full-stack developer who thrives on blending creativity,
                logic, and intuition. Whether shaping interfaces or engineering seamless
                functionality, my magic lies in transforming ideas into thoughtfully crafted
                experiences.
              </p>
              <div className="flex flex-row gap-6">
                <a
                  className="font-sans text-sm tracking-wider uppercase text-bubblegum-400 font-semibold flex items-center gap-2 underline"
                  title="Professional Experience"
                >
                  Business up front
                </a>
                <a
                  className="font-sans text-sm tracking-wider uppercase text-bubblegum-300 font-semibold flex items-center gap-2 underline"
                  title="Who am I?"
                >
                  Party in the back
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="p-4 text-center max-w-screen-lg mx-auto bg-center mt-12">
        <div className="max-w-screen-lg mx-auto px-8">
          <span className="text-bubblegum-500 mb6">The Black Cat</span>
          <h1 className="text-cream-100 leading-tight">
            Sleek, strategic, and just a little rebellious.
          </h1>
          {/* I distill complex ideas into functional, aesthetic systems */}
          <div className="grid grid-cols-4 gap-8 items-center ">
            <div className="col-span-1">
              <img src={sydneyHome} alt="Sydney Hill" className="w-full" />
            </div>
            <div className="col-span-3 text-left flex flex-col">
              <p className="text-cream-200 text-lg pb-6">
                I’m Sydney, a designer and full-stack developer who thrives on blending creativity,
                logic, and intuition. Whether shaping interfaces or engineering seamless
                functionality, my magic lies in transforming ideas into thoughtfully crafted
                experiences.
              </p>
              {/* <div className="flex flex-row gap-6">
                <a
                  className="font-sans text-sm tracking-wider uppercase text-bubblegum-400 font-semibold flex items-center gap-2 underline"
                  title="Professional Experience"
                >
                  Business up front
                </a>
                <a
                  className="font-sans text-sm tracking-wider uppercase text-bubblegum-300 font-semibold flex items-center gap-2 underline"
                  title="Who am I?"
                >
                  Party in the back
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="mt-24 text-center max-w-screen-lg mx-auto">
        {/* <h2 className="text-cream-100 mb-8">Case Studies</h2> */}
        <div className="flex flex-row items-center gap-8 px-4 mb-4">
          <div className="flex">
            <h4 className="text-2xl font-bold text-cream-100 tracking-wide w-full">Case Studies</h4>
          </div>
          <div className="bg-gradient-to-r from-bubblegum-500 to-pink-300 h-0.5 flex-1"></div>
        </div>
        {/* <p className="text-cream-200 text-xl pb-6">Some things I've made.</p> */}
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

      {/* Tools/skills */}
      <section className="px-4 pt-24 pb-8 text-center max-w-screen-xl mx-auto">
        <SectionTitle text="Arsenal" />
        <div className="max-w-screen-lg mx-auto my-12">
          <SkillCarousel skills={skills} />
        </div>
      </section>
    </div>
  );
}
