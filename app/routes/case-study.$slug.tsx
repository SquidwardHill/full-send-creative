import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import Label from "../components/typography/Label.js";
import CaseStudySection from "../components/case-study/Section.js";
import SkillStackSection from "../components/case-study/SkillStackSection.js";
import MeetUserSidebar from "~/components/MeetUserSidebar.js";
import type { SkillArea, Tool } from "@prisma/client";
import { json } from "@remix-run/node";
import { prisma } from "~/utils/db.server.js";
import SectionTitleDivider from "~/components/typography/SectionTitleDivider.js";

// Placeholder image for case studies without a cover image
const coverPlaceholder = "/images/cover-placeholder.jpg";

interface CaseStudySkill {
  area: SkillArea;
  tool: Tool;
}

interface CaseStudy {
  active: boolean;
  showcase: boolean;
  title: string;
  hook: string;
  coverImage: string | null;
  tldr: string;
  challenge: string;
  task: string;
  contribution: string;
  result: string;
  processImages: string[];
  skills: CaseStudySkill[];
}

interface RelatedCaseStudy {
  slug: string;
  title: string;
  hook: string;
  cover?: string;
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

  const caseStudy = await prisma.caseStudy.findFirst({
    where: {
      slug,
      active: true,
    },
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

  const coverImage =
    caseStudy.images.find((img: { type: string }) => img.type === "COVER")?.url ?? null;
  const processImages = caseStudy.images
    .filter((img: { type: string }) => img.type === "PROCESS")
    .map((img: { url: string }) => img.url);

  const related = await prisma.caseStudy.findMany({
    where: {
      slug: { not: slug },
      active: true,
      showcase: true,
    },
    include: {
      images: {
        where: { type: "COVER" },
        take: 1,
      },
    },
  });

  const relatedWithCovers = related.map((study) => ({
    slug: study.slug,
    title: study.title,
    hook: study.hook,
    cover: study.images[0]?.url ?? coverPlaceholder,
  }));

  return json({
    caseStudy: {
      ...caseStudy,
      coverImage,
      processImages,
    },
    related: relatedWithCovers,
  });
};

export default function CaseStudy() {
  const { caseStudy, related } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-screen-lg pt-8 ">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-5">
            <img
              src={caseStudy.coverImage ?? coverPlaceholder}
              alt={`${caseStudy.title} Cover Image`}
              className="object-cover"
            />
          </div>
          <div className="flex-7 content-center">
            <Label text="Case Study" />
            <h2 className=" text-cream-100 ">{caseStudy.hook}</h2>
          </div>
        </div>
        <CaseStudySection isStrong title="TLDR" body={caseStudy.tldr} />
      </div>

      {/* TLDR + Body Sections */}
      <SectionTitleDivider title="In Depth" />
      <CaseStudySection title="The Challenge" body={caseStudy.challenge} />
      <CaseStudySection title="The Task" body={caseStudy.task} />
      <CaseStudySection title="My Contribution" body={caseStudy.contribution} />
      <CaseStudySection title="Result" body={caseStudy.result} />
      <SkillStackSection skills={caseStudy.skills} />

      {/* Process Images */}
      <section className="py-12">
        <h4 className="text-2xl font-bold text-cream-100 mb-8 tracking-wide">Process Images</h4>
        {caseStudy.processImages.length > 0 ? (
          <div className="flex overflow-x-auto space-x-4 py-8">
            {caseStudy.processImages.map((image: string, index: number) => (
              <div key={index}>
                <img src={image} alt={`Process ${index}`} className="h-48 w-auto rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-cream-200 text-lg opacity-75">Coming soon.</p>
          </div>
        )}
      </section>

      {/* Related Case Studies */}
      {related.length > 0 && (
        <section className="py-8 mb-8">
          <div className="flex flex-row items-center gap-8  mb-8">
            <div className="flex">
              <h3 className=" text-cream-100 tracking-wide w-full">Browse Others</h3>
            </div>
            <div className="bg-gradient-to-r from-bubblegum-500 to-pink-300 h-0.5 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item: RelatedCaseStudy) => (
              <Link key={item.slug} to={`/case-study/${item.slug}`}>
                <div className="mb-4">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <p className=" text-cream-100 group-hover:text-pink-300">{item.hook}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Todo: Flesh out User Persona Sidebar */}
      {/* <MeetUserSidebar
        caseStudyData={{
          title: caseStudy.title,
          challenge: caseStudy.challenge,
          task: caseStudy.task,
          result: caseStudy.result,
        }}
      /> */}
    </div>
  );
}
