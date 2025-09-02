export default function ResumeSection({
  company,
  title,
  dates,
  bullets,
  projects,
}: {
  company: string;
  title: string;
  dates: string;
  bullets: string[];
  projects?: string[];
}) {
  return (
    <section>
      <article className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1 border-l-2 border-bubblegum-200 pl-4 md:border-none">
          <p className="font-semibold text-cream-100">{company}</p>
          <p className="mt-1 text-sm text-cream-200/50 font-light uppercase italic tracking-wider">
            {dates}
          </p>
        </div>
        <div className="md:col-span-3">
          <h4 className="font-semibold text-lg text-cream-100">{title}</h4>
          <ul className="list-disc list-inside mt-2 space-y-1 text-cream-200 text-base font-light">
            {bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>
      </article>
      {projects && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-cream-100">Work Samples</h3>
          <ul className="list-disc list-inside mt-2 space-y-1 text-cream-200 text-base font-light">
            {projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
