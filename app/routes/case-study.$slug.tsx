// app/routes/case-studies/$slug.tsx

import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import TitleTag from "~/components/titleTag";
import ContentSection from "~/components/caseStudy/section";
import { coverPlaceholder } from "../images/Index.js";
import { prisma } from "~/utils/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const slug = params.slug;
    if (!slug) throw new Response("Slug not found", { status: 404 });

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { slug },
      // include: { tooling: true },
    });

    if (!caseStudy) {
      throw new Response("Case study not found", { status: 404 });
    }

    const related = await prisma.caseStudy.findMany({
      where: { slug: { not: slug } },
      select: { title: true, slug: true, hook: true },
    });

    return json({ caseStudy, related });
  } catch (error) {
    console.error("Error loading case study:", error);
    throw new Response("Error loading case study", { status: 500 });
  }
}

export default function CaseStudyPage() {
  const { caseStudy, related } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-screen-lg p-6">
      {/* Case Study Header */}
      <div className="flex flex-col md:flex-row py-10 gap-12">
        <div className="flex-1/2 border-l-bubblegum-500 border-l-4 pl-8 ml-4 content-center">
          <TitleTag text="Case Study" color="gradient-bubblegum" size="text-lg lg:text-xl" />
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-4">{caseStudy.hook}</h1>
        </div>
        <div className="flex-1/2">
          <img
            src={caseStudy.coverImageUrl ?? coverPlaceholder}
            alt={`${caseStudy.title} Cover Image`}
            className="object-cover"
          />
        </div>
      </div>

      {/* TL;DR Section */}
      <section className="my-10 ">
        <TitleTag text="TL;DR" color="text-bubblegum-500 " />
        <p className="text-xl mt-0 gradient-bubblegum">{caseStudy.tldr}</p>
      </section>

      {/* Challenge Section */}
      <ContentSection title="The Challenge" body={caseStudy.challenge} />
      <section className="my-10">
        <h3 className="text-md font-light text-cream-200">The Challenge</h3>
        <p className="mt-2 text-xl text-cream-100 text-normal">{caseStudy.challenge}</p>
      </section>

      {/* Tech Stack Section */}
      <section className="my-10">
        <h3 className="text-xl font-semibold">Tools and Tech Stack</h3>
        <p className="mt-4">⚠️ Generate dynamically in grid</p>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {caseStudy.tools.map((tool, index) => (
            <div key={index} className="text-center text-gray-400">{tool}</div>
          ))}
        </div> */}
      </section>

      {/* Process Images Section */}
      <section className="py-8">
        <h3 className="text-xl font-semibold">Process Images</h3>

        <div className="flex overflow-x-auto space-x-4 py-8">
          {caseStudy.processImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Process ${index}`} className="h-48 w-auto rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer with Role and Timeline */}
      <footer className="text-center py-6">
        <div className="font-semibold text-white">Role: Frontend Developer</div>
        <div className="text-gray-400">Team: Engineering</div>
        <div className="text-gray-400">Timeline: 3 months</div>
      </footer>
    </div>
  );
}
