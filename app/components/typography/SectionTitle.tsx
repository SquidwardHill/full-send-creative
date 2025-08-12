interface TitleProps {
  text: string;
  color?: string;
}

const SectionTitle = ({ text, color = "text-cream-100" }: TitleProps) => (
  <h2 className={`${color} mb-8 tracking-wider`}>{text}</h2>
);

export default SectionTitle;
