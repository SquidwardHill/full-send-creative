interface ContentSectionProps {
  title: string;
  body?: string;
}

const ContentSection = ({ title, body = "🔨 WIP, coming soon!" }: ContentSectionProps) => (
  <section className="my-10">
    <h3 className="text-md font-light text-cream-200">{title}</h3>
    <p className="mt-2 text-xl text-cream-100 text-normal">{body ?? "coming soon"}</p>
  </section>
);
export default ContentSection;
