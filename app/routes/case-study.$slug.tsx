// app/routes/case-studies/$slug.tsx

import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import TitleTag from "~/components/titleTag";
import ContentSection from "~/components/caseStudy/section";

const prisma = new PrismaClient();

export async function loader({ params }: LoaderFunctionArgs) {
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
}

export default function CaseStudyPage() {
  const { caseStudy, related } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-6">
      {/* Case Study Header */}
      <div className="flex py-10">
        <div className="flex-1/2">
          <TitleTag 
            text="Case Study"
            color="text-transparent bg-clip-text from-purple-pizzazz-400 via-purple-pizzazz-300 from-purple-pizzazz-200"
          />
          <h1 className="text-4xl font-bold text-white mb-2">{caseStudy.hook}</h1>
        </div>
        <div className="flex-1/2">
            <img src={caseStudy.coverImageUrl} alt="Case Study Image" className="w-40 h-40 mb-6" />
        </div>
      </div>

      {/* TL;DR Section */}
      <section className="my-10">
        <h3 className="text-xl font-semibold ">TL;DR</h3>
        <p className="mt-4">{caseStudy.tldr}</p>
      </section>


      {/* Challenge Section */}
      <ContentSection
            title="The Challenge"
            body={caseStudy.challenge}
          />
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
        <h3 className="text-xl font-semibold text-[#FF7F50]">Process Images</h3>
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
