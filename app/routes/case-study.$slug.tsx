import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import TitleTag from "../components/titleTag.js";
import ContentSection from "../components/caseStudy/section.js";

// Placeholder image for case studies without a cover image
const coverPlaceholder = "/images/placeholder.jpg";

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
}

interface RelatedCaseStudy {
  slug: string;
  title: string;
  hook: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  // TODO: Replace with actual data fetching
  const caseStudy: CaseStudy = {
    title: "Sample Case Study",
    hook: "This is a sample case study",
    coverImage: null,
    tldr: "Sample TLDR",
    challenge: "Sample challenge",
    need: "Sample need",
    contribution: "Sample contribution",
    result: "Sample result",
    processImages: [],
  };

  const related: RelatedCaseStudy[] = [];

  return { caseStudy, related };
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
          ← Back to Home
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="flex flex-col md:flex-row py-10 gap-12">
        <div className="flex-7 content-center">
          <TitleTag text="Case Study" color="gradient-bubblegum-white" />
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-4 leading-[125%] tracking-wide">
            {caseStudy.hook}
          </h1>
        </div>
        <div className="flex-5">
          <img
            src={caseStudy.coverImage ?? coverPlaceholder}
            alt={`${caseStudy.title} Cover Image`}
            className="object-cover"
          />
        </div>
      </div>

      {/* TLDR + Body Sections */}
      <ContentSection title="✨ TL;DR" body={caseStudy.tldr} />
      <ContentSection title="The Challenge" body={caseStudy.challenge} />
      <ContentSection title="Product Need" body={caseStudy.need} />
      <ContentSection title="My Contribution" body={caseStudy.contribution} />
      <ContentSection title="Result" body={caseStudy.result} />

      {/* Tech Stack Section (stubbed) */}
      <section className="my-10">
        <h3 className="text-md font-light text-cream-200">Tools & Tech Stack</h3>
        <p className="mt-2 text-xl text-cream-100 text-normal">⚠️ Generate dynamically in grid</p>
      </section>

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
