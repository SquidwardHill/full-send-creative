interface TitleTagProps {
  text: string;
  color?: string;
  size?: string;
}

const TitleTag = ({ text, color = "text-cream-200", size = "text-2xl" }: TitleTagProps) => (
    <p className={`font-sans ${size} tracking-[4px] ${color} pb-4`}>{text}</p>
  );
export default TitleTag;
  