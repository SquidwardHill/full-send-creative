interface TitleProps {
  text: string;
  color?: string;
}

const SectionTitle = ({ text, color = "text-cream-100" }: TitleProps) => (
  <h2 className="${color} text-3xl font-bold mb-8">{text}</h2>
);

export default SectionTitle;
