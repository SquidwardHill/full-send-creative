const CaseStudyCard = ({ cover, title, hook, contributor = "Designer, Developer" }) => (
  <div className="flex flex-col gap-4 p-4 border-1 border-bubblegum-300/0 hover:border-bubblegum-300/75 transition-all ease-in-out duration-400 rounded-sm h-full group">
    {/* Full-width image */}
    <div>
      <img
        src={cover.url}
        alt={cover.alt ?? title}
        className="w-full object-cover transition-transform duration-300"
      />
    </div>

    {/* Text content in grid with icon */}
    <div className="grid grid-cols-12 gap-4 flex-grow">
      {/* Text content */}
      <div className="col-span-11 text-left flex flex-col">
        <p className="text-lg">{hook}</p>
        <p className="text-sm mt-4 font-sans uppercase font-light tracking-wider text-cream-200/50">
          {contributor}
        </p>
      </div>

      {/* Icon column - appears on hover */}
      <div className="col-span-1 flex items-end justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-bubblegum-400 text-xl">→</span>
      </div>
    </div>
  </div>
);
export default CaseStudyCard;
