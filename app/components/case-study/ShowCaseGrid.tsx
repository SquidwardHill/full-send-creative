import { Link } from "@remix-run/react";
import { type ContributorRole } from "~/utils/roles.js";
import CaseStudyCard from "~/components/case-study/Card.js";

interface ShowCaseGridProps {
  caseStudies: {
    id: string;
    title: string;
    hook: string;
    slug: string;
    roles: ContributorRole[];
    images: Array<{ url: string; alt?: string | null }>;
  }[];
}

const ShowCaseGrid = ({ caseStudies }: ShowCaseGridProps) => {
  return (
    <div>
      <section className="mt-8 md:mt-12 text-center max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-2">
          {caseStudies.map(
            (cs: {
              id: string;
              images: Array<{ url: string; alt?: string | null }>;
              title: string;
              hook: string;
              slug: string;
              roles: ContributorRole[];
            }) => {
              const cover = cs.images[0];
              if (!cover) return null;

              return (
                <Link
                  key={cs.id}
                  to={`/case-study/${cs.slug}`}
                  className="group relative w-full overflow-hidden cursor-pointer"
                >
                  <CaseStudyCard cover={cover} title={cs.title} hook={cs.hook} roles={cs.roles} />
                </Link>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};
export default ShowCaseGrid;
