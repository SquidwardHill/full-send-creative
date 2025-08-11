import type { MetaFunction } from "@vercel/remix";
import { catRed, catBlue, sydneyHome } from "~/utils/images.js";
import SkillCarousel from "~/components/SkillCarousel.js";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/utils/db.server.js";
import { GlitchImage } from "~/components/GlitchImage.js";
import SectionTitle from "~/components/typography/SectionTitle.js";
import skillsData from "~/data/skills.json" with { type: "json" };
import type { Skill } from "../types/skills.js";

export const meta: MetaFunction = () => {
  return [
    { title: "Full Send Creative" },
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
      {/* Hero*/}
      <section className="px-4 pt-16 text-center max-w-screen-lg mx-auto">
        <GlitchImage srcTop={catRed} srcBottom={catBlue} alt="demon kitty" />
        <h1 className="text-cream-100 text-4xl font-bold mt-12 mb-8 max-w-sceen-md">
          I distill complex ideas into functional, aesthetic systems.
        </h1>
        <div className="rounded-md p-8 p-md-12 grid grid-cols-4 gap-4 border-1 border-avocado-cream-100">
          <div className="col-span-1">
            <img src={sydneyHome} alt="Sydney Hill" className="w-full" />
          </div>
          <div className="col-span-3 text-left">
            <p className="text-cream-200 text-xl font-normal tracking-normal pb-6 leading-relaxed">
              I’m Sydney, a designer and full-stack developer who thrives on blending creativity,
              logic, and intuition. Whether shaping interfaces or engineering seamless
              functionality, my magic lies in transforming ideas into thoughtfully crafted
              experiences.
            </p>
            <a className="font-sans text-2xl uppercase text-bubblegum-400">Read More →</a>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pt-32 text-center max-w-screen-lg mx-auto">
        <SectionTitle text="Case Studies" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
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
                  <img
                    src={cover.url}
                    alt={cover.alt ?? cs.title}
                    className="w-full object-cover rounded-lg transition-transform duration-300 "
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center rounded-lg">
                    <div className="text-center text-white px-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out rounded-lg">
                      <div className="max-w-3/4 mx-auto py-8">
                        <h2 className="text-3xl font-semibold">{cs.title}</h2>
                        <p className="text-xl mt-4">{cs.hook}</p>
                        <p className="mt-8 text-xs italic opacity-70">Click to view</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </section>

      {/* Tools/skills */}
      <section className="px-4 py-32 text-center max-w-screen-xl mx-auto">
        <SectionTitle text="Arsenal" />
        <div className="max-w-screen-lg mx-auto my-12">
          <SkillCarousel skills={skills} />
        </div>
      </section>
    </div>
  );
}
