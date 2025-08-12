import Label from "~/components/typography/Label";

interface CaseStudySectionProps {
  title: string;
  body?: string;
  isStrong?: boolean;
}

const CaseStudySection = ({
  title,
  body = "Splines reticulating",
  isStrong = false,
}: CaseStudySectionProps) => (
  <section className="mt-12 mb-14">
    {isStrong ? (
      <h4 className="text-2xl font-bold text-cream-100 tracking-wide w-full mb-2">{title}</h4>
    ) : (
      <Label text={title} />
    )}
    <p className="text-md text-cream-200 font-light">{body}</p>
  </section>
);
export default CaseStudySection;
