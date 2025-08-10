import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import TitleTag from "../components/TitleTag.js";
import CaseStudySection from "../components/case-study/Section.js";
import SkillStackSection from "../components/case-study/SkillStackSection.js";
import type { SkillArea, Tool } from "@prisma/client";
import { json } from "@remix-run/node";
import { prisma } from "~/utils/db.server.js";

// Placeholder image for case studies without a cover image
const coverPlaceholder = "/images/cover-placeholder.jpg";

interface CaseStudySkill {
  area: SkillArea;
  tool: Tool;
}

interface CaseStudy {
  title: string;
  hook: string;
  coverImage: string | null;
  tldr: string;
  challenge: string;
  need: string;
  contribution: string;
  result: string;
  processImages: string[];
  skills: CaseStudySkill[];
}

interface RelatedCaseStudy {
  slug: string;
  title: string;
  hook: string;
}

function groupSkillsByArea(skills: CaseStudySkill[]) {
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.area]) {
        acc[skill.area] = [];
      }
      acc[skill.area].push(skill.tool);
      return acc;
    },
    {} as Record<SkillArea, Tool[]>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Missing slug", { status: 400 });
  }

  const caseStudy = await prisma.caseStudy.findUnique({
    where: { slug },
    include: {
      images: true,
      skills: {
        include: {
          tool: true,
        },
      },
    },
  });

  if (!caseStudy) {
    throw new Response("Case study not found", { status: 404 });
  }

  // extract cover + process images
  const coverImage =
    caseStudy.images.find((img: { type: string }) => img.type === "COVER")?.url ?? null;
  const processImages = caseStudy.images
    .filter((img: { type: string }) => img.type === "PROCESS")
    .map((img: { url: string }) => img.url);

  // fetch 2 "related" case studies (placeholder logic)
  const related = await prisma.caseStudy.findMany({
    where: {
      slug: { not: slug },
    },
    take: 2,
    select: {
      slug: true,
      title: true,
      hook: true,
    },
  });

  return json({
    caseStudy: {
      ...caseStudy,
      coverImage,
      processImages,
    },
    related,
  });
};

export default function CaseStudy() {
  const { caseStudy, related } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-screen-lg px-12 pt-4">
      {/* Return Home Link */}
      <div className="mb-4">
        <Link
          to="/"
          className="text-sm text-pink-300 hover:text-pink-100 transition-colors underline underline-offset-4"
        >
          ← Back Home
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="border-b-2 border-bubblegum-400">
        <div className="flex flex-col md:flex-row py-10 gap-12 ">
          <div className="flex-5">
            <img
              src={caseStudy.coverImage ?? coverPlaceholder}
              alt={`${caseStudy.title} Cover Image`}
              className="object-cover"
            />
          </div>
          <div className="flex-7 content-center">
            <TitleTag text="Case Study" color="gradient-bubblegum-white" />
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-4 leading-[125%] tracking-wide">
              {caseStudy.hook}
            </h1>
          </div>
        </div>
        <CaseStudySection title="TL;DR" body={caseStudy.tldr} />
      </div>

      {/* TLDR + Body Sections */}

      <CaseStudySection title="The Challenge" body={caseStudy.challenge} />
      <CaseStudySection title="Product Need" body={caseStudy.need} />
      <CaseStudySection title="My Contribution" body={caseStudy.contribution} />
      <CaseStudySection title="Result" body={caseStudy.result} />

      {/* Tech Stack Section (stubbed) */}
      <SkillStackSection skills={caseStudy.skills} />

      {/* Process Images */}
      <section className="py-12">
        <h3 className="text-md font-light text-cream-200">Process Images</h3>
        <div className="flex overflow-x-auto space-x-4 py-8">
          {caseStudy.processImages.map((image: string, index: number) => (
            <div key={index}>
              <img src={image} alt={`Process ${index}`} className="h-48 w-auto rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* Related Case Studies */}
      {related.length > 0 && (
        <section className="pt-12 border-t border-zinc-800 mt-20">
          <h3 className="text-md font-light text-cream-200 mb-6">More from this realm...</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {related.map((item: RelatedCaseStudy) => (
              <Link
                key={item.slug}
                to={`/case-studies/${item.slug}`}
                className="group border border-zinc-800 rounded-lg p-6 transition hover:border-pink-400"
              >
                <h4 className="text-lg font-semibold text-white group-hover:text-pink-300">
                  {item.title}
                </h4>
                <p className="mt-2 text-cream-200">{item.hook}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
