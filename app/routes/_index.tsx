import type { MetaFunction } from "@vercel/remix";
import { divider, sparkle, hand, catRed, catBlue } from "~/utils/images.js";
import SkillCarousel from "~/components/SkillCarousel.js";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/utils/db.server.js";
import { GlitchImage } from "~/components/GlitchImage.js";

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
  const { caseStudies } = useLoaderData<typeof loader>();

  return (
    <div>
      {/* Hero Section */}
      <section className="px-4 pt-16 text-center max-w-screen-md mx-auto">
        <GlitchImage srcTop={catRed} srcBottom={catBlue} alt="demon kitty" />

        <h1 className="text-cream-100 text-5xl font-bold leading-tight">
          I distill complex ideas into functional, aesthetic systems.
        </h1>
      </section>

      {/* About Section */}
      <section className="px-8 px-md-16 pt-0 text-center max-w-screen-lg mx-auto">
        <p className="text-cream-200 text-2xl font-normal tracking-normal pb-6 leading-relaxed">
          Designer and full-stack developer who blends creativity, logic, and intuition to build
          thoughtful digital experiences. My magic lies in distilling ideas into clear, usable
          systems—whether designing scalable UI patterns or developing the infrastructure beneath
          them. Explore my work to see how ideas take shape.
        </p>
        <a className="font-sans tracking-[3px] text-2xl text-bubblegum-400">Read More →</a>
      </section>

      {/* Work Section */}
      <section className="px-4 pt-32 text-center max-w-screen-md mx-auto">
        <p className="text-cream-100 text-4xl font-bold pb-8 font-sans tracking-[3px]">
          Spellcraft <img src={sparkle} alt="sparkle" className="inline-block w-12 ml-2" />
        </p>
      </section>

      <section className="flex flex-wrap -mx-2">
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
                className="group relative w-full sm:w-1/2 p-2 overflow-hidden cursor-pointer"
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
      </section>

      <section className="px-4 py-32 text-center max-w-screen-xl mx-auto">
        <p className="text-cream-100 text-4xl font-bold pb-8 font-sans tracking-[3px]">
          Rituals & Ingredients{" "}
          <img src={sparkle} alt="sparkle" className="inline-block w-12 ml-2" />
        </p>
        <SkillCarousel />
      </section>
    </div>
  );
}
