export default function SectionTitleDivider({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-row items-center gap-8 mb-4 ${className}`}>
      <div className="flex">
        <h3 className="text-cream-100 tracking-wide w-full">{title}</h3>
      </div>
      <div className="bg-gradient-to-r from-bubblegum-500 to-pink-300 h-0.5 flex-1"></div>
    </div>
  );
}
