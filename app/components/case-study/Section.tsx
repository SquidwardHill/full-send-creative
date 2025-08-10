import TitleTag from "~/components/TitleTag";

interface CaseStudySectionProps {
  title: string;
  body?: string;
}

const CaseStudySection = ({ title, body = "Splines reticulating" }: CaseStudySectionProps) => (
  <section className="my-10">
    <TitleTag text={title} />
    <p className="mt-2 text-lg text-cream-100 font-light">{body ?? "coming soon"}</p>
  </section>
);
export default CaseStudySection;
