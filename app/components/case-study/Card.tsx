import { FaLongArrowAltRight } from "react-icons/fa";
import { getRolesDisplayString, type ContributorRole } from "~/utils/roles.js";

const CaseStudyCard = ({
  cover,
  title,
  hook,
  roles,
}: {
  cover: { url: string; alt?: string | null };
  title: string;
  hook: string;
  roles: ContributorRole[];
}) => (
  <div className="flex flex-col gap-4 p-4 border-1 border-bubblegum-300/0 hover:border-bubblegum-300/75 transition-all ease-in-out duration-400 rounded-sm h-full group">
    <div>
      <img
        src={cover.url}
        alt={cover.alt ?? title}
        className="w-full object-cover transition-transform duration-300"
      />
    </div>

    <div className="grid grid-cols-12 gap-4 flex-grow">
      <div className="col-span-11 text-left flex flex-col">
        <p className="text-lg">{hook}</p>
        <p className="text-xs mt-4 font-sans uppercase font-light tracking-wider text-cream-200/50">
          {roles?.length ? getRolesDisplayString(roles) : "Frontend Developer"}
        </p>
      </div>

      {/* On hover show arrow */}
      <div className="col-span-1 flex items-end justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-bubblegum-400 ml-2 inline-block">
          <FaLongArrowAltRight />
        </span>
      </div>
    </div>
  </div>
);
export default CaseStudyCard;
